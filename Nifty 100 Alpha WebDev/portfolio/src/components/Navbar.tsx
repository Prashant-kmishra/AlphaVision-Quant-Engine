"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Layers, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Overview", href: "/" },
  { name: "Research Thesis", href: "/thesis" },
  { name: "Data Pipeline", href: "/pipeline" },
  { name: "Model Lab", href: "/models" },
  { name: "Strategy Engine", href: "/strategies" },
  { name: "Results", href: "/results" },
  { name: "Predict", href: "/predict" }
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] glass-header z-50 flex items-center justify-between px-6 md:px-8 bg-white/70 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-lg leading-tight">Alpha.Engine</h1>
          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-widest leading-none hidden sm:block">Cross-Sectional ML</p>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
        {NAV_LINKS.map(link => (
          <Link 
            key={link.name} 
            href={link.href}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              pathname === link.href 
                ? "bg-white text-blue-600 shadow-sm border border-gray-100/50" 
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        <Link href="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-600/20">
          About me
        </Link>
      </div>

      {/* Mobile Menu Toggle (3-dash button) */}
      <div className="lg:hidden flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-3xl border-b border-gray-100 shadow-2xl p-4 flex flex-col gap-2 lg:hidden animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-bold transition-all",
                pathname === link.href 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2"></div>
          <Link 
            href="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 text-center shadow-md shadow-blue-600/20"
          >
            About me
          </Link>
        </div>
      )}
    </header>
  );
}
