"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AirService, BUILD_ENV, type AirEventListener } from "@mocanetwork/airkit";
import { useRouter } from "next/navigation";

interface AirServiceContextType {
  airService: AirService | null;
  isInitialized: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  userAddress: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AirServiceContext = createContext<AirServiceContextType | undefined>(
  undefined
);

export const useAirService = () => {
  const context = useContext(AirServiceContext);
  if (!context) {
    throw new Error("useAirService must be used within an AirServiceProvider");
  }
  return context;
};

export const AirServiceProvider = ({ children }: { children: ReactNode }) => {
  const [airService, setAirService] = useState<AirService | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      console.log("Initializing AirService...");
      try {
        const service = new AirService({
          partnerId: process.env.NEXT_PUBLIC_PARTNER_ID || "66d238a8-3ab6-4734-98b2-79ccf0cc30a2",
        });

        await service.init({
          buildEnv: BUILD_ENV.SANDBOX,
          enableLogging: true,
          skipRehydration: false,
        });

        setAirService(service);
        setIsInitialized(true);
        const loggedIn = service.isLoggedIn;
        setIsLoggedIn(loggedIn);

        if (loggedIn && service.loginResult) {
          console.log("User already logged in", service.loginResult);
          setUserAddress(service.loginResult.abstractAccountAddress || null);
        }

        const eventListener: AirEventListener = async (data) => {
          console.log("AirService event:", data.event);
          if (data.event === "logged_in") {
            setIsLoggedIn(true);
            setUserAddress(data.result.abstractAccountAddress || null);
          } else if (data.event === "logged_out") {
            setIsLoggedIn(false);
            setUserAddress(null);
          }
        };
        service.on(eventListener);
      } catch (err) {
        console.error("Failed to initialize AIRKit service:", err);
        setIsInitialized(true); // Stop loading on error
      }
    };

    initialize();

    return () => {
      airService?.cleanUp();
    };
  }, []);

  const login = async () => {
    if (!airService) return;
    setIsLoading(true);
    try {
      await airService.login();
      router.push("/connect");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!airService) return;
    await airService.logout();
  };

  return (
    <AirServiceContext.Provider
      value={{
        airService,
        isInitialized,
        isLoading,
        isLoggedIn,
        userAddress,
        login,
        logout,
      }}
    >
      {children}
    </AirServiceContext.Provider>
  );
};
