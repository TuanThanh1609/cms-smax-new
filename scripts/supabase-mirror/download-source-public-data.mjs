import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const envPath = process.argv[2] || '.env.local';
const outputRoot = path.resolve(process.argv[3] || 'tmp/supabase-mirror/source-public-data');
const expectedRef = 'byxzjcypifhhgzyrzbfv';
const minimumExpectedCounts = {
  channel_platform_fees: 111,
  facebook_users: 0,
  game_scores: 0,
  kpi_targets: 111,
  monthly_expenses: 0,
  player_sessions: 0,
  referrals: 0,
  site_content: 3418,
  smax_tracking_events: 21940,
};

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

loadEnv(envPath);
const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const key = process.env.SUPABASE_ANON_KEY || '';
if (!baseUrl.includes(expectedRef)) throw new Error(`SUPABASE_URL must point to source ${expectedRef}`);
if (!key) throw new Error(`SUPABASE_ANON_KEY is missing from ${envPath}`);

const headers = { apikey: key, Authorization: `Bearer ${key}`, Prefer: 'count=exact' };
fs.mkdirSync(outputRoot, { recursive: true });

const openApi = await fetch(`${baseUrl}/rest/v1/`, { headers: { ...headers, Accept: 'application/openapi+json' } });
if (openApi.ok) fs.writeFileSync(path.join(outputRoot, 'openapi.json'), await openApi.text());

const tables = [];
for (const [table, minimumExpectedCount] of Object.entries(minimumExpectedCounts)) {
  const rows = [];
  let offset = 0;
  let reportedCount = null;
  while (true) {
    const response = await fetch(`${baseUrl}/rest/v1/${encodeURIComponent(table)}?select=*`, {
      headers: { ...headers, 'Range-Unit': 'items', Range: `${offset}-${offset + 999}` },
    });
    if (!response.ok) throw new Error(`${table} export failed: ${response.status} ${(await response.text()).slice(0, 300)}`);
    const range = response.headers.get('content-range');
    if (range?.includes('/')) reportedCount = Number(range.split('/')[1]);
    const batch = await response.json();
    rows.push(...batch);
    if (batch.length < 1000) break;
    offset += batch.length;
  }
  const body = `${JSON.stringify(rows, null, 2)}\n`;
  fs.writeFileSync(path.join(outputRoot, `${table}.json`), body);
  const complete = rows.length >= minimumExpectedCount && (reportedCount === null || rows.length === reportedCount);
  tables.push({
    table,
    minimum_expected_count: minimumExpectedCount,
    exported_count: rows.length,
    reported_count: reportedCount,
    complete,
    sha256: crypto.createHash('sha256').update(body).digest('hex'),
  });
  console.log(`${table}: ${rows.length} rows (minimum ${minimumExpectedCount})${complete ? '' : ' (RLS/incomplete)'}`);
}

const manifest = {
  source_project_ref: expectedRef,
  exported_at: new Date().toISOString(),
  complete: tables.every((table) => table.complete),
  tables,
};
fs.writeFileSync(path.join(outputRoot, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`Public snapshot complete: ${manifest.complete ? 'complete' : 'partial; privileged dump still required'}.`);
