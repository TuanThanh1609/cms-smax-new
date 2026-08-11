import fs from 'node:fs';
import path from 'node:path';

const snapshotRoot = path.resolve(process.argv[2] || 'tmp/supabase-mirror/source-storage');
const uploadUrl = process.env.MIRROR_UPLOAD_URL || '';
const token = process.env.MIRROR_UPLOAD_TOKEN || '';
const expectedTargetRef = 'nhmxdvvorcivvhoubjsa';

if (!uploadUrl.includes(expectedTargetRef)) throw new Error('MIRROR_UPLOAD_URL does not point to the expected target project.');
if (token.length < 48) throw new Error('MIRROR_UPLOAD_TOKEN is missing or too short.');

const manifestPath = path.join(snapshotRoot, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
if (manifest.source_project_ref !== 'byxzjcypifhhgzyrzbfv') throw new Error('Unexpected source snapshot.');

async function mapLimit(items, limit, worker) {
  let index = 0;
  const results = new Array(items.length);
  async function run() {
    while (true) {
      const current = index++;
      if (current >= items.length) return;
      results[current] = await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length || 1) }, run));
  return results;
}

async function upload(item) {
  const filePath = path.resolve(snapshotRoot, manifest.bucket, ...item.path.split('/'));
  const bucketRoot = path.resolve(snapshotRoot, manifest.bucket);
  if (!filePath.startsWith(`${bucketRoot}${path.sep}`)) throw new Error(`Unsafe snapshot path: ${item.path}`);
  const data = fs.readFileSync(filePath);
  const url = new URL(uploadUrl);
  url.searchParams.set('bucket', manifest.bucket);
  url.searchParams.set('path', item.path);

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-mirror-token': token,
          'content-type': item.mimetype || 'application/octet-stream',
          'x-cache-control': item.cacheControl || '3600',
          'x-content-sha256': item.sha256,
        },
        body: data,
      });
      if (!response.ok) throw new Error(`${response.status} ${(await response.text()).slice(0, 400)}`);
      return { ok: true, bytes: data.length };
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  return { ok: false, path: item.path, error: lastError?.message || 'unknown error' };
}

const results = await mapLimit(manifest.objects, 4, async (item, index) => {
  const result = await upload(item);
  if ((index + 1) % 25 === 0 || index + 1 === manifest.objects.length) console.log(`  ${index + 1}/${manifest.objects.length}`);
  return result;
});

const failures = results.filter((item) => !item.ok);
const copiedBytes = results.filter((item) => item.ok).reduce((sum, item) => sum + item.bytes, 0);
console.log(`Upload result: ${results.length - failures.length}/${results.length} objects, ${copiedBytes} bytes.`);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
