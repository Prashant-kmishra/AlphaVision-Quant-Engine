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
import { useMemo } from "react";

// Procedurally generate a realistic looking equity curve based on target CAGR and Volatility
function generateEquityCurve(months: number, cagr: number, vol: number, isMarketNeutral: boolean = false) {
  const data = [];
  let portVal = 100;
  let benchVal = 100;
  
  const monthlyReturn = Math.pow(1 + cagr, 1/12) - 1;
  const monthlyVol = vol / Math.sqrt(12);
  
  const benchCagr = 0.12; // 12% benchmark
  const benchMonthlyRet = Math.pow(1 + benchCagr, 1/12) - 1;
  const benchVol = 0.15 / Math.sqrt(12);

  for (let i = 0; i <= months; i++) {
    // Shared market factor (random walk)
    const marketShock = (Math.random() + Math.random() + Math.random() - 1.5) * 2;
    
    // idiosyncratic strategy factor
    const stratShock = (Math.random() + Math.random() + Math.random() - 1.5) * 2;
    
    // If market neutral, it's decoupled from the market shock
    const finalStratShock = isMarketNeutral ? stratShock : (marketShock * 0.7 + stratShock * 0.3);
    
    const mRet = benchMonthlyRet + (marketShock * benchVol);
    const sRet = monthlyReturn + (finalStratShock * monthlyVol);
    
    if (i > 0) {
      benchVal = benchVal * (1 + mRet);
      portVal = portVal * (1 + sRet);
    }
    
    // Simulate a specific drawdown period around month 20-25
    if (i > 20 && i < 28) {
        benchVal *= 0.95; 
        if (!isMarketNeutral) portVal *= 0.96; 
    }

    data.push({
      month: "M" + i,
      Strategy: parseFloat(portVal.toFixed(2)),
      Nifty50: parseFloat(benchVal.toFixed(2))
    });
  }
  return data;
}

export function StrategyChart({ cagr, vol, isMarketNeutral, colorHex }: { cagr: number, vol: number, isMarketNeutral: boolean, colorHex: string }) {
  const data = useMemo(() => generateEquityCurve(60, cagr, vol, isMarketNeutral), [cagr, vol, isMarketNeutral]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            minTickGap={10}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          
          <Line 
            type="monotone" 
            dataKey="Nifty50" 
            name="Nifty 50 Benchmark"
            stroke="#64748b" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="Strategy" 
            name="Strategy Output"
            stroke={colorHex} 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
