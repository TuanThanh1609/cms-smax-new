const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
env.split('\n').forEach(line => {
  const m = line.match(/^\s*([\w]+)\s*=\s*(.*)/);
  if(m) process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
});

require('./scripts/upload_new_tags.js');
