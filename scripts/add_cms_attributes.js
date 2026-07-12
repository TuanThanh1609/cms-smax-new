const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pages = ['ecommerce', 'education', 'realestate', 'service', 'fb', 'agency'];
const rootDir = path.resolve(__dirname, '..');

pages.forEach(page => {
  const filePath = path.join(rootDir, `${page}.html`);
  if (!fs.existsSync(filePath)) return;
  
  console.log(`Scanning ${page}.html...`);
  let html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  
  // Find all elements with class section-tag that do not have data-cms
  let tagCount = 0;
  $('.section-tag').each((i, el) => {
    if (!$(el).attr('data-cms')) {
      tagCount++;
      $(el).attr('data-cms', `${page}-tag-${tagCount}`);
    }
  });
  
  // Find all elements with class btn that do not have data-cms
  let btnCount = 0;
  $('.btn').each((i, el) => {
    if (!$(el).attr('data-cms') && !$(el).attr('data-cms-img')) {
      btnCount++;
      $(el).attr('data-cms', `${page}-btn-${btnCount}`);
    }
  });
  
  if (tagCount > 0 || btnCount > 0) {
    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log(`✅ Updated ${page}.html: Added ${tagCount} tags and ${btnCount} buttons with data-cms attributes.`);
  } else {
    console.log(`No updates needed for ${page}.html.`);
  }
});
