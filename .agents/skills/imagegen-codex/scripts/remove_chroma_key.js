#!/usr/bin/env node
/**
 * Remove a solid chroma-key background from an image using sharp.
 * Supports imagegen skill transparent workflow in Node.js environment.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: '',
    out: '',
    key: '#00ff00',
    tolerance: 100
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-i' || args[i] === '--input') {
      options.input = args[++i];
    } else if (args[i] === '-o' || args[i] === '--out') {
      options.out = args[++i];
    } else if (args[i] === '-k' || args[i] === '--key') {
      options.key = args[++i];
    } else if (args[i] === '-t' || args[i] === '--tolerance') {
      options.tolerance = parseInt(args[++i], 10);
    }
  }

  return options;
}

async function main() {
  const options = parseArgs();

  if (!options.input || !options.out) {
    console.error('Usage: node remove_chroma_key.js -i <input_image> -o <output_image> [-k <key_color_hex>] [-t <tolerance>]');
    process.exit(1);
  }

  const inputPath = path.resolve(options.input);
  const outputPath = path.resolve(options.out);

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file does not exist: ${inputPath}`);
    process.exit(1);
  }

  // Ensure output directory exists
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Parse key color
  const hex = options.key.replace('#', '');
  if (hex.length !== 6) {
    console.error('Error: Key color must be a 6-character hex string (e.g. #00ff00)');
    process.exit(1);
  }

  const keyR = parseInt(hex.substring(0, 2), 16);
  const keyG = parseInt(hex.substring(2, 4), 16);
  const keyB = parseInt(hex.substring(4, 6), 16);
  const tolerance = options.tolerance;

  console.log(`Processing image: ${inputPath}`);
  console.log(`Removing key color R:${keyR} G:${keyG} B:${keyB} with tolerance: ${tolerance}...`);

  try {
    const image = sharp(inputPath);
    
    // Get raw RGBA pixel data
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process pixels and set alpha to 0 for key color matches
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate Euclidean distance in RGB space
      const dist = Math.sqrt((r - keyR) ** 2 + (g - keyG) ** 2 + (b - keyB) ** 2);

      if (dist < tolerance) {
        data[i + 3] = 0; // Fully transparent
      } else if (dist < tolerance + 30) {
        // Soft edge anti-aliased transition
        const factor = (dist - tolerance) / 30.0;
        data[i + 3] = Math.floor(255 * factor);
      }
    }

    // Save processed pixel buffer to destination files (support WebP auto-conversion)
    const isWebpOutput = outputPath.endsWith('.webp');
    const webpPath = isWebpOutput ? outputPath : outputPath.replace(/\.[^/.]+$/, "") + ".webp";

    const sharpInstance = sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    });

    if (isWebpOutput) {
      await sharpInstance.webp({ quality: 85 }).toFile(outputPath);
      console.log(`Success! Transparent WebP image saved to: ${outputPath}`);
    } else {
      // Save PNG first
      await sharpInstance.clone().png().toFile(outputPath);
      console.log(`Success! Transparent PNG image saved to: ${outputPath}`);

      // Auto-convert to WebP
      await sharpInstance.webp({ quality: 85 }).toFile(webpPath);
      console.log(`Auto-converted! Transparent WebP version saved to: ${webpPath}`);
    }
  } catch (error) {
    console.error('Error processing image:', error);
    process.exit(1);
  }
}

main();
