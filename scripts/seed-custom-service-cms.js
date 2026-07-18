const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

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
  const html = fs.readFileSync(path.join(rootDir, 'custom_service.html'), 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const rows = [];

  $('[data-cms]').each((index, element) => {
    const contentKey = $(element).attr('data-cms');
    const contentValue = contentKey.endsWith('-sections') ? $(element).html() : $(element).html().trim();
    rows.push({ page_name: 'custom_service', content_key: contentKey, content_value: contentValue });
  });

  $('[data-cms-img]').each((index, element) => {
    rows.push({
      page_name: 'custom_service',
      content_key: $(element).attr('data-cms-img'),
      content_value: $(element).attr('src') || ''
    });
  });

  rows.push(
    { page_name: 'global', content_key: 'header-prod-name-9', content_value: 'Dịch vụ triển khai' },
    { page_name: 'global', content_key: 'header-prod-desc-9', content_value: 'Thiết kế AI Agent theo quy trình riêng.' }
  );

  return Array.from(new Map(rows.map((row) => [row.content_key, row])).values());
}

async function main() {
  loadEnv();
  const supabaseUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !key) throw new Error('Thiếu SUPABASE_URL hoặc Supabase key.');

  const rows = collectRows();
  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?on_conflict=content_key`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(rows)
  });

  if (!response.ok) throw new Error(`Supabase HTTP ${response.status}: ${await response.text()}`);
  console.log(`CMS synced: ${rows.length} content fields for custom_service.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
