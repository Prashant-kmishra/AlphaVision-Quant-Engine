"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

export default function TopPicks() {
  const [picks, setPicks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/live_predictions.json')
      .then(r => r.json())
      .then(data => {
        if (data && data.top_20_allocations) {
          setPicks(data.top_20_allocations.slice(0, 5));
        }
      })
      .catch(e => console.error(e));
  }, []);

  if (picks.length === 0) return null;

  return (
    <div className="w-full text-left bg-white/60 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-green-100 shadow-[0_8px_32px_rgba(34,197,94,0.06)] mt-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 border border-green-100 shadow-inner">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Top Picks for Next 5 Days (A Week)</h2>
          <p className="text-sm text-gray-500">The QuantMLP model's highest conviction cross-sectional long positions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {picks.map((pick, i) => (
          <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col justify-between hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md hover:border-green-200">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rank #{i + 1}</span>
            <h3 className="text-xl font-extrabold text-gray-900 my-1">{pick.Ticker.replace('.NS', '')}</h3>
            <span className="text-xs font-semibold text-green-600">Alpha Score: {pick.Alpha_Score.toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
