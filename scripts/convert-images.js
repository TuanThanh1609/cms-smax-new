const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const jobs = [
  {
    input: path.join(root, 'asset smax', 'smax-all-in-one', 'hero-smax-all-in-one-transparent.png'),
    output: path.join(root, 'asset smax', 'smax-all-in-one', 'hero-smax-all-in-one.webp'),
  },
  {
    input: path.join(root, 'asset smax', 'smax-all-in-one', 'feature-listing-visual-transparent.png'),
    output: path.join(root, 'asset smax', 'smax-all-in-one', 'feature-listing-visual.webp'),
  },
];

async function convertImage({ input, output }) {
  if (!fs.existsSync(input)) {
    throw new Error(`Missing image source: ${path.relative(root, input)}`);
  }

  const inputStat = fs.statSync(input);
  if (fs.existsSync(output) && fs.statSync(output).mtimeMs >= inputStat.mtimeMs) {
    console.log(`[images] Up to date: ${path.relative(root, output)}`);
    return;
  }

  const tempOutput = `${output}.tmp`;
  await sharp(input)
    .webp({ quality: 90, alphaQuality: 100, effort: 5 })
    .toFile(tempOutput);

  if (fs.existsSync(output)) fs.rmSync(output);
  fs.renameSync(tempOutput, output);

  const metadata = await sharp(output).metadata();
  if (metadata.format !== 'webp' || !metadata.hasAlpha) {
    throw new Error(`WEBP output did not preserve transparency: ${path.relative(root, output)}`);
  }

  console.log(`[images] Converted: ${path.relative(root, output)}`);
}

Promise.all(jobs.map(convertImage)).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
