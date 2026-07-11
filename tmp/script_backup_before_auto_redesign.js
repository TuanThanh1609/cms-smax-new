const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileDrawer = document.querySelector("[data-mobile-drawer]");
const revealItems = document.querySelectorAll(".reveal");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileDrawer.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
});

mobileDrawer?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileDrawer.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Mở menu");
  });
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

// Interactive tabs and vertical timeline for Automation Map
const automationTabs = document.querySelectorAll(".automation-tab");
const channelBlocks = document.querySelectorAll(".timeline-channel-block");
const mapImages = document.querySelectorAll(".automation-map-img");

// Function to activate a specific image
const activateImage = (channel, index) => {
  mapImages.forEach(img => {
    if (img.id === `map-img-${channel}-${index}`) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
};

automationTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const channel = tab.getAttribute("data-channel");
    
    // Update active tab button
    automationTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    // Update active timeline channel block
    channelBlocks.forEach(block => {
      if (block.getAttribute("data-channel-block") === channel) {
        block.classList.add("active");
        
        // Find the active timeline item in this block (or default to the first one)
        let activeItem = block.querySelector(".timeline-item.active");
        if (!activeItem) {
          activeItem = block.querySelector(".timeline-item");
          if (activeItem) activeItem.classList.add("active");
        }
        
        if (activeItem) {
          const index = activeItem.getAttribute("data-index");
          activateImage(channel, index);
        }
      } else {
        block.classList.remove("active");
      }
    });
  });
});

// Event listener for timeline items clicking
channelBlocks.forEach(block => {
  const channel = block.getAttribute("data-channel-block");
  const items = block.querySelectorAll(".timeline-item");
  
  items.forEach(item => {
    item.addEventListener("click", () => {
      // Deactivate all sibling items in this block
      items.forEach(i => i.classList.remove("active"));
      
      // Activate clicked item
      item.classList.add("active");
      
      // Show corresponding image
      const index = item.getAttribute("data-index");
      activateImage(channel, index);
    });
  });
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
      if (grid.getAttribute("data-tab-content") === targetTab) {
        grid.classList.add("active");
        
        // Re-trigger reveal animation for items inside the active bento grid
        const items = grid.querySelectorAll(".bento-item");
        items.forEach((item, index) => {
          // Temporarily remove to re-trigger transition if user toggles tabs
          item.classList.remove("is-visible");
          void item.offsetWidth; // Force reflow
          item.classList.add("is-visible");
          item.style.transitionDelay = `${Math.min(index % 5, 4) * 45}ms`;
        });
      } else {
        grid.classList.remove("active");
      }
    });
  });
});

// Product Ecosystem dynamic tab console switcher logic
const consoleTabs = document.querySelectorAll(".console-tab");
const consolePanels = document.querySelectorAll(".console-panel");

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

