const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const solutionPages = [
  'ecommerce.html',
  'education.html',
  'realestate.html',
  'service.html',
  'fb.html',
  'travel.html',
  'health.html',
  'beauty.html',
  'agency.html'
];

const localPngPattern = /asset smax\/[^"'?#]+\.png/gi;

async function optimizeImage(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const outputRelativePath = relativePath.replace(/\.png$/i, '.webp');
  const outputPath = path.join(rootDir, outputRelativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Không tìm thấy ảnh nguồn: ${relativePath}`);
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
  const imageToPages = new Map();

  for (const page of solutionPages) {
    const pagePath = path.join(rootDir, page);
    const html = fs.readFileSync(pagePath, 'utf8');
    const matches = html.match(localPngPattern) || [];

    for (const imagePath of matches) {
      const normalizedPath = imagePath.replace(/\\/g, '/');
      if (!imageToPages.has(normalizedPath)) imageToPages.set(normalizedPath, new Set());
      imageToPages.get(normalizedPath).add(page);
    }
  }

  let sourceBytes = 0;
  let outputBytes = 0;
  const replacements = new Map();

  for (const imagePath of imageToPages.keys()) {
    const result = await optimizeImage(imagePath);
    sourceBytes += result.sourceSize;
    outputBytes += result.outputSize;
    replacements.set(imagePath, result.outputRelativePath);
  }

  for (const page of solutionPages) {
    const pagePath = path.join(rootDir, page);
    let html = fs.readFileSync(pagePath, 'utf8');

    for (const [pngPath, webpPath] of replacements) {
      html = html.split(pngPath).join(webpPath);
    }

    html = html.replace(
      /(<link\b[^>]*href=["'][^"']+\.webp["'][^>]*type=["'])image\/png(["'][^>]*>)/gi,
      '$1image/webp$2'
    );

    fs.writeFileSync(pagePath, html, 'utf8');
  }

  const savedPercent = sourceBytes
    ? Math.round((1 - outputBytes / sourceBytes) * 100)
    : 0;

  console.log(
    `Đã tối ưu ${replacements.size} ảnh cho ${solutionPages.length} trang: ` +
    `${(sourceBytes / 1024 / 1024).toFixed(1)} MB xuống ` +
    `${(outputBytes / 1024 / 1024).toFixed(1)} MB, giảm ${savedPercent}%.`
  );
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
