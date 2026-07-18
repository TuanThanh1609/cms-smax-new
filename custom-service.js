(function () {
  const form = document.getElementById('custom-service-form');
  if (!form) return;

  const panels = Array.from(form.querySelectorAll('[data-step]'));
  const progress = Array.from(form.querySelectorAll('[data-progress]'));
  const message = document.getElementById('custom-service-form-message');
  const nextButton = form.querySelector('[data-next]');
  const backButton = form.querySelector('[data-back]');

  function showStep(step) {
    panels.forEach((panel) => { panel.hidden = Number(panel.dataset.step) !== step; });
    progress.forEach((item) => item.classList.toggle('active', Number(item.dataset.progress) <= step));
    message.textContent = '';
    message.className = 'cs-form-message';
  }

  function validateContact() {
    const required = Array.from(form.querySelectorAll('[data-step="1"] [required]'));
    const invalid = required.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      message.textContent = 'Vui lòng hoàn thành các thông tin bắt buộc trước khi tiếp tục.';
      return false;
    }
    return true;
  }

  nextButton.addEventListener('click', function () {
    if (!validateContact()) return;
    showStep(2);
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  backButton.addEventListener('click', function () { showStep(1); });

  function valuesOf(name) {
    return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
  }

  function createUuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      const random = Math.random() * 16 | 0;
      return (char === 'x' ? random : (random & 3 | 8)).toString(16);
    });
  }

  function getIdentity() {
    let visitorId = localStorage.getItem('smax_visitor_id');
    let sessionId = sessionStorage.getItem('smax_session_id');
    if (!visitorId) {
      visitorId = createUuid();
      localStorage.setItem('smax_visitor_id', visitorId);
    }
    if (!sessionId) {
      sessionId = createUuid();
      sessionStorage.setItem('smax_session_id', sessionId);
    }
    return { visitorId, sessionId };
  }

  async function submitSurvey(payload) {
    const response = await fetch('/supabase-config.json?t=' + Date.now());
    if (!response.ok) throw new Error('Không tải được cấu hình gửi dữ liệu.');
    const config = await response.json();
    if (!config.supabase_url || !config.supabase_anon_key) throw new Error('Thiếu cấu hình gửi dữ liệu.');
    const identity = getIdentity();
    const params = new URLSearchParams(window.location.search);
    const body = {
      visitor_id: identity.visitorId,
      session_id: identity.sessionId,
      event_name: 'custom_service_survey_submitted',
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || null,
      event_data: payload,
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      utm_source: params.get('utm_source') || sessionStorage.getItem('smax_utm_source'),
      utm_medium: params.get('utm_medium') || sessionStorage.getItem('smax_utm_medium'),
      utm_campaign: params.get('utm_campaign') || sessionStorage.getItem('smax_utm_campaign')
    };
    const result = await fetch(`${config.supabase_url}/rest/v1/smax_tracking_events`, {
      method: 'POST',
      headers: {
        apikey: config.supabase_anon_key,
        Authorization: `Bearer ${config.supabase_anon_key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(body),
      keepalive: true
    });
    if (!result.ok) throw new Error('Không thể gửi khảo sát lúc này.');
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (form.elements.company_website_confirm.value) return;
    const goals = valuesOf('goals');
    if (!goals.length) {
      message.textContent = 'Vui lòng chọn ít nhất một mục tiêu ưu tiên.';
      return;
    }
    const submitButton = form.querySelector('[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = 'Đang gửi khảo sát…';
    message.textContent = '';
    try {
      await submitSurvey({
        form_version: '2026-07-17',
        full_name: form.elements.full_name.value.trim(),
        company: form.elements.company.value.trim(),
        phone: form.elements.phone.value.trim(),
        email: form.elements.email.value.trim(),
        role: form.elements.role.value.trim(),
        company_size: form.elements.company_size.value,
        business_url: form.elements.business_url.value.trim(),
        goals,
        channels: valuesOf('channels'),
        systems: valuesOf('systems'),
        conversation_volume: form.elements.conversation_volume.value,
        service_team: form.elements.service_team.value,
        data_readiness: form.elements.data_readiness.value,
        timeline: form.elements.timeline.value,
        challenge: form.elements.challenge.value.trim(),
        submitted_at: new Date().toISOString()
      });
      message.className = 'cs-form-message success';
      message.textContent = 'Smax đã nhận khảo sát. Đội ngũ tư vấn sẽ liên hệ để trao đổi về phạm vi phù hợp.';
      form.reset();
      submitButton.textContent = 'Đã gửi thành công';
    } catch (error) {
      message.className = 'cs-form-message';
      message.textContent = 'Chưa thể gửi khảo sát. Vui lòng thử lại sau hoặc liên hệ trực tiếp với Smax.';
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
})();
