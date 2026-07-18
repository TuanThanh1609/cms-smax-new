const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesToTag = [
  'ecommerce', 'education', 'realestate', 'service', 'fb', 'agency', 
  'travel', 'health', 'beauty',
  'tich-hop', 'crm-sync', 'partnership', 'livechat', 'chatbot', 'genai', 
  'insight', 'marketing', 'gamification', 'blog', 'blog-detail', 'remarketing'
];

const requestedPages = process.argv.slice(2);
const selectedPages = requestedPages.length
  ? pagesToTag.filter(page => requestedPages.includes(page))
  : pagesToTag;

let allNewRecords = [];

for (const page of selectedPages) {
  const filePath = path.join(__dirname, '..', `${page}.html`);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // cheerio load
  const $ = cheerio.load(content, { decodeEntities: false });
  
  let tagCounts = {};
  
  const processElement = (el, type, isImg = false) => {
    // Skip if inside header, nav, or footer
    if ($(el).parents('header, nav, footer, .site-header, .site-footer').length > 0) return;
    
    // Skip if already tagged
    if (isImg && $(el).attr('data-cms-img')) return;
    if (!isImg && $(el).attr('data-cms')) return;
    
    const prefix = page;
    tagCounts[type] = (tagCounts[type] || 0) + 1;
    const newKey = `${prefix}-${type}-${tagCounts[type]}`;
    
    let newValue = '';
    
    if (isImg) {
      newValue = $(el).attr('src') || '';
      $(el).attr('data-cms-img', newKey);
    } else {
      newValue = $(el).text().trim();
      // Only tag substantial text
      if (newValue.length > 2) {
        $(el).attr('data-cms', newKey);
      } else {
        return;
      }
    }
    
    allNewRecords.push({
      page_key: prefix,
      content_key: newKey,
      content_type: isImg ? 'image' : 'text',
      content_value: newValue
    });
  };
  
  // Find headings and p
  $('main h2, main h3, main h4, main p, section h2, section h3, section h4, section p').each((i, el) => {
    processElement(el, 'text');
  });
  
  // Find interesting images
  $('main img, section img').each((i, el) => {
    processElement(el, 'img', true);
  });
  
  const newHtml = $.html();
  if (newHtml !== originalContent) {
    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log(`Tagged ${page}.html`);
  }
}

console.log(`Total new tags found: ${allNewRecords.length}`);
fs.writeFileSync(path.join(__dirname, 'new_tags.json'), JSON.stringify(allNewRecords, null, 2));
