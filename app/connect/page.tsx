'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useAirService } from '@/app/contexts/AirServiceProvider';
import { AirCredentialWidget, type ClaimRequest, type Language } from "@mocanetwork/air-credential-sdk";
import "@mocanetwork/air-credential-sdk/dist/style.css";
import { BUILD_ENV } from '@mocanetwork/airkit';
import Link from 'next/link';

export default function ConnectPage() {
  const { airService } = useAirService();
  const [totalSpent, setTotalSpent] = useState<number | null>(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issuanceSuccess, setIssuanceSuccess] = useState(false);
  const [issuanceError, setIssuanceError] = useState<string | null>(null);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const createLinkToken = useCallback(async () => {
    try {
      const response = await fetch('/api/plaid-transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_link_token' }),
      });
      if (!response.ok) {
        throw new Error('Failed to create link token');
      }
      const { link_token } = await response.json();
      setLinkToken(link_token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  }, []);

  useEffect(() => {
    if (!linkToken) {
      createLinkToken();
    }
  }, [linkToken, createLinkToken]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/plaid-transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'exchange_public_token', public_token }),
        });
        if (!response.ok) {
          throw new Error('Failed to exchange public token');
        }
        const { access_token } = await response.json();

        const transactionsResponse = await fetch(`/api/plaid-transactions?access_token=${access_token}`);
        if (!transactionsResponse.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const transactionsData = await transactionsResponse.json();
        console.log('Plaid transactions data:', transactionsData);
        
        // Calculate total and category breakdown
        const categoryTotals: Record<string, number> = {};
        let total = 0;
        
        transactionsData.transactions.forEach((transaction: any) => {
          total += transaction.amount;
          
          // Use personal_finance_category if available, otherwise fall back to category array
          let categoryName = 'Other';
          if (transaction.personal_finance_category?.primary) {
            categoryName = transaction.personal_finance_category.primary;
          } else if (transaction.category && transaction.category.length > 0) {
            categoryName = transaction.category[0];
          }
          
          if (!categoryTotals[categoryName]) {
            categoryTotals[categoryName] = 0;
          }
          categoryTotals[categoryName] += transaction.amount;
        });
        
        setTotalSpent(total);
        setCategoryBreakdown(categoryTotals);

        // Log the category breakdown and entertainment value for debugging
        console.log('categoryBreakdown:', categoryTotals);
        console.log('categoryBreakdown.ENTERTAINMENT:', categoryTotals?.ENTERTAINMENT);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleConnectPlaid = () => {
    if (ready) {
      open();
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
        credentialId: "c21hi0g02o8eo0086534mH",
        credentialSubject: {
          "90_day_spend": Math.floor(totalSpent),
          "90_day_igaming_spend": Math.floor(categoryBreakdown?.ENTERTAINMENT || 0),
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
              <Link className="block" href="/" aria-label="OpenPerks">
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
              <span className="text-2xl font-bold text-white">OpenPerks</span>
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
              onClick={handleConnectPlaid}
              disabled={isLoading || !ready}
            >
              {isLoading ? 'Connecting...' : 'Connect'}
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
            <div className="mb-6">
              <div className="p-4 bg-blue-50 rounded-lg text-blue-800">
                <p className="text-lg font-semibold mb-4 text-center">
                  Total spent in the last 90 days: <span className="font-mono">${totalSpent.toFixed(2)}</span>
                </p>
                
                {/* Category Breakdown */}
                {categoryBreakdown && Object.keys(categoryBreakdown).length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-md font-semibold mb-3 text-gray-700">Spending by Category:</h3>
                    <div className="space-y-2">
                      {Object.entries(categoryBreakdown)
                        .sort(([, a], [, b]) => b - a)
                        .map(([category, amount]) => {
                          const percentage = (amount / totalSpent) * 100;
                          return (
                            <div key={category} className="flex items-center justify-between">
                              <div className="flex items-center flex-1">
                                <span className="text-sm text-gray-600 w-32 truncate">{category}</span>
                                <div className="flex-1 mx-3">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm font-mono text-gray-700 ml-2">
                                ${amount.toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                
                <button
                  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors shadow"
                  onClick={handleIssueCredential}
                  disabled={isIssuing}
                >
                  {isIssuing ? 'Claiming Credential...' : 'Claim Spending Credential'}
                </button>
              </div>
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