const fs = require('fs');
const https = require('https');
const url = require('url');
const readline = require('readline');

const tagsFile = fs.readFileSync(__dirname + '/new_tags.json', 'utf8');
const tags = JSON.parse(tagsFile).map(t => ({
  page_name: t.page_key,
  content_key: t.content_key,
  content_value: t.content_value
}));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n======================================================');
console.log(`⚡ ĐỒNG BỘ ${tags.length} NỘI DUNG MỚI LÊN SUPABASE (TẤT CẢ CÁC TRANG)`);
console.log('======================================================');

rl.question(`Nhập Supabase URL: `, (inputUrl) => {
  const urlVal = inputUrl.trim();
  
  rl.question(`Nhập Supabase Key (Service Role hoặc Anon Key): `, (inputKey) => {
    const keyVal = inputKey.trim();
    
    if (!urlVal || !keyVal) {
      console.log('❌ Lỗi: Cần cung cấp đầy đủ URL và Key để đồng bộ dữ liệu!');
      rl.close();
      process.exit(1);
    }
    
    syncToSupabase(urlVal, keyVal);
  });
});

function syncToSupabase(supabaseUrl, supabaseKey) {
  console.log(`\n🚀 Đang gửi ${tags.length} thuộc tính nội dung lên Supabase...`);
  
  const targetUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/site_content?on_conflict=content_key`;
  const parsedUrl = url.parse(targetUrl);

  const bodyData = JSON.stringify(tags);
  
  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
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
      rl.close();
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`\n🎉 THÀNH CÔNG! Đã đồng bộ thành công ${tags.length} khóa nội dung mới lên Supabase.`);
        console.log('👉 Vui lòng chạy lệnh: vercel --prod dể cập nhật mã HTML mới lên máy chủ Vercel.');
      } else {
        console.error(`\n❌ Thất bại: HTTP ${res.statusCode}`);
        console.error('Phản hồi lỗi:', body);
      }
    });
  });
  
  req.on('error', (e) => {
    rl.close();
    console.error('\n❌ Lỗi kết nối:', e.message);
  });
  
  req.write(bodyData);
  req.end();
}
