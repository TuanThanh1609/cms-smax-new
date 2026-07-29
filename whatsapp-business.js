(function () {
  "use strict";

  var FORM_VERSION = "2026-07-29";
  var SUBMIT_LOCK_KEY = "smax_whatsapp_consultation_last_submit";
  var SUBMIT_LOCK_MS = 15000;

  function valuesOf(form, name) {
    return Array.from(form.querySelectorAll('input[name="' + name + '"]:checked')).map(function (input) {
      return input.value;
    });
  }

  function createUuid() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (character) {
      var random = Math.random() * 16 | 0;
      var value = character === "x" ? random : (random & 3 | 8);
      return value.toString(16);
    });
  }

  function getIdentity() {
    var visitorId = localStorage.getItem("smax_visitor_id");
    var sessionId = sessionStorage.getItem("smax_session_id");

    if (!visitorId) {
      visitorId = createUuid();
      localStorage.setItem("smax_visitor_id", visitorId);
    }

    if (!sessionId) {
      sessionId = createUuid();
      sessionStorage.setItem("smax_session_id", sessionId);
    }

    return { visitorId: visitorId, sessionId: sessionId };
  }

  function getAttribution() {
    var params = new URLSearchParams(window.location.search);
    var fields = ["utm_source", "utm_medium", "utm_campaign"];
    var attribution = {};

    fields.forEach(function (field) {
      var value = params.get(field);
      if (value) {
        sessionStorage.setItem("smax_" + field, value);
      }
      attribution[field] = value || sessionStorage.getItem("smax_" + field) || null;
    });

    return attribution;
  }

  async function submitLead(payload) {
    var configResponse = await fetch("/supabase-config.json?t=" + Date.now(), { cache: "no-store" });
    if (!configResponse.ok) {
      throw new Error("Không tải được cấu hình gửi dữ liệu.");
    }

    var config = await configResponse.json();
    if (!config.supabase_url || !config.supabase_anon_key) {
      throw new Error("Thiếu cấu hình gửi dữ liệu.");
    }

    var identity = getIdentity();
    var attribution = getAttribution();
    var body = {
      visitor_id: identity.visitorId,
      session_id: identity.sessionId,
      event_name: "whatsapp_business_consultation_submitted",
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || null,
      event_data: payload,
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign
    };

    var response = await fetch(config.supabase_url.replace(/\/$/, "") + "/rest/v1/smax_tracking_events", {
      method: "POST",
      headers: {
        apikey: config.supabase_anon_key,
        Authorization: "Bearer " + config.supabase_anon_key,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(body),
      keepalive: true
    });

    if (!response.ok) {
      throw new Error("Không thể gửi đăng ký lúc này.");
    }
  }

  function initForm() {
    var form = document.getElementById("whatsapp-consultation-form");
    if (!form) return;

    var panels = Array.from(form.querySelectorAll("[data-step]"));
    var progress = Array.from(form.querySelectorAll("[data-progress]"));
    var nextButton = form.querySelector("[data-next]");
    var backButton = form.querySelector("[data-back]");
    var message = document.getElementById("whatsapp-form-message");

    function setMessage(text, success) {
      message.textContent = text || "";
      message.classList.toggle("is-success", Boolean(success));
    }

    function showStep(step) {
      panels.forEach(function (panel) {
        panel.hidden = Number(panel.dataset.step) !== step;
      });
      progress.forEach(function (item) {
        item.classList.toggle("is-active", Number(item.dataset.progress) <= step);
      });
      setMessage("");
    }

    function validateStepOne() {
      var requiredFields = Array.from(form.querySelectorAll('[data-step="1"] [required]'));
      var invalidField = requiredFields.find(function (field) {
        return !field.checkValidity();
      });

      if (invalidField) {
        invalidField.reportValidity();
        setMessage("Vui lòng hoàn thành các thông tin bắt buộc trước khi tiếp tục.");
        return false;
      }
      return true;
    }

    nextButton.addEventListener("click", function () {
      if (!validateStepOne()) return;
      showStep(2);
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    backButton.addEventListener("click", function () {
      showStep(1);
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      setMessage("");

      if (form.elements.company_website_confirm.value) return;
      if (!form.reportValidity()) return;

      var goals = valuesOf(form, "goals");
      if (!goals.length) {
        setMessage("Vui lòng chọn ít nhất một mục tiêu ưu tiên.");
        var goalsInput = form.querySelector('input[name="goals"]');
        var goalsFieldset = goalsInput ? goalsInput.closest("fieldset") : null;
        if (goalsFieldset) goalsFieldset.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      var lastSubmit = Number(sessionStorage.getItem(SUBMIT_LOCK_KEY) || 0);
      if (Date.now() - lastSubmit < SUBMIT_LOCK_MS) {
        setMessage("Đăng ký vừa được gửi. Vui lòng chờ một chút trước khi gửi lại.");
        return;
      }

      var submitButton = form.querySelector('button[type="submit"]');
      var originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.textContent = "Đang gửi đăng ký";

      try {
        await submitLead({
          form_version: FORM_VERSION,
          full_name: form.elements.full_name.value.trim(),
          company: form.elements.company.value.trim(),
          phone: form.elements.phone.value.trim(),
          email: form.elements.email.value.trim(),
          role: form.elements.role.value.trim(),
          business_url: form.elements.business_url.value.trim(),
          current_whatsapp: form.elements.current_whatsapp.value,
          conversation_volume: form.elements.conversation_volume.value,
          goals: goals,
          systems: valuesOf(form, "systems"),
          timeline: form.elements.timeline.value,
          challenge: form.elements.challenge.value.trim(),
          consent: form.elements.consent.checked,
          submitted_at: new Date().toISOString()
        });

        sessionStorage.setItem(SUBMIT_LOCK_KEY, String(Date.now()));
        setMessage("Smax đã nhận thông tin. Đội ngũ sẽ liên hệ để chuẩn bị bản thiết kế phù hợp với doanh nghiệp của bạn.", true);
        form.reset();
        showStep(1);
        setMessage("Smax đã nhận thông tin. Đội ngũ sẽ liên hệ để chuẩn bị bản thiết kế phù hợp với doanh nghiệp của bạn.", true);
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      } catch (error) {
        setMessage("Chưa thể gửi đăng ký lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp với Smax.");
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    });
  }

  function initAccordions() {
    var accordion = document.querySelector("[data-horizontal-accordion]");
    if (!accordion) return;

    var items = Array.from(accordion.querySelectorAll(".wa-accordion-item"));
    items.forEach(function (item) {
      var button = item.querySelector("button");
      if (!button) return;

      function activate() {
        items.forEach(function (candidate) {
          var isActive = candidate === item;
          candidate.classList.toggle("is-active", isActive);
          var candidateButton = candidate.querySelector("button");
          if (candidateButton) candidateButton.setAttribute("aria-expanded", isActive ? "true" : "false");
        });
      }

      button.addEventListener("click", activate);
      item.addEventListener("mouseenter", function () {
        if (window.matchMedia("(min-width: 901px) and (hover: hover)").matches) {
          activate();
        }
      });
    });
  }

  function initAnchorScroll() {
    document.querySelectorAll('.wa-page a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var selector = link.getAttribute("href");
        if (!selector || selector === "#") return;
        var target = document.querySelector(selector);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function splitScrubText() {
    document.querySelectorAll("[data-scrub-text]").forEach(function (element) {
      if (element.dataset.scrubReady === "true") return;
      var words = element.textContent.trim().split(/\s+/);
      element.textContent = "";
      words.forEach(function (word, index) {
        var span = document.createElement("span");
        span.textContent = word + (index < words.length - 1 ? " " : "");
        element.appendChild(span);
      });
      element.dataset.scrubReady = "true";
    });
  }

  function initFallbackReveal() {
    var elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) return;

    elements.forEach(function (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(26px)";
      element.style.transition = "opacity 650ms ease, transform 650ms cubic-bezier(.2,.8,.2,1)";
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initGsap() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
      document.querySelectorAll("[data-scrub-text] span").forEach(function (word) {
        word.style.opacity = "1";
      });
      initFallbackReveal();
      return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("[data-reveal]").forEach(function (element) {
      gsap.fromTo(element,
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.86,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true
          }
        }
      );
    });

    gsap.utils.toArray("[data-scrub-text]").forEach(function (element) {
      var words = element.querySelectorAll("span");
      gsap.fromTo(words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.7
          }
        }
      );
    });

    var heroStage = document.querySelector("[data-hero-stage]");
    if (heroStage) {
      gsap.fromTo(heroStage,
        { scale: 0.84, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.2
        }
      );
      gsap.to(heroStage, {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: ".wa-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });
    }

    var journeyAside = document.querySelector("[data-journey-pin]");
    var journeyLayout = journeyAside && journeyAside.closest(".wa-journey-layout");
    if (journeyAside && journeyLayout && window.matchMedia("(min-width: 901px)").matches) {
      ScrollTrigger.create({
        trigger: journeyLayout,
        start: "top 108px",
        end: "bottom bottom",
        pin: journeyAside,
        pinSpacing: false
      });
    }

    var cards = gsap.utils.toArray("[data-journey-card]");
    var navLinks = Array.from(document.querySelectorAll(".wa-journey-nav a"));
    cards.forEach(function (card, index) {
      gsap.fromTo(card,
        { scale: 0.88, opacity: 0.42 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 50%",
            scrub: 0.6,
            onEnter: function () {
              navLinks.forEach(function (link, linkIndex) {
                link.classList.toggle("is-active", linkIndex === index);
              });
            },
            onEnterBack: function () {
              navLinks.forEach(function (link, linkIndex) {
                link.classList.toggle("is-active", linkIndex === index);
              });
            }
          }
        }
      );

      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.965,
          opacity: 0.24,
          filter: "brightness(0.72)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 76%",
            end: "top 32%",
            scrub: true
          }
        });
      }
    });

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    }, { once: true });
  }

  function boot() {
    getAttribution();
    splitScrubText();
    initForm();
    initAccordions();
    initAnchorScroll();
    initGsap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
