(function () {
  "use strict";

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

  function initAccordions() {
    document.querySelectorAll("[data-accordion-group]").forEach(function (group) {
      var items = Array.from(group.querySelectorAll(".sr-accordion"));
      items.forEach(function (item) {
        var button = item.querySelector("button");
        if (!button) return;
        button.addEventListener("click", function () {
          items.forEach(function (candidate) {
            var candidateButton = candidate.querySelector("button");
            var active = candidate === item;
            candidate.classList.toggle("is-active", active);
            if (candidateButton) candidateButton.setAttribute("aria-expanded", active ? "true" : "false");
          });
        });
      });
    });
  }

  function initShoppingTabs() {
    document.querySelectorAll("[data-shopping-tabs]").forEach(function (component) {
      var tabs = Array.from(component.querySelectorAll("[data-shopping-tab]"));
      var panels = Array.from(component.querySelectorAll("[data-shopping-panel]"));

      function activateTab(tab, shouldFocus) {
        var target = tab.dataset.shoppingTab;

        tabs.forEach(function (candidate) {
          var active = candidate === tab;
          candidate.classList.toggle("is-active", active);
          candidate.setAttribute("aria-selected", active ? "true" : "false");
          candidate.setAttribute("tabindex", active ? "0" : "-1");
        });

        panels.forEach(function (panel) {
          var active = panel.dataset.shoppingPanel === target;
          panel.classList.toggle("is-active", active);
          panel.hidden = !active;
        });

        if (shouldFocus) tab.focus();
      }

      tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
          activateTab(tab, false);
        });

        tab.addEventListener("keydown", function (event) {
          var nextIndex = index;
          if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
          if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") nextIndex = 0;
          if (event.key === "End") nextIndex = tabs.length - 1;
          if (nextIndex === index && !["Home", "End"].includes(event.key)) return;
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        });
      });
    });
  }

  function initForms() {
    document.querySelectorAll("[data-plan-form]").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;
        var status = form.querySelector("[data-form-status]");
        var button = form.querySelector('button[type="submit"]');
        if (button) {
          button.disabled = true;
          button.textContent = "Đang ghi nhận thông tin";
        }
        window.setTimeout(function () {
          if (status) {
            status.textContent = "Thông tin đã được ghi nhận. Đội ngũ Smax sẽ liên hệ để hoàn thiện kế hoạch phù hợp với shop.";
          }
          if (button) {
            button.disabled = false;
            button.textContent = document.body.classList.contains("sr-body-c")
              ? "Nhận bản thiết kế hệ thống"
              : "Nhận kế hoạch triển khai";
          }
          form.reset();
        }, 650);
      });
    });
  }

  function initAnchorScroll() {
    document.querySelectorAll('.sr-page a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initFallbackReveal() {
    var elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    elements.forEach(function (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(28px)";
      element.style.transition = "opacity 650ms ease, transform 650ms cubic-bezier(.2,.8,.2,1)";
      observer.observe(element);
    });
  }

  function initGsap() {
    if (!window.gsap || !window.ScrollTrigger) {
      initFallbackReveal();
      return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("[data-reveal]").forEach(function (element) {
      gsap.fromTo(element,
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.7
          }
        }
      );
    });

    document.querySelectorAll("[data-hero-visual]").forEach(function (visual) {
      gsap.fromTo(visual,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.14,
          clearProps: "transform,opacity"
        }
      );
    });

    var journeyAside = document.querySelector("[data-pin-aside]");
    var journeyLayout = journeyAside && journeyAside.closest(".sr-journey-layout");
    if (journeyAside && journeyLayout && window.matchMedia("(min-width: 901px)").matches) {
      ScrollTrigger.create({
        trigger: journeyLayout,
        start: "top 112px",
        end: "bottom bottom",
        pin: journeyAside,
        pinSpacing: false
      });
    }

    var journeyCards = gsap.utils.toArray("[data-journey-card]");
    journeyCards.forEach(function (card, index) {
      gsap.fromTo(card,
        { scale: 0.94, opacity: 0.42 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 38%",
            scrub: 0.8
          }
        }
      );

      var stageLink = document.querySelector('.sr-stage-nav a[href="#' + card.id + '"]');
      if (stageLink) {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onToggle: function (self) {
            if (!self.isActive) return;
            document.querySelectorAll(".sr-stage-nav a").forEach(function (link) {
              link.classList.toggle("is-active", link === stageLink);
            });
          }
        });
      }

      if (index < journeyCards.length - 1) {
        gsap.to(card, {
          scale: 0.965,
          opacity: 0.22,
          ease: "none",
          scrollTrigger: {
            trigger: journeyCards[index + 1],
            start: "top 76%",
            end: "top 24%",
            scrub: true
          }
        });
      }
    });

    var systemPin = document.querySelector("[data-system-pin]");
    var systemLayout = systemPin && systemPin.closest(".sr-operating-layout");
    if (systemPin && systemLayout && window.matchMedia("(min-width: 901px)").matches) {
      ScrollTrigger.create({
        trigger: systemLayout,
        start: "top 110px",
        end: "bottom bottom",
        pin: systemPin,
        pinSpacing: false
      });
    }

    gsap.utils.toArray("[data-engine-card]").forEach(function (card, index) {
      gsap.fromTo(card,
        { scale: 0.88, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.78,
          ease: "power3.out",
          delay: (index % 3) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 89%",
            once: true
          }
        }
      );
    });

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    }, { once: true });
  }

  function boot() {
    splitScrubText();
    initAccordions();
    initShoppingTabs();
    initForms();
    initAnchorScroll();
    initGsap();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
