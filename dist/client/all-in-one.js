(() => {
  const catalog = window.SMAX_FEATURES;
  if (!catalog?.groups?.length) return;

  const nav = document.querySelector('[data-sidebar-nav]');
  const stream = document.querySelector('[data-feature-stream]');
  const search = document.querySelector('[data-feature-search]');
  const empty = document.querySelector('[data-empty]');
  const sidebar = document.querySelector('.aio-sidebar');
  const backdrop = document.querySelector('[data-sidebar-backdrop]');
  const openButton = document.querySelector('[data-sidebar-open]');
  const closeButton = document.querySelector('[data-sidebar-close]');

  const normalize = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

  const featureNumber = new Map();
  let sequence = 1;
  catalog.groups.forEach((group) => {
    group.features.forEach((feature) => {
      featureNumber.set(feature.id, String(sequence).padStart(2, '0'));
      sequence += 1;
    });
  });

  nav.innerHTML = catalog.groups.map((group, index) => `
    <details class="aio-nav-group" data-nav-group="${group.id}" ${index === 0 ? 'open' : ''}>
      <summary>
        <span>${group.title}</span>
        <span class="aio-nav-sign" aria-hidden="true"></span>
      </summary>
      <div class="aio-nav-links">
        ${group.features.map((feature) => `
          <a class="aio-nav-link" href="#${feature.id}" data-feature-link="${feature.id}">
            <span>${feature.title}</span>
            <small>${featureNumber.get(feature.id)}</small>
          </a>
        `).join('')}
      </div>
    </details>
  `).join('');

  stream.innerHTML = catalog.groups.map((group, groupIndex) => `
    <section class="aio-group aio-tone-${(groupIndex % 4) + 1}" id="${group.id}" data-group-section="${group.id}">
      <header class="aio-group-hero">
        <div class="aio-group-copy">
          <span class="aio-group-index">Nhóm ${String(groupIndex + 1).padStart(2, '0')}</span>
          <p>${group.title}</p>
          <h2>${group.promise}</h2>
          <div>${group.description}</div>
        </div>
        <figure class="aio-group-visual">
          <img src="${group.hero}" alt="Minh họa ${group.title} trên Smax" loading="lazy">
        </figure>
      </header>

      ${group.features.map((feature) => `
        <article class="aio-feature" id="${feature.id}" data-feature-section="${feature.id}" data-search="${normalize(`${group.title} ${feature.title} ${feature.headline} ${feature.description} ${feature.cards.map((card) => `${card.title} ${card.description}`).join(' ')}`)}">
          <div class="aio-feature-heading">
            <div class="aio-feature-label"><strong>${featureNumber.get(feature.id)}</strong><span>${feature.title}</span></div>
            <div class="aio-feature-heading-grid">
              <h3>${feature.headline}</h3>
              <p>${feature.description}</p>
            </div>
          </div>
          <div class="aio-card-grid">
            ${feature.cards.map((card, cardIndex) => `
              <section class="aio-card ${cardIndex % 2 ? 'aio-card-warm' : ''}">
                <figure class="aio-card-media">
                  <img src="${card.image}" alt="${card.title}" loading="lazy">
                </figure>
                <div class="aio-card-copy">
                  <h4>${card.title}</h4>
                  <p>${card.description}</p>
                  <a href="#lien-he">Tìm hiểu thêm <span aria-hidden="true">↗</span></a>
                </div>
              </section>
            `).join('')}
          </div>
        </article>
      `).join('')}
    </section>
  `).join('');

  const closeSidebar = () => {
    sidebar?.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    document.body.classList.remove('aio-sidebar-open');
    openButton?.setAttribute('aria-expanded', 'false');
  };

  const openSidebar = () => {
    sidebar?.classList.add('is-open');
    backdrop?.classList.add('is-open');
    document.body.classList.add('aio-sidebar-open');
    openButton?.setAttribute('aria-expanded', 'true');
  };

  openButton?.addEventListener('click', openSidebar);
  closeButton?.addEventListener('click', closeSidebar);
  backdrop?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSidebar();
  });

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('[data-feature-link]');
    if (!link) return;
    nav.querySelectorAll('.aio-nav-link').forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
    if (window.innerWidth < 1020) closeSidebar();
  });

  const applySearch = () => {
    const term = normalize(search?.value.trim());
    let visibleFeatures = 0;

    catalog.groups.forEach((group) => {
      const groupElement = document.querySelector(`[data-group-section="${group.id}"]`);
      const groupNav = document.querySelector(`[data-nav-group="${group.id}"]`);
      let visibleInGroup = 0;

      group.features.forEach((feature) => {
        const featureElement = document.querySelector(`[data-feature-section="${feature.id}"]`);
        const link = document.querySelector(`[data-feature-link="${feature.id}"]`);
        const matched = !term || featureElement.dataset.search.includes(term);
        featureElement.hidden = !matched;
        if (link) link.hidden = !matched;
        if (matched) {
          visibleInGroup += 1;
          visibleFeatures += 1;
        }
      });

      groupElement.hidden = visibleInGroup === 0;
      groupNav.hidden = visibleInGroup === 0;
      if (term && visibleInGroup > 0) groupNav.open = true;
    });

    empty.hidden = visibleFeatures > 0;
  };

  search?.addEventListener('input', applySearch);

  const featureSections = [...document.querySelectorAll('[data-feature-section]')];
  const activeObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting && !entry.target.hidden)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    const id = visible.target.dataset.featureSection;
    nav.querySelectorAll('.aio-nav-link').forEach((link) => {
      link.classList.toggle('is-active', link.dataset.featureLink === id);
    });
    const group = visible.target.closest('[data-group-section]')?.dataset.groupSection;
    const details = document.querySelector(`[data-nav-group="${group}"]`);
    if (details && !details.open) details.open = true;
  }, { rootMargin: '-18% 0px -62% 0px', threshold: [0.04, 0.2, 0.45] });

  featureSections.forEach((section) => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.aio-reveal, .aio-group-hero, .aio-feature, .aio-source-card, .aio-final-card')
    .forEach((element) => revealObserver.observe(element));
})();
