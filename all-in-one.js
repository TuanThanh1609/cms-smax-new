(() => {
  const groupProfiles = [
    {
      description: "Hiểu cách Smax hợp nhất hội thoại, dữ liệu khách hàng và tự động hóa trên một nền tảng vận hành.",
      image: "asset smax/smax-all-in-one/hero-smax-all-in-one.webp",
      alt: "Tổng quan Smax All-in-one với hội thoại, tự động hóa và các chỉ số vận hành",
    },
    {
      description: "Đi từ tài khoản đầu tiên đến kết nối kênh, nhận tin nhắn và khởi tạo chatbot theo từng bước rõ ràng.",
      image: "asset smax/smax_standard_flow.png",
      alt: "Luồng bắt đầu sử dụng và vận hành chatbot trên Smax",
    },
    {
      description: "Đưa các kênh hội thoại, quảng cáo, dữ liệu và nền tảng bán hàng về cùng một trung tâm điều phối.",
      image: "asset smax/integration-feature-map/crm-feature-map.png",
      alt: "Bản đồ kết nối đa kênh và CRM trong Smax",
    },
    {
      description: "Quản lý hội thoại đa kênh, phân công nhân viên, sử dụng mẫu trả lời và chăm sóc khách hàng theo ngữ cảnh.",
      image: "asset smax/hero-livechat-suite/hero-livechat-v2.webp",
      alt: "Giao diện Livechat đa kênh của Smax",
    },
    {
      description: "Xây dựng trigger, workflow, chatbot và chuỗi hành động no-code cho mọi điểm chạm trong hành trình khách hàng.",
      image: "asset smax/hero-livechat-suite/hero-chatbot-v2.webp",
      alt: "Trình xây dựng chatbot và automation của Smax",
    },
    {
      description: "Tập trung hồ sơ, thuộc tính, phân khúc và toàn bộ lịch sử tương tác để đội ngũ luôn hiểu khách hàng.",
      image: "asset smax/integration-feature-map/crm-feature-map.png",
      alt: "Hệ thống dữ liệu Customer 360 của Smax",
    },
    {
      description: "Theo dõi hiệu suất hội thoại, chiến dịch, nhân viên và hành vi khách hàng bằng hệ thống báo cáo tập trung.",
      image: "asset smax/ai-insight/dashboard-preview.webp",
      alt: "Dashboard thống kê và AI Insight của Smax",
    },
    {
      description: "Cấu hình doanh nghiệp, phân quyền, kênh kết nối và các quy tắc vận hành theo đúng mô hình của từng đội ngũ.",
      image: "asset smax/smax_standard_flow.png",
      alt: "Cấu hình luồng vận hành trên Smax",
    },
    {
      description: "Mở rộng Smax với AI, commerce, CRM, POS, landing page, gamification và những công cụ tăng trưởng chuyên biệt.",
      image: "asset smax/integration-feature-map/pos-feature-map.png",
      alt: "Bản đồ kết nối POS và hệ thống bán hàng với Smax",
    },
    {
      description: "Lựa chọn phạm vi sử dụng phù hợp với số lượng kênh, người dùng và nhu cầu tự động hóa của doanh nghiệp.",
      image: "asset smax/hero-livechat-suite/hero-genai-v2.webp",
      alt: "Hệ sinh thái tính năng AI và vận hành của Smax",
    },
    {
      description: "Đưa trải nghiệm Smax vào trình duyệt để thao tác hội thoại và dữ liệu nhanh hơn trong công việc hằng ngày.",
      image: "asset smax/hero-livechat-suite/hero-livechat-v2.webp",
      alt: "Trải nghiệm hội thoại Smax trên trình duyệt",
    },
    {
      description: "Sử dụng các hàm mở rộng để xử lý dữ liệu, gọi hành động và kết nối những nghiệp vụ đặc thù.",
      image: "asset smax/ai-insight/dashboard-preview.webp",
      alt: "Dữ liệu và hành động mở rộng trong Smax",
    },
    {
      description: "Kết nối hệ thống nội bộ, CRM và dịch vụ ngoài qua API để đồng bộ khách hàng và gửi tin chủ động.",
      image: "asset smax/integration-feature-map/crm-feature-map.png",
      alt: "Partner API kết nối Smax với hệ thống doanh nghiệp",
    },
    {
      description: "Áp dụng nhanh các kịch bản chatbot đã được tổ chức theo mục tiêu tương tác, chăm sóc và bám đuổi khách hàng.",
      image: "asset smax/hero-livechat-suite/hero-chatbot-v2.webp",
      alt: "Kho kịch bản chatbot mẫu của Smax",
    },
  ];

  const cleanText = (value = "") => String(value).replace(/[—–]/g, "-").replace(/\s+/g, " ").trim();
  const withoutNumber = (value = "") => cleanText(value).replace(/^\d+(?:\.\d+)*\.?\s*/, "");
  const normalizeSearch = (value = "") => cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLocaleLowerCase("vi");

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = cleanText(text);
    return element;
  }

  function nodeCount(node) {
    return 1 + (node.children || []).reduce((sum, child) => sum + nodeCount(child), 0);
  }

  function flattenChildren(nodes, depth = 1) {
    return (nodes || []).flatMap((node) => [
      { ...node, depth },
      ...flattenChildren(node.children, depth + 1),
    ]);
  }

  function dateLabel(date) {
    if (!date) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  }

  function buildModel(catalog) {
    let chapterNumber = 0;
    return catalog.groups.map((group, groupIndex) => {
      const chapters = group.children?.length ? group.children : [group];
      return {
        group,
        groupIndex,
        id: `nhom-tinh-nang-${groupIndex + 1}`,
        profile: groupProfiles[groupIndex] || groupProfiles[0],
        chapters: chapters.map((chapter, chapterIndex) => {
          chapterNumber += 1;
          const descendants = chapter === group ? [] : flattenChildren(chapter.children);
          const title = withoutNumber(chapter.title || group.title);
          return {
            chapter,
            descendants,
            groupIndex,
            chapterIndex,
            number: chapterNumber,
            id: `tinh-nang-${String(chapterNumber).padStart(3, "0")}`,
            title,
            searchValue: normalizeSearch([
              group.title,
              chapter.title,
              ...descendants.map((item) => item.title),
            ].join(" ")),
          };
        }),
      };
    });
  }

  function renderSidebar(models, nav) {
    models.forEach((model, groupIndex) => {
      const details = createElement("details", "aio-directory-nav-group");
      details.dataset.navGroup = String(groupIndex);
      details.open = groupIndex === 0;

      const summary = document.createElement("summary");
      const summaryLabel = createElement("span", "", withoutNumber(model.group.title));
      const summaryCount = createElement("span", "aio-directory-nav-total", String(model.chapters.length).padStart(2, "0"));
      summary.append(summaryLabel, summaryCount);
      details.append(summary);

      const links = createElement("div", "aio-directory-nav-links");
      model.chapters.forEach((chapter) => {
        const link = createElement("a", "aio-directory-nav-link");
        link.href = `#${chapter.id}`;
        link.dataset.chapterLink = chapter.id;
        link.dataset.searchValue = chapter.searchValue;
        link.append(
          createElement("span", "", chapter.title),
          createElement("span", "aio-directory-nav-index", String(chapter.number).padStart(2, "0")),
        );
        links.append(link);
      });

      details.append(links);
      nav.append(details);
    });
  }

  function renderSubfeatures(chapter, article) {
    if (!chapter.descendants.length) return;

    const detailHead = createElement("div", "aio-feature-detail-head");
    detailHead.append(
      createElement("h4", "", "Nội dung chi tiết"),
      createElement("span", "", `${chapter.descendants.length} mục`),
    );

    const grid = createElement("div", "aio-feature-subgrid");
    chapter.descendants.forEach((item) => {
      const row = createElement("article", "aio-feature-subitem");
      row.dataset.searchValue = normalizeSearch(item.title);
      row.style.setProperty("--feature-depth", String(Math.min(item.depth, 4)));
      row.append(createElement("span", "aio-feature-subitem-title", withoutNumber(item.title)));
      if (item.updatedAt) {
        const time = createElement("time", "", dateLabel(item.updatedAt));
        time.dateTime = item.updatedAt;
        row.append(time);
      }
      grid.append(row);
    });

    article.append(detailHead, grid);
  }

  function renderFeatureStream(models, stream) {
    models.forEach((model) => {
      const groupSection = createElement("section", `aio-feature-group aio-feature-tone-${(model.groupIndex % 4) + 1}`);
      groupSection.id = model.id;
      groupSection.dataset.featureGroup = String(model.groupIndex);
      groupSection.dataset.searchValue = normalizeSearch(model.group.title);

      const groupHead = createElement("header", "aio-feature-group-head");
      const groupCopy = createElement("div", "aio-feature-group-copy");
      groupCopy.append(
        createElement("span", "aio-feature-group-kicker", `Nhóm ${String(model.groupIndex + 1).padStart(2, "0")} · ${nodeCount(model.group)} mục`),
        createElement("h2", "", withoutNumber(model.group.title)),
        createElement("p", "", model.profile.description),
      );

      const groupMedia = createElement("figure", "aio-feature-group-media");
      const image = document.createElement("img");
      image.src = model.profile.image;
      image.alt = model.profile.alt;
      image.loading = "lazy";
      groupMedia.append(image);
      groupHead.append(groupCopy, groupMedia);
      groupSection.append(groupHead);

      model.chapters.forEach((chapter) => {
        const article = createElement("article", "aio-feature-chapter");
        article.id = chapter.id;
        article.dataset.featureChapter = chapter.id;
        article.dataset.searchValue = chapter.searchValue;

        const chapterHead = createElement("div", "aio-feature-chapter-head");
        const number = createElement("span", "aio-feature-chapter-number", String(chapter.number).padStart(2, "0"));
        const titleWrap = createElement("div", "aio-feature-chapter-title");
        const meta = createElement("div", "aio-feature-chapter-meta");
        meta.append(createElement("span", "", `${chapter.descendants.length + 1} mục trong chương`));
        if (chapter.chapter.updatedAt) {
          const time = createElement("time", "", `Cập nhật ${dateLabel(chapter.chapter.updatedAt)}`);
          time.dateTime = chapter.chapter.updatedAt;
          meta.append(time);
        }
        titleWrap.append(meta, createElement("h3", "", chapter.title));
        chapterHead.append(number, titleWrap);

        const lead = chapter.descendants.length
          ? `Khám phá ${chapter.title.toLocaleLowerCase("vi")} và ${chapter.descendants.length} nội dung cấu hình, vận hành liên quan trong Smax.`
          : model.profile.description;

        article.append(chapterHead, createElement("p", "aio-feature-chapter-lead", lead));
        renderSubfeatures(chapter, article);
        groupSection.append(article);
      });

      stream.append(groupSection);
    });
  }

  function setupMobileDirectory(sidebar, search) {
    const toggle = document.querySelector("[data-directory-toggle]");
    const close = document.querySelector("[data-directory-close]");
    const backdrop = document.querySelector("[data-directory-backdrop]");
    if (!toggle || !close || !backdrop) return () => {};

    const setOpen = (isOpen, restoreFocus = false) => {
      sidebar.classList.toggle("is-open", isOpen);
      backdrop.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("aio-directory-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) window.setTimeout(() => search.focus(), 120);
      if (!isOpen && restoreFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => setOpen(true));
    close.addEventListener("click", () => setOpen(false, true));
    backdrop.addEventListener("click", () => setOpen(false, true));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sidebar.classList.contains("is-open")) setOpen(false, true);
    });

    return () => setOpen(false);
  }

  function setupScrollSpy(models, closeMobile) {
    const links = new Map(
      [...document.querySelectorAll("[data-chapter-link]")].map((link) => [link.dataset.chapterLink, link]),
    );

    const setActive = (id) => {
      links.forEach((link, linkId) => {
        const active = linkId === id;
        link.classList.toggle("is-active", active);
        if (active) {
          link.setAttribute("aria-current", "location");
          link.closest("details").open = true;
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    links.forEach((link, id) => {
      link.addEventListener("click", () => {
        setActive(id);
        closeMobile();
      });
    });

    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && !entry.target.hidden)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });

    models.flatMap((model) => model.chapters).forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });
  }

  function setupSearch(models, search, count, empty) {
    const updateSection = document.getElementById("latest-updates");
    let timer;

    const render = () => {
      const query = normalizeSearch(search.value);
      let visibleChapters = 0;
      let visibleDocuments = 0;

      models.forEach((model) => {
        const groupElement = document.querySelector(`[data-feature-group="${model.groupIndex}"]`);
        const navGroup = document.querySelector(`[data-nav-group="${model.groupIndex}"]`);
        const groupMatches = !query || normalizeSearch(model.group.title).includes(query);
        let visibleInGroup = 0;

        model.chapters.forEach((chapter) => {
          const matches = groupMatches || chapter.searchValue.includes(query);
          const article = document.querySelector(`[data-feature-chapter="${chapter.id}"]`);
          const link = document.querySelector(`[data-chapter-link="${chapter.id}"]`);
          article.hidden = !matches;
          link.hidden = !matches;

          if (!matches) return;
          visibleInGroup += 1;
          visibleChapters += 1;

          const titleMatches = groupMatches || normalizeSearch(chapter.chapter.title).includes(query);
          const subitems = [...article.querySelectorAll("[data-search-value]")];
          let visibleInChapter = 1;
          subitems.forEach((item) => {
            const itemMatches = !query || titleMatches || item.dataset.searchValue.includes(query);
            item.hidden = !itemMatches;
            if (itemMatches) visibleInChapter += 1;
          });
          visibleDocuments += visibleInChapter;
        });

        groupElement.hidden = visibleInGroup === 0;
        navGroup.hidden = visibleInGroup === 0;
        if (visibleInGroup > 0 && model.group.children?.length) visibleDocuments += 1;
        if (query && visibleInGroup > 0) navGroup.open = true;
      });

      updateSection.hidden = Boolean(query);
      count.textContent = `${visibleChapters} chương · ${visibleDocuments} mục`;
      empty.hidden = visibleChapters > 0;
    };

    search.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(render, 100);
    });
    render();
  }

  function setupFeatureDirectory() {
    const catalog = window.SMAX_DOC_CATALOG;
    const nav = document.querySelector("[data-directory-nav]");
    const stream = document.querySelector("[data-feature-stream]");
    const sidebar = document.querySelector(".aio-directory-sidebar");
    const search = document.querySelector("[data-directory-search]");
    const count = document.querySelector("[data-directory-count]");
    const empty = document.querySelector("[data-directory-empty]");
    if (!catalog || !nav || !stream || !sidebar || !search || !count || !empty) return;

    const models = buildModel(catalog);
    renderSidebar(models, nav);
    renderFeatureStream(models, stream);
    const closeMobile = setupMobileDirectory(sidebar, search);
    setupScrollSpy(models, closeMobile);
    setupSearch(models, search, count, empty);
  }

  function setupReveal() {
    const items = document.querySelectorAll(".aio-reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupFeatureDirectory();
    setupReveal();
  });
})();
