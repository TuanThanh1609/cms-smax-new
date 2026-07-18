(() => {
  const pillars = [
    {
      label: "Livechat đa kênh",
      title: "Một hộp thư cho mọi cuộc trò chuyện",
      description: "Hợp nhất tin nhắn, dữ liệu và hoạt động khách hàng để đội ngũ phản hồi nhanh, đúng người và đúng ngữ cảnh.",
      features: ["Facebook, Instagram, Zalo, WhatsApp", "Phân chia hội thoại", "Bộ lọc và thẻ", "Tin nhắn mẫu", "Support AI", "Lịch sử chăm sóc"],
      image: "asset smax/hero-livechat-suite/hero-livechat-v2.webp",
      alt: "Giao diện Livechat đa kênh của Smax",
    },
    {
      label: "Bot và Automation",
      title: "Tự động hóa từ tín hiệu đầu tiên",
      description: "Xây workflow kéo thả, bắt sự kiện trên từng kênh và kích hoạt chuỗi hành động mà không cần lập trình.",
      features: ["Trigger đa nền tảng", "Thư viện block", "Kịch bản chăm sóc", "Broadcast", "Bộ lọc nâng cao", "Hàm và điều kiện"],
      image: "asset smax/hero-livechat-suite/hero-chatbot-v2.webp",
      alt: "Trình xây dựng chatbot và automation Smax",
    },
    {
      label: "GenAI và Insight",
      title: "AI hiểu tri thức và ngữ cảnh khách hàng",
      description: "Nạp nguồn kiến thức, tư vấn tự động, trích xuất nhu cầu và chuyển hội thoại thành dữ liệu có thể hành động.",
      features: ["AI Chatbot", "Kho tri thức", "Nhiều mô hình AI", "Phân tích phiên", "Trích xuất insight", "Gợi ý trả lời"],
      image: "asset smax/hero-livechat-suite/hero-genai-v2.webp",
      alt: "Giao diện Smax GenAI hỗ trợ tư vấn khách hàng",
    },
    {
      label: "Customer 360",
      title: "Một hồ sơ xuyên suốt mọi điểm chạm",
      description: "Tìm kiếm, phân khúc, gắn thuộc tính và theo dõi lịch sử để mỗi tương tác tiếp theo luôn có đủ bối cảnh.",
      features: ["Tìm kiếm khách hàng", "Segment tự động", "Import và export", "Thuộc tính tùy chỉnh", "Đồng bộ CRM", "Lịch sử đa kênh"],
      image: "asset smax/integration-feature-map/crm-feature-map.png",
      alt: "Bản đồ đồng bộ Customer 360 giữa Smax và CRM",
    },
    {
      label: "Remarketing",
      title: "Đưa khách cũ trở lại đúng thời điểm",
      description: "Tạo tệp, cá nhân hóa nội dung và vận hành chiến dịch chăm sóc lại trên những kênh khách hàng đang sử dụng.",
      features: ["Facebook Marketing Messages", "Zalo ZNS và UID", "FUM", "Bám đuổi đa bước", "Broadcast cá nhân hóa", "Báo cáo chiến dịch"],
      image: "asset smax/hero-livechat-suite/hero-remarketing-v2.webp",
      alt: "Giao diện chiến dịch remarketing đa kênh Smax",
    },
    {
      label: "Commerce và POS",
      title: "Nối hội thoại với giao dịch thật",
      description: "Tra cứu sản phẩm, tạo đơn, đồng bộ kho, vận chuyển và thanh toán ngay trong luồng tư vấn khách hàng.",
      features: ["Sản phẩm và đơn hàng", "Kho và chi nhánh", "Khuyến mãi", "Vận chuyển", "Thanh toán", "Báo cáo bán hàng"],
      image: "asset smax/integration-feature-map/pos-feature-map.png",
      alt: "Bản đồ kết nối Smax với POS và hệ thống bán hàng",
    },
    {
      label: "Growth Tools",
      title: "Tăng tương tác bằng trải nghiệm có thưởng",
      description: "Thu lead và kích hoạt hành vi bằng minigame, biểu mẫu, trang bán hàng, voucher và trải nghiệm chat commerce.",
      features: ["Lucky Wheel", "Gift Opening", "Puzzle Game", "Quiz", "Form Builder", "Selling Page"],
      image: "asset smax/gamification/hero-gamification-smax-v2.webp",
      alt: "Hệ thống Gamification của Smax trong hành trình khách hàng",
    },
    {
      label: "Mở rộng hệ thống",
      title: "Kết nối Smax với hạ tầng doanh nghiệp",
      description: "Đồng bộ CRM, ERP, website, công cụ automation và hệ thống nội bộ bằng API, webhook và Partner API.",
      features: ["Partner API", "REST API", "Webhook", "Google Sheet", "Lark", "CRM hai chiều"],
      image: "asset smax/ai-insight/dashboard-preview.webp",
      alt: "Dashboard dữ liệu và AI Insight trong Smax",
    },
  ];

  const cleanText = (value = "") => String(value).replace(/[—–]/g, "-").replace(/\s+/g, " ").trim();
  const withoutNumber = (value = "") => cleanText(value).replace(/^\d+(?:\.\d+)*\.?\s*/, "");

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = cleanText(text);
    return element;
  }

  function setupPillars() {
    const tabs = document.querySelector("[data-pillar-tabs]");
    const panel = document.querySelector("[data-pillar-panel]");
    if (!tabs || !panel) return;

    const render = (activeIndex, focusTab = false) => {
      const item = pillars[activeIndex];
      tabs.querySelectorAll("button").forEach((button, index) => {
        button.setAttribute("aria-selected", String(index === activeIndex));
        button.tabIndex = index === activeIndex ? 0 : -1;
      });

      panel.replaceChildren();
      panel.id = `pillar-panel-${activeIndex}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", `pillar-tab-${activeIndex}`);

      const inner = createElement("div", "aio-pillar-panel-inner");
      const content = createElement("div", "aio-pillar-content");
      content.append(createElement("span", "aio-pillar-index", String(activeIndex + 1).padStart(2, "0")));
      content.append(createElement("h3", "", item.title));
      content.append(createElement("p", "", item.description));

      const featureList = createElement("div", "aio-pillar-features");
      item.features.forEach((feature) => featureList.append(createElement("span", "", feature)));
      content.append(featureList);

      const media = createElement("div", "aio-pillar-visual");
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.alt;
      image.loading = activeIndex === 0 ? "eager" : "lazy";
      media.append(image);

      inner.append(content, media);
      panel.append(inner);

      if (focusTab) tabs.querySelectorAll("button")[activeIndex]?.focus();
    };

    pillars.forEach((pillar, index) => {
      const button = createElement("button", "aio-pillar-tab", pillar.label);
      button.type = "button";
      button.id = `pillar-tab-${index}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", `pillar-panel-${index}`);
      button.setAttribute("aria-selected", String(index === 0));
      button.tabIndex = index === 0 ? 0 : -1;
      button.addEventListener("click", () => render(index));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowLeft") next = (index - 1 + pillars.length) % pillars.length;
        if (event.key === "ArrowRight") next = (index + 1) % pillars.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = pillars.length - 1;
        render(next, true);
      });
      tabs.append(button);
    });

    render(0);
  }

  function setupCatalog() {
    const catalog = window.SMAX_DOC_CATALOG;
    const search = document.querySelector("[data-catalog-search]");
    const count = document.querySelector("[data-catalog-count]");
    const filters = document.querySelector("[data-group-filters]");
    const results = document.querySelector("[data-catalog-results]");
    const empty = document.querySelector("[data-catalog-empty]");
    if (!catalog || !search || !count || !filters || !results || !empty) return;

    let activeGroup = "all";
    let timer;

    const nodeCount = (node) => 1 + (node.children || []).reduce((sum, child) => sum + nodeCount(child), 0);
    const dateLabel = (date) => {
      if (!date) return "";
      return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(date));
    };

    const filterNode = (node, query, inheritedMatch = false) => {
      const ownMatch = !query || cleanText(node.title).toLocaleLowerCase("vi").includes(query);
      const includeAllChildren = inheritedMatch || ownMatch;
      const children = (node.children || [])
        .map((child) => filterNode(child, query, includeAllChildren))
        .filter(Boolean);
      if (ownMatch || children.length) return { ...node, children };
      return null;
    };

    const buildNode = (node, level, forceOpen) => {
      const hasChildren = node.children && node.children.length;
      if (!hasChildren) {
        const leaf = createElement("div", "aio-doc-leaf");
        leaf.append(createElement("span", "", node.title));
        const time = createElement("time", "", dateLabel(node.updatedAt));
        time.dateTime = node.updatedAt || "";
        leaf.append(time);
        return leaf;
      }

      const details = createElement("details", level === 0 ? "aio-doc-group" : "aio-doc-branch");
      if (forceOpen) details.open = true;
      const summary = document.createElement("summary");
      summary.append(createElement("span", "", node.title));
      if (level === 0) summary.append(createElement("span", "aio-doc-group-count", `${nodeCount(node)} mục`));
      details.append(summary);

      const tree = createElement("div", "aio-doc-tree");
      node.children.forEach((child) => tree.append(buildNode(child, level + 1, forceOpen && level < 1)));
      details.append(tree);
      return details;
    };

    const render = () => {
      const query = cleanText(search.value).toLocaleLowerCase("vi");
      const sourceGroups = activeGroup === "all"
        ? catalog.groups
        : catalog.groups.filter((group) => group.title === activeGroup);
      const visibleGroups = sourceGroups.map((group) => filterNode(group, query)).filter(Boolean);
      const visibleCount = visibleGroups.reduce((sum, group) => sum + nodeCount(group), 0);

      results.replaceChildren();
      visibleGroups.forEach((group) => results.append(buildNode(group, 0, Boolean(query))));
      count.textContent = `${visibleCount} mục`;
      empty.hidden = visibleCount > 0;
    };

    const addFilter = (label, value, selected) => {
      const button = createElement("button", "aio-group-filter", label);
      button.type = "button";
      button.setAttribute("aria-pressed", String(selected));
      button.addEventListener("click", () => {
        activeGroup = value;
        filters.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        render();
      });
      filters.append(button);
    };

    addFilter("Tất cả", "all", true);
    catalog.groups.forEach((group) => addFilter(withoutNumber(group.title), group.title, false));

    search.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(render, 120);
    });

    render();
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
    setupPillars();
    setupCatalog();
    setupReveal();
  });
})();
