const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = path.join(__dirname, '..', 'admin.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Match script tags
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
let errors = 0;

while ((match = scriptRegex.exec(content)) !== null) {
  const scriptContent = match[1];
  // Skip external scripts with src
  if (!scriptContent.trim()) continue;
  count++;
  try {
    new vm.Script(scriptContent, { filename: `admin.html-inline-script-${count}.js` });
    console.log(`✅ Inline script ${count} valid syntax.`);
  } catch (err) {
    console.error(`❌ Inline script ${count} syntax error:`, err.message);
    errors++;
  }
}

if (errors === 0) {
  console.log(`🎉 All ${count} inline scripts in admin.html are syntactically valid!`);
  process.exit(0);
} else {
  console.error(`🚨 Found ${errors} syntax errors in admin.html inline scripts.`);
  process.exit(1);
}
