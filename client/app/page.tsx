"use client";

import { useState, useEffect, useCallback } from "react";
import { Meteors } from "@/components/ui/meteors";
import Navbar from "@/components/Navbar";
import ContractUI from "@/components/Contract";
import {
  connectWallet,
  getWalletAddress,
  checkConnection,
} from "@/hooks/contract";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (await checkConnection()) {
          const addr = await getWalletAddress();
          if (addr) setWalletAddress(addr);
        }
      } catch {}
    })();
  }, []);

  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    try {
      setWalletAddress(await connectWallet());
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    setWalletAddress(null);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-black text-white">

      {/* 🔴 Red + white ambient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#ff2a2a15,transparent_40%),radial-gradient(circle_at_80%_80%,#ffffff08,transparent_40%)]" />

      {/* Meteors */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Meteors number={14} />
      </div>

      {/* 🔴 Glow blobs (fixed colors) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[#ff2a2a]/10 blur-[180px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-white/5 blur-[180px] animate-float-delayed" />
      </div>

      {/* Navbar */}
      <Navbar
        walletAddress={walletAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        isConnecting={isConnecting}
      />

      <main className="relative z-10 flex flex-1 w-full max-w-5xl mx-auto flex-col items-center px-6 pt-16 pb-20">

        {/* 🔥 Hero */}
        <div className="mb-14 text-center animate-fade-in-up">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-sm text-white/60">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Soroban • Stellar Testnet
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-white">NFT Gallery</span>
            <br />
            <span className="text-red-500 text-2xl sm:text-3xl font-medium">
              built on Stellar
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-xl text-base text-white/40 leading-relaxed mt-4">
            Mint. Own. Trade.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 sm:gap-10">
            {[
              { label: "Finality", value: "~5s" },
              { label: "Cost", value: "<$0.01" },
              { label: "Network", value: "TESTNET" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-black/60 px-4 py-3 hover:border-red-500/40 transition"
              >
                <p className="text-lg font-bold text-white/90 font-mono">
                  {stat.value}
                </p>
                <p className="text-[11px] text-white/40 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 💎 Contract UI */}
        <div className="w-full rounded-xl border border-white/10 bg-black/70 shadow-[0_0_40px_rgba(0,0,0,0.8)] p-6">
          <ContractUI
            walletAddress={walletAddress}
            onConnect={handleConnect}
            isConnecting={isConnecting}
          />
        </div>

        {/* Footer */}
        <div className="mt-14 flex flex-col items-center gap-5 animate-fade-in">

          {/* Flow */}
          <div className="flex items-center gap-4 text-xs text-white/30">
            {["Mint", "Collect", "Trade"].map((step, i) => (
              <span key={step} className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      i === 0
                        ? "bg-red-500"
                        : i === 1
                        ? "bg-white/60"
                        : "bg-red-400"
                    }`}
                  />
                  <span className="font-mono">{step}</span>
                </span>
                {i < 2 && <span className="text-white/10">→</span>}
              </span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex items-center gap-4 text-[11px] text-white/20">
            <span>Stellar</span>
            <span>|</span>
            <span>Freighter</span>
            <span>|</span>
            <span>Soroban</span>
          </div>
        </div>
      </main>
    </div>
  );
}