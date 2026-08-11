const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');
const clientDir = path.join(distDir, 'client');
const serverDir = path.join(distDir, 'server');

if (!fs.existsSync(publicDir) || !fs.existsSync(path.join(publicDir, 'all-in-one.html'))) {
  throw new Error('Run the standard build before staging the Sites bundle.');
}

if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(serverDir, { recursive: true });
fs.cpSync(publicDir, clientDir, { recursive: true });

const worker = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') url.pathname = '/all-in-one.html';
    if (!env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
      return new Response('Static asset binding is unavailable.', { status: 503 });
    }
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`;

fs.writeFileSync(path.join(serverDir, 'index.js'), worker, 'utf8');
console.log('Sites bundle staged in dist/.');
