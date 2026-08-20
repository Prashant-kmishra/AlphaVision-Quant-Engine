import { Activity, Beaker, BrainCircuit, LineChart, Target, ShieldCheck, Zap, Database } from "lucide-react";

export default function Thesis() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Thesis</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
          The complete quantitative pipeline from raw data extraction to a cost-aware, live-tradeable equity momentum model on the Indian NIFTY 100 universe.
        </p>
      </div>

      <div className="grid gap-6">
        
        {/* Phase 1 & 2 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 space-y-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 text-blue-600">
              <Database className="w-6 h-6" />
              <h2 className="text-xl font-bold">1. Universe & Liquidity</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Target universe is the NIFTY 100. To ensure strategies are actually tradeable without massive market-impact slippage, a strict liquidity filter is applied: only stocks with a <strong>20-Day Average Daily Value (ADV) &gt; ₹15 Crores</strong> are eligible for scoring on any given day.
            </p>
          </div>

          <div className="card p-6 space-y-4 border-l-4 border-teal-500">
            <div className="flex items-center gap-3 text-teal-600">
              <Beaker className="w-6 h-6" />
              <h2 className="text-xl font-bold">2. Feature Engineering</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Features are built entirely strictly out-of-sample to avoid lookahead bias. We construct traditional momentum features (5D, 20D returns), volatility features (20D Realized Vol, ATR), and technicals (RSI, MACD). Crucially, derivative market sentiment via Put-Call Ratio (PCR) changes and Open Interest trends are mapped to the underlying equities.
            </p>
          </div>
        </div>

        {/* Phase 3 & 4 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 space-y-4 border-l-4 border-purple-500">
            <div className="flex items-center gap-3 text-purple-600">
              <Target className="w-6 h-6" />
              <h2 className="text-xl font-bold">3. Cross-Sectional Target</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Predicting absolute returns invites massive market-beta drift. Our target variable is <strong>Excess Return</strong>: <code>Fwd_Ret_5D - Fwd_Nifty_Ret_5D</code>. This excess return is then ranked cross-sectionally per day, converting it into a percentile (0.0 to 1.0) to feed into the models. The model learns relative outperformance, not absolute direction.
            </p>
          </div>

          <div className="card p-6 space-y-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-3 text-orange-600">
              <BrainCircuit className="w-6 h-6" />
              <h2 className="text-xl font-bold">4. QuantMLP & CV</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              A deep Multi-Layer Perceptron (QuantMLP) trained to predict the cross-sectional rank. Validation is strictly handled via <strong>Purged Walk-Forward Cross Validation</strong> with a 5-day embargo to eliminate overlapping return leakage. OOS predictions drive the entire Strategy Lab.
            </p>
          </div>
        </div>

        {/* Phase 5 */}
        <div className="card p-8 space-y-4 border-t border-gray-100 bg-gradient-to-br from-white to-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">5. Strategy Evolution Pipeline</h2>
          <p className="text-gray-500 max-w-4xl">
            A raw AI prediction is not a strategy. The notebook applies a 10-phase funnel to transform the QuantMLP output into a robust, cost-aware hedge fund strategy.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="font-bold text-gray-800 text-sm">S1: Base Equal Weight</h3>
              <p className="text-xs text-gray-500">Naively buys the top 20 predicted stocks every 5 days. Huge Gross CAGR (24%+), but massive turnover (&gt;40%).</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="font-bold text-gray-800 text-sm">S2/S3: Risk Overlays</h3>
              <p className="text-xs text-gray-500">Targeting 15% annualized volatility dynamically, and applying a rolling Nifty 50 short to neutralize market beta.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="font-bold text-gray-800 text-sm">S7: CVXPY Markowitz</h3>
              <p className="text-xs text-gray-500">Convex optimization using a shrunk covariance matrix to maximize Sharpe while applying position limits (max 10% per stock).</p>
            </div>
          </div>
        </div>

        {/* Phase 6 */}
        <div className="card p-8 space-y-6 border border-teal-100 bg-teal-50/30">
          <div className="flex items-center gap-3 text-teal-700 border-b border-teal-100 pb-4">
            <ShieldCheck className="w-8 h-8" />
            <h2 className="text-2xl font-bold">The Champion: Trading Reality</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Gross returns are a fantasy. Indian equity markets impose heavy frictions (STT, brokerage, MOO slippage). To create the final <strong>S1.5 Tradeable Champion</strong>, three massive optimization filters were applied to S1:
            </p>
            
            <ul className="grid md:grid-cols-3 gap-4 pt-2">
              <li className="bg-white p-4 rounded-lg border border-teal-100 shadow-sm">
                <span className="block font-bold text-teal-800 mb-1">Turnover Buffer (15/30)</span>
                <span className="text-xs text-gray-600">Prevents churn. Stocks bought in the top 15 are held until they drop out of the top 30 rank, slashing turnover from 41% to 28%.</span>
              </li>
              <li className="bg-white p-4 rounded-lg border border-teal-100 shadow-sm">
                <span className="block font-bold text-teal-800 mb-1">NIFTY MACD Gating</span>
                <span className="text-xs text-gray-600">When the broader index MACD flips negative, the strategy scales down exposure to 20%, drastically cutting maximum drawdowns.</span>
              </li>
              <li className="bg-white p-4 rounded-lg border border-teal-100 shadow-sm">
                <span className="block font-bold text-teal-800 mb-1">20bps Execution Friction</span>
                <span className="text-xs text-gray-600">A strict 20 basis point cost applied to every single transaction. The strategy still yields an 18.29% Net CAGR at 1.36 Sharpe.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
