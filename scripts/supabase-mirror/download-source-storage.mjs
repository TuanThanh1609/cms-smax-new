import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const envPath = process.argv[2] || '.env.local';
const outputRoot = path.resolve(process.argv[3] || 'tmp/supabase-mirror/source-storage');
const expectedRef = 'byxzjcypifhhgzyrzbfv';

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing ${filePath}`);
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match || line.trimStart().startsWith('#')) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}

function encodeObjectPath(value) {
  return value.split('/').map(encodeURIComponent).join('/');
}

async function listFiles(baseUrl, key, bucket, prefix = '') {
  const files = [];
  let offset = 0;
  while (true) {
    const response = await fetch(`${baseUrl}/storage/v1/object/list/${encodeURIComponent(bucket)}`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ prefix, limit: 1000, offset, sortBy: { column: 'name', order: 'asc' } }),
    });
    if (!response.ok) throw new Error(`List ${bucket}/${prefix} failed: ${response.status} ${(await response.text()).slice(0, 300)}`);
    const items = await response.json();
    for (const item of items) {
      const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
      if (!item.id && !item.metadata) files.push(...await listFiles(baseUrl, key, bucket, fullPath));
      else files.push({ ...item, fullPath });
    }
    if (items.length < 1000) break;
    offset += items.length;
  }
  return files;
}

async function mapLimit(items, limit, worker) {
  let index = 0;
  async function run() {
    while (true) {
      const current = index++;
      if (current >= items.length) return;
      await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length || 1) }, run));
}

loadEnv(envPath);
const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const key = process.env.SUPABASE_ANON_KEY || '';
const bucket = process.env.SOURCE_STORAGE_BUCKET || 'site_assets';
if (!baseUrl.includes(expectedRef)) throw new Error(`SUPABASE_URL must point to source ${expectedRef}`);
if (!key) throw new Error(`SUPABASE_ANON_KEY is missing from ${envPath}`);

const bucketRoot = path.resolve(outputRoot, bucket);
fs.mkdirSync(bucketRoot, { recursive: true });
const files = await listFiles(baseUrl, key, bucket);
console.log(`Found ${files.length} source objects in ${bucket}.`);

const manifest = [];
await mapLimit(files, 6, async (file, index) => {
  const relative = file.fullPath.replaceAll('\\', '/');
  if (relative.split('/').some((part) => part === '..' || part === '')) throw new Error(`Unsafe object path: ${relative}`);
  const destination = path.resolve(bucketRoot, ...relative.split('/'));
  if (!destination.startsWith(`${bucketRoot}${path.sep}`)) throw new Error(`Object escaped output root: ${relative}`);

  const response = await fetch(`${baseUrl}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeObjectPath(relative)}`);
  if (!response.ok) throw new Error(`Download ${relative} failed: ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, data);
  manifest.push({
    path: relative,
    size: data.length,
    sha256: crypto.createHash('sha256').update(data).digest('hex'),
    mimetype: file.metadata?.mimetype || response.headers.get('content-type'),
    cacheControl: file.metadata?.cacheControl || response.headers.get('cache-control'),
  });
  if ((index + 1) % 25 === 0 || index + 1 === files.length) console.log(`  ${index + 1}/${files.length}`);
});

manifest.sort((a, b) => a.path.localeCompare(b.path));
const manifestData = {
  source_project_ref: expectedRef,
  bucket,
  public: true,
  downloaded_at: new Date().toISOString(),
  object_count: manifest.length,
  total_bytes: manifest.reduce((sum, item) => sum + item.size, 0),
  objects: manifest,
};
fs.writeFileSync(path.join(outputRoot, 'manifest.json'), JSON.stringify(manifestData, null, 2));
console.log(`Snapshot complete: ${manifestData.object_count} objects, ${manifestData.total_bytes} bytes.`);
