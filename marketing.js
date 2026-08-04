(() => {
  const initialiseMarketingOs = () => {
    const root = document.querySelector('[data-marketing-os]');
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll('[data-marketing-feature]'));
    const panels = Array.from(root.querySelectorAll('[data-marketing-panel]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const activate = (tab, shouldAnimate = true) => {
      const feature = tab.dataset.marketingFeature;
      const panel = panels.find((item) => item.dataset.marketingPanel === feature);
      if (!panel) return;

      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((item) => {
        const selected = item === panel;
        item.classList.toggle('is-active', selected);
        item.hidden = !selected;
      });

      panel.setAttribute('aria-labelledby', tab.id);

      if (shouldAnimate && !reducedMotion && window.gsap) {
        window.gsap.fromTo(panel, { y: 20 }, { y: 0, duration: 0.42, ease: 'power2.out', overwrite: 'auto' });
      }
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let targetIndex = index;
        if (event.key === 'ArrowRight') targetIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') targetIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') targetIndex = 0;
        if (event.key === 'End') targetIndex = tabs.length - 1;
        tabs[targetIndex].focus();
        activate(tabs[targetIndex]);
      });
    });

    if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);
    const stage = root.querySelector('.marketing-os-stage');
    if (stage) {
      window.gsap.fromTo(
        stage,
        { y: 34 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top 88%',
            end: 'top 40%',
            scrub: true
          }
        }
      );
    }

  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseMarketingOs, { once: true });
  } else {
    initialiseMarketingOs();
  }
})();
