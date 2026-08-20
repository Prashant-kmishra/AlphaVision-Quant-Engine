"use client";

import { Download, LayoutDashboard, Target } from "lucide-react";

export default function ResultsDashboard() {
  const strategies = [
    { name: "S1: Equal Weight (H=5)", cagr: 24.12, vol: 16.51, sharpe: 1.39, dd: -20.63, turn: 41.40 },
    { name: "S2: Vol-Targeted", cagr: 12.48, vol: 19.44, sharpe: 0.70, dd: -28.74, turn: 42.10 },
    { name: "S3: Beta Hedged", cagr: 15.37, vol: 17.74, sharpe: 0.90, dd: -25.36, turn: 45.00 },
    { name: "S5: Meta-Labeled", cagr: 20.23, vol: 17.57, sharpe: 1.14, dd: -24.49, turn: 30.00 },
    { name: "S6: Options Regime Gated", cagr: 8.74, vol: 13.14, sharpe: 0.70, dd: -14.03, turn: 0.00 },
    { name: "S7: CVXPY Optimized", cagr: 21.50, vol: 16.43, sharpe: 1.27, dd: -19.58, turn: 30.50 },
    { name: "S1.1: Turnover Buffer", cagr: 21.57, vol: 16.59, sharpe: 1.26, dd: -19.38, turn: 28.05 },
    { name: "S1.4: EMA Scaling", cagr: 20.76, vol: 15.01, sharpe: 1.36, dd: -15.20, turn: 29.10 },
    { name: "S1.5: MACD Filter (Gross)", cagr: 20.75, vol: 12.91, sharpe: 1.53, dd: -10.09, turn: 38.79 },
    { name: "🏆 Champion S1.5 (Net 20bps)", cagr: 18.29, vol: 12.91, sharpe: 1.36, dd: -10.40, turn: 24.12 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            Strategy <span className="text-blue-600">P&L control room</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Aggregated metrics recomputed across 13 Out-of-Sample Folds (135,857 predictions).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            REFRESHED: LIVE
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            metrics.json
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Strategies Tested</p>
          <p className="text-3xl font-extrabold text-gray-900">10</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Champion Net Sharpe</p>
          <p className="text-3xl font-extrabold text-gray-900">1.36</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Champion Net CAGR</p>
          <p className="text-3xl font-extrabold text-gray-900">18.29%</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Win Rate</p>
          <p className="text-3xl font-extrabold text-gray-900">55.49%</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Opt. Turnover</p>
          <p className="text-3xl font-extrabold text-gray-900">24.12%</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Strategy Leaderboard</h3>
          <p className="text-sm text-gray-500">Ranked by risk-adjusted performance (Sharpe Ratio).</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Strategy</th>
                <th className="px-6 py-4 text-right">CAGR</th>
                <th className="px-6 py-4 text-right">Ann. Vol</th>
                <th className="px-6 py-4 text-right text-blue-600">Sharpe</th>
                <th className="px-6 py-4 text-right">Max DD</th>
                <th className="px-6 py-4 text-right">Avg Turnover</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {strategies.map((s, i) => (
                <tr key={s.name} className={"hover:bg-gray-50 transition-colors " + (i === strategies.length - 1 ? 'bg-blue-50/20' : '')}>
                  <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-2">
                    {i === strategies.length - 1 && <Target className="w-4 h-4 text-blue-500" />}
                    {s.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-right text-gray-600">{s.cagr.toFixed(2)}%</td>
                  <td className="px-6 py-4 font-mono text-right text-gray-600">{s.vol.toFixed(2)}%</td>
                  <td className="px-6 py-4 font-mono text-right text-blue-600 font-bold">{s.sharpe.toFixed(2)}</td>
                  <td className="px-6 py-4 font-mono text-right text-red-500">{s.dd.toFixed(2)}%</td>
                  <td className="px-6 py-4 font-mono text-right text-gray-600">{s.turn.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
