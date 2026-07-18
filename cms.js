/**
 * SMAX.AI CMS Client SDK - Live Preview Helper
 * 
 * Included on pages to fetch live database content in real-time
 * when the "?preview=true" parameter is present in the URL.
 */
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isPreview = urlParams.get('preview') === 'true';

  if (!isPreview) {
    // Normal visit: serve static pre-compiled HTML (fastest, SEO-optimized)
    return;
  }

  console.log('⚡ [Smax CMS] Live Preview mode active. Connecting to Supabase...');

  // Get credentials from localStorage
  const supabaseUrl = localStorage.getItem('supabase_url');
  const supabaseAnonKey = localStorage.getItem('supabase_anon_key');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ [Smax CMS] Missing Supabase credentials in localStorage.');
    console.warn('To preview live changes, configure Supabase credentials in /admin.html first.');
    return;
  }

  // Load Supabase JS Client dynamically if not loaded
  if (typeof supabase === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => initPreview(supabaseUrl, supabaseAnonKey);
    document.head.appendChild(script);
  } else {
    initPreview(supabaseUrl, supabaseAnonKey);
  }

  async function initPreview(url, key) {
    const client = supabase.createClient(url, key);
    
    // Fetch all content records
    const { data, error } = await client
      .from('site_content')
      .select('*');

    if (error) {
      console.error('❌ [Smax CMS] Failed to fetch preview content:', error.message);
      return;
    }

    console.log(`✅ [Smax CMS] Loaded ${data.length} preview records. Replacing DOM elements...`);

    const contentMap = {};
    data.forEach(row => {
      contentMap[row.content_key] = row.content_value;
    });

    // Replace all text elements
    document.querySelectorAll('[data-cms]').forEach(element => {
      const key = element.getAttribute('data-cms');
      if (contentMap[key] !== undefined) {
        element.innerHTML = contentMap[key];
        element.classList.add('transition-all', 'duration-500', 'ring-2', 'ring-indigo-500/20', 'rounded-sm');
      }
    });

    // Replace all image elements
    document.querySelectorAll('[data-cms-img]').forEach(element => {
      const key = element.getAttribute('data-cms-img');
      if (contentMap[key] !== undefined) {
        element.setAttribute('src', contentMap[key]);
        element.classList.add('transition-all', 'duration-500', 'ring-2', 'ring-indigo-500/20');
      }
    });
    
    // Show a small preview badge on the page
    const badge = document.createElement('div');
    badge.innerHTML = `
      <div class="fixed bottom-6 left-6 z-50 bg-indigo-600/90 backdrop-blur text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-indigo-400/20 font-sans text-xs font-semibold">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Chế độ Xem thử Live Preview</span>
        <button onclick="window.location.search = ''" class="ml-2 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg text-[10px] transition-colors">Tắt</button>
      </div>
    `;
    document.body.appendChild(badge);
  }
})();
