(() => {
  const cmsCatalog = document.getElementById('automation-map-cms-data');
  let catalog = window.SMAX_FEATURES;
  if (cmsCatalog?.textContent) {
    try {
      catalog = JSON.parse(cmsCatalog.textContent);
    } catch (error) {
      console.warn('[Automation Map] Không thể đọc dữ liệu CMS, đang dùng nội dung mặc định.', error);
    }
  }
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
    <div class="aio-nav-group ${index === 0 ? 'is-open' : ''}" data-nav-group="${group.id}">
      <button class="aio-nav-toggle" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${group.title}</span>
        <span class="aio-nav-sign" aria-hidden="true"></span>
      </button>
      <div class="aio-nav-panel">
        <div class="aio-nav-links">
          ${group.features.map((feature) => `
            <a class="aio-nav-link" href="#${feature.id}" data-feature-link="${feature.id}">
              <span>${feature.title}</span>
              <small>${featureNumber.get(feature.id)}</small>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  const layoutSequence = ['duo', 'panorama', 'split', 'mobile', 'tiles'];

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

      ${group.features.map((feature, featureIndex) => {
        const layout = feature.layout || layoutSequence[(groupIndex * 2 + featureIndex) % layoutSequence.length];
        return `
        <article class="aio-feature aio-layout-${layout}" id="${feature.id}" data-feature-section="${feature.id}" data-layout="${layout}" data-search="${normalize(`${group.title} ${feature.title} ${feature.headline} ${feature.description} ${feature.cards.map((card) => `${card.title} ${card.description}`).join(' ')}`)}">
          <div class="aio-feature-heading">
            <div class="aio-feature-label"><strong>${featureNumber.get(feature.id)}</strong><span>${feature.title}</span></div>
            <div class="aio-feature-heading-grid">
              <h3>${feature.headline}</h3>
              <p>${feature.description}</p>
            </div>
          </div>
          <div class="aio-card-grid aio-card-count-${Math.min(feature.cards.length, 5)}">
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
        </article>`;
      }).join('')}
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
      if (term) setGroupOpen(groupNav, visibleInGroup > 0);
    });

    empty.hidden = visibleFeatures > 0;
  };

  search?.addEventListener('input', applySearch);

  const navGroups = [...nav.querySelectorAll('[data-nav-group]')];
  const featureSections = [...document.querySelectorAll('[data-feature-section]')];
  const groupSections = [...document.querySelectorAll('[data-group-section]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeGroupId = '';
  let activeFeatureId = '';
  let scrollFrame = 0;

  function setGroupOpen(group, shouldOpen) {
    if (!group) return;
    group.classList.toggle('is-open', shouldOpen);
    group.querySelector('.aio-nav-toggle')
      ?.setAttribute('aria-expanded', String(shouldOpen));
  }

  const keepActiveItemVisible = (target) => {
    if (!sidebar || !target || window.innerWidth < 1020) return;
    requestAnimationFrame(() => {
      const sidebarRect = sidebar.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const safeTop = sidebarRect.top + 92;
      const safeBottom = sidebarRect.bottom - 18;
      if (targetRect.top >= safeTop && targetRect.bottom <= safeBottom) return;

      const nextTop = sidebar.scrollTop
        + targetRect.top
        - sidebarRect.top
        - (sidebar.clientHeight - targetRect.height) / 2;
      sidebar.scrollTo({
        top: Math.max(0, nextTop),
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    });
  };

  const setActiveNavigation = (groupId, featureId = '') => {
    if (!groupId || search?.value.trim()) return;
    const groupChanged = groupId !== activeGroupId;
    const featureChanged = featureId !== activeFeatureId;
    if (!groupChanged && !featureChanged) return;

    activeGroupId = groupId;
    activeFeatureId = featureId;
    navGroups.forEach((group) => {
      setGroupOpen(group, group.dataset.navGroup === groupId);
    });

    nav.querySelectorAll('.aio-nav-link').forEach((link) => {
      link.classList.toggle('is-active', link.dataset.featureLink === featureId);
    });

    const activeLink = featureId
      ? nav.querySelector(`[data-feature-link="${featureId}"]`)
      : null;
    const activeGroup = nav.querySelector(`[data-nav-group="${groupId}"]`);
    keepActiveItemVisible(activeLink || activeGroup?.querySelector('.aio-nav-toggle'));
  };

  const updateNavigationFromScroll = () => {
    scrollFrame = 0;
    if (search?.value.trim()) return;

    const marker = Math.min(window.innerHeight * 0.3, 260);
    let currentGroup = groupSections.find((section) => {
      if (section.hidden) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= marker && rect.bottom > marker;
    });

    if (!currentGroup) {
      currentGroup = [...groupSections]
        .filter((section) => !section.hidden && section.getBoundingClientRect().top <= marker)
        .pop() || groupSections.find((section) => !section.hidden);
    }
    if (!currentGroup) return;

    const currentFeature = [...currentGroup.querySelectorAll('[data-feature-section]')]
      .filter((section) => !section.hidden && section.getBoundingClientRect().top <= marker)
      .pop();

    setActiveNavigation(
      currentGroup.dataset.groupSection,
      currentFeature?.dataset.featureSection || ''
    );
  };

  const scheduleNavigationUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(updateNavigationFromScroll);
  };

  navGroups.forEach((group) => {
    group.querySelector('.aio-nav-toggle')?.addEventListener('click', () => {
      const shouldOpen = !group.classList.contains('is-open');
      if (search?.value.trim()) {
        setGroupOpen(group, shouldOpen);
        return;
      }

      navGroups.forEach((other) => {
        setGroupOpen(other, other === group && shouldOpen);
      });
      activeGroupId = '';
      activeFeatureId = '';
    });
  });

  window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
  window.addEventListener('resize', scheduleNavigationUpdate);
  search?.addEventListener('input', () => {
    if (!search.value.trim()) {
      activeGroupId = '';
      activeFeatureId = '';
      scheduleNavigationUpdate();
    }
  });
  scheduleNavigationUpdate();

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
