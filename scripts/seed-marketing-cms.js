const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.resolve(__dirname, '..');
const pageName = 'marketing';
const htmlPath = path.join(rootDir, `${pageName}.html`);

function loadEnv() {
  ['.env', '.env.local', '.env.production', '.env.production.local'].forEach((file) => {
    const envPath = path.join(rootDir, file);
    if (!fs.existsSync(envPath)) return;
    fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const separator = trimmed.indexOf('=');
      if (separator < 1) return;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
      if (value) process.env[key] = value;
    });
  });
}

function collectRows() {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const rows = [];

  $('main [data-cms]').each((index, element) => {
    rows.push({
      page_name: pageName,
      content_key: $(element).attr('data-cms'),
      content_value: $(element).html().trim()
    });
  });

  $('main [data-cms-img]').each((index, element) => {
    rows.push({
      page_name: pageName,
      content_key: $(element).attr('data-cms-img'),
      content_value: $(element).attr('src') || ''
    });
  });

  return Array.from(new Map(rows.map((row) => [row.content_key, row])).values());
}

async function syncRows(rows) {
  loadEnv();
  const supabaseUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !key) throw new Error('Thiếu SUPABASE_URL hoặc Supabase key.');

  const baseUrl = supabaseUrl.replace(/\/$/, '');
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json'
  };
  const existingResponse = await fetch(
    `${baseUrl}/rest/v1/site_content?select=content_key&page_name=eq.${encodeURIComponent(pageName)}&limit=1000`,
    { headers }
  );
  if (!existingResponse.ok) {
    throw new Error(`Không thể đọc khóa CMS hiện tại: HTTP ${existingResponse.status}`);
  }

  const existingRows = await existingResponse.json();
  const existingKeys = new Set(existingRows.map((row) => row.content_key));
  const missingRows = rows.filter((row) => !existingKeys.has(row.content_key));

  if (missingRows.length > 0) {
    const response = await fetch(`${baseUrl}/rest/v1/site_content?on_conflict=content_key`, {
      method: 'POST',
      headers: {
        ...headers,
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(missingRows)
    });
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}: ${await response.text()}`);
  }

  const verifyResponse = await fetch(
    `${baseUrl}/rest/v1/site_content?select=content_key&page_name=eq.${encodeURIComponent(pageName)}&limit=1000`,
    { headers }
  );
  if (!verifyResponse.ok) throw new Error(`Không thể xác minh CMS: HTTP ${verifyResponse.status}`);

  const verifiedRows = await verifyResponse.json();
  const verifiedKeys = new Set(verifiedRows.map((row) => row.content_key));
  const absentKeys = missingRows.map((row) => row.content_key).filter((keyName) => !verifiedKeys.has(keyName));
  if (absentKeys.length > 0) throw new Error(`CMS chưa lưu đủ các trường mới: ${absentKeys.join(', ')}`);

  console.log(`CMS fields discovered: ${rows.length}`);
  console.log(`CMS fields inserted: ${missingRows.length}`);
  console.log(`CMS fields verified for ${pageName}: ${verifiedRows.length}`);
}

syncRows(collectRows()).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
