document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const blogCards = document.querySelectorAll(".blog-card");

  // Filter cards
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Toggle active class
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-filter");

      blogCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          // Quick fade-in animation
          card.style.opacity = "0";
          card.style.transform = "translateY(8px)";
          setTimeout(() => {
            card.style.transition = "opacity 300ms ease, transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Handle card clicks to detail page
  blogCards.forEach((card) => {
    card.addEventListener("click", () => {
      window.location.href = "blog-detail.html";
    });
  });
});