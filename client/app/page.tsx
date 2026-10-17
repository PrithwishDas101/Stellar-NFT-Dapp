"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ContractUI from "@/components/Contract";
import {
  connectWallet,
  getWalletAddress,
  checkConnection,
} from "@/hooks/contract";

function ArrowUpRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function StellarMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 10.5h18M7 16h18M7 21.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".45" />
      <path d="m9 23 14-14" stroke="#ff453a" strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="23" cy="9" r="2" fill="#ff453a" />
    </svg>
  );
}

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (await checkConnection()) {
          const address = await getWalletAddress();
          if (address) setWalletAddress(address);
        }
      } catch {
        // The gallery remains available when no wallet is connected.
      }
    })();
  }, []);

  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      if (address) setWalletAddress(address);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    setWalletAddress(null);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-clip">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar
          walletAddress={walletAddress}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          isConnecting={isConnecting}
        />

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
          <section className="grid items-center gap-10 pb-14 sm:gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-16 lg:pb-20">
            <div className="animate-fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.035] px-3.5 py-2 text-[11px] font-medium tracking-[0.13em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff453a] shadow-[0_0_12px_rgba(255,69,58,0.75)]" />
                STELLAR TESTNET
              </div>

              <h1 className="max-w-2xl text-[2.9rem] font-semibold leading-[0.99] tracking-[-0.065em] text-white sm:text-6xl lg:text-[4.5rem]">
                Digital art,
                <br />
                <span className="text-[#ff6258]">without the noise.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                A considered space to mint, collect, and move your NFTs on Stellar.
                Your art stays yours. The chain keeps the receipt.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#gallery"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#ff453a] px-5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(255,69,58,0.18)] hover:bg-[#ff6258] hover:shadow-[0_10px_34px_rgba(255,69,58,0.25)]"
                >
                  Explore collection
                  <ArrowUpRightIcon />
                </a>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting || Boolean(walletAddress)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.035] px-5 text-sm font-medium text-white/80 hover:border-white/20 hover:bg-white/[0.07] disabled:opacity-60"
                >
                  {walletAddress ? "Wallet connected" : isConnecting ? "Connecting..." : "Connect wallet"}
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-white/35">
                <div className="flex -space-x-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-[#080809] bg-[#2a1516] text-[#ff928a]"><StellarMark /></span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-[#080809] bg-[#1b1b1e] text-white/65">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z"/><path d="m4.5 7.8 7.5 4.4 7.5-4.4M12 12.2V21"/></svg>
                  </span>
                </div>
                <span>Powered by Stellar + Soroban smart contracts</span>
              </div>
            </div>

            <div className="hero-art-shell animate-fade-in-up" role="img" aria-label="Abstract red digital artwork preview">
              <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] font-medium tracking-[0.17em] text-white/45 sm:left-6 sm:top-6">
                <span className="h-1 w-1 rounded-full bg-[#ff6258]" />
                STELLAR CANVAS / OBJECT 001
              </div>
              <div className="hero-art-orbit" />
              <div className="hero-art-core" />
              <div className="hero-art-sigil">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path d="M6 8h16M6 14h16M6 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
                  <path d="m8 21 12-14" stroke="#ff6258" strokeWidth="2.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="absolute left-6 top-[57%] hidden rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-[10px] leading-5 text-white/45 backdrop-blur-md sm:block">
                <span className="block text-white/80">On-chain by design</span>
                Each piece has a story.
              </div>
              <div className="hero-art-meta">
                <div>
                  <p className="mb-1 text-[10px] tracking-[0.16em] text-white/40">FEATURED SERIES</p>
                  <p className="text-lg font-medium tracking-tight text-white/90">Signal in Red</p>
                </div>
                <span className="hero-art-chip"><span className="h-1.5 w-1.5 rounded-full bg-[#ff6258]" /> DIGITAL OBJECT 001</span>
              </div>
            </div>
          </section>

          <section aria-label="Network highlights" className="mb-16 grid grid-cols-1 border-y border-white/[0.09] sm:grid-cols-3">
            {[
              { value: "~5 sec", label: "Typical ledger close" },
              { value: "<$0.01", label: "Testnet transaction cost" },
              { value: "Soroban", label: "Smart contract layer" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={"flex items-center justify-between gap-5 py-5 sm:block sm:px-6 sm:py-6 " + (index === 1 ? "sm:border-x sm:border-white/[0.09]" : "")}
              >
                <p className="text-2xl font-semibold tracking-[-0.045em] text-white sm:text-[1.75rem]">{stat.value}</p>
                <p className="text-xs text-white/40 sm:mt-1.5">{stat.label}</p>
              </div>
            ))}
          </section>

          <section id="gallery" className="scroll-mt-24">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-[10px] font-semibold tracking-[0.19em] text-[#ff6258]">THE ON-CHAIN COLLECTION</p>
                <h2 className="text-2xl font-semibold tracking-[-0.045em] text-white sm:text-3xl">Explore the collection</h2>
                <p className="mt-2 text-sm text-white/45">Browse the gallery, manage your pieces, or mint something new.</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[11px] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff453a]" />
                Connected to Stellar Testnet
              </div>
            </div>

            <ContractUI
              walletAddress={walletAddress}
              onConnect={handleConnect}
              isConnecting={isConnecting}
            />
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/[0.07]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span className="font-medium tracking-tight text-white/65">StellarCanvas</span>
            <span>Made for digital ownership. Built on Stellar.</span>
            <span className="font-mono text-[10px] tracking-wide">TESTNET / SOROBAN</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
