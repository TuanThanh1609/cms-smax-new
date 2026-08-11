import fs from 'node:fs';
import path from 'node:path';

const envPath = process.argv[2] || '.env.migration.local';
const EXPECTED_SOURCE = 'byxzjcypifhhgzyrzbfv';
const EXPECTED_TARGET = 'nhmxdvvorcivvhoubjsa';

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing ${filePath}`);
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match || line.trimStart().startsWith('#')) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[match[1]] = value;
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value || value === 'REPLACE_ME') throw new Error(`Missing ${name} in ${envPath}`);
  return value;
}

function encodeObjectPath(value) {
  return value.split('/').map(encodeURIComponent).join('/');
}

function client(baseUrl, key) {
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  return {
    async request(route, options = {}) {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}${route}`, {
        ...options,
        headers: { ...headers, ...(options.headers || {}) },
      });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`${options.method || 'GET'} ${route} failed: ${response.status} ${detail.slice(0, 500)}`);
      }
      return response;
    },
  };
}

async function listBuckets(api) {
  return (await (await api.request('/storage/v1/bucket')).json()) || [];
}

async function ensureBucket(api, bucket) {
  const existing = await listBuckets(api);
  if (existing.some((item) => item.id === bucket.id)) return;
  await api.request('/storage/v1/bucket', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      id: bucket.id,
      name: bucket.name,
      public: bucket.public,
      file_size_limit: bucket.file_size_limit,
      allowed_mime_types: bucket.allowed_mime_types,
    }),
  });
}

async function listFiles(api, bucketId, prefix = '') {
  const files = [];
  let offset = 0;
  while (true) {
    const response = await api.request(`/storage/v1/object/list/${encodeURIComponent(bucketId)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prefix, limit: 1000, offset, sortBy: { column: 'name', order: 'asc' } }),
    });
    const items = await response.json();
    for (const item of items) {
      const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
      if (!item.id && !item.metadata) files.push(...await listFiles(api, bucketId, fullPath));
      else files.push({ ...item, fullPath });
    }
    if (items.length < 1000) break;
    offset += items.length;
  }
  return files;
}

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

async function copyFile(sourceApi, targetApi, bucket, file) {
  const encodedPath = encodeObjectPath(file.fullPath);
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const download = await sourceApi.request(`/storage/v1/object/authenticated/${encodeURIComponent(bucket.id)}/${encodedPath}`);
      const data = Buffer.from(await download.arrayBuffer());
      await targetApi.request(`/storage/v1/object/${encodeURIComponent(bucket.id)}/${encodedPath}`, {
        method: 'POST',
        headers: {
          'content-type': file.metadata?.mimetype || download.headers.get('content-type') || 'application/octet-stream',
          'cache-control': file.metadata?.cacheControl || download.headers.get('cache-control') || '3600',
          'x-upsert': 'true',
        },
        body: data,
      });
      return { ok: true, bytes: data.length };
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  return { ok: false, path: file.fullPath, error: lastError?.message || 'unknown error' };
}

loadEnv(envPath);
const sourceRef = requireEnv('SOURCE_PROJECT_REF');
const targetRef = requireEnv('TARGET_PROJECT_REF');
if (sourceRef !== EXPECTED_SOURCE || targetRef !== EXPECTED_TARGET) throw new Error('Unexpected source or target project ref.');

const sourceUrl = requireEnv('SOURCE_PROJECT_URL');
const targetUrl = requireEnv('TARGET_PROJECT_URL');
if (!sourceUrl.includes(EXPECTED_SOURCE) || !targetUrl.includes(EXPECTED_TARGET)) throw new Error('Project URL/ref mismatch.');

const sourceKey = requireEnv('SOURCE_SERVICE_ROLE_KEY');
const targetKey = requireEnv('TARGET_SERVICE_ROLE_KEY');
if (sourceKey.startsWith('sb_publishable_') || targetKey.startsWith('sb_publishable_')) {
  throw new Error('Storage copy requires secret/service-role keys, not publishable keys.');
}

const sourceApi = client(sourceUrl, sourceKey);
const targetApi = client(targetUrl, targetKey);
const buckets = await listBuckets(sourceApi);
let totalFiles = 0;
let totalBytes = 0;
const failures = [];

for (const bucket of buckets) {
  await ensureBucket(targetApi, bucket);
  const files = await listFiles(sourceApi, bucket.id);
  console.log(`Copying ${files.length} objects from bucket ${bucket.id}...`);
  const results = await mapLimit(files, 4, async (file, index) => {
    const result = await copyFile(sourceApi, targetApi, bucket, file);
    if ((index + 1) % 25 === 0 || index + 1 === files.length) console.log(`  ${index + 1}/${files.length}`);
    return result;
  });
  for (const result of results) {
    if (result.ok) { totalFiles += 1; totalBytes += result.bytes; }
    else failures.push(result);
  }

  const targetFiles = await listFiles(targetApi, bucket.id);
  if (targetFiles.length !== files.length) {
    failures.push({ path: `${bucket.id}/`, error: `count mismatch: source=${files.length}, target=${targetFiles.length}` });
  }
}

console.log(`Storage result: ${totalFiles} objects, ${totalBytes} bytes, ${failures.length} failures.`);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
