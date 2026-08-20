import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CandlestickBackground } from "@/components/CandlestickBackground";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "NIFTY Alpha Engine | Quantitative Intelligence",
  description: "Cross-Sectional ML Alpha with Options-Regime Features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable + " " + jetbrainsMono.variable}>
      <body className="text-gray-900 antialiased font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col min-h-screen">
        <CandlestickBackground />
        <Navbar />
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-16 lg:px-12 mt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
