/**
 * CYCLE SPHERE - Main Global Application Script
 * Header scroll state, mobile menu drawer, common card renderers, and newsletter
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Header scroll tracking
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Navigation Drawer
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const drawerBackdrop = document.querySelector(".mobile-drawer-backdrop");
  const drawerCloseBtn = document.querySelector(".mobile-drawer-close");

  const openDrawer = () => {
    if (drawerBackdrop) {
      drawerBackdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeDrawer = () => {
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  };

  hamburgerBtn?.addEventListener("click", openDrawer);
  drawerCloseBtn?.addEventListener("click", closeDrawer);
  drawerBackdrop?.addEventListener("click", (e) => {
    if (e.target === drawerBackdrop) closeDrawer();
  });

  // Mobile Accordion toggles
  document.querySelectorAll(".mobile-accordion-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute("data-accordion-target");
      const content = document.getElementById(targetId);
      if (content) {
        content.classList.toggle("is-open");
        const chevron = toggle.querySelector(".nav-chevron");
        if (chevron) {
          chevron.style.transform = content.classList.contains("is-open") ? "rotate(180deg)" : "rotate(0deg)";
        }
      }
    });
  });

  // 3. Newsletter form handler (Global)
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector(".newsletter-input");
      const email = (input?.value || "").trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        if (window.Store) {
          window.Store.showToast("Please enter a valid email address.", "warning");
        } else {
          alert("Please enter a valid email address.");
        }
        return;
      }

      if (window.Store) {
        window.Store.showToast("Thank you for joining Cycle Sphere Journal! Check your inbox for 10% off.", "success");
      }
      form.reset();
    });
  });

  // 4. Highlight Active Navigation Item based on URL
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && (href === currentPath || (currentPath === "" && href === "index.html"))) {
      link.closest(".nav-item")?.classList.add("is-active");
    }
  });

  // 5. Global Image Fallback Handler (prevents broken image icons if offline)
  document.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") {
      e.target.onerror = null;
      e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22450%22%20viewBox%3D%220%200%20600%20450%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22600%22%20height%3D%22450%22%20fill%3D%22%2316231B%22%2F%3E%3Ccircle%20cx%3D%22200%22%20cy%3D%22260%22%20r%3D%2265%22%20stroke%3D%22%23C3E636%22%20stroke-width%3D%226%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22260%22%20r%3D%2265%22%20stroke%3D%22%23C3E636%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M200%20260L280%20170L360%20260L200%20260Z%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%226%22%2F%3E%3Cpath%20d%3D%22M280%20170L380%20170L400%20260%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%226%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22370%22%20text-anchor%3D%22middle%22%20fill%3D%22%23A0AEC0%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20font-weight%3D%22600%22%3ECYCLE%20SPHERE%20PRECISION%3C%2Ftext%3E%3C%2Fsvg%3E";
    }
  }, true);
});

/**
 * Global Helper to generate markup for a standard Product Card
 * @param {Object} product
 * @returns {string} HTML string
 */
function createProductCardHTML(product) {
  const isWishlisted = window.Store ? window.Store.isInWishlist(product.id) : false;
  const ratingStars = window.Store ? window.Store.renderRatingStars(product.rating) : "★★★★★";

  const sizeChips = product.sizes && product.sizes.length
    ? product.sizes.slice(0, 3).map((s) => `<span class="size-tag">${s.split(" ")[0]}</span>`).join("")
    : "";

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card-media">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        <div class="product-card-badges">
          ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge.toUpperCase()}</span>` : ""}
        </div>
        <div class="product-card-actions">
          <button type="button" class="btn-wishlist ${isWishlisted ? "is-active" : ""}" data-wishlist-id="${product.id}" aria-label="Toggle wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <button type="button" class="btn-quick-view-trigger" data-quickview-id="${product.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Quick View
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-meta">
          <span class="product-category-tag">${product.categoryLabel}</span>
          <div class="product-rating">${ratingStars} <span class="rating-num">(${product.rating})</span></div>
        </div>
        <h3 class="product-card-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        ${sizeChips ? `<div class="product-card-sizes">${sizeChips}</div>` : ""}
        <div class="product-card-footer">
          <div class="product-card-price">
            <span class="current-price">$${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toLocaleString()}</span>` : ""}
          </div>
          <button type="button" class="btn btn-primary btn-sm btn-card-cart" onclick="window.handleCardAddToCart('${product.id}')" aria-label="Add ${product.name} to cart">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add
          </button>
        </div>
      </div>
    </article>
  `;
}

// Global handler for card Add to Cart button
window.handleCardAddToCart = function (productId) {
  const product = window.CYCLE_SPHERE_PRODUCTS?.find((p) => p.id === productId);
  if (product && window.Store) {
    const defaultSize = product.sizes ? product.sizes[0] : "Standard";
    const defaultColor = product.colors ? product.colors[0].name : "Default";
    window.Store.addToCart(product, defaultSize, defaultColor, 1);
  }
};
