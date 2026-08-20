"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend
} from "recharts";

// Mock data reflecting a realistic strategy curve over time.
const data = Array.from({ length: 60 }).map((_, i) => {
  const isDrawdown = i > 20 && i < 35;
  const isRiskOff = i > 15 && i < 40;
  
  return {
    month: `M${i + 1}`,
    strategy: 100 + i * 1.5 + (isDrawdown ? -10 + (Math.random() * 5) : Math.random() * 10),
    benchmark: 100 + i * 0.8 + (isDrawdown ? -20 + (Math.random() * 10) : Math.random() * 12),
    regime: isRiskOff ? "risk-off" : "risk-on",
  };
});

export function EquityCurveChart() {
  return (
    <div className="h-[400px] w-full mt-8 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl relative">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-sm font-semibold text-slate-300">Cumulative Performance vs Benchmark</h3>
        <p className="text-xs text-slate-500 font-mono">MACD Regime Hedging Active (Shaded Red)</p>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 40, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${value.toFixed(0)}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
            itemStyle={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          
          {/* Highlight Risk-Off Regimes */}
          <ReferenceArea x1="M16" x2="M40" fill="#ef4444" fillOpacity={0.05} />
          
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            name="Nifty 50 (Benchmark)"
            stroke="#64748b" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="strategy" 
            name="S1.5 Tradeable Net"
            stroke="#ffd700" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
