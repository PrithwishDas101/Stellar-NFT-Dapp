import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StellarCanvas — NFT Gallery",
  description: "Mint, collect, and transfer digital art on Stellar using Soroban.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen bg-[#111114] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
