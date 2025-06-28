"use client";

import { useAirService } from "@/app/contexts/AirServiceProvider";

const LoginButton = () => {
  const { login, isLoading, isInitialized } = useAirService();

  return (
    <button
      className="btn-sm w-full inline-flex items-center text-slate-100 bg-slate-800 hover:bg-slate-900 group shadow-xs"
      onClick={login}
      disabled={isLoading || !isInitialized}
    >
      {isLoading ? "Connecting..." : "Explore Offers"}
      <span className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
        <svg
          className="fill-current"
          width="12"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
        </svg>
      </span>
    </button>
  );
};

export default LoginButton;