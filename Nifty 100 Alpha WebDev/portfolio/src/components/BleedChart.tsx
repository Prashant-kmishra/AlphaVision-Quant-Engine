"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const data = Array.from({ length: 24 }).map((_, i) => {
  const base = 100 * Math.pow(1.02, i); // 2% theoretical monthly growth
  return {
    month: `M${i + 1}`,
    bps0: base,
    bps10: base * Math.pow(0.995, i),
    bps20: base * Math.pow(0.985, i), // Realistic
    bps30: base * Math.pow(0.97, i),  // Retail
  };
});

export function BleedChart() {
  return (
    <div className="h-[400px] w-full mt-8 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl relative">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-sm font-semibold text-slate-300">Cost Sensitivity Analysis</h3>
        <p className="text-xs text-slate-500 font-mono">Impact of execution friction on equity curve</p>
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
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 10', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
            itemStyle={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="plainline" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          
          <Line type="monotone" dataKey="bps0" name="0 bps (Theoretical)" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          <Line type="monotone" dataKey="bps10" name="10 bps (HFT/Prop)" stroke="#17becf" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="bps20" name="20 bps (Realistic India)" stroke="#ffd700" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
          <Line type="monotone" dataKey="bps30" name="30 bps (Retail Bleed)" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
