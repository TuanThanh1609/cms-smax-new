const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

// Load environment variables
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
            const pages = ['ecommerce', 'education', 'realestate', 'service', 'fb', 'agency'];
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
  
  // Re-create public folder clean
  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
  }
  fs.mkdirSync(publicDir, { recursive: true });

  const files = fs.readdirSync(rootDir);

  files.forEach(file => {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(publicDir, file);
    
    // Ignore build output and source control directories
    if (
      file === 'public' ||
      file === 'node_modules' ||
      file === '.git' ||
      file === '.vercel' ||
      file === 'scripts' ||
      file === '.agents' ||
      file === '.codex' ||
      file === '.playwright-mcp' ||
      file === 'package.json' ||
      file === 'package-lock.json' ||
      file === 'skills-lock.json'
    ) {
      return;
    }

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      // If it's an HTML file, compile it first, then write to public
      if (file.endsWith('.html') && file !== 'admin.html') {
        let htmlContent = fs.readFileSync(srcPath, 'utf8');
        
        // Compile Text Content
        const textRegex = /(\sdata-cms=["']([^"']+)["'][^>]*>)([\s\S]*?)(<\/)/g;
        htmlContent = htmlContent.replace(textRegex, (match, prefix, key, oldVal, suffix) => {
          if (contentMap[key] !== undefined) {
            return `${prefix}${contentMap[key]}${suffix}`;
          }
          return match;
        });

        // Compile Image Src & Styles
        const imgRegex = /(\sdata-cms-img=["']([^"']+)["'][^>]*src=["'])([^"']*)(["'])/g;
        htmlContent = htmlContent.replace(imgRegex, (match, prefix, key, oldSrc, suffix) => {
          let replacement = match;
          if (contentMap[key] !== undefined) {
            replacement = `${prefix}${contentMap[key]}${suffix}`;
          }
          const styleKey = key + '-style';
          if (contentMap[styleKey] !== undefined && contentMap[styleKey]) {
            if (/style=["']/i.test(replacement)) {
              replacement = replacement.replace(/style=["']([^"']*)["']/i, `style="${contentMap[styleKey]}"`);
            } else {
              replacement = replacement.replace(/>$/, ` style="${contentMap[styleKey]}">`);
            }
          }
          return replacement;
        });
        
        const imgRegexAlt = /(\ssrc=["'])([^"']*)(["'][^>]*data-cms-img=["']([^"']+)["'])/g;
        htmlContent = htmlContent.replace(imgRegexAlt, (match, prefix, oldSrc, middle, key) => {
          let replacement = match;
          if (contentMap[key] !== undefined) {
            replacement = `${prefix}${contentMap[key]}${middle}`;
          }
          const styleKey = key + '-style';
          if (contentMap[styleKey] !== undefined && contentMap[styleKey]) {
            if (/style=["']/i.test(replacement)) {
              replacement = replacement.replace(/style=["']([^"']*)["']/i, `style="${contentMap[styleKey]}"`);
            } else {
              replacement = replacement.replace(/>$/, ` style="${contentMap[styleKey]}">`);
            }
          }
          return replacement;
        });

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
