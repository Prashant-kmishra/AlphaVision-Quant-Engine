import json
import base64
import os

notebook_path = "Nifty-100-Alpha.ipynb"
output_dir = "extracted_charts"

os.makedirs(output_dir, exist_ok=True)

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

image_count = 0
for cell_idx, cell in enumerate(nb.get('cells', [])):
    if cell.get('cell_type') == 'code':
        for output in cell.get('outputs', []):
            if 'data' in output and 'image/png' in output['data']:
                img_data = output['data']['image/png']
                img_bytes = base64.b64decode(img_data)
                
                # find the title or something from the source code of the cell
                source_code = "".join(cell.get('source', [])).lower()
                
                filename = f"{output_dir}/chart_cell_{cell_idx}.png"
                with open(filename, 'wb') as img_file:
                    img_file.write(img_bytes)
                image_count += 1

print(f"Extracted {image_count} images to {output_dir}/")
