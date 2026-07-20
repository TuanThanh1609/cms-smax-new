const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { loadCatalog, collectCatalogRows } = require('./automation-map-cms');

const rootDir = path.resolve(__dirname, '..');

function loadEnv() {
  ['.env', '.env.local', '.env.production', '.env.production.local'].forEach((file) => {
    const envPath = path.join(rootDir, file);
    if (!fs.existsSync(envPath)) return;
    fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index < 1) return;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
      if (value) process.env[key] = value;
    });
  });
}

function collectRows() {
  const html = fs.readFileSync(path.join(rootDir, 'all-in-one.html'), 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const rows = [];

  $('[data-cms]').each((index, element) => {
    const contentKey = $(element).attr('data-cms');
    const contentValue = contentKey.endsWith('-sections')
      ? $(element).html()
      : $(element).html().trim();
    rows.push({ page_name: 'all-in-one', content_key: contentKey, content_value: contentValue });
  });

  $('[data-cms-img]').each((index, element) => {
    rows.push({
      page_name: 'all-in-one',
      content_key: $(element).attr('data-cms-img'),
      content_value: $(element).attr('src') || ''
    });
  });

  rows.push(
    { page_name: 'global', content_key: 'header-prod-name-automation-map', content_value: 'Automation Map' },
    { page_name: 'global', content_key: 'header-prod-desc-automation-map', content_value: 'Khám phá toàn bộ bản đồ tính năng và hành trình tự động hóa.' }
  );

  rows.push(...collectCatalogRows(loadCatalog(rootDir)));

  return Array.from(new Map(rows.map((row) => [row.content_key, row])).values());
}

async function main() {
  loadEnv();
  const supabaseUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !key) throw new Error('Thiếu SUPABASE_URL hoặc Supabase key.');

  const rows = collectRows();
  const existingResponse = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?select=content_key&page_name=eq.all-in-one`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  if (!existingResponse.ok) throw new Error(`Supabase HTTP ${existingResponse.status}: ${await existingResponse.text()}`);
  const existingKeys = new Set((await existingResponse.json()).map((row) => row.content_key));
  const globalRows = rows.filter((row) => row.page_name === 'global');
  const globalKeys = globalRows.map((row) => row.content_key).join(',');
  const globalResponse = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?select=content_key&page_name=eq.global&content_key=in.(${encodeURIComponent(globalKeys)})`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  if (!globalResponse.ok) throw new Error(`Supabase HTTP ${globalResponse.status}: ${await globalResponse.text()}`);
  (await globalResponse.json()).forEach((row) => existingKeys.add(row.content_key));

  const missingRows = rows.filter((row) => !existingKeys.has(row.content_key));

  if (missingRows.length === 0) {
    console.log(`CMS ready: all ${rows.length} Automation Map fields already exist.`);
    return;
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?on_conflict=content_key`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(missingRows)
  });

  if (!response.ok) throw new Error(`Supabase HTTP ${response.status}: ${await response.text()}`);
  console.log(`CMS synced: ${missingRows.length} new fields; ${rows.length} total Automation Map fields are configured.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
