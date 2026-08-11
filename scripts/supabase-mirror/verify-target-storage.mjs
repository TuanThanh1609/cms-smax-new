import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve(
  process.argv[2] || 'tmp/supabase-mirror/source-storage/manifest.json',
);
const targetRef = process.argv[3] || 'nhmxdvvorcivvhoubjsa';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (manifest.source_project_ref !== 'byxzjcypifhhgzyrzbfv') {
  throw new Error(`Unexpected source project: ${manifest.source_project_ref}`);
}

let cursor = 0;
let verified = 0;
let verifiedBytes = 0;
const failures = [];

async function worker() {
  while (true) {
    const index = cursor;
    cursor += 1;
    if (index >= manifest.objects.length) return;

    const object = manifest.objects[index];
    const encodedPath = object.path.split('/').map(encodeURIComponent).join('/');
    const url = `https://${targetRef}.supabase.co/storage/v1/object/public/${encodeURIComponent(manifest.bucket)}/${encodedPath}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = Buffer.from(await response.arrayBuffer());
      const digest = crypto.createHash('sha256').update(data).digest('hex');
      if (data.length !== object.size || digest !== object.sha256) {
        throw new Error(`hash/size mismatch: ${data.length}/${digest}`);
      }
      verified += 1;
      verifiedBytes += data.length;
      if (verified % 50 === 0 || verified === manifest.objects.length) {
        console.log(`${verified}/${manifest.objects.length}`);
      }
    } catch (error) {
      failures.push({ path: object.path, error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));

if (failures.length) {
  console.error(JSON.stringify({ verified, verifiedBytes, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ verified, verifiedBytes, failures: 0 }));
