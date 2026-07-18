const fs = require('fs');
const https = require('https');
const path = require('path');

const pagesToTag = [
  'ecommerce', 'education', 'realestate', 'service', 'fb', 'agency', 
  'tich-hop', 'crm-sync', 'partnership', 'livechat', 'chatbot', 'genai', 
  'insight', 'marketing', 'gamification', 'blog', 'blog-detail', 'remarketing'
];

const baseUrl = 'https://newweb-smax.vercel.app/';

pagesToTag.forEach(page => {
  const fileUrl = `${baseUrl}${page}.html`;
  const filePath = path.join(__dirname, '..', `${page}.html`);
  
  https.get(fileUrl, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        fs.writeFileSync(filePath, data, 'utf8');
        console.log(`Restored ${page}.html from Vercel`);
      } else {
        console.error(`Failed to download ${page}.html: ${res.statusCode}`);
      }
    });
  }).on('error', err => {
    console.error(`Error downloading ${page}.html: ${err.message}`);
  });
});
