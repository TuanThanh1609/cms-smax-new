import fs from 'node:fs';
import path from 'node:path';

const snapshotRoot = path.resolve(process.argv[2] || 'tmp/supabase-mirror/source-public-data');
const targetRef = 'nhmxdvvorcivvhoubjsa';
const endpoint = process.env.MIRROR_IMPORT_ENDPOINT || `https://${targetRef}.supabase.co/functions/v1/mirror-public-data-import`;
const token = process.env.MIRROR_IMPORT_TOKEN || '';
const batchSize = Number(process.env.MIRROR_IMPORT_BATCH_SIZE || 500);

if (!token) throw new Error('MIRROR_IMPORT_TOKEN is required.');
if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 500) throw new Error('MIRROR_IMPORT_BATCH_SIZE must be between 1 and 500.');

const manifest = JSON.parse(fs.readFileSync(path.join(snapshotRoot, 'manifest.json'), 'utf8'));
if (manifest.source_project_ref !== 'byxzjcypifhhgzyrzbfv' || !manifest.complete) {
  throw new Error('The source public-data snapshot is missing or incomplete.');
}

for (const item of manifest.tables) {
  const rows = JSON.parse(fs.readFileSync(path.join(snapshotRoot, `${item.table}.json`), 'utf8'));
  let imported = 0;
  for (let offset = 0; offset < rows.length; offset += batchSize) {
    const chunk = rows.slice(offset, offset + batchSize);
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-mirror-token': token,
          },
          body: JSON.stringify({ table: item.table, rows: chunk }),
        });
        if (!response.ok) throw new Error(`${response.status} ${(await response.text()).slice(0, 500)}`);
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
        if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
    if (lastError) throw new Error(`${item.table} import failed at offset ${offset}: ${lastError.message}`);
    imported += chunk.length;
  }
  console.log(`${item.table}: ${imported}/${rows.length}`);
}
