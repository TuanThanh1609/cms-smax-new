export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') url.pathname = '/all-in-one.html';
    if (!env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
      return new Response('Static asset binding is unavailable.', { status: 503 });
    }
    return env.ASSETS.fetch(new Request(url, request));
  },
};
