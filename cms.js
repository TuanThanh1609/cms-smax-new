/**
 * SMAX.AI CMS Client SDK - Live Preview & Typography Helper (3-Level Cascade)
 * 
 * Included on pages to fetch live database content & typography in real-time
 * when the "?preview=true" parameter is present in the URL.
 */
(function() {
  const FONT_GOOGLE_MAP = {
    'Google Sans': 'family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400',
    'Plus Jakarta Sans': 'family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400',
    'Open Sans': 'family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400',
    'Be Vietnam Pro': 'family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400',
    'Inter': 'family=Inter:wght@300;400;500;600;700;800',
    'Roboto': 'family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400',
    'Montserrat': 'family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400',
    'Playfair Display': 'family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400',
    'Lexend': 'family=Lexend:wght@300;400;500;600;700',
    'Outfit': 'family=Outfit:wght@300;400;500;600;700;800'
  };

  function loadGoogleFont(fontName) {
    if (!fontName || fontName === 'inherit' || fontName === 'system-ui') return;
    const param = FONT_GOOGLE_MAP[fontName];
    if (!param) return;
    
    const linkId = 'smax-font-' + fontName.toLowerCase().replace(/\s+/g, '-');
    if (document.getElementById(linkId)) return;
    
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${param}&display=swap`;
    document.head.appendChild(link);
  }

  function applyTypography(config) {
    if (!config) return;
    
    const globalFont = config.global?.fontFamily || 'Plus Jakarta Sans';
    loadGoogleFont(globalFont);
    
    if (config.elements) {
      Object.values(config.elements).forEach(item => {
        if (item && item.fontFamily) {
          loadGoogleFont(item.fontFamily);
        }
      });
    }
    
    let styleEl = document.getElementById('smax-typography-vars');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'smax-typography-vars';
      document.head.appendChild(styleEl);
    }

    const el = config.elements || {};
    const resolveFont = (f) => (!f || f === 'inherit') ? `var(--smax-font-global)` : `'${f}', sans-serif`;

    styleEl.textContent = `
      :root {
        --smax-font-global: '${globalFont}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        --smax-size-global: ${config.global?.fontSize || '16px'};
        --smax-weight-global: ${config.global?.fontWeight || '400'};
        --smax-line-global: ${config.global?.lineHeight || '1.6'};
        --smax-color-global: ${config.global?.color || ''};

        --smax-font-h1: ${resolveFont(el.h1?.fontFamily)};
        --smax-font-h2: ${resolveFont(el.h2?.fontFamily)};
        --smax-font-h3: ${resolveFont(el.h3?.fontFamily)};
        --smax-font-title: ${resolveFont(el.title?.fontFamily)};
        --smax-font-subtitle: ${resolveFont(el.subtitle?.fontFamily)};
        --smax-font-text: ${resolveFont(el.text?.fontFamily)};
        --smax-font-button: ${resolveFont(el.button?.fontFamily)};
      }

      body {
        font-family: var(--smax-font-global) !important;
        ${config.global?.fontSize ? `font-size: ${config.global.fontSize} !important;` : ''}
        ${config.global?.lineHeight ? `line-height: ${config.global.lineHeight} !important;` : ''}
        ${config.global?.color ? `color: ${config.global.color} !important;` : ''}
      }

      h1, .h1, [data-cms-type="h1"] {
        font-family: var(--smax-font-h1) !important;
        ${el.h1?.fontSize ? `font-size: ${el.h1.fontSize} !important;` : ''}
        ${el.h1?.fontWeight ? `font-weight: ${el.h1.fontWeight} !important;` : ''}
        ${el.h1?.lineHeight ? `line-height: ${el.h1.lineHeight} !important;` : ''}
        ${el.h1?.letterSpacing ? `letter-spacing: ${el.h1.letterSpacing} !important;` : ''}
        ${el.h1?.transform && el.h1.transform !== 'none' ? `text-transform: ${el.h1.transform} !important;` : ''}
        ${el.h1?.color ? `color: ${el.h1.color} !important;` : ''}
      }

      h2, .h2, [data-cms-type="h2"] {
        font-family: var(--smax-font-h2) !important;
        ${el.h2?.fontSize ? `font-size: ${el.h2.fontSize} !important;` : ''}
        ${el.h2?.fontWeight ? `font-weight: ${el.h2.fontWeight} !important;` : ''}
        ${el.h2?.lineHeight ? `line-height: ${el.h2.lineHeight} !important;` : ''}
        ${el.h2?.letterSpacing ? `letter-spacing: ${el.h2.letterSpacing} !important;` : ''}
        ${el.h2?.transform && el.h2.transform !== 'none' ? `text-transform: ${el.h2.transform} !important;` : ''}
        ${el.h2?.color ? `color: ${el.h2.color} !important;` : ''}
      }

      h3, .h3, [data-cms-type="h3"] {
        font-family: var(--smax-font-h3) !important;
        ${el.h3?.fontSize ? `font-size: ${el.h3.fontSize} !important;` : ''}
        ${el.h3?.fontWeight ? `font-weight: ${el.h3.fontWeight} !important;` : ''}
        ${el.h3?.lineHeight ? `line-height: ${el.h3.lineHeight} !important;` : ''}
        ${el.h3?.letterSpacing ? `letter-spacing: ${el.h3.letterSpacing} !important;` : ''}
        ${el.h3?.transform && el.h3.transform !== 'none' ? `text-transform: ${el.h3.transform} !important;` : ''}
        ${el.h3?.color ? `color: ${el.h3.color} !important;` : ''}
      }

      .title, [data-cms*="title"], [data-cms*="heading"] {
        font-family: var(--smax-font-title) !important;
        ${el.title?.fontSize ? `font-size: ${el.title.fontSize} !important;` : ''}
        ${el.title?.fontWeight ? `font-weight: ${el.title.fontWeight} !important;` : ''}
        ${el.title?.lineHeight ? `line-height: ${el.title.lineHeight} !important;` : ''}
        ${el.title?.color ? `color: ${el.title.color} !important;` : ''}
      }

      .subtitle, [data-cms*="subtitle"], [data-cms*="desc"] {
        font-family: var(--smax-font-subtitle) !important;
        ${el.subtitle?.fontSize ? `font-size: ${el.subtitle.fontSize} !important;` : ''}
        ${el.subtitle?.fontWeight ? `font-weight: ${el.subtitle.fontWeight} !important;` : ''}
        ${el.subtitle?.lineHeight ? `line-height: ${el.subtitle.lineHeight} !important;` : ''}
        ${el.subtitle?.color ? `color: ${el.subtitle.color} !important;` : ''}
      }

      p, text, [data-cms*="text"], [data-cms*="content"] {
        font-family: var(--smax-font-text) !important;
        ${el.text?.fontSize ? `font-size: ${el.text.fontSize} !important;` : ''}
        ${el.text?.fontWeight ? `font-weight: ${el.text.fontWeight} !important;` : ''}
        ${el.text?.lineHeight ? `line-height: ${el.text.lineHeight} !important;` : ''}
        ${el.text?.color ? `color: ${el.text.color} !important;` : ''}
      }

      button, .btn, [class*="btn-"] {
        font-family: var(--smax-font-button) !important;
        ${el.button?.fontSize ? `font-size: ${el.button.fontSize} !important;` : ''}
        ${el.button?.fontWeight ? `font-weight: ${el.button.fontWeight} !important;` : ''}
        ${el.button?.letterSpacing ? `letter-spacing: ${el.button.letterSpacing} !important;` : ''}
        ${el.button?.transform && el.button.transform !== 'none' ? `text-transform: ${el.button.transform} !important;` : ''}
      }
    `;
  }

  // Expose applyTypography globally
  window.applyTypography = applyTypography;

  // Listen for realtime typography updates from admin preview iframe
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SMAX_TYPOGRAPHY_UPDATE') {
      applyTypography(event.data.config);
    }
  });

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

    // Extract page path name
    const currentPath = window.location.pathname.replace(/^\//, '').replace(/\.html$/, '') || 'index';

    // 3-Level Cascade Merge: Global < Page < Element
    let mergedConfig = { global: {}, elements: {} };

    if (contentMap['theme_typography']) {
      try {
        const globalConfig = typeof contentMap['theme_typography'] === 'string' 
          ? JSON.parse(contentMap['theme_typography']) 
          : contentMap['theme_typography'];
        mergedConfig.global = Object.assign({}, globalConfig.global);
        mergedConfig.elements = Object.assign({}, globalConfig.elements);
      } catch (err) {
        console.warn('⚠️ [Smax CMS] Failed to parse theme_typography:', err);
      }
    }

    const pageKey = `page_typography_${currentPath}`;
    if (contentMap[pageKey]) {
      try {
        const pageConfig = typeof contentMap[pageKey] === 'string'
          ? JSON.parse(contentMap[pageKey])
          : contentMap[pageKey];
        if (pageConfig.global) Object.assign(mergedConfig.global, pageConfig.global);
        if (pageConfig.elements) Object.assign(mergedConfig.elements, pageConfig.elements);
      } catch (err) {
        console.warn('⚠️ [Smax CMS] Failed to parse page_typography:', err);
      }
    }

    applyTypography(mergedConfig);

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
