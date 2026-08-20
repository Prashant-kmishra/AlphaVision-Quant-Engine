"use client";

import { useState, useEffect } from "react";
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Cpu, PlayCircle, RefreshCw, Zap } from "lucide-react";

export default function PredictLab() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [shuffleText, setShuffleText] = useState("");
  const [predictionData, setPredictionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Shuffling Animation Logic
  useEffect(() => {
    if (!isPredicting) return;
    
    const tickers = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK", "ITC", "SBIN", "BHARTIARTL", "BAJFINANCE", "LARSEN"];
    let i = 0;
    const interval = setInterval(() => {
      setShuffleText(
        Array(20).fill(0).map(() => {
          return tickers[Math.floor(Math.random() * tickers.length)] + " :: " + (Math.random() * 100).toFixed(4);
        }).join(" | ")
      );
      i++;
      if (i > 40) { // 2 seconds of shuffling
        clearInterval(interval);
        fetchPredictions();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPredicting]);

  const fetchPredictions = async () => {
    try {
      const res = await fetch("/live_predictions.json", { cache: 'no-store' });
      if (!res.ok) {
        setError("Live predictions not found. The model has not been run today.");
        setIsPredicting(false);
        return;
      }
      
      const data = await res.json();
      if (data.status === "error") {
        setError(data.message);
      } else {
        setPredictionData(data);
      }
      setIsPredicting(false);
    } catch (err) {
      setError("Failed to fetch predictions.");
      setIsPredicting(false);
    }
  };

  const handlePredictClick = () => {
    setError(null);
    setPredictionData(null);
    
    const now = new Date();
    // Assuming IST, check if it's past 18:00
    // Actually, just fetching the file will tell us if it's "Live/Unsettled"
    setIsPredicting(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
            <span className="badge bg-green-50/50 text-green-600 border border-green-200 backdrop-blur-sm shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Inference Engine
            </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
          Alpha <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">Generator</span>
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-3xl mb-8">
          Trigger the QuantMLP forward pass. This module scrapes the latest NSE Bhavcopy and Yahoo Finance OHLCV data, computes the cross-sectional feature space, and generates the Top 20 allocations for tomorrow.
        </p>

        {!predictionData && !isPredicting && (
          <button 
            onClick={handlePredictClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative flex items-center gap-3">
              <PlayCircle className="w-6 h-6" />
              PREDICT NOW
            </span>
          </button>
        )}
      </div>

      {/* Shuffling State */}
      {isPredicting && (
        <div className="kpi-card p-12 flex flex-col items-center justify-center space-y-6 bg-gray-900 text-white min-h-[400px]">
          <Cpu className="w-16 h-16 text-blue-500 animate-bounce" />
          <h2 className="text-2xl font-bold tracking-widest uppercase">Executing Forward Pass</h2>
          <div className="w-full max-w-2xl bg-black rounded-lg p-4 border border-gray-800 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 animate-pulse"></div>
            <p className="font-mono text-xs text-teal-400 break-words leading-relaxed relative z-10 opacity-70">
              {shuffleText}
            </p>
          </div>
          <p className="text-gray-400 text-sm animate-pulse">Scraping NSE Bhavcopy... Computing Cross-Sectional Ranks... Feeding QuantMLP...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="kpi-card p-8 border-red-200 bg-red-50/50">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Inference Failed</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <div className="bg-white p-4 rounded-lg border border-red-100 text-sm text-gray-600 space-y-2">
                <p><strong>Are you looking for tomorrow's prediction?</strong></p>
                <p>The daily data required to run inference for tomorrow is only released by the NSE at night. Please return after 18:00 IST once the market has fully settled.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success State (Results) */}
      {predictionData && predictionData.status === "success" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="kpi-card space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Target Horizon</p>
              <p className="text-2xl font-extrabold text-gray-900">T+5 Days</p>
            </div>
            <div className="kpi-card space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">NIFTY MACD Regime</p>
              <p className={`text-2xl font-extrabold ${predictionData.nifty_macd_signal === 'BULLISH' ? 'text-green-600' : 'text-red-600'}`}>
                {predictionData.nifty_macd_signal} <span className="text-sm font-bold text-gray-500 ml-1">({predictionData.strategy_exposure}% Allocation)</span>
              </p>
            </div>
            <div className="kpi-card space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Champion Strategy Exposure</p>
              <p className="text-2xl font-extrabold text-blue-600">{predictionData.strategy_exposure}%</p>
            </div>
          </div>

          <div className="kpi-card p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-white/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">QuantMLP Top 20 Allocations</h3>
                <p className="text-sm text-gray-500">Highest predicted relative outperformance (Alpha Score) for the next 5 days.</p>
              </div>
              <span className="badge bg-green-100 text-green-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> SUCCESS
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-bold tracking-wider">Rank</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Ticker</th>
                    <th className="px-6 py-4 font-bold tracking-wider">LTP (Close)</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Alpha Score</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {predictionData.top_20_allocations.map((stock: any, index: number) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-400">#{index + 1}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {stock.Ticker.replace('.NS', '')}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600">
                        ₹{stock.Close.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-teal-600">
                            {stock.Alpha_Score.toFixed(4)}
                          </span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-500" 
                              style={{ width: `${Math.max(0, stock.Alpha_Score * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="badge bg-blue-50 text-blue-600 border border-blue-100">LONG</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
