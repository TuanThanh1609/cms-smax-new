// Inject Smax CMS Client SDK
(function() {
  const script = document.createElement('script');
  script.src = 'cms.js';
  script.defer = true;
  document.head.appendChild(script);
})();

// Inject Smax Tracking Client SDK
(function() {
  const script = document.createElement('script');
  script.src = 'tracking.js';
  script.defer = true;
  document.head.appendChild(script);
})();

const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
let megaCloseTimer;

// Global menu elements loaded dynamically
let menuToggle = null;
let mobileDrawer = null;
let desktopNav = null;
let megaTriggers = [];
let megaMenus = [];
let megaBackdrop = null;

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMegaMenu = (focusTrigger = false) => {
  if (!megaTriggers || !megaTriggers.length) return;
  const openTrigger = document.querySelector('[data-mega-trigger][aria-expanded="true"]');

  megaTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  megaMenus.forEach((menu) => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
  });
  header?.classList.remove("mega-open");
  document.body.classList.remove("mega-menu-open");

  if (focusTrigger) openTrigger?.focus();
};

const openMegaMenu = (menuId) => {
  window.clearTimeout(megaCloseTimer);
  const targetMenu = document.querySelector(`[data-mega-menu="${menuId}"]`);
  const targetTrigger = document.querySelector(`[data-mega-trigger="${menuId}"]`);
  if (!targetMenu || !targetTrigger) return;

  if (megaTriggers) {
    megaTriggers.forEach((trigger) => {
      trigger.setAttribute("aria-expanded", trigger === targetTrigger ? "true" : "false");
    });
  }
  if (megaMenus) {
    megaMenus.forEach((menu) => {
      const isOpen = menu === targetMenu;
      menu.classList.toggle("is-open", isOpen);
      menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });
  }
  header?.classList.add("mega-open");
  document.body.classList.add("mega-menu-open");
};

const scheduleMegaClose = () => {
  window.clearTimeout(megaCloseTimer);
  megaCloseTimer = window.setTimeout(() => closeMegaMenu(), 140);
};

const initMenuInteractions = () => {
  menuToggle = document.querySelector("[data-menu-toggle]");
  megaTriggers.forEach((trigger) => {
    const menuId = trigger.getAttribute("data-mega-trigger");

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen && event.detail === 0) closeMegaMenu();
      else openMegaMenu(menuId);
    });

    trigger.addEventListener("pointerenter", () => {
      if (window.matchMedia("(min-width: 981px)").matches) openMegaMenu(menuId);
    });
    trigger.addEventListener("focus", () => openMegaMenu(menuId));
  });

  desktopNav?.addEventListener("pointerenter", () => window.clearTimeout(megaCloseTimer));
  desktopNav?.addEventListener("pointerleave", scheduleMegaClose);
  desktopNav?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("pointerenter", () => closeMegaMenu());
    link.addEventListener("focus", () => closeMegaMenu());
  });
  megaBackdrop?.addEventListener("click", () => closeMegaMenu());

  header?.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMegaMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header?.classList.contains("mega-open")) {
      closeMegaMenu(true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 980) closeMegaMenu();
  });

  menuToggle?.addEventListener("click", () => {
    closeMegaMenu();
    const isOpen = mobileDrawer.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("mobile-menu-open", isOpen);
  });

  mobileDrawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileDrawer.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Mở menu");
      document.body.classList.remove("mobile-menu-open");
    });
  });

  mobileDrawer?.querySelectorAll("details").forEach((group) => {
    group.addEventListener("toggle", () => {
      if (!group.open) return;
      mobileDrawer.querySelectorAll("details").forEach((otherGroup) => {
        if (otherGroup !== group) otherGroup.removeAttribute("open");
      });
    });
  });
};

const loadHeader = async () => {
  const headerEl = document.querySelector("[data-header]");
  if (headerEl) {
    try {
      console.log("Fetching shared header.tpl...");
      const response = await fetch("header.tpl?v=" + new Date().getTime(), { cache: "no-store" });
      const html = await response.text();
      headerEl.innerHTML = html;

      // Assign global elements after shared header inject
      menuToggle = document.querySelector("[data-menu-toggle]");
      mobileDrawer = document.querySelector("[data-mobile-drawer]");
      desktopNav = document.querySelector("[data-desktop-nav]");
      megaTriggers = document.querySelectorAll("[data-mega-trigger]");
      megaMenus = document.querySelectorAll("[data-mega-menu]");
      megaBackdrop = document.querySelector("[data-mega-backdrop]");

      console.log("Shared header elements loaded:", {
        menuToggle: !!menuToggle,
        mobileDrawer: !!mobileDrawer,
        desktopNav: !!desktopNav,
        megaTriggersCount: megaTriggers.length,
        megaMenusCount: megaMenus.length,
        megaBackdrop: !!megaBackdrop
      });

      // Highlight active link based on current URL path
      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      if (currentPath.includes("tich-hop.html")) {
        const trigger = headerEl.querySelector('[data-mega-trigger="integrations"]');
        if (trigger) trigger.style.color = "var(--process-blue, #4277FF)";
      } else if (currentPath.includes("templates.html")) {
        const link = headerEl.querySelector('a[href="templates.html"]');
        if (link) link.style.color = "var(--process-blue, #4277FF)";
      } else if (currentPath.includes("livechat.html") || currentPath.includes("chatbot.html") || currentPath.includes("gamification.html") || currentPath.includes("insight.html") || currentPath.includes("genai.html") || currentPath.includes("marketing.html") || currentPath.includes("remarketing.html") || currentPath.includes("crm-sync.html")) {
        const trigger = headerEl.querySelector('[data-mega-trigger="products"]');
        if (trigger) trigger.style.color = "var(--process-blue, #4277FF)";
      }

      // Initialize menu interactive events
      initMenuInteractions();
    } catch (err) {
      console.error("Error loading shared header:", err);
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadHeader);
} else {
  loadHeader();
}

// Event delegation for dynamically loaded links
document.addEventListener("click", (event) => {
  const moduleLink = event.target.closest("[data-module-target]");
  if (moduleLink) {
    const moduleId = moduleLink.getAttribute("data-module-target");
    document.querySelector(`.console-tab[data-tab="${moduleId}"]`)?.click();
    closeMegaMenu();
    return;
  }

  const industryLink = event.target.closest("[data-industry-target]");
  if (industryLink) {
    const industryId = industryLink.getAttribute("data-industry-target");
    document.querySelector(`.flow-tab[data-tab="${industryId}"]`)?.click();
    closeMegaMenu();
    return;
  }

  const megaMenuLink = event.target.closest(".mega-menu a");
  if (megaMenuLink) {
    closeMegaMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms`;
  revealObserver.observe(item);
});

// Marketing & Sales dynamic bento tab switcher logic
const flowTabs = document.querySelectorAll(".flow-tab");
const bentoGrids = document.querySelectorAll(".capabilities-bento");

flowTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetTab = tab.getAttribute("data-tab");
    
    // Update active tab button
    flowTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    // Update active bento grid content
    bentoGrids.forEach((grid) => {
      // Remove reveal class so it does not trigger animation when shown
      grid.classList.remove("reveal");
      
      if (grid.getAttribute("data-tab-content") === targetTab) {
        grid.classList.add("active");
      } else {
        grid.classList.remove("active");
      }
    });
  });
});

// Product Ecosystem dynamic tab console switcher logic
const consoleTabs = document.querySelectorAll(".console-tab");
const consolePanels = document.querySelectorAll(".console-panel");
const featureImageCache = new Map();

function preloadFeatureImage(src, priority = "auto") {
  const cachedImage = featureImageCache.get(src);
  if (cachedImage) return cachedImage.ready;

  const preloadImage = new Image();
  preloadImage.decoding = "async";
  preloadImage.fetchPriority = priority;

  const ready = new Promise((resolve) => {
    preloadImage.addEventListener(
      "load",
      async () => {
        try {
          await preloadImage.decode();
        } catch {
          // The image is already downloaded; the visible image can decode it.
        }
        resolve(true);
      },
      { once: true },
    );
    preloadImage.addEventListener("error", () => resolve(false), { once: true });
  });

  preloadImage.src = src;
  featureImageCache.set(src, { image: preloadImage, ready });
  return ready;
}

function preloadPanelFeatureImages(panel, priority = "auto") {
  if (!panel) return;

  panel.querySelectorAll("[data-feature-image]").forEach((card) => {
    const src = card.getAttribute("data-feature-image");
    if (src) preloadFeatureImage(src, priority);
  });
}

consoleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetTab = tab.getAttribute("data-tab");
    
    // Update active tab button
    consoleTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    
    // Update active content panel
    consolePanels.forEach((panel) => {
      const panelId = panel.getAttribute("id");
      if (panelId === `panel-${targetTab}`) {
        panel.classList.add("active");
        panel.style.display = "block";
        preloadPanelFeatureImages(panel, "high");
        
        // Re-trigger small transition scale on visual image
        const img = panel.querySelector(".visual-image");
        if (img) {
          img.style.transform = "scale(0.98)";
          void img.offsetWidth; // Force reflow
          img.style.transform = "";
        }
      } else {
        panel.classList.remove("active");
        panel.style.display = "none";
      }
    });
  });
});

const featureCards = document.querySelectorAll(".sub-feature-card[data-feature-image]");

const featureSection = document.querySelector("#modules");
const warmFeatureImages = () => {
  preloadPanelFeatureImages(document.querySelector(".console-panel.active"), "high");

  const warmRemainingPanels = () => {
    consolePanels.forEach((panel) => preloadPanelFeatureImages(panel));
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(warmRemainingPanels, { timeout: 1500 });
  } else {
    window.setTimeout(warmRemainingPanels, 250);
  }
};

if (featureSection && "IntersectionObserver" in window) {
  const featurePreloadObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      warmFeatureImages();
      observer.disconnect();
    },
    { rootMargin: "800px 0px" },
  );
  featurePreloadObserver.observe(featureSection);
} else {
  warmFeatureImages();
}

consoleTabs.forEach((tab) => {
  const preloadTargetPanel = () => {
    const targetTab = tab.getAttribute("data-tab");
    preloadPanelFeatureImages(document.querySelector(`#panel-${targetTab}`), "high");
  };

  tab.addEventListener("pointerenter", preloadTargetPanel, { once: true });
  tab.addEventListener("focus", preloadTargetPanel, { once: true });
});

async function activateFeatureCard(card) {
  const panel = card.closest(".console-panel");
  if (!panel) return;

  const visual = panel.querySelector("[data-feature-visual]");
  const imageSrc = card.getAttribute("data-feature-image");
  if (!visual || !imageSrc) return;

  panel.querySelectorAll(".sub-feature-card[data-feature-image]").forEach((item) => {
    const isActive = item === card;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  const switchToken = String(Number(visual.dataset.switchToken || 0) + 1);
  visual.dataset.switchToken = switchToken;
  await preloadFeatureImage(imageSrc, "high");

  if (visual.dataset.switchToken !== switchToken) return;

  visual.style.transform = "scale(0.985)";
  visual.setAttribute("src", imageSrc);
  visual.setAttribute("alt", card.getAttribute("data-feature-alt") || "");
  window.requestAnimationFrame(() => {
    visual.style.transform = "";
  });
}

featureCards.forEach((card) => {
  card.addEventListener("click", () => activateFeatureCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateFeatureCard(card);
    }
  });
});



// Comprehensive Skills dynamic tab switcher logic
const skillsTabs = document.querySelectorAll(".skills-tab");
const skillsPanes = document.querySelectorAll(".skills-pane");

skillsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetTab = tab.getAttribute("data-tab");
    
    // Update active tab button
    skillsTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    // Update active pane content
    skillsPanes.forEach((pane) => {
      // Remove reveal class so it does not trigger animations when toggling tabs
      pane.classList.remove("reveal");
      
      if (pane.getAttribute("data-pane") === targetTab) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });
  });
});

// Homepage Templates Slider logic
const initTemplatesSlider = () => {
  const track = document.getElementById("homepage-templates-slider");
  const prevBtn = document.querySelector(".templates-slider-btn.prev");
  const nextBtn = document.querySelector(".templates-slider-btn.next");
  const dots = document.querySelectorAll(".templates-slider-dots .dot");
  
  if (!track) return;

  const updateActiveDot = () => {
    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth : 280;
    const gap = window.innerWidth <= 767 ? 16 : 24; // Gap between cards in CSS
    const scrollPosition = track.scrollLeft;
    
    // Calculate the active index based on scroll position
    let activeIndex = Math.round(scrollPosition / (cardWidth + gap));
    activeIndex = Math.max(0, Math.min(activeIndex, dots.length - 1));
    
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === activeIndex);
    });
  };

  // Scroll event listener (de-bounce-ish style using requestAnimationFrame)
  let isScrolling = false;
  track.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateActiveDot();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // Arrow button click listeners
  prevBtn?.addEventListener("click", () => {
    const scrollAmount = track.offsetWidth;
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn?.addEventListener("click", () => {
    const scrollAmount = track.offsetWidth;
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Dots click listeners
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth : 280;
      const gap = window.innerWidth <= 767 ? 16 : 24;
      
      track.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
    });
  });

  // Initialize once
  updateActiveDot();
};


// ==========================================================================
// ADVANCED PLATFORM INTEGRATIONS SWITCHER LOGIC (Dynamic Carousel Scenarios)
// ==========================================================================

// Generator for 6 scenarios based on channel type and name
function generateScenarios(channelId, channelName) {
  let type = "social";
  if (["shopee", "lazada", "tiktokshop", "website", "kiotviet", "sapo", "nhanh", "poscake", "smaxai-pos", "pos"].includes(channelId)) {
    type = "ecommerce";
  } else if (["sheets", "lark", "hubspot", "haravan", "shopify", "woocommerce", "ladipage", "webcake"].includes(channelId)) {
    type = "crm";
  } else if (["n8n", "smaxai", "api", "phone-channel", "email-channel"].includes(channelId)) {
    type = "system";
  }

  if (type === "social") {
    return [
      {
        title: `Tự động trả lời thắc mắc khách hàng qua ${channelName}`,
        desc: `Sử dụng trợ lý AI kết hợp kịch bản thông minh để phản hồi tin nhắn tự động 24/7 trên kênh ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng gửi tin nhắn thắc mắc hoặc bình luận trên kênh ${channelName}.` },
          { title: "Xử lý", text: `Hệ thống phân tích từ khóa, nhận diện ý định và tự động soạn thảo câu trả lời.` },
          { title: "Hành động", text: "Gửi phản hồi ngay lập tức, gán nhãn phân loại khách hàng và thông báo cho sale." }
        ]
      },
      {
        title: `Gửi tin nhắn chào mừng và mã ưu đãi độc quyền`,
        desc: `Tự động tương tác với khách hàng mới tương tác trên ${channelName} để kích thích chuyển đổi đơn hàng đầu tiên.`,
        steps: [
          { title: "Bắt đầu", text: `Phát sinh sự kiện khách hàng follow hoặc inbox lần đầu tiên cho ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống tự động kích hoạt kịch bản chào mừng và tạo mã coupon động." },
          { title: "Hành động", text: "Gửi tin nhắn chào mừng kèm mã ưu đãi độc quyền và điều hướng về trang mua hàng." }
        ]
      },
      {
        title: `Chăm sóc khách hàng cũ hàng loạt trên ${channelName}`,
        desc: `Gửi tin nhắn thông báo ưu đãi, chúc mừng sinh nhật hoặc khảo sát ý kiến hàng loạt tới tệp khách hàng cũ qua ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: "Hệ thống lên lịch gửi chiến dịch tin nhắn CSKH tới danh sách số điện thoại đã chọn." },
          { title: "Xử lý", text: `Tự động cá nhân hóa nội dung tin nhắn (tên, ưu đãi phù hợp) cho từng khách hàng qua ${channelName}.` },
          { title: "Hành động", text: "Thực hiện gửi tin nhắn hàng loạt theo tần suất phù hợp và thu thập tỷ lệ đọc/click." }
        ]
      },
      {
        title: `Tự động thu thập thông tin liên hệ (Lead Generation)`,
        desc: `Chatbot tương tác tự động xin số điện thoại, email và nhu cầu của khách hàng trên ${channelName} mà không cần nhân viên trực.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng bắt đầu trò chuyện và thể hiện sự quan tâm đến sản phẩm trên ${channelName}.` },
          { title: "Xử lý", text: "Bot hỏi thông tin liên hệ và tự động kiểm tra định dạng số điện thoại/email thực tế." },
          { title: "Hành động", text: "Đồng bộ thông tin liên hệ thu thập được vào Google Sheets và phân chia cho sale gọi lại." }
        ]
      },
      {
        title: `Gửi mã QR yêu cầu thanh toán hóa đơn`,
        desc: `Tự động tạo và gửi ảnh mã QR thanh toán động kèm số tiền cần trả trực tiếp qua khung chat ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng chốt đơn hàng và yêu cầu thanh toán trên kênh chat ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống tự động sinh mã QR thanh toán ngân hàng (VietQR) có kèm sẵn nội dung chuyển khoản." },
          { title: "Hành động", text: "Gửi mã QR và link thanh toán trực tiếp qua chat, chờ xác nhận giao dịch tự động." }
        ]
      },
      {
        title: `Tổ chức kịch bản Mini-game thu hút tương tác`,
        desc: `Kích hoạt các kịch bản vòng quay may mắn, trúng thưởng tự động trên ${channelName} để tăng tương tác thương hiệu.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng comment từ khóa quy định (ví dụ: 'ChoiGame') trên ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống tự động gửi link game, ghi nhận lượt quay và tính toán phần thưởng ngẫu nhiên." },
          { title: "Hành động", text: "Gửi thông báo trúng thưởng kèm mã quà tặng trực tiếp qua inbox cho khách hàng." }
        ]
      }
    ];
  } else if (type === "ecommerce") {
    return [
      {
        title: `Đồng bộ đơn hàng từ ${channelName} về Google Sheets`,
        desc: `Tự động ghi nhận thông tin đơn hàng mới phát sinh trên ${channelName} vào bảng tính thời gian thực.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng đặt đơn hàng mới thành công trên cửa hàng ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống tiếp nhận thông tin đơn (sản phẩm, giá trị, địa chỉ khách) qua webhook." },
          { title: "Hành động", text: "Tự động ghi thêm một dòng dữ liệu đơn hàng mới vào file Google Sheets được chỉ định." }
        ]
      },
      {
        title: `Gửi tin nhắn xác nhận đơn hàng tự động`,
        desc: `Kích hoạt tin nhắn cảm ơn và xác nhận đơn hàng gửi trực tiếp đến Zalo/Messenger của khách khi chốt đơn từ ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: `Hệ thống ghi nhận đơn hàng mới vừa được tạo trên cửa hàng ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống tìm kiếm thông tin liên hệ của khách và kích hoạt kịch bản nhắn tin xác nhận." },
          { title: "Hành động", text: "Gửi tin nhắn ZNS hoặc Messenger chi tiết đơn kèm lời cảm ơn và mã vận đơn." }
        ]
      },
      {
        title: `Cứu đơn hàng bị bỏ quên trong giỏ hàng (Abandoned Cart)`,
        desc: `Tự động gửi tin nhắn/email nhắc nhở kèm ưu đãi khi khách hàng thêm sản phẩm vào giỏ trên ${channelName} nhưng chưa thanh toán.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng thêm sản phẩm vào giỏ hàng trên ${channelName} nhưng không hoàn tất thanh toán sau 30 phút.` },
          { title: "Xử lý", text: "Hệ thống phát hiện giỏ hàng bị bỏ quên và kích hoạt luồng nhắc nhở tự động." },
          { title: "Hành động", text: "Gửi tin nhắn chứa sản phẩm trong giỏ kèm mã giảm giá 10% để kích thích khách hoàn tất đơn." }
        ]
      },
      {
        title: `Đồng bộ tồn kho sản phẩm thời gian thực`,
        desc: `Tự động cập nhật số lượng tồn kho lên cửa hàng ${channelName} ngay khi có biến động từ kho hàng trung tâm.`,
        steps: [
          { title: "Bắt đầu", text: "Phát sinh giao dịch mua hàng hoặc nhập kho mới làm thay đổi số lượng tồn kho trung tâm." },
          { title: "Xử lý", text: `Hệ thống tự động tính toán số lượng tồn kho mới và đẩy tín hiệu đồng bộ lên ${channelName}.` },
          { title: "Hành động", text: `Cập nhật số lượng sản phẩm tương ứng trên gian hàng ${channelName} để tránh lệch kho.` }
        ]
      },
      {
        title: `Gửi tin nhắn đánh giá 5 sao nhận quà`,
        desc: `Tự động nhắn tin xin đánh giá 5 sao từ khách hàng sau khi đơn hàng trên ${channelName} được giao thành công.`,
        steps: [
          { title: "Bắt đầu", text: `Đơn vị vận chuyển cập nhật trạng thái đơn hàng từ ${channelName} là 'Giao hàng thành công'.` },
          { title: "Xử lý", text: "Hệ thống chờ 1 ngày để khách trải nghiệm sản phẩm, sau đó kích hoạt tin nhắn xin review." },
          { title: "Hành động", text: "Gửi tin nhắn xin đánh giá 5 sao kèm link review trực tiếp và tặng voucher giảm giá cho lần mua sau." }
        ]
      },
      {
        title: `Gửi báo cáo doanh thu từ ${channelName} hàng ngày`,
        desc: `Tự động tổng hợp dữ liệu doanh số và số lượng đơn hàng trên ${channelName} gửi vào Lark/Telegram cuối ngày.`,
        steps: [
          { title: "Bắt đầu", text: "Đạt mốc thời gian báo cáo quy định (ví dụ: 21:00 hàng ngày)." },
          { title: "Xử lý", text: `Hệ thống trích xuất tổng doanh thu, số đơn và tỷ lệ chuyển đổi từ cửa hàng ${channelName}.` },
          { title: "Hành động", text: "Gửi báo cáo trực quan kèm biểu đồ doanh số vào group Lark/Telegram của ban quản trị." }
        ]
      }
    ];
  } else if (type === "crm") {
    return [
      {
        title: `Đẩy thông tin Lead đăng ký vào hệ thống ${channelName}`,
        desc: `Tự động tạo mới hoặc cập nhật hồ sơ khách hàng tiềm năng trên ${channelName} ngay khi họ điền form chat.`,
        steps: [
          { title: "Bắt đầu", text: "Khách hàng gửi thông tin số điện thoại, email và nhu cầu đăng ký qua form chat." },
          { title: "Xử lý", text: "Hệ thống chuẩn hóa dữ liệu, loại bỏ trùng lặp và xác thực thông tin liên hệ." },
          { title: "Hành động", text: `Tạo mới một hồ sơ khách hàng (Contact) kèm tag phân loại trên phần mềm ${channelName}.` }
        ]
      },
      {
        title: `Đồng bộ lịch sử hội thoại đa kênh vào CRM ${channelName}`,
        desc: `Tự động lưu trữ toàn bộ nội dung chat từ Messenger/Zalo/Webchat của khách hàng vào dòng thời gian của ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: "Phát sinh cuộc trò chuyện mới hoặc cập nhật hội thoại với khách hàng trên các kênh chat." },
          { title: "Xử lý", text: `Hệ thống tự động đồng bộ và định dạng nội dung cuộc chat theo thời gian thực.` },
          { title: "Hành động", text: `Lưu trữ nội dung chat vào chi tiết dòng thời gian (Timeline) của khách hàng trên ${channelName}.` }
        ]
      },
      {
        title: `Gửi email/tin nhắn chăm sóc tự động theo giai đoạn phễu`,
        desc: `Kích hoạt chuỗi email hoặc tin nhắn ZNS chăm sóc khách hàng dựa theo sự thay đổi trạng thái Deal trên ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: `Nhân viên sale cập nhật trạng thái đơn hàng/Deal của khách trên hệ thống ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống phát hiện sự thay đổi trạng thái và kích hoạt chiến dịch chăm sóc tương ứng." },
          { title: "Hành động", text: "Tự động gửi email giới thiệu, tài liệu hướng dẫn hoặc báo giá chi tiết cho khách hàng." }
        ]
      },
      {
        title: `Gán nhân viên phụ trách tư vấn tự động (Round Robin)`,
        desc: `Tự động gán nhân viên sale chăm sóc khi có lead mới đăng ký trên ${channelName} theo cơ chế xoay vòng.`,
        steps: [
          { title: "Bắt đầu", text: `Phát sinh khách hàng tiềm năng (Lead) mới được đẩy vào hệ thống ${channelName}.` },
          { title: "Xử lý", text: "Hệ thống kiểm tra danh sách nhân viên đang online và tự động phân chia theo thứ tự." },
          { title: "Hành động", text: `Cập nhật trường 'Người phụ trách' trên ${channelName} và gửi thông báo đẩy đến điện thoại của sale.` }
        ]
      },
      {
        title: `Cập nhật trạng thái đơn hàng và kích hoạt thanh toán`,
        desc: `Khi Deal trên ${channelName} chuyển sang giai đoạn ký hợp đồng, tự động tạo liên kết thanh toán gửi cho khách.`,
        steps: [
          { title: "Bắt đầu", text: `Trạng thái Deal của khách hàng trên ${channelName} chuyển sang 'Chốt hợp đồng'.` },
          { title: "Xử lý", text: "Hệ thống kết nối API ngân hàng sinh link thanh toán động kèm giá trị hợp đồng." },
          { title: "Hành động", text: "Gửi link thanh toán tự động qua chat cho khách và tạo công việc nhắc lịch giao hàng cho kho." }
        ]
      },
      {
        title: `Xuất báo cáo doanh số tự động định kỳ từ ${channelName}`,
        desc: `Hệ thống trích xuất báo cáo doanh thu từ ${channelName} để cập nhật lên Lark/Google Sheets hàng ngày.`,
        steps: [
          { title: "Bắt đầu", text: "Đạt mốc thời gian báo cáo quy định cuối ngày (ví dụ: 18:00 hàng ngày)." },
          { title: "Xử lý", text: `Hệ thống truy vấn tổng hợp giá trị các đơn hàng thành công trong ngày từ ${channelName}.` },
          { title: "Hành động", text: "Gửi file excel báo cáo chi tiết và biểu đồ so sánh doanh thu vào group của ban quản trị." }
        ]
      }
    ];
  } else {
    return [
      {
        title: `Kết nối API tự động hóa giữa Smax và ${channelName}`,
        desc: `Xây dựng luồng truyền nhận dữ liệu thời gian thực giữa Smax và hệ thống ${channelName} qua giao thức API.`,
        steps: [
          { title: "Bắt đầu", text: `Khách hàng thực hiện hành động mua hàng hoặc đăng ký trên chatbot Smax.` },
          { title: "Xử lý", text: `Hệ thống đóng gói dữ liệu JSON và thực hiện gọi API POST đến server của ${channelName}.` },
          { title: "Hành động", text: `Hệ thống ${channelName} tiếp nhận dữ liệu, xử lý phản hồi và trả về trạng thái thành công.` }
        ]
      },
      {
        title: `Kích hoạt kịch bản chatbot từ sự kiện bên ngoài qua Webhook`,
        desc: `Khi hệ thống ${channelName} phát sinh sự kiện mới, tự động gửi webhook để kích hoạt kịch bản chat tương ứng.`,
        steps: [
          { title: "Bắt đầu", text: `Sự kiện mới phát sinh trên hệ thống ${channelName} (ví dụ: Khách thanh toán thành công).` },
          { title: "Xử lý", text: "Webhook được gửi từ bên ngoài chạm đến node Webhook đón đầu của Smax." },
          { title: "Hành động", text: "Hệ thống tự động kích hoạt kịch bản chatbot tương ứng gửi tin nhắn thông báo cho khách." }
        ]
      },
      {
        title: `Đồng bộ dữ liệu người dùng thời gian thực`,
        desc: `Tự động cập nhật các thay đổi về hồ sơ khách hàng giữa Smax và cơ sở dữ liệu của ${channelName}.`,
        steps: [
          { title: "Bắt đầu", text: "Nhân viên cập nhật thông tin khách hàng (số điện thoại, phân hạng) trên chat." },
          { title: "Xử lý", text: `Hệ thống kích hoạt luồng đồng bộ tức thời đẩy dữ liệu mới sang ${channelName}.` },
          { title: "Hành động", text: `Cập nhật thông tin tương ứng trong cơ sở dữ liệu của ${channelName} đồng bộ 100%.` }
        ]
      },
      {
        title: `Phân tích báo cáo dữ liệu hội thoại bằng AI`,
        desc: `Tự động nạp dữ liệu hội thoại sang ${channelName} để phân tích từ khóa, cảm xúc và hiệu suất tư vấn.`,
        steps: [
          { title: "Bắt đầu", text: "Cuộc trò chuyện giữa tư vấn viên và khách hàng kết thúc (đóng phiên chat)." },
          { title: "Xử lý", text: `Hệ thống tự động chuyển toàn bộ lịch sử chat sang ${channelName} để xử lý ngôn ngữ tự nhiên.` },
          { title: "Hành động", text: "Trả về báo cáo phân tích cảm xúc (vui vẻ/phẫn nộ), tóm tắt yêu cầu và lưu vào hồ sơ CRM." }
        ]
      },
      {
        title: `Gửi thông báo bảo mật và xác thực OTP tự động`,
        desc: `Tự động gọi điện/gửi tin nhắn OTP qua ${channelName} để xác thực thông tin giao dịch của khách hàng.`,
        steps: [
          { title: "Bắt đầu", text: "Khách hàng thực hiện hành động đăng ký hoặc thanh toán cần xác minh bảo mật." },
          { title: "Xử lý", text: "Hệ thống tự động tạo mã OTP ngẫu nhiên gồm 6 chữ số có hiệu lực trong 5 phút." },
          { title: "Hành động", text: `Gửi mã OTP qua ${channelName} và hiển thị ô nhập mã xác thực trên màn hình cho khách.` }
        ]
      },
      {
        title: `Gửi tin hiệu quả chiến dịch quảng cáo về nguồn`,
        desc: `Đẩy tín hiệu chuyển đổi từ ${channelName} về các nền tảng quảng cáo (Facebook CAPI, Google Ads) để tối ưu chi phí.`,
        steps: [
          { title: "Bắt đầu", text: "Đơn hàng từ chiến dịch quảng cáo được thanh toán thành công." },
          { title: "Xử lý", text: `Hệ thống đóng gói mã Ads Campaign ID kèm giá trị đơn hàng gửi về ${channelName}.` },
          { title: "Hành động", text: "Nền tảng quảng cáo ghi nhận lượt chuyển đổi thực tế để tự động tối ưu hóa tệp đối tượng." }
        ]
      }
    ];
  }
}

const initAdvancedIntegrations = () => {
  const sidebarButtons = document.querySelectorAll(".sidebar-group-btn");
  const subTabRows = document.querySelectorAll(".sub-tabs-row");
  const subTabs = document.querySelectorAll(".sub-tab");
  const flowImg = document.getElementById("flow-display-img");
  
  const descBox = document.getElementById("dynamic-flow-desc");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const currentSpan = document.getElementById("carousel-current");
  const totalSpan = document.getElementById("carousel-total");

  let activeChannel = "messenger";
  let activeChannelName = "Facebook Messenger";
  let currentSlide = 0;

  const flowImagesMap = {
    messenger: "asset smax/smax_standard_flow.png",
    zalo: "asset smax/smax_standard_flow.png",
    instagram: "asset smax/smax_standard_flow.png",
    telegram: "asset smax/smax_standard_flow.png",
    "whatsapp-user": "asset smax/smax_standard_flow.png",
    "tiktok-user": "asset smax/smax_standard_flow.png",
    line: "asset smax/smax_standard_flow.png",
    shopee: "asset smax/smax_standard_flow.png",
    lazada: "asset smax/smax_standard_flow.png",
    tiktokshop: "asset smax/smax_standard_flow.png",
    website: "asset smax/smax_standard_flow.png",
    kiotviet: "asset smax/smax_standard_flow.png",
    sapo: "asset smax/smax_standard_flow.png",
    nhanh: "asset smax/smax_standard_flow.png",
    poscake: "asset smax/smax_standard_flow.png",
    "smaxai-pos": "asset smax/smax_standard_flow.png",
    sheets: "asset smax/smax_standard_flow.png",
    lark: "asset smax/smax_standard_flow.png",
    hubspot: "asset smax/smax_standard_flow.png",
    haravan: "asset smax/smax_standard_flow.png",
    shopify: "asset smax/smax_standard_flow.png",
    woocommerce: "asset smax/smax_standard_flow.png",
    ladipage: "asset smax/smax_standard_flow.png",
    webcake: "asset smax/smax_standard_flow.png",
    n8n: "asset smax/smax_standard_flow.png",
    smaxai: "asset smax/smax_standard_flow.png",
    api: "asset smax/smax_standard_flow.png",
    "phone-channel": "asset smax/smax_standard_flow.png",
    "email-channel": "asset smax/smax_standard_flow.png"
  };

  // Render a specific scenario to the DOM instantly (no layout shift / transition delay)
  const renderScenario = (channelId, channelName, slideIndex) => {
    if (!descBox) return;
    const scenarios = generateScenarios(channelId, channelName);
    const scenario = scenarios[slideIndex];

    if (!scenario) return;

    // Update HTML content instantly
    descBox.innerHTML = `
      <div class="flow-desc-header">
        <h4>${scenario.title}</h4>
        <p>${scenario.desc}</p>
      </div>
      <ul class="flow-steps">
        ${scenario.steps.map((step, idx) => `
          <li>
            <span>${idx + 1}</span>
            <div><strong>${step.title}:</strong> ${step.text}</div>
          </li>
        `).join('')}
      </ul>
    `;
    
    descBox.classList.add("active");
    
    // Dynamically update the dots indicator below the image
    const dotsContainer = document.getElementById("carousel-dots-container");
    if (dotsContainer) {
      dotsContainer.innerHTML = scenarios.map((_, idx) => `
        <div class="dot ${idx === slideIndex ? 'active' : ''}" data-slide-index="${idx}"></div>
      `).join('');
      
      // Bind click events on the dots to jump to a specific slide
      dotsContainer.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", () => {
          const idx = parseInt(dot.getAttribute("data-slide-index"));
          currentSlide = idx;
          renderScenario(channelId, channelName, currentSlide);
        });
      });
    }
  };

  // Switch Active Sidebar Group
  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetGroup = btn.getAttribute("data-group");

      sidebarButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      subTabRows.forEach((row) => {
        if (row.getAttribute("data-group-tabs") === targetGroup) {
          row.classList.add("active");
          const firstTab = row.querySelector(".sub-tab");
          if (firstTab) firstTab.click();
        } else {
          row.classList.remove("active");
        }
      });
    });
  });

  // Switch Active Channel Tab
  subTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const channel = tab.getAttribute("data-tab-channel");
      const nameSpan = tab.querySelector("span");
      activeChannelName = nameSpan ? nameSpan.innerText : tab.innerText.trim();
      activeChannel = channel;
      currentSlide = 0; // Reset slide to 1st scenario

      const activeRow = tab.closest(".sub-tabs-row");
      if (activeRow) {
        activeRow.querySelectorAll(".sub-tab").forEach(t => t.classList.remove("active"));
      }
      tab.classList.add("active");

      // Update flow image
      if (flowImg && flowImagesMap[channel]) {
        flowImg.style.opacity = 0.3;
        setTimeout(() => {
          flowImg.src = flowImagesMap[channel];
          flowImg.style.opacity = 1;
        }, 150);
      }

      // Render the 1st scenario
      renderScenario(activeChannel, activeChannelName, currentSlide);
    });
  });

  // Carousel Arrow Controls
  prevBtn?.addEventListener("click", () => {
    const scenarios = generateScenarios(activeChannel, activeChannelName);
    currentSlide = (currentSlide - 1 + scenarios.length) % scenarios.length;
    renderScenario(activeChannel, activeChannelName, currentSlide);
  });

  nextBtn?.addEventListener("click", () => {
    const scenarios = generateScenarios(activeChannel, activeChannelName);
    currentSlide = (currentSlide + 1) % scenarios.length;
    renderScenario(activeChannel, activeChannelName, currentSlide);
  });

  // Initial load: render Messenger 1st slide
  renderScenario(activeChannel, activeChannelName, currentSlide);
};

// FAQ Accordion Logic for Smax Platforms
const initFAQAccordion = () => {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQs
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherContent = otherItem.querySelector(".faq-content");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current FAQ
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initTemplatesSlider();
  initAdvancedIntegrations();
  initFAQAccordion();
});
