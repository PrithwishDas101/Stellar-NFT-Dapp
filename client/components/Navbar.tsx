"use client";

import { useState, useEffect, useCallback } from "react";
import { NETWORK } from "@/hooks/contract";
import { Badge } from "@/components/ui/badge";

function WalletIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  );
}

interface NavbarProps {
  walletAddress: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
}

export default function Navbar({ walletAddress, onConnect, onDisconnect, isConnecting }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showDropdown) return;
    const close = () => setShowDropdown(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showDropdown]);

  const handleCopy = useCallback(async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [walletAddress]);

  const truncate = (address: string) => address.slice(0, 5) + "..." + address.slice(-4);

  return (
    <nav className={"sticky top-0 z-50 w-full border-b backdrop-blur-2xl transition-colors duration-300 " + (scrolled ? "border-white/[0.09] bg-[#080809]/85 shadow-[0_10px_40px_rgba(0,0,0,0.18)]" : "border-white/[0.055] bg-[#080809]/55")}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
        <a href="#" aria-label="StellarCanvas home" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] border border-[#5A0E1B]/35 bg-[#5A0E1B]/[0.08] text-[#A08A63] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors group-hover:bg-[#701527]/[0.13]">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 8h18M5 14h18M5 20h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
              <path d="m7 21 14-14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            <span className="block text-[15px] font-semibold tracking-[-0.035em] text-white">StellarCanvas</span>
            <span className="mt-0.5 block text-[9px] font-medium tracking-[0.18em] text-white/35">DIGITAL COLLECTIBLES</span>
          </span>
        </a>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Badge variant="default" className="border-[#5A0E1B]/25 bg-[#5A0E1B]/[0.08] px-2.5 py-1.5 text-[10px] tracking-wide text-[#B4A17D] sm:px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5A0E1B]" />
            {NETWORK}
          </Badge>

          {walletAddress ? (
            <div className="relative">
              <button
                aria-expanded={showDropdown}
                aria-haspopup="menu"
                onClick={(event) => { event.stopPropagation(); setShowDropdown(!showDropdown); }}
                className="flex min-h-10 items-center gap-2 rounded-full border border-white/[0.11] bg-white/[0.04] px-2.5 text-sm text-white/80 hover:border-white/20 hover:bg-white/[0.075] sm:gap-2.5 sm:px-3"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#5A0E1B]/15 text-[9px] font-semibold text-[#A08A63]">{walletAddress.slice(0, 2)}</span>
                <span className="font-mono text-[11px] sm:text-xs">{truncate(walletAddress)}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={"text-white/45 transition-transform " + (showDropdown ? "rotate-180" : "")} aria-hidden="true">
                  <path d="m7 10 5 5 5-5" />
                </svg>
              </button>

              {showDropdown && (
                <div role="menu" onClick={(event) => event.stopPropagation()} className="absolute right-0 top-full mt-3 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#151516]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl animate-fade-in-up">
                  <div className="border-b border-white/[0.07] p-4">
                    <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-white/35">CONNECTED WALLET</p>
                    <p className="break-all font-mono text-xs leading-6 text-white/70">{walletAddress}</p>
                  </div>
                  <div className="space-y-1 p-2">
                    <button role="menuitem" onClick={() => { void handleCopy(); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-white/65 hover:bg-white/[0.06] hover:text-white">
                      <CopyIcon />
                      {copied ? "Address copied" : "Copy address"}
                    </button>
                    <button role="menuitem" onClick={() => { onDisconnect(); setShowDropdown(false); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-[#A08A63]/80 hover:bg-[#701527]/[0.09] hover:text-[#D0BC95]">
                      <PowerIcon />
                      Disconnect wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#5A0E1B] px-4 text-xs font-semibold text-white shadow-[0_6px_22px_rgba(90,14,27,0.17)] hover:bg-[#701527] hover:shadow-[0_8px_28px_rgba(90,14,27,0.25)] disabled:opacity-55 sm:px-4.5 sm:text-sm"
            >
              <WalletIcon size={15} />
              {isConnecting ? "Connecting..." : "Connect wallet"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
