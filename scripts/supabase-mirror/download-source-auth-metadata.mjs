import fs from 'node:fs';
import path from 'node:path';

const envPath = process.argv[2] || '.env.local';
const outputRoot = path.resolve(process.argv[3] || 'tmp/supabase-mirror/source-auth-metadata');
const expectedRef = 'byxzjcypifhhgzyrzbfv';

for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
  if (!match || line.trimStart().startsWith('#')) continue;
  let value = match[2].trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
  process.env[match[1]] = value;
}

const baseUrl = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const key = process.env.SUPABASE_ANON_KEY || '';
if (!baseUrl.includes(expectedRef) || !key) throw new Error('Source URL or server key is missing.');

const headers = { apikey: key, Authorization: `Bearer ${key}` };
const users = [];
for (let page = 1; ; page += 1) {
  const response = await fetch(`${baseUrl}/auth/v1/admin/users?page=${page}&per_page=1000`, { headers });
  if (!response.ok) throw new Error(`Auth metadata export failed: ${response.status} ${(await response.text()).slice(0, 300)}`);
  const payload = await response.json();
  const batch = Array.isArray(payload) ? payload : payload.users || [];
  users.push(...batch);
  if (batch.length < 1000) break;
}

const settingsResponse = await fetch(`${baseUrl}/auth/v1/settings`, { headers: { apikey: key } });
const settings = settingsResponse.ok ? await settingsResponse.json() : null;
fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, 'users.json'), `${JSON.stringify(users, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, 'public-settings.json'), `${JSON.stringify(settings, null, 2)}\n`);
fs.writeFileSync(path.join(outputRoot, 'manifest.json'), `${JSON.stringify({
  source_project_ref: expectedRef,
  exported_at: new Date().toISOString(),
  user_count: users.length,
  includes_password_hashes: false,
  note: 'Admin Auth API metadata only. A privileged database dump is required to preserve password hashes.',
}, null, 2)}\n`);
console.log(`Auth metadata snapshot: ${users.length} user(s); password hashes require a database dump.`);
