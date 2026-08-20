import json
import sys

def notebook_to_markdown(ipynb_path, md_path):
    with open(ipynb_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)
        
    with open(md_path, 'w', encoding='utf-8') as f:
        for i, cell in enumerate(nb.get('cells', [])):
            if cell['cell_type'] == 'markdown':
                f.write(''.join(cell.get('source', [])) + '\n\n')
            elif cell['cell_type'] == 'code':
                source = ''.join(cell.get('source', []))
                f.write(f'```python\n# Cell {i}\n{source}\n```\n\n')
                # Extracting just text outputs, avoiding large base64 images
                outputs = cell.get('outputs', [])
                if outputs:
                    f.write("### Outputs:\n")
                    for out in outputs:
                        if out['output_type'] == 'stream':
                            f.write(''.join(out.get('text', [])) + '\n')
                        elif out['output_type'] == 'execute_result' or out['output_type'] == 'display_data':
                            data = out.get('data', {})
                            if 'text/plain' in data:
                                f.write(''.join(data['text/plain']) + '\n')
                    f.write('\n')

if __name__ == "__main__":
    notebook_to_markdown(sys.argv[1], sys.argv[2])
