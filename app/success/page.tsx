"use client";

import { useEffect } from "react";
import { useAirService } from "@/app/contexts/AirServiceProvider";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { isLoggedIn, userAddress, isInitialized, logout } = useAirService();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.push("/");
    }
  }, [isInitialized, isLoggedIn, router]);

  if (!isInitialized || !isLoggedIn) {
    return null; // Or a loading spinner
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 mb-4">Login Successful!</h1>
            <p className="text-xl text-gray-600">
              Welcome! You have successfully logged in.
            </p>
            {userAddress && (
              <p className="text-lg text-gray-500 mt-4">
                Your address is: {userAddress}
              </p>
            )}
            <div className="mt-8">
              <button
                className="btn-sm text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}