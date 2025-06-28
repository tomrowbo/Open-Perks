'use client';

import { useState } from 'react';
import { useAirService } from '@/app/contexts/AirServiceProvider';
import { AirCredentialWidget, type ClaimRequest, type Language } from "@mocanetwork/air-credential-sdk";
import "@mocanetwork/air-credential-sdk/dist/style.css";
import { BUILD_ENV } from '@mocanetwork/airkit';

export default function ConnectPage() {
  const { airService } = useAirService();
  const [totalSpent, setTotalSpent] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issuanceSuccess, setIssuanceSuccess] = useState(false);
  const [issuanceError, setIssuanceError] = useState<string | null>(null);

  const handleConnectMonzo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/monzo-transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch Monzo transactions');
      }
      const data = await response.json();
      setTotalSpent(data.totalSpent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssueCredential = async () => {
    if (!airService || totalSpent === null) return;

    setIsIssuing(true);
    setIssuanceSuccess(false);
    setIssuanceError(null);

    try {
      const authResponse = await fetch('/api/issuer-auth', { method: 'POST' });
      if (!authResponse.ok) {
        throw new Error('Failed to get issuer authentication token');
      }
      const { token } = await authResponse.json();

      const claimRequest: ClaimRequest = {
        process: "Issue",
        issuerDid: process.env.NEXT_PUBLIC_ISSUER_DID!,
        issuerAuth: token,
        credentialId: "c21hg0g04sn270068482Om",
        credentialSubject: {
          amount: totalSpent,
        },
      };

      const rp = await airService.goToPartner("https://credential-widget.sandbox.air3.com/");

      const widget = new AirCredentialWidget(claimRequest, process.env.NEXT_PUBLIC_PARTNER_ID!, {
        endpoint: rp.urlWithToken,
        airKitBuildEnv: BUILD_ENV.SANDBOX,
        theme: "light",
        locale: "en" as Language,
      });

      widget.on("issueCompleted", () => {
        setIssuanceSuccess(true);
        setIsIssuing(false);
        widget.destroy();
      });

      widget.on("close", () => {
        setIsIssuing(false);
        widget.destroy();
      });

      widget.launch();
    } catch (err) {
      setIssuanceError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsIssuing(false);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-4">Connect Your Bank</h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect your bank accounts to get started.
            </p>
            <div className="space-y-4">
              <button
                className="btn-sm w-full text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleConnectMonzo}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect Monzo'}
              </button>
              <button className="btn-sm w-full text-white bg-gray-400 cursor-not-allowed" disabled>
                Connect Revolut (Coming Soon)
              </button>
              <button className="btn-sm w-full text-white bg-gray-400 cursor-not-allowed" disabled>
                Connect Barclays (Coming Soon)
              </button>
            </div>
            {totalSpent !== null && (
              <div className="mt-8 p-4 bg-green-100 rounded-lg">
                <p className="text-lg text-green-800">
                  Total spent in the last 90 days: £{totalSpent.toFixed(2)}
                </p>
                <div className="mt-4">
                  <button
                    className="btn-sm text-white bg-purple-600 hover:bg-purple-700"
                    onClick={handleIssueCredential}
                    disabled={isIssuing}
                  >
                    {isIssuing ? 'Issuing Credential...' : 'Issue Spending Credential'}
                  </button>
                </div>
              </div>
            )}
            {issuanceSuccess && (
              <div className="mt-8 p-4 bg-green-100 rounded-lg">
                <p className="text-lg text-green-800">Credential issued successfully!</p>
              </div>
            )}
            {issuanceError && (
              <div className="mt-8 p-4 bg-red-100 rounded-lg">
                <p className="text-lg text-red-800">{issuanceError}</p>
              </div>
            )}
            {error && (
              <div className="mt-8 p-4 bg-red-100 rounded-lg">
                <p className="text-lg text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}