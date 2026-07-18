const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://oagmdttqohivnffgawco.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '...'; // I will run this with env vars

const pagesToTag = [
  'ecommerce', 'education', 'realestate', 'service', 'fb', 'agency', 
  'tich-hop', 'crm-sync', 'partnership', 'livechat', 'chatbot', 'genai', 
  'insight', 'marketing', 'gamification', 'blog', 'blog-detail', 'remarketing'
];

async function autoTag() {
  let allNewRecords = [];

  for (const page of pagesToTag) {
    const filePath = path.join(__dirname, '..', `${page}.html`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Use regex to find tags we want to make editable
    // Specifically targeting: h2, h3, h4, p, img
    // We will only tag if they don't already have data-cms or data-cms-img
    
    // Helper to replace tags safely
    let tagCounts = {};
    
    const replaceTag = (regex, tagType, isImg = false) => {
      content = content.replace(regex, (match, before, attr, inside, close) => {
        // Skip if already tagged
        if (attr.includes('data-cms')) return match;
        // Skip nav and footer links usually inside a/li/nav
        // Let's do simple skipping
        
        let prefix = page;
        tagCounts[tagType] = (tagCounts[tagType] || 0) + 1;
        let newKey = `${prefix}-${tagType}-${tagCounts[tagType]}`;
        
        let newAttr = isImg ? ` data-cms-img="${newKey}"` : ` data-cms="${newKey}"`;
        
        let newValue = '';
        if (isImg) {
          let srcMatch = attr.match(/src=["']([^"']+)["']/);
          if (srcMatch) newValue = srcMatch[1];
        } else {
          // Extract text content roughly
          newValue = inside.replace(/<[^>]+>/g, '').trim();
          if (!newValue && tagType !== 'img') return match; // Skip empty text
        }
        
        // Skip very short or generic text
        if (!isImg && newValue.length < 3) return match;

        allNewRecords.push({
          page_key: prefix,
          content_key: newKey,
          content_type: isImg ? 'image' : 'text',
          content_value: newValue
        });

        return `${before}${attr}${newAttr}>${inside}${close}`;
      });
    };

    // Replace headings and paragraphs
    replaceTag(/(<(h2|h3|h4|p))([^>]*?)>([\s\S]*?)(<\/\2>)/g, 'text');
    
    // Replace images
    replaceTag(/(<img)([^>]*?)(\/?>)()/, 'img', true);

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Tagged ${page}.html`);
    }
  }

  console.log(`Total new tags found: ${allNewRecords.length}`);
  fs.writeFileSync(path.join(__dirname, 'new_tags.json'), JSON.stringify(allNewRecords, null, 2));
}

autoTag();
