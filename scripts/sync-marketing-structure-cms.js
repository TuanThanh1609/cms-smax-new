const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'marketing.html');
const pageName = 'marketing';
const contentKey = 'marketing-sections';

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

function readMarketingStructure() {
  const $ = cheerio.load(fs.readFileSync(htmlPath, 'utf8'), { decodeEntities: false });
  const main = $(`main[data-cms="${contentKey}"]`);
  const html = main.html()?.trim();
  if (!html || !html.includes('id="marketing-os"')) {
    throw new Error('Không tìm thấy cấu trúc Marketing OS trong marketing.html.');
  }
  return html;
}

async function syncStructure() {
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
  const contentValue = readMarketingStructure();
  const response = await fetch(`${baseUrl}/rest/v1/site_content?on_conflict=content_key`, {
    method: 'POST',
    headers: {
      ...headers,
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify([{ page_name: pageName, content_key: contentKey, content_value: contentValue }])
  });
  if (!response.ok) throw new Error(`Không thể đồng bộ cấu trúc Marketing: HTTP ${response.status}: ${await response.text()}`);

  const verifyResponse = await fetch(
    `${baseUrl}/rest/v1/site_content?select=content_value&page_name=eq.${encodeURIComponent(pageName)}&content_key=eq.${encodeURIComponent(contentKey)}&limit=1`,
    { headers }
  );
  if (!verifyResponse.ok) throw new Error(`Không thể xác minh cấu trúc Marketing: HTTP ${verifyResponse.status}`);
  const [verified] = await verifyResponse.json();
  if (!verified?.content_value?.includes('id="marketing-os"')) {
    throw new Error('CMS chưa trả về Marketing OS sau khi đồng bộ.');
  }

  console.log('Marketing structure synced and verified in CMS.');
}

syncStructure().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
