const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const contentFiles = [
  'ecommerce.html',
  'education.html',
  'realestate.html',
  'service.html',
  'fb.html',
  'travel.html',
  'health.html',
  'beauty.html',
  'agency.html',
  'index.html',
  'all-in-one.html',
  'all-in-one-features.js',
  'templates.html',
  'templates.js',
  'partnership.html',
  'tich-hop.html',
  'script.js'
];

const quotedPngPattern = /["'](\/?[^"'?#]+\.png)(?:[?#][^"']*)?["']/gi;

function collectLocalPngPaths(content) {
  const matches = new Set();
  let match;

  while ((match = quotedPngPattern.exec(content)) !== null) {
    const rawPath = match[1].trim();
    if (/^(?:https?:|data:|\/\/)/i.test(rawPath)) continue;

    const relativePath = rawPath.replace(/^\/+/, '').replace(/\\/g, '/');
    if (fs.existsSync(path.join(rootDir, relativePath))) {
      matches.add(relativePath);
    }
  }

  return [...matches];
}

async function optimizeImage(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const outputRelativePath = relativePath.replace(/\.png$/i, '.webp');
  const outputPath = path.join(rootDir, outputRelativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source image: ${relativePath}`);
  }

  const sourceSize = fs.statSync(sourcePath).size;
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(sourcePath)
    .webp({ quality: 88, alphaQuality: 100, effort: 4 })
    .toFile(outputPath);

  return {
    sourceSize,
    outputSize: fs.statSync(outputPath).size,
    outputRelativePath
  };
}

async function main() {
  const imageToFiles = new Map();

  for (const file of contentFiles) {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    for (const imagePath of collectLocalPngPaths(content)) {
      const normalizedPath = imagePath.replace(/\\/g, '/');
      if (!imageToFiles.has(normalizedPath)) imageToFiles.set(normalizedPath, new Set());
      imageToFiles.get(normalizedPath).add(file);
    }
  }

  let sourceBytes = 0;
  let outputBytes = 0;
  const replacements = new Map();

  for (const imagePath of imageToFiles.keys()) {
    const result = await optimizeImage(imagePath);
    sourceBytes += result.sourceSize;
    outputBytes += result.outputSize;
    replacements.set(imagePath, result.outputRelativePath);
  }

  for (const file of contentFiles) {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    for (const [pngPath, webpPath] of replacements) {
      content = content.split(pngPath).join(webpPath);
    }

    content = content.replace(
      /(<link\b[^>]*href=["'][^"']+\.webp["'][^>]*type=["'])image\/png(["'][^>]*>)/gi,
      '$1image/webp$2'
    );

    fs.writeFileSync(filePath, content, 'utf8');
  }

  const savedPercent = sourceBytes
    ? Math.round((1 - outputBytes / sourceBytes) * 100)
    : 0;

  console.log(
    `Optimized ${replacements.size} images referenced by ${contentFiles.length} site files: ` +
    `${(sourceBytes / 1024 / 1024).toFixed(1)} MB to ` +
    `${(outputBytes / 1024 / 1024).toFixed(1)} MB, saving ${savedPercent}%.`
  );
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
