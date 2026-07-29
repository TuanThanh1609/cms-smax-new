const fs = require('fs');
const path = require('path');
const parse5 = require('parse5');
const cheerio = require('cheerio');

const rootDir = path.resolve(__dirname, '..');
const pageName = 'social-revenue-journey';
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

function getAttr(node, name) {
  return node.attrs?.find((attr) => attr.name === name)?.value || '';
}

function hasClass(node, className) {
  return getAttr(node, 'class').split(/\s+/).includes(className);
}

function hasAncestor(ancestors, predicate) {
  return ancestors.some(predicate);
}

function textContent(node) {
  if (!node) return '';
  if (node.nodeName === '#text') return node.value || '';
  return (node.childNodes || []).map(textContent).join('');
}

function escapeAttribute(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function sectionLabel(ancestors) {
  const section = [...ancestors].reverse().find((node) => node.tagName === 'section');
  if (!section) return 'Nội dung trang';
  const id = getAttr(section, 'id');
  if (id) return id.replace(/-/g, ' ');
  const className = getAttr(section, 'class').split(/\s+/).find((name) => name.startsWith('sr-'));
  return (className || 'section').replace(/^sr-/, '').replace(/-/g, ' ');
}

function shouldTagText(node, ancestors) {
  const tag = node.tagName;
  if (['h1', 'h2', 'h3', 'h4', 'p'].includes(tag)) return true;
  if (tag === 'a') {
    return hasClass(node, 'sr-button') || hasAncestor(ancestors, (item) => hasClass(item, 'sr-stage-nav'));
  }
  if (tag === 'button') return hasClass(node, 'sr-button');
  if (tag === 'li') return hasAncestor(ancestors, (item) => hasClass(item, 'sr-stage-copy'));
  if (tag === 'strong') {
    return hasAncestor(ancestors, (item) =>
      item.tagName === 'li' ||
      ['sr-kpi-line', 'sr-thesis-foot', 'sr-roadmap-grid', 'sr-shopping-tablist'].some((name) => hasClass(item, name))
    );
  }
  if (tag === 'span') {
    const parent = ancestors[ancestors.length - 1];
    return (
      parent?.tagName === 'label' ||
      hasAncestor(ancestors, (item) =>
        ['sr-channel-brand', 'sr-insight-questions', 'sr-final-points', 'sr-roadmap-grid', 'sr-thesis-foot', 'sr-kpi-line'].some((name) => hasClass(item, name))
      )
    );
  }
  return false;
}

function ensureCmsTags() {
  let html = fs.readFileSync(htmlPath, 'utf8');
  const document = parse5.parse(html, { sourceCodeLocationInfo: true });
  const inserts = [];
  let textCounter = 0;
  let imageCounter = 0;

  const scanExistingCounters = (node) => {
    const key = getAttr(node, 'data-cms') || getAttr(node, 'data-cms-img');
    const textMatch = key.match(/^social-revenue-text-(\d+)$/);
    const imageMatch = key.match(/^social-revenue-img-(\d+)$/);
    if (textMatch) textCounter = Math.max(textCounter, Number(textMatch[1]));
    if (imageMatch) imageCounter = Math.max(imageCounter, Number(imageMatch[1]));
    (node.childNodes || []).forEach(scanExistingCounters);
  };
  scanExistingCounters(document);

  const visit = (node, ancestors = [], insideMain = false) => {
    const isMain = insideMain || node.tagName === 'main';
    const nextAncestors = node.tagName ? [...ancestors, node] : ancestors;
    const hiddenFromCms =
      hasClass(node, 'sr-is-removed') ||
      hasAncestor(ancestors, (item) => hasClass(item, 'sr-is-removed'));
    const hasCmsParent = hasAncestor(ancestors, (item) => getAttr(item, 'data-cms'));

    if (isMain && !hiddenFromCms && node.tagName && node.sourceCodeLocation?.startTag && !hasCmsParent) {
      const existingTextKey = getAttr(node, 'data-cms');
      const existingImageKey = getAttr(node, 'data-cms-img');
      const isImage = node.tagName === 'img';
      const isText = shouldTagText(node, ancestors);

      if (isImage || isText || existingTextKey || existingImageKey) {
        const rawText = isImage
          ? (getAttr(node, 'alt') || path.basename(getAttr(node, 'src') || 'Hình ảnh'))
          : textContent(node).replace(/\s+/g, ' ').trim();
        if (isImage || rawText.length > 2) {
          const key = existingTextKey || existingImageKey || (isImage
            ? `social-revenue-img-${String(++imageCounter).padStart(3, '0')}`
            : `social-revenue-text-${String(++textCounter).padStart(3, '0')}`);
          const label = `${sectionLabel(ancestors)} · ${isImage ? 'Hình ảnh' : rawText.slice(0, 72)}`;
          const attributes = [];
          if (!existingTextKey && !existingImageKey) {
            attributes.push(`${isImage ? 'data-cms-img' : 'data-cms'}="${key}"`);
          }
          if (!getAttr(node, 'data-cms-label')) {
            attributes.push(`data-cms-label="${escapeAttribute(label)}"`);
          }
          if (attributes.length > 0) {
            inserts.push({
              offset: node.sourceCodeLocation.startTag.endOffset - 1,
              text: ` ${attributes.join(' ')}`
            });
          }
        }
      }
    }

    (node.childNodes || []).forEach((child) => visit(child, nextAncestors, isMain));
  };
  visit(document);

  inserts.sort((a, b) => b.offset - a.offset).forEach((insert) => {
    html = `${html.slice(0, insert.offset)}${insert.text}${html.slice(insert.offset)}`;
  });

  if (inserts.length > 0) {
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`CMS tags added: ${inserts.length}`);
  } else {
    console.log('CMS tags already complete.');
  }
}

function collectRows() {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const rows = [];

  $('main [data-cms]').each((index, element) => {
    const contentKey = $(element).attr('data-cms');
    rows.push({
      page_name: pageName,
      content_key: contentKey,
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
    `${baseUrl}/rest/v1/site_content?select=content_key,page_name&page_name=eq.${encodeURIComponent(pageName)}&limit=1000`,
    { headers }
  );
  if (!existingResponse.ok) {
    throw new Error(`Không thể đọc khóa CMS hiện tại: HTTP ${existingResponse.status}`);
  }

  const existing = await existingResponse.json();
  const existingKeys = new Set(existing.map((row) => row.content_key));
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

  console.log(`CMS fields discovered: ${rows.length}`);
  console.log(`CMS fields inserted: ${missingRows.length}`);
  console.log(`CMS fields verified for ${pageName}: ${verifiedRows.length}`);
}

async function main() {
  ensureCmsTags();
  await syncRows(collectRows());
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
