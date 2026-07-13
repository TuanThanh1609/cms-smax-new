/**
 * SMAX.AI - User Behavior Tracking SDK (Lightweight & High Performance)
 * 
 * Tracks page_view, click (with coordinates for heatmap), scroll_depth, and heartbeat (duration)
 * Sends events directly to Supabase REST API using native fetch with keepalive.
 */
(function() {
  let config = null;
  let visitorId = null;
  let sessionId = null;
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
    // A. Page View Event
    sendEvent('page_view');

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
        eventData.href = interactiveElement.getAttribute('href') || '';
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
      event_data: eventData,
      user_agent: userAgent,
      screen_width: screenWidth,
      screen_height: screenHeight
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
