#!/usr/bin/env python3
"""Remove a solid chroma-key background from an image.

This helper supports the imagegen skill's transparent workflow:
generate an image on a flat key color, then convert that key color to alpha.
"""

import argparse
from pathlib import Path
import sys

def main():
    parser = argparse.ArgumentParser(description="Remove chroma-key background from an image.")
    parser.add_argument("-i", "--input", required=True, help="Path to input image")
    parser.add_argument("-o", "--out", required=True, help="Path to output image (PNG or WebP)")
    parser.add_argument("-k", "--key", default="#00ff00", help="Chroma key color in hex (default: #00ff00)")
    parser.add_argument("-t", "--tolerance", type=int, default=100, help="Color distance tolerance (0-255)")
    parser.add_argument("-f", "--force", action="store_true", help="Force overwrite output if exists")
    
    args = parser.parse_args()
    
    try:
        from PIL import Image
    except ImportError:
        print("Error: Pillow is required. Install it using 'pip install pillow'", file=sys.stderr)
        sys.exit(1)
        
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: Input file {input_path} does not exist.", file=sys.stderr)
        sys.exit(1)
        
    output_path = Path(args.out)
    if output_path.exists() and not args.force:
        print(f"Error: Output file {output_path} already exists. Use --force to overwrite.", file=sys.stderr)
        sys.exit(1)
        
    # Parse key color
    hex_color = args.key.lstrip("#")
    if len(hex_color) != 6:
        print("Error: Key color must be a 6-character hex string (e.g. #00ff00)", file=sys.stderr)
        sys.exit(1)
    key_r = int(hex_color[0:2], 16)
    key_g = int(hex_color[2:4], 16)
    key_b = int(hex_color[4:6], 16)
    
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    tolerance = args.tolerance
    
    for item in datas:
        r, g, b, a = item
        # Calculate Euclidean distance in RGB space
        dist = ((r - key_r) ** 2 + (g - key_g) ** 2 + (b - key_b) ** 2) ** 0.5
        if dist < tolerance:
            # Fully transparent
            new_data.append((r, g, b, 0))
        elif dist < tolerance + 30:
            # Soft edge transition
            factor = (dist - tolerance) / 30.0
            new_alpha = int(255 * factor)
            new_data.append((r, g, b, new_alpha))
        else:
            new_data.append((r, g, b, a))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Chroma key background removed. Saved output to {output_path}")

if __name__ == "__main__":
    main()
