export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      url.pathname = "/all-in-one.html";
    }

    if (url.pathname === "/supabase-config.json") {
      if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
        return new Response(
          JSON.stringify({ error: "Supabase client configuration is unavailable." }),
          {
            status: 503,
            headers: {
              "Cache-Control": "no-store",
              "Content-Type": "application/json; charset=utf-8"
            }
          }
        );
      }

      return new Response(
        JSON.stringify({
          supabase_url: env.SUPABASE_URL,
          supabase_anon_key: env.SUPABASE_ANON_KEY
        }),
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
    }

    if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
      return new Response("Static asset binding is unavailable.", { status: 503 });
    }

    return env.ASSETS.fetch(new Request(url, request));
  }
};
