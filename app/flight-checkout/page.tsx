'use client';

import { useState } from 'react';
import { useAirService } from '@/app/contexts/AirServiceProvider';
import { AirCredentialWidget, type QueryRequest, type Language } from "@mocanetwork/air-credential-sdk";
import "@mocanetwork/air-credential-sdk/dist/style.css";
import { BUILD_ENV } from '@mocanetwork/airkit';

export default function FlightCheckoutPage() {
  const { airService } = useAirService();
  const [verificationResult, setVerificationResult] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [perkMessage, setPerkMessage] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const BROKE_PROGRAM_ID = "c21hg030e9rgy0036618wL";
  const OTHER_PROGRAM_ID = "c21hg030eaktc00466186O";

  const handleVerifyCredential = async (programId: string) => {
    if (!airService) return;

    setIsVerifying(true);
    setVerificationResult(null);
    setVerificationError(null);
    setPerkMessage(null);

    try {
      const authResponse = await fetch('/api/verifier-auth', { method: 'POST' });
      if (!authResponse.ok) {
        throw new Error('Failed to get verifier authentication token');
      }
      const { token } = await authResponse.json();

      const queryRequest: QueryRequest = {
        process: "Verify",
        verifierAuth: token,
        programId: programId,
      };

      const rp = await airService.goToPartner("https://credential-widget.sandbox.air3.com/");

      const widget = new AirCredentialWidget(queryRequest, process.env.NEXT_PUBLIC_PARTNER_ID!, {
        endpoint: rp.urlWithToken,
        airKitBuildEnv: BUILD_ENV.SANDBOX,
        theme: "light",
        locale: "en" as Language,
      });

      widget.on("verifyCompleted", (data: any) => {
        console.log("Verification completed data:", data);
        setIsVerifying(false);
        if (data.status === "Compliant") {
          const amount = data.credentialSubject?.amount;
          if (typeof amount === 'number') {
            setVerificationResult(amount);
            if (programId === BROKE_PROGRAM_ID) {
              setPerkMessage("Flight upgraded to free on-flight meal!");
            } else if (amount >= 5000 && amount < 25000) {
              setPerkMessage("Bronze tier perks applied!");
            } else if (amount >= 25000 && amount < 100000) {
              setPerkMessage("Silver tier perks applied!");
            } else if (amount >= 100000) {
              setPerkMessage("Gold tier perks applied!");
            } else {
              setPerkMessage("Sorry, cannot apply perks.");
            }
          } else {
            setPerkMessage("Sorry, cannot apply perks.");
          }
        } else {
          setPerkMessage("Sorry, cannot apply perks.");
        }
        widget.destroy();
      });

      widget.on("close", () => {
        setIsVerifying(false);
        widget.destroy();
      });

      widget.launch();
    } catch (err) {
      setVerificationError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsVerifying(false);
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-4">Flight Checkout</h1>
            <p className="text-xl text-gray-600 mb-8">
              Review your flight details and apply your loyalty perks.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg text-left mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Flight</h2>
              <p><strong>Airline:</strong> Vaulted Airlines</p>
              <p><strong>Flight:</strong> VA101</p>
              <p><strong>From:</strong> London (LHR)</p>
              <p><strong>To:</strong> New York (JFK)</p>
              <p><strong>Date:</strong> July 15, 2025</p>
              <p><strong>Price:</strong> $500.00</p>
            </div>

            <div className="space-y-4">
              <button
                className="btn-sm w-full text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleVerifyCredential(BROKE_PROGRAM_ID)}
                disabled={isVerifying}
              >
                {isVerifying ? 'Connecting Vaulted...' : 'Connect Vaulted (Broke Tier)'}
              </button>
              <button
                className="btn-sm w-full text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleVerifyCredential(OTHER_PROGRAM_ID)}
                disabled={isVerifying}
              >
                {isVerifying ? 'Connecting Vaulted...' : 'Connect Vaulted (Other Tier)'}
              </button>
            </div>

            {perkMessage && (
              <div className="mt-8 p-4 bg-blue-100 rounded-lg">
                <p className="text-lg text-blue-800">{perkMessage}</p>
              </div>
            )}

            {verificationError && (
              <div className="mt-8 p-4 bg-red-100 rounded-lg">
                <p className="text-lg text-red-800">{verificationError}</p>
              </div>
            )}

            {verificationResult !== null && (
              <div className="mt-8 space-y-4">
                <button
                  className="btn-sm w-full text-white bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                  disabled={checkoutSuccess}
                >
                  {checkoutSuccess ? 'Checkout Successful!' : 'Process to Checkout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}