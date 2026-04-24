import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stellar NFT Dapp",
  description: "Mint, collect and trade NFTs on Stellar using Soroban",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050510] text-white antialiased selection:bg-[#7c6cf0]/40 selection:text-white">

        {/* 🌌 Global subtle gradient */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,#7c6cf015,transparent_40%),radial-gradient(circle_at_90%_80%,#4fc3f715,transparent_40%)]" />

        {/* App Content */}
        {children}
      </body>
    </html>
  );
}