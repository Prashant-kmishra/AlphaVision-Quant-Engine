import { Database, DownloadCloud, FileWarning, Filter, GitMerge, LineChart, BookOpen, Fingerprint, Activity } from "lucide-react";

export default function Pipeline() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
            <span className="badge bg-blue-50/50 text-blue-600 border border-blue-200 backdrop-blur-sm">Phase I: Data Engineering</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Data Pipeline</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Robust quantitative modeling requires pristine, stationary data. We process over 135,000 liquid stock-days of OHLCV and derivatives data, strictly enforcing zero lookahead bias to map non-stationary prices into a stationary cross-sectional feature space.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full text-left">
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Rows</p>
          <p className="text-3xl font-extrabold text-gray-900">135,857</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Universe</p>
          <p className="text-3xl font-extrabold text-gray-900">NIFTY 100</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">OOS Horizon</p>
          <p className="text-3xl font-extrabold text-teal-800">44 Months</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Target Return</p>
          <p className="text-3xl font-extrabold text-gray-900">Fwd_5D</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Liq Cutoff</p>
          <p className="text-3xl font-extrabold text-gray-900">₹15 Cr</p>
        </div>
        <div className="kpi-card space-y-1">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Cross-Sec Type</p>
          <p className="text-3xl font-extrabold text-blue-800">Rank (0-1)</p>
        </div>
      </div>

      {/* Abstract Section */}
      <div className="kpi-card p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" /> Abstract & Methodology
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          In financial machine learning, absolute price series are overwhelmingly dominated by market beta (the overarching index trend). If a neural network is trained on raw returns, it overwhelmingly learns to predict the NIFTY index itself rather than individual stock alpha. To circumvent this structural drift, our pipeline aggressively neutralizes systemic beta. Instead of attempting to predict absolute future returns, the pipeline transforms the universe into a daily cross-sectional tournament. The target variable is formulated as a percentile rank (`Fwd_Ret_5D_Rank`), forcing the neural network to identify which specific equities will outperform their peers on a relative basis over the subsequent 5 trading days.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 relative">
        
        {/* Step 1 */}
        <div className="kpi-card space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">1. Data Ingestion & Integration</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            The base dataset comprises daily OHLCV (Open, High, Low, Close, Volume) data for the NIFTY 100 constituent equities, spanning from January 2018 to August 2026. This data is asynchronously sourced via the `yfinance` API. Crucially, equity behavior is heavily influenced by systemic volatility and institutional derivative positioning. Therefore, the pipeline joins the equity panel with macroeconomic indicators—specifically the India VIX, Nifty 50 Futures Open Interest (OI), and the broader Put-Call Ratio (PCR).
          </p>
        </div>

        {/* Step 2 */}
        <div className="kpi-card space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">2. Liquidity Constraints</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Academic backtests often fail in production because they allocate capital to illiquid assets where market impact and slippage obliterate alpha. We implement a strict rolling 20-Day Average Daily Value (ADV) filter. Any stock-day observation where <span className="font-semibold text-red-500">ADV &lt; ₹15 Crores</span> is flagged and dynamically excised from the dataset. This ensures the resulting model generates allocations that can absorb millions in capital without moving the order book.
          </p>
        </div>

        {/* Step 3 */}
        <div className="kpi-card space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">3. Feature Stationarity</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Raw technical indicators (e.g., RSI, MACD, Bollinger Bands) exhibit varying statistical bounds across distinct market regimes (bull vs. bear). To achieve stationarity, every engineered feature is converted into a daily cross-sectional percentile rank. Rather than feeding the neural net an absolute RSI of '70', it receives a ranked feature of '0.95', indicating the stock's momentum is in the 95th percentile of the NIFTY 100 on that specific trading day.
          </p>
          <div className="bg-white/50 rounded-lg p-3 text-[10px] font-mono text-gray-600 border border-white/80 shadow-sm backdrop-blur-md">
            df['RSI_Rank'] = df.groupby('Date')['RSI'].rank(pct=True)
          </div>
        </div>

        {/* Step 4 */}
        <div className="kpi-card space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600">
              <FileWarning className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">4. The Anti-Leakage Protocol</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            In time-series machine learning, lookahead bias is fatal. To guarantee absolute zero leakage, a strict shift protocol is enforced across the entire panel:
          </p>
          <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
            <li><strong>Feature Lagging (T-1):</strong> All engineered columns are shifted forward by 1 row grouped by Ticker. A prediction made today strictly relies on data materialized at yesterday's close.</li>
            <li><strong>Forward Targets (T+5):</strong> The target variable `Fwd_Ret_5D` calculates the Open-to-Close return over the subsequent 5 days, completely bypassing un-tradable overnight gaps.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
