(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCarousel() {
    const cards = Array.from(document.querySelectorAll('.sp-perspective-card'));
    const previous = document.querySelector('[data-carousel-prev]');
    const next = document.querySelector('[data-carousel-next]');
    if (!cards.length || !previous || !next) return;

    let activeIndex = 0;
    const show = (index) => {
      activeIndex = (index + cards.length) % cards.length;
      cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === activeIndex));
    };

    previous.addEventListener('click', () => show(activeIndex - 1));
    next.addEventListener('click', () => show(activeIndex + 1));
  }

  function initForm() {
    const form = document.querySelector('[data-consult-form]');
    const status = document.querySelector('[data-form-status]');
    if (!form || !status) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = 'Đã ghi nhận. Đội ngũ Smax sẽ liên hệ để cùng bạn lập bản đồ quy trình phù hợp.';
      form.reset();
    });
  }

  function initMotion() {
    if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    window.gsap.from('[data-hero-visual]', {
      opacity: 0,
      y: 44,
      scale: 0.94,
      duration: 1.05,
      ease: 'power3.out',
      delay: 0.18
    });

    window.gsap.utils.toArray('[data-reveal]').forEach((element) => {
      window.gsap.from(element, {
        y: 34,
        duration: 0.82,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true }
      });
    });

    window.gsap.utils.toArray('[data-scale-media]').forEach((element) => {
      if (element.hasAttribute('data-hero-visual')) return;
      window.gsap.fromTo(element,
        { opacity: 0.45, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            end: 'center 58%',
            scrub: 0.7
          }
        }
      );
    });

    window.ScrollTrigger.matchMedia({
      '(min-width: 1025px)': function () {
        const sticky = document.querySelector('[data-compare-sticky]');
        const section = document.querySelector('.sp-compare-layout');
        if (!sticky || !section) return;
        window.ScrollTrigger.create({
          trigger: sticky,
          start: 'top 112px',
          endTrigger: section,
          end: 'bottom bottom-=80',
          pin: sticky,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });
      }
    });

    const refreshMotion = function () {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    };
    window.addEventListener('load', refreshMotion, { once: true });
    window.setTimeout(refreshMotion, 250);
  }

  window.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initForm();
    initMotion();
  });
})();
