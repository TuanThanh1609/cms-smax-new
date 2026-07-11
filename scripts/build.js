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
  const targetUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?select=*`;
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
        console.log(`✅ [Smax CMS] Loaded ${data.length} content rows from database.`);
        
        const contentMap = {};
        data.forEach(row => {
          contentMap[row.content_key] = row.content_value;
        });
        
        finalizeBuild(contentMap);
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

        // Compile Image Src
        const imgRegex = /(\sdata-cms-img=["']([^"']+)["'][^>]*src=["'])([^"']*)(["'])/g;
        htmlContent = htmlContent.replace(imgRegex, (match, prefix, key, oldSrc, suffix) => {
          if (contentMap[key] !== undefined) {
            return `${prefix}${contentMap[key]}${suffix}`;
          }
          return match;
        });
        
        const imgRegexAlt = /(\ssrc=["'])([^"']*)(["'][^>]*data-cms-img=["']([^"']+)["'])/g;
        htmlContent = htmlContent.replace(imgRegexAlt, (match, prefix, oldSrc, middle, key) => {
          if (contentMap[key] !== undefined) {
            return `${prefix}${contentMap[key]}${middle}`;
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
