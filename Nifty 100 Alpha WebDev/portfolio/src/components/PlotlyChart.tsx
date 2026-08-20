"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full min-h-[400px] flex items-center justify-center text-muted font-mono bg-navy-900 border border-navy-700 rounded-xl">Loading interactive chart...</div>
});

export default function PlotlyChart({ data, layout, useResizeHandler = true }: any) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Plot
        data={data}
        layout={{
          ...layout,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { family: 'var(--font-jetbrains-mono)', color: '#6B7280' },
          margin: { t: 20, r: 20, b: 40, l: 40 },
          hovermode: 'x unified',
          autosize: true
        }}
        useResizeHandler={useResizeHandler}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: true, responsive: true, displaylogo: false }}
      />
    </div>
  );
}
