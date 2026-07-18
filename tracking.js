/**
 * SMAX.AI - User Behavior Tracking SDK (Lightweight & High Performance)
 * 
 * Tracks page_view, click (with coordinates for heatmap), scroll_depth, and heartbeat (duration)
 * Sends events directly to Supabase REST API using native fetch with keepalive.
 */
(function() {
  // Prevent tracking on Smax CMS admin panel itself
  if (window.location.pathname.toLowerCase().includes('admin.html')) {
    return;
  }

  let config = null;
  let visitorId = null;
  let sessionId = null;
  let utmSource = null;
  let utmMedium = null;
  let utmCampaign = null;
  let lastTrackedPath = null;
  const scrollMilestones = { 25: false, 50: false, 75: false, 100: false };

  // 1. Initialize identifiers
  initIdentifiers();

  // 2. Load Supabase configuration and start tracking
  initTracking();

  function initIdentifiers() {
    // Visitor ID (permanent)
    visitorId = localStorage.getItem('smax_visitor_id');
    if (!visitorId) {
      visitorId = generateUUID();
      localStorage.setItem('smax_visitor_id', visitorId);
    }

    // Session ID (temporary, expires when browser tab closes)
    sessionId = sessionStorage.getItem('smax_session_id');
    if (!sessionId) {
      sessionId = generateUUID();
      sessionStorage.setItem('smax_session_id', sessionId);
    }

    // Parse and persist UTM Campaign Parameters
    const urlParams = new URLSearchParams(window.location.search);
    utmSource = urlParams.get('utm_source');
    utmMedium = urlParams.get('utm_medium');
    utmCampaign = urlParams.get('utm_campaign');

    if (utmSource) sessionStorage.setItem('smax_utm_source', utmSource);
    else utmSource = sessionStorage.getItem('smax_utm_source');

    if (utmMedium) sessionStorage.setItem('smax_utm_medium', utmMedium);
    else utmMedium = sessionStorage.getItem('smax_utm_medium');

    if (utmCampaign) sessionStorage.setItem('smax_utm_campaign', utmCampaign);
    else utmCampaign = sessionStorage.getItem('smax_utm_campaign');
  }

  async function initTracking() {
    try {
      // Fetch Supabase configuration dynamically
      const res = await fetch('/supabase-config.json?t=' + Date.now());
      if (!res.ok) {
        // Fallback to localStorage if previewing or file not built yet
        const localUrl = localStorage.getItem('supabase_url');
        const localKey = localStorage.getItem('supabase_anon_key');
        if (localUrl && localKey) {
          config = { supabase_url: localUrl, supabase_anon_key: localKey };
        } else {
          return; // Silent fail if no credentials found
        }
      } else {
        config = await res.json();
      }

      if (!config.supabase_url || !config.supabase_anon_key) {
        return;
      }

      // Start capturing events
      startListeners();

    } catch (err) {
      console.warn('[Smax Tracking] Tracking disabled:', err.message);
    }
  }

  function startListeners() {
    // A. Page View Event (SPA & Hash aware)
    sendPageview();

    // B. Click Event & Heatmap Coordinates (using event delegation)
    document.addEventListener('click', function(event) {
      const docWidth = document.documentElement.scrollWidth || document.body.scrollWidth || 1;
      const clickX = event.pageX;
      const clickY = event.pageY;
      const xPct = parseFloat(((clickX / docWidth) * 100).toFixed(2));

      let target = event.target;
      let interactiveElement = null;

      // Traverse up to 5 levels to find relevant interactive element
      for (let i = 0; i < 5; i++) {
        if (!target || target === document.body) break;

        const tagName = target.tagName;
        const isLink = tagName === 'A';
        const isButton = tagName === 'BUTTON';
        const hasClassBtn = target.classList && (
          target.classList.contains('btn') || 
          target.classList.contains('cta') || 
          [...target.classList].some(c => c.includes('btn') || c.includes('cta'))
        );
        const hasCmsAttr = target.hasAttribute('data-cms') || target.hasAttribute('data-cms-img');

        if (isLink || isButton || hasClassBtn || hasCmsAttr) {
          interactiveElement = target;
          break;
        }
        target = target.parentNode;
      }

      const eventData = {
        click_x: clickX,
        click_y: clickY,
        x_pct: xPct,
        element_tag: interactiveElement ? interactiveElement.tagName : event.target.tagName,
        element_id: interactiveElement ? interactiveElement.id : (event.target.id || ''),
        element_text: (interactiveElement ? interactiveElement.innerText : (event.target.innerText || '')).trim().substring(0, 100),
        element_classes: interactiveElement ? interactiveElement.className : (event.target.className || '')
      };

      if (interactiveElement && interactiveElement.tagName === 'A') {
        const href = interactiveElement.getAttribute('href') || '';
        eventData.href = href;

        // Plausible Outbound Link & File Download detection
        try {
          if (href && href.startsWith('http')) {
            const targetUrl = new URL(href, window.location.href);
            const isExternal = targetUrl.hostname !== window.location.hostname;
            const urlText = eventData.element_text || 'Link ngoài';
            
            // Outbound click
            if (isExternal) {
              sendEvent('outbound_click', {
                destination_url: href,
                link_text: urlText
              });
            }
            
            // File download
            const fileExtensions = /\.(pdf|zip|rar|csv|docx|xlsx|pptx|mp3|mp4)$/i;
            if (fileExtensions.test(targetUrl.pathname)) {
              sendEvent('file_download', {
                file_url: href,
                file_name: urlText
              });
            }
          }
        } catch (err) {}
      }

      // Button Click detection (Goals/Conversions)
      if (interactiveElement) {
        const isButtonTag = interactiveElement.tagName === 'BUTTON' || 
                            (interactiveElement.tagName === 'INPUT' && ['button', 'submit'].includes(interactiveElement.getAttribute('type')));
        const isLinkBtn = interactiveElement.tagName === 'A' && (
          interactiveElement.classList.contains('btn') || 
          interactiveElement.classList.contains('cta') || 
          [...interactiveElement.classList].some(c => c.includes('btn') || c.includes('cta') || c.includes('button'))
        );
        const btnText = eventData.element_text.toLowerCase();
        const isBtnKeywords = btnText.includes('đăng ký') || 
                              btnText.includes('đăng nhập') || 
                              btnText.includes('tư vấn') || 
                              btnText.includes('nhận') || 
                              btnText.includes('liên hệ') || 
                              btnText.includes('dùng thử') || 
                              btnText.includes('login') || 
                              btnText.includes('register') || 
                              btnText.includes('sign up');

        if (isButtonTag || isLinkBtn || isBtnKeywords) {
          sendEvent('button_click', {
            element_text: eventData.element_text,
            element_tag: eventData.element_tag,
            element_id: eventData.element_id
          });
        }
      }

      sendEvent('click', eventData);
    });

    // C. Scroll Depth Event (throttled)
    window.addEventListener('scroll', throttle(function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPct = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPct >= milestone && !scrollMilestones[milestone]) {
          scrollMilestones[milestone] = true;
          sendEvent('scroll', { depth_pct: milestone });
        }
      });
    }, 500));

    // D. Heartbeats (Time on Page)
    scheduleHeartbeat();

    // E. Capture JS Errors
    window.addEventListener('error', function(event) {
      sendEvent('js_error', {
        message: event.message || 'Unknown Javascript Error',
        filename: event.filename || '',
        lineno: event.lineno || 0,
        colno: event.colno || 0,
        stack: event.error ? event.error.stack : ''
      });
    });

    // F. Capture Web Vitals (FCP, LCP, CLS)
    let clsValue = 0;
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          const lcpEntry = performance.getEntriesByType('paint').find(e => e.name === 'largest-contentful-paint');
          const fcpEntry = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
          
          sendEvent('web_vitals', {
            fcp_ms: fcpEntry ? Math.round(fcpEntry.startTime) : 0,
            lcp_ms: lcpEntry ? Math.round(lcpEntry.startTime) : 0,
            cls: parseFloat(clsValue.toFixed(4))
          });
        } catch (err) {}
      }, 4000);
    });

    // G. SPA / Hash Change listeners
    window.addEventListener('hashchange', () => {
      sendPageview();
    });

    const originalPushState = history.pushState;
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      sendPageview();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function() {
      originalReplaceState.apply(this, arguments);
      sendPageview();
    };
  }

  function sendPageview() {
    const currentPath = window.location.pathname + window.location.hash + window.location.search;
    if (currentPath === lastTrackedPath) return;
    lastTrackedPath = currentPath;

    // Plausible 404 detector
    const title = (document.title || '').toLowerCase();
    const is404 = title.includes('404') || title.includes('page not found') || title.includes('không tìm thấy trang');

    sendEvent('page_view', { is_404: is404 });
  }

  async function sendEvent(eventName, eventData = {}) {
    if (!config) return;

    const pagePath = window.location.pathname || '/';
    const pageTitle = document.title || '';
    const referrer = document.referrer || '';
    const userAgent = navigator.userAgent || '';
    const screenWidth = window.innerWidth || screen.width || 0;
    const screenHeight = window.innerHeight || screen.height || 0;

    const body = {
      visitor_id: visitorId,
      session_id: sessionId,
      event_name: eventName,
      page_path: pagePath,
      page_title: pageTitle,
      referrer: referrer,
      event_data: (eventName === 'js_error' || eventName === 'web_vitals') ? {} : eventData,
      error_details: eventName === 'js_error' ? eventData : null,
      performance_metrics: eventName === 'web_vitals' ? eventData : null,
      user_agent: userAgent,
      screen_width: screenWidth,
      screen_height: screenHeight,
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null
    };

    try {
      // Use native fetch to POST events to REST API endpoint
      await fetch(`${config.supabase_url.replace(/\/$/, '')}/rest/v1/smax_tracking_events`, {
        method: 'POST',
        headers: {
          'apikey': config.supabase_anon_key,
          'Authorization': `Bearer ${config.supabase_anon_key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(body),
        keepalive: true
      });
    } catch (err) {
      // Fail silently to prevent console pollution for clients
    }
  }

  // Helpers
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Heartbeat scheduler
  const intervals = [10, 30, 60, 120];
  let currentIntervalIdx = 0;

  function scheduleHeartbeat() {
    if (currentIntervalIdx >= intervals.length) {
      // Repeat heartbeat every 2 minutes thereafter
      setInterval(() => {
        sendEvent('heartbeat', {
          duration_sec: intervals[intervals.length - 1] + (currentIntervalIdx - intervals.length + 1) * 120
        });
        currentIntervalIdx++;
      }, 120000);
      return;
    }

    const delay = currentIntervalIdx === 0 ? intervals[0] : (intervals[currentIntervalIdx] - intervals[currentIntervalIdx - 1]);
    setTimeout(() => {
      sendEvent('heartbeat', {
        duration_sec: intervals[currentIntervalIdx]
      });
      currentIntervalIdx++;
      scheduleHeartbeat();
    }, delay * 1000);
  }
})();
