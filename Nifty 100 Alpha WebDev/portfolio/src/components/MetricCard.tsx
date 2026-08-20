import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | ReactNode;
  subtitle?: string;
  highlight?: "teal" | "gold" | "red" | "none";
  className?: string;
}

export function MetricCard({ title, value, subtitle, highlight = "none", className }: MetricCardProps) {
  const highlights = {
    teal: "border-teal-500/50 shadow-[0_0_15px_rgba(23,190,207,0.1)]",
    gold: "border-gold-500/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]",
    red: "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    none: "border-slate-700/50 shadow-sm"
  };

  const textHighlights = {
    teal: "text-teal-400",
    gold: "text-gold-400",
    red: "text-red-400",
    none: "text-slate-50"
  };

  return (
    <div className={cn(
      "relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:bg-slate-800",
      highlights[highlight],
      className
    )}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16 blur-2xl pointer-events-none" />
      <h3 className="text-sm font-medium text-slate-400 tracking-wide uppercase mb-1">{title}</h3>
      <div className={cn("text-3xl font-bold font-mono tracking-tight", textHighlights[highlight])}>
        {value}
      </div>
      {subtitle && (
        <p className="text-xs text-slate-400 mt-2 font-medium bg-slate-900/50 inline-block px-2 py-1 rounded">
          {subtitle}
        </p>
      )}
    </div>
  );
}
