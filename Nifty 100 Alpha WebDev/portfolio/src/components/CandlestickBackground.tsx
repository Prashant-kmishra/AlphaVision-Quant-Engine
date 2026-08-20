"use client";

import { useMemo, useState, useEffect } from "react";

export function CandlestickBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate complex quant data once on mount
  const { candles, maLine, volume, scatter, gridLines, orderBlocks } = useMemo(() => {
    let currentPrice = 100;
    const data = [];
    const numPoints = 250; // Increased density
    
    // Generate Candlesticks & Volume
    for (let i = 0; i < numPoints; i++) {
      const isBull = Math.random() > 0.48; 
      const bodySize = Math.random() * 15 + 2;
      const wickTop = Math.random() * 10 + 1;
      const wickBottom = Math.random() * 10 + 1;
      
      const open = currentPrice;
      const close = isBull ? open + bodySize : open - bodySize;
      const high = Math.max(open, close) + wickTop;
      const low = Math.min(open, close) - wickBottom;
      
      const vol = Math.random() * 30 + (isBull ? 10 : 5); // higher volume on bull just for looks
      
      data.push({ i, open, close, high, low, isBull, vol });
      currentPrice = close;
    }
    
    // Normalize prices to fit in a 0-80 viewBox range (leaving bottom 20 for volume)
    const min = Math.min(...data.map(d => d.low));
    const max = Math.max(...data.map(d => d.high));
    const range = max - min;
    
    const normalizedCandles = data.map(d => ({
      ...d,
      open: 80 - ((d.open - min) / range) * 80,
      close: 80 - ((d.close - min) / range) * 80,
      high: 80 - ((d.high - min) / range) * 80,
      low: 80 - ((d.low - min) / range) * 80,
    }));

    // Generate Moving Average Line
    let maPoints = "";
    for (let i = 10; i < numPoints; i++) {
      const slice = normalizedCandles.slice(i - 10, i);
      const avg = slice.reduce((sum, c) => sum + c.close, 0) / 10;
      const x = i * 10 + 2.5;
      maPoints += `${x},${avg} `;
    }

    // Generate Scatter points (Latent embeddings / options nodes)
    const scatterNodes = [];
    for (let i = 0; i < 60; i++) {
      scatterNodes.push({
        x: Math.random() * (numPoints * 10),
        y: Math.random() * 80,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Grid lines
    const gLines = [20, 40, 60, 80];

    // Order Blocks (Liquidity Zones)
    const oBlocks = [];
    for (let i = 0; i < 6; i++) {
      oBlocks.push({
        y: Math.random() * 70,
        height: Math.random() * 12 + 4,
        isSupply: Math.random() > 0.5
      });
    }

    return { 
      candles: normalizedCandles, 
      maLine: maPoints, 
      volume: normalizedCandles.map(c => c.vol),
      scatter: scatterNodes,
      gridLines: gLines,
      orderBlocks: oBlocks
    };
  }, []);

  const SvgContent = () => (
    <svg 
      viewBox="0 0 2500 120" 
      preserveAspectRatio="none" 
      className="w-full h-[70vh] fill-transparent flex-shrink-0"
    >
      {/* Grid Lines */}
      {gridLines.map(y => (
        <line key={`grid-${y}`} x1="0" y1={y} x2="2500" y2={y} stroke="#94a3b8" strokeWidth="0.2" strokeDasharray="4 4" opacity="0.3" />
      ))}

      {/* Order Blocks (Supply & Demand Zones) */}
      {orderBlocks.map((ob, idx) => (
        <rect 
          key={`ob-${idx}`}
          x="0" y={ob.y} width="2500" height={ob.height}
          fill={ob.isSupply ? '#ef4444' : '#22c55e'}
          opacity="0.08"
        />
      ))}

      {/* Moving Average Line */}
      <polyline 
        points={maLine} 
        fill="none" 
        stroke="#0ea5e9" 
        strokeWidth="1.5" 
        strokeOpacity="0.5" 
      />

      {/* Scatter Nodes (Machine Learning Latents) */}
      {scatter.map((s, idx) => (
        <circle 
          key={`scatter-${idx}`} 
          cx={s.x} cy={s.y} r={s.r} 
          fill="#14b8a6" 
          opacity={s.opacity} 
        />
      ))}

      {/* Candlesticks & Volume */}
      {candles.map((c) => {
        const x = c.i * 10;
        const topY = Math.min(c.open, c.close);
        const bottomY = Math.max(c.open, c.close);
        const height = Math.max(bottomY - topY, 0.5);
        const color = c.isBull ? '#0ea5e9' : '#94a3b8';

        return (
          <g key={c.i}>
            {/* Wick */}
            <line 
              x1={x + 2.5} y1={c.high} 
              x2={x + 2.5} y2={c.low} 
              stroke={color} strokeWidth="1" 
              opacity="0.8"
            />
            {/* Body */}
            <rect 
              x={x} y={topY} 
              width="5" height={height} 
              fill={color} 
              rx="1"
            />
            {/* Volume Histogram */}
            <rect
              x={x + 1} y={120 - c.vol}
              width="3" height={c.vol}
              fill={color}
              opacity="0.3"
              rx="0.5"
            />
          </g>
        );
      })}
    </svg>
  );

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pan-quant-chart {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-pan-quant {
          animation: pan-quant-chart 90s linear infinite;
        }
        .mask-fade-super {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-composite: intersect;
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-composite: source-in;
        }
      `}} />
      
      {/* We use a w-[200vw] container and render two SVGs side-by-side to make it loop seamlessly when translated to -50% */}
      <div className="absolute top-0 bottom-0 left-0 w-[200vw] flex animate-pan-quant items-center mask-fade-super">
        <div className="w-[100vw] flex shrink-0">
          <SvgContent />
        </div>
        <div className="w-[100vw] flex shrink-0">
          <SvgContent />
        </div>
      </div>
    </div>
  );
}
