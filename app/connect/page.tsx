'use client';

import { useState } from 'react';
import { useAirService } from '@/app/contexts/AirServiceProvider';
import { AirCredentialWidget, type ClaimRequest, type Language } from "@mocanetwork/air-credential-sdk";
import "@mocanetwork/air-credential-sdk/dist/style.css";
import { BUILD_ENV } from '@mocanetwork/airkit';
import Link from 'next/link';

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
        credentialId: "c21hg0g0ei1c900844348i",
        credentialSubject: {
          "90_day_spend": totalSpent,
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
    <section className="relative min-h-screen flex flex-col">
      {/* Background Gradient */}
      <div
        className="fixed inset-0 bg-linear-to-tr from-blue-600 to-blue-500 pointer-events-none -z-10 min-h-screen"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="w-full z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between h-auto md:h-24 pt-4">
            {/* Site branding */}
            <div className="flex items-center space-x-3 mb-2">
              <Link className="block" href="/" aria-label="Vaulted">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                  <g fillRule="nonzero" fill="none">
                    <g className="fill-white" transform="translate(3 3)">
                      <circle cx="5" cy="5" r="5" />
                      <circle cx="19" cy="5" r="5" />
                      <circle cx="5" cy="19" r="5" />
                      <circle cx="19" cy="19" r="5" />
                    </g>
                    <g className="fill-sky-300">
                      <circle cx="15" cy="5" r="5" />
                      <circle cx="25" cy="15" r="5" />
                      <circle cx="15" cy="25" r="5" />
                      <circle cx="5" cy="15" r="5" />
                    </g>
                  </g>
                </svg>
              </Link>
              <span className="text-2xl font-bold text-white">Vaulted</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">Connect Your Bank</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Connect your bank account to get started and unlock exclusive rewards.
          </p>

          {/* Bank Connect Buttons */}
          <div className="flex flex-col space-y-4 mb-8">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow"
              onClick={handleConnectMonzo}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Monzo'}
            </button>
            <button className="w-full bg-gray-200 text-gray-400 font-semibold py-3 rounded-lg cursor-not-allowed" disabled>
              Connect Revolut (Coming Soon)
            </button>
            <button className="w-full bg-gray-200 text-gray-400 font-semibold py-3 rounded-lg cursor-not-allowed" disabled>
              Connect Barclays (Coming Soon)
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 rounded-lg text-red-800 text-center">
              {error}
            </div>
          )}

          {/* Show total spent and issue credential */}
          {totalSpent !== null && !issuanceSuccess && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg text-blue-800 text-center">
              <p className="text-lg font-semibold mb-2">
                Total spent in the last 90 days: <span className="font-mono">£{totalSpent.toFixed(2)}</span>
              </p>
              <button
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors shadow"
                onClick={handleIssueCredential}
                disabled={isIssuing}
              >
                {isIssuing ? 'Claiming Credential...' : 'Claim Spending Credential'}
              </button>
            </div>
          )}

          {/* Issuance Success */}
          {issuanceSuccess && (
            <div className="mb-6 p-4 bg-green-100 rounded-lg text-green-800 text-center">
              <p className="text-lg font-semibold mb-2">Credential issued successfully!</p>
              <Link
                href="/marketplace"
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
              >
                Return to Reward Marketplace
              </Link>
            </div>
          )}

          {/* Issuance Error */}
          {issuanceError && (
            <div className="mb-6 p-4 bg-red-100 rounded-lg text-red-800 text-center">
              {issuanceError}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}