"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

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

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] glass-header z-50 flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-lg leading-tight">Alpha.Engine</h1>
          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-widest leading-none">Cross-Sectional ML</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
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

      <div className="flex items-center gap-4">
        <Link href="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-600/20">
          About me
        </Link>
      </div>
    </header>
  );
}
