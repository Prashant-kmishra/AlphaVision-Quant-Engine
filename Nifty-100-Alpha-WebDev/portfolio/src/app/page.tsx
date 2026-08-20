import Link from "next/link";
import { ArrowRight, BarChart3, Binary, Briefcase, ChevronRight } from "lucide-react";
import TopPicks from "@/components/TopPicks";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest border border-blue-100 mb-4">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        LIVE FROM JUPYTER
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
        The equity market, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">ranked in real time</span>
      </h1>
      
      <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
        Every figure below is computed via cross-sectional ML on the NIFTY 100 universe — no static assumptions, no lookahead bias.
      </p>

      <div className="flex items-center gap-4 text-xs font-mono text-gray-400 uppercase tracking-widest bg-white py-2 px-6 rounded-full border border-gray-200 shadow-sm">
        <span className="text-yellow-600 font-bold bg-yellow-50 px-2 py-0.5 rounded">Source: Out-of-Sample</span>
        <span>•</span>
        <span>135,857 Stock-Days</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full pt-8 text-left">
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Universe</p>
          <p className="text-3xl font-extrabold text-gray-900">NIFTY 100</p>
        </div>
        
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Model ICIR</p>
          <p className="text-3xl font-extrabold text-gray-900">0.215</p>
        </div>

        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gross Max Sharpe</p>
          <p className="text-3xl font-extrabold text-gray-900">1.53</p>
        </div>

        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Net Sharpe (20bps)</p>
          <p className="text-3xl font-extrabold text-teal-700">1.36</p>
        </div>

        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Net CAGR</p>
          <p className="text-3xl font-extrabold text-gray-900">18.29%</p>
        </div>

        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Drawdown</p>
          <p className="text-3xl font-extrabold text-red-500">-10.40%</p>
        </div>
      </div>

      <div className="card w-full text-left bg-gradient-to-r from-blue-50/60 to-teal-50/60 border-blue-100 p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-4 max-w-2xl">
          <div className="flex gap-2">
            <span className="badge bg-red-100 text-red-700">Problem Statement</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Absolute time-series returns invite <span className="text-red-500">massive market-beta drift</span>.
          </h2>
          <p className="text-gray-600">
            By shifting to cross-sectional ranking (Target = Fwd_Stock_Ret - Fwd_Nifty_Ret), we force the deep learning model to identify relative outperformance, neutralizing systemic risk.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 mt-6 md:mt-0 shrink-0">
          <Link href="/models" className="flex items-center justify-between w-48 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors text-sm font-bold text-gray-900 group">
            Open Model Lab
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </Link>
          <Link href="/strategies" className="flex items-center justify-between w-48 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-teal-300 transition-colors text-sm font-bold text-gray-900 group">
            Open Strategy Lab
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-500" />
          </Link>
        </div>
      </div>

      <div className="card w-full p-8 text-left mt-12 bg-white/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="badge bg-blue-100 text-blue-700">Final Pipeline Output</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Champion Strategy <span className="text-blue-600">S1.5 (Net)</span></h2>
            <p className="text-gray-500 mt-2 max-w-3xl">
              The final, tradeable model. We take S1.5, add a 15/30 Turnover Buffer to cut friction, and heavily penalize every single trade with a realistic 20 bps execution slippage. It survives with a robust 18.29% Net CAGR out-of-sample.
            </p>
          </div>
          <Link href="/strategies" className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all shrink-0">
            View All Strategies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 flex justify-center">
          <img 
            src="/charts/chart_cell_237.png" 
            alt="Champion Strategy S1.5 Net" 
            className="w-full max-w-4xl h-auto object-contain rounded-xl shadow-sm mix-blend-multiply" 
          />
        </div>
      </div>

      <TopPicks />
    </div>
  );
}
