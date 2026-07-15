const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

// Load environment variables
function loadEnv() {
  const files = ['.env.local', '.env'];
  for (const file of files) {
    const envPath = path.join(__dirname, '..', file);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
          if (value) process.env[key] = value;
        }
      });
      break;
    }
  }
}
loadEnv();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// We will run compilation if keys exist, then we will ALWAYS copy everything to public/ folder
const hasKeys = supabaseUrl && supabaseAnonKey;

if (hasKeys) {
  console.log('🚀 [Smax CMS] Fetching site content from Supabase...');
  fetchContentAndCompile();
} else {
  console.log('⚠️ [Smax CMS] Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
  console.log('⚠️ [Smax CMS] Skipping remote database content sync. Standard local HTML files will be deployed.');
  // Always build the public folder!
  finalizeBuild({});
}

function fetchContentAndCompile() {
  let allData = [];
  let offset = 0;
  const limit = 1000;

  function fetchBatch() {
    const targetUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?select=*&limit=${limit}&offset=${offset}`;
    const parsedUrl = url.parse(targetUrl);

    const headers = {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Accept': 'application/json'
    };

    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.path,
      method: 'GET',
      headers: headers
    };

    const req = https.request(reqOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk.toString('utf8');
      });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`❌ [Smax CMS] Failed to fetch data: HTTP ${res.statusCode}`);
          console.error('Response:', body);
          process.exit(1);
        }
        
        try {
          const data = JSON.parse(body);
          allData = allData.concat(data);
          
          if (data.length === limit) {
            // Keep fetching next batch
            offset += limit;
            fetchBatch();
          } else {
            console.log(`✅ [Smax CMS] Loaded ${allData.length} content rows from database.`);
            
            // Auto repair database corruption if any
            const contentMap = {};
            const repairs = [];
            const cheerio = require('cheerio');
            const rootDir = path.resolve(__dirname, '..');
            const pages = ['ecommerce', 'education', 'realestate', 'service', 'fb', 'agency', 'travel', 'health'];
            const localDefaults = {};

            pages.forEach(page => {
              const filePath = path.join(rootDir, `${page}.html`);
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                const $ = cheerio.load(content);
                
                $('[data-cms]').each((i, el) => {
                  const key = $(el).attr('data-cms');
                  const val = $(el).text().trim();
                  if (key && val) localDefaults[key] = val;
                });
                
                $('[data-cms-img]').each((i, el) => {
                  const key = $(el).attr('data-cms-img');
                  const val = $(el).attr('src') || '';
                  if (key && val) localDefaults[key] = val;
                });
              }
            });

            allData.forEach(row => {
              let val = row.content_value || '';
              let key = row.content_key;
              let page = row.page_name;
              let isRepaired = false;
              
              // 1. Specific fix for estate-hero-img user custom transparent image
              if (key === 'estate-hero-img') {
                const targetImg = 'https://byxzjcypifhhgzyrzbfv.supabase.co/storage/v1/object/public/site_assets/cms-assets/1783761946732-thtb69nb7vf.webp';
                if (val !== targetImg) {
                  console.log(`🔧 [Smax CMS Repair] Restoring estate-hero-img to user transparent WebP image: ${targetImg}`);
                  val = targetImg;
                  isRepaired = true;
                }
              }
              
              // 2. Fix corrupted text blocks showing image paths
              if (key.includes('text') || key.includes('title') || key.includes('desc') || key.includes('badge')) {
                if (val.startsWith('asset smax/') || val.startsWith('http')) {
                  const defaultVal = localDefaults[key];
                  if (defaultVal) {
                    console.log(`🔧 [Smax CMS Repair] Repairing corrupted text key ${key}: "${val}" -> "${defaultVal}"`);
                    val = defaultVal;
                    isRepaired = true;
                  }
                }
              }
              
              // 3. Fix corrupted image blocks showing Vietnamese text descriptions
              if (key.includes('img') || key.includes('logo') || key.includes('avatar')) {
                if (val && !val.startsWith('asset smax/') && !val.startsWith('http')) {
                  const defaultVal = localDefaults[key];
                  if (defaultVal) {
                    console.log(`🔧 [Smax CMS Repair] Repairing corrupted image key ${key}: "${val}" -> "${defaultVal}"`);
                    val = defaultVal;
                    isRepaired = true;
                  }
                }
              }
              
              contentMap[key] = val;
              
              if (isRepaired) {
                repairs.push({
                  content_key: key,
                  content_value: val,
                  page_name: page
                });
              }
            });

            if (repairs.length > 0) {
              console.log(`🚀 [Smax CMS Repair] Sending ${repairs.length} repaired records back to Supabase...`);
              
              const targetUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?on_conflict=content_key`;
              const parsedUrl = url.parse(targetUrl);
              const bodyData = JSON.stringify(repairs);

              const headers = {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates',
                'Content-Length': Buffer.byteLength(bodyData)
              };

              const reqOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: 'POST',
                headers: headers
              };

              const req = https.request(reqOptions, (res) => {
                let body = '';
                res.on('data', (chunk) => {
                  body += chunk.toString('utf8');
                });
                res.on('end', () => {
                  if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(`🎉 [Smax CMS Repair] Successfully synced ${repairs.length} repaired records to Supabase.`);
                  } else {
                    console.error(`❌ [Smax CMS Repair] Failed to sync repairs: HTTP ${res.statusCode}`);
                    console.error('Response:', body);
                  }
                  finalizeBuild(contentMap);
                });
              });

              req.on('error', (e) => {
                console.error('❌ [Smax CMS Repair] Connection error during repair sync:', e.message);
                finalizeBuild(contentMap);
              });

              req.write(bodyData);
              req.end();
            } else {
              finalizeBuild(contentMap);
            }
          }
        } catch (e) {
          console.error('❌ [Smax CMS] Failed to parse database response:', e.message);
          process.exit(1);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ [Smax CMS] Connection error:', e.message);
      process.exit(1);
    });

    req.end();
  }

  fetchBatch();
}

function finalizeBuild(contentMap) {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');

  function sanitizeStructuralCmsHtml(html, cheerio) {
    if (!html) return '';
    const fragment = cheerio.load(`<div id="cms-structural-root">${html}</div>`, { decodeEntities: false }, false);
    const root = fragment('#cms-structural-root');

    root.find('.cms-editor-inline-helper, .img-resize-handle, .block-add-handle').remove();
    root.find('[contenteditable]').removeAttr('contenteditable');
    root.find('.visual-container-selected, .visual-block-selected, .visual-img-selected')
      .removeClass('visual-container-selected visual-block-selected visual-img-selected');

    root.find('.cms-custom-block').each((i, el) => {
      const node = fragment(el);
      const isBuilderBlock = node.is('.text-block, .img-block, .video-block, .elementor-section');
      if (!isBuilderBlock) node.removeClass('cms-custom-block');
    });

    root.find('[style]').each((i, el) => {
      const node = fragment(el);
      const normalized = (node.attr('style') || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (normalized === 'position: relative;' || normalized === 'position: relative') {
        node.removeAttr('style');
      }
    });

    root.find('[data-size-mode]').each((i, el) => {
      const node = fragment(el);
      if (!node.closest('.text-block, .img-block, .video-block, .elementor-section').length) {
        node.removeAttr('data-size-mode');
      }
    });

    root.find('[class=""]').removeAttr('class');
    return root.html() || '';
  }
  
  // Re-create public folder clean
  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicDir, { recursive: true });

  const files = fs.readdirSync(rootDir);

  files.forEach(file => {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(publicDir, file);
    
    // Ignore build output and source control directories, as well as raw design/temp folders
    const ignoredItems = [
      'public',
      'node_modules',
      '.git',
      '.vercel',
      'scripts',
      '.agents',
      '.codex',
      '.playwright-mcp',
      'package.json',
      'package-lock.json',
      'skills-lock.json',
      'tmp',
      'UI chính thức của Smax',
      'PNG TACH N?N-20260623T120700Z-3-001',
      'PNG TÁCH NỀN-20260623T120700Z-3-001',
      'tham khao 1.png',
      'tham khao 2.png',
      'education-mobile-final.png',
      'image-1.png',
      'image-2.png',
      '.gitignore',
      'CONTINUITY.md',
      'AGENTS.md',
      'pasted-text-1.txt',
      'run_upload.js',
      'create_gamification_page.js',
      'generate_flow_images.js',
      'generate_flow_images.py'
    ];

    if (ignoredItems.includes(file) || file.startsWith('.env')) {
      return;
    }

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      // If it's an HTML file, compile it first, then write to public
      if (file.endsWith('.html') && file !== 'admin.html') {
        const html = fs.readFileSync(srcPath, 'utf8');
        const cheerio = require('cheerio');
        const $ = cheerio.load(html, { decodeEntities: false });
        
        // 1. Compile structural containers (non-text fields) first
        $('[data-cms]').each((i, el) => {
          const key = $(el).attr('data-cms');
          const tagName = el.tagName.toUpperCase();
          const isTextField = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL', 'B', 'I', 'STRONG', 'EM'].includes(tagName) || 
                               $(el).hasClass('section-tag') || 
                               $(el).hasClass('eyebrow') || 
                               $(el).hasClass('metric-num') ||
                               $(el).hasClass('metric-label');
          if (!isTextField && contentMap[key] !== undefined) {
            const value = key && key.endsWith('-sections')
              ? sanitizeStructuralCmsHtml(contentMap[key], cheerio)
              : contentMap[key];
            $(el).html(value);
          }
        });

        // 2. Then compile individual text fields (including any newly injected ones)
        $('[data-cms]').each((i, el) => {
          const key = $(el).attr('data-cms');
          const tagName = el.tagName.toUpperCase();
          const isTextField = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL', 'B', 'I', 'STRONG', 'EM'].includes(tagName) || 
                               $(el).hasClass('section-tag') || 
                               $(el).hasClass('eyebrow') || 
                               $(el).hasClass('metric-num') ||
                               $(el).hasClass('metric-label');
          if (isTextField && contentMap[key] !== undefined) {
            $(el).html(contentMap[key]);
          }
        });

        // 3. Compile Image Src & Styles (data-cms-img)
        $('[data-cms-img]').each((i, el) => {
          const key = $(el).attr('data-cms-img');
          if (contentMap[key] !== undefined) {
            $(el).attr('src', contentMap[key]);
          }
          const styleKey = key + '-style';
          if (contentMap[styleKey] !== undefined && contentMap[styleKey]) {
            $(el).attr('style', contentMap[styleKey]);
          }
        });

        let htmlContent = $.html();

        // Clean up visual editing resizers, resize modes, and dashed borders for end-users on the live site
        htmlContent = htmlContent.replace(/style=["']([^"']*)["']/gi, (match, styles) => {
          if (styles.includes('resize') || styles.includes('dashed') || styles.includes('border:')) {
            let cleanStyles = styles
              .replace(/resize\s*:\s*[^;]+/gi, 'resize: none')
              .replace(/border\s*:\s*[^;]*dashed[^;]+/gi, '')
              .replace(/border\s*:\s*1px[^;]+/gi, '')
              .replace(/overflow\s*:\s*auto/gi, 'overflow: hidden')
              .replace(/overflow\s*:\s*scroll/gi, 'overflow: hidden');
            return `style="${cleanStyles.trim()}"`;
          }
          return match;
        });

        fs.writeFileSync(destPath, htmlContent, 'utf8');
      } else {
        // Just copy other files directly
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });

  // Write build timestamp to public folder
  fs.writeFileSync(path.join(publicDir, 'build-time.txt'), Date.now().toString(), 'utf8');

  // Write Supabase config for Admin CMS login if env variables exist
  const configDest = path.join(publicDir, 'supabase-config.json');
  if (supabaseUrl && supabaseAnonKey) {
    const configContent = {
      supabase_url: supabaseUrl,
      supabase_anon_key: supabaseAnonKey,
      vercel_deploy_webhook: process.env.VERCEL_DEPLOY_WEBHOOK_URL || ''
    };
    fs.writeFileSync(configDest, JSON.stringify(configContent, null, 2), 'utf8');
  } else {
    if (fs.existsSync(configDest)) {
      fs.unlinkSync(configDest);
    }
  }

  console.log('🎉 [Smax CMS] Build completed successfully. Public folder is ready for Vercel deployment.');
}

function copyFolderRecursiveSync(sources, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(sources);
  files.forEach(file => {
    const curSource = path.join(sources, file);
    const curTarget = path.join(target, file);

    if (fs.statSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  });
}
