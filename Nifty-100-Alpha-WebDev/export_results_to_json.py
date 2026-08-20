import pandas as pd
import json
import os

# Create the results directory in the Next.js public folder
out_dir = "portfolio/public/data"
os.makedirs(out_dir, exist_ok=True)

print("Exporting Strategy 1.5 (Net 20bps) Equity Curve to JSON...")

# Assuming champion_df and master_panel are already in your notebook's memory
# If running standalone, you would load them here.
try:
    dates = champion_df.index.strftime('%Y-%m-%d').tolist()
    strat_curve = (champion_df['Equity_Curve'] * 100).tolist()
    
    # Get Nifty benchmark
    nifty_slice = master_panel[master_panel['Date'].isin(champion_df.index)][['Date', 'Nifty']].drop_duplicates()
    nifty_slice['Date'] = pd.to_datetime(nifty_slice['Date'])
    nifty_slice = nifty_slice.set_index('Date').sort_index()
    nifty_base_100 = ((nifty_slice['Nifty'] / nifty_slice['Nifty'].iloc[0]) * 100).tolist()
    
    export_data = {
        "dates": dates,
        "strategy": strat_curve,
        "benchmark": nifty_base_100
    }
    
    with open(f"{out_dir}/s1_5_net.json", "w") as f:
        json.dump(export_data, f)
        
    print(f"Success! Data exported to {out_dir}/s1_5_net.json")
    print("The Next.js frontend will now automatically read this real data instead of placeholders.")
except Exception as e:
    print(f"Error: {e}")
    print("Please run this cell at the very end of your Jupyter Notebook where 'champion_df' and 'master_panel' exist in memory.")
