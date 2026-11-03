/**
 * CYCLE SPHERE - Product Details Page Engine
 * Gallery switching, option selection (sizes/colors/quantity), tabs, and recommendations
 */

document.addEventListener("DOMContentLoaded", () => {
  const products = window.CYCLE_SPHERE_PRODUCTS || [];

  // 1. Get Product from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id") || "aero-strada-pro-carbon";
  const product = products.find((p) => p.id === productId) || products[0];

  if (!product) return;

  // Selected State
  let selectedSize = product.sizes ? product.sizes[0] : "Standard";
  let selectedColor = product.colors ? product.colors[0].name : "Default";
  let quantity = 1;

  // Update Page Title
  document.title = `${product.name} — CYCLE SPHERE`;

  // Breadcrumbs
  const crumbCat = document.getElementById("pdp-crumb-cat");
  const crumbTitle = document.getElementById("pdp-crumb-title");
  if (crumbCat) {
    crumbCat.textContent = product.categoryLabel;
    crumbCat.href = `shop.html?cat=${product.category}`;
  }
  if (crumbTitle) crumbTitle.textContent = product.name;

  // 2. Render Gallery
  const mainImg = document.getElementById("pdp-main-image");
  const thumbsContainer = document.getElementById("pdp-gallery-thumbs");
  if (mainImg) {
    mainImg.src = product.images[0];
    mainImg.alt = product.name;
  }
  if (thumbsContainer && product.images.length > 1) {
    thumbsContainer.innerHTML = product.images
      .map(
        (img, idx) => `
        <button type="button" class="gallery-thumb-btn ${idx === 0 ? "is-active" : ""}" data-src="${img}">
          <img src="${img}" alt="${product.name} angle ${idx + 1}" />
        </button>
      `
      )
      .join("");

    thumbsContainer.querySelectorAll(".gallery-thumb-btn").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbsContainer.querySelectorAll(".gallery-thumb-btn").forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
        if (mainImg) mainImg.src = thumb.getAttribute("data-src");
      });
    });
  }

  // 3. Render Product Info
  const titleEl = document.getElementById("pdp-title");
  const catBadgeEl = document.getElementById("pdp-category-badge");
  const promoBadgeEl = document.getElementById("pdp-promo-badge");
  const ratingWrap = document.getElementById("pdp-rating-wrap");
  const priceEl = document.getElementById("pdp-price");
  const originalPriceEl = document.getElementById("pdp-original-price");
  const descEl = document.getElementById("pdp-description");
  const stockEl = document.getElementById("pdp-stock-count");
  const wishlistBtn = document.getElementById("pdp-wishlist-btn");

  if (titleEl) titleEl.textContent = product.name;
  if (catBadgeEl) catBadgeEl.textContent = product.categoryLabel;
  if (promoBadgeEl) {
    if (product.badge) {
      promoBadgeEl.className = `product-badge badge-${product.badge}`;
      promoBadgeEl.textContent = product.badge.toUpperCase();
      promoBadgeEl.style.display = "inline-flex";
    } else {
      promoBadgeEl.style.display = "none";
    }
  }

  if (ratingWrap && window.Store) {
    ratingWrap.innerHTML = `
      <div class="product-rating">${window.Store.renderRatingStars(product.rating)}</div>
      <span style="font-weight: 600; font-size: 0.95rem;">${product.rating}</span>
      <a href="#tab-reviews" id="jump-to-reviews-link" class="btn-text-link" style="font-size: 0.85rem; color: var(--text-muted); text-decoration: underline;">
        (${product.reviewsCount} rider reviews)
      </a>
    `;

    document.getElementById("jump-to-reviews-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      const reviewTabBtn = document.getElementById("pdp-reviews-tab");
      reviewTabBtn?.click();
      reviewTabBtn?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (priceEl) priceEl.textContent = `$${product.price.toLocaleString()}`;
  if (originalPriceEl) {
    if (product.originalPrice) {
      originalPriceEl.textContent = `$${product.originalPrice.toLocaleString()}`;
      originalPriceEl.style.display = "inline";
    } else {
      originalPriceEl.style.display = "none";
    }
  }

  if (descEl) descEl.textContent = product.description;
  if (stockEl) {
    stockEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> In Stock (${product.stockCount} units available for instant dispatch)`;
  }

  // Wishlist Button state
  if (wishlistBtn && window.Store) {
    const isSaved = window.Store.isInWishlist(product.id);
    wishlistBtn.setAttribute("data-wishlist-id", product.id);
    wishlistBtn.classList.toggle("is-active", isSaved);
  }

  // 4. Render Size Selector
  const sizeContainer = document.getElementById("pdp-size-selector");
  const currentSizeLabel = document.getElementById("pdp-selected-size-label");
  if (sizeContainer && product.sizes && product.sizes.length) {
    sizeContainer.innerHTML = product.sizes
      .map(
        (s, idx) => `
        <button type="button" class="pdp-size-btn ${idx === 0 ? "is-selected" : ""}" data-size="${s}">
          ${s}
        </button>
      `
      )
      .join("");

    if (currentSizeLabel) currentSizeLabel.textContent = selectedSize;

    sizeContainer.querySelectorAll(".pdp-size-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sizeContainer.querySelectorAll(".pdp-size-btn").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selectedSize = btn.getAttribute("data-size");
        if (currentSizeLabel) currentSizeLabel.textContent = selectedSize;
      });
    });
  } else if (sizeContainer) {
    sizeContainer.parentElement.style.display = "none";
  }

  // 5. Render Color Swatches
  const colorContainer = document.getElementById("pdp-color-selector");
  const currentColorLabel = document.getElementById("pdp-selected-color-label");
  if (colorContainer && product.colors && product.colors.length) {
    colorContainer.innerHTML = product.colors
      .map(
        (c, idx) => `
        <button type="button" class="pdp-swatch-btn ${idx === 0 ? "is-selected" : ""}" style="background-color: ${c.hex};" title="${c.name}" data-color="${c.name}"></button>
      `
      )
      .join("");

    if (currentColorLabel) currentColorLabel.textContent = selectedColor;

    colorContainer.querySelectorAll(".pdp-swatch-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        colorContainer.querySelectorAll(".pdp-swatch-btn").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selectedColor = btn.getAttribute("data-color");
        if (currentColorLabel) currentColorLabel.textContent = selectedColor;
      });
    });
  } else if (colorContainer) {
    colorContainer.parentElement.style.display = "none";
  }

  // 6. Quantity Stepper
  const qtyInput = document.getElementById("pdp-qty-input");
  const minusBtn = document.getElementById("pdp-qty-minus");
  const plusBtn = document.getElementById("pdp-qty-plus");

  minusBtn?.addEventListener("click", () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val > 1) {
      qtyInput.value = val - 1;
      quantity = val - 1;
    }
  });

  plusBtn?.addEventListener("click", () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val < 10) {
      qtyInput.value = val + 1;
      quantity = val + 1;
    }
  });

  // 7. Add to Cart & Buy Now
  const addCartBtn = document.getElementById("pdp-add-cart-btn");
  const buyNowBtn = document.getElementById("pdp-buy-now-btn");

  addCartBtn?.addEventListener("click", () => {
    if (window.Store) {
      window.Store.addToCart(product, selectedSize, selectedColor, quantity);
    }
  });

  buyNowBtn?.addEventListener("click", () => {
    if (window.Store) {
      window.Store.addToCart(product, selectedSize, selectedColor, quantity);
      window.location.href = "checkout.html";
    }
  });

  // 8. Structured Specifications Table
  const specsTableBody = document.getElementById("pdp-specs-table-body");
  if (specsTableBody && product.specifications) {
    const specs = product.specifications;
    const specRows = [
      { label: "Frame Material", value: specs.frameMaterial },
      { label: "Frame Architecture", value: specs.frameType },
      { label: "Available Frame Sizes", value: specs.availableSizes },
      { label: "Wheel Diameter", value: specs.wheelSize },
      { label: "Drivetrain & Shifting", value: specs.gearSystem },
      { label: "Gearing Configuration", value: specs.numberOfGears },
      { label: "Braking System", value: specs.brakeType },
      { label: "Suspension Architecture", value: specs.suspensionType },
      { label: "Front Fork System", value: specs.fork },
      { label: "Tire Specification", value: specs.tireType },
      { label: "Total Rig Weight", value: specs.weight },
      { label: "Intended Riding Discipline", value: specs.intendedRidingStyle }
    ];

    specsTableBody.innerHTML = specRows
      .map(
        (row) => `
        <tr>
          <th>${row.label}</th>
          <td>${row.value || "Precision Integrated Standard"}</td>
        </tr>
      `
      )
      .join("");
  }

  // 9. Key Features List
  const keyFeaturesContainer = document.getElementById("pdp-key-features-list");
  if (keyFeaturesContainer && product.keyFeatures) {
    keyFeaturesContainer.innerHTML = product.keyFeatures
      .map(
        (feat) => `
        <li style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.85rem; font-size: 0.95rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--primary); flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${feat}</span>
        </li>
      `
      )
      .join("");
  }

  // 10. Tabs Switching (Overview, Specs, Geometry & Sizing, Reviews)
  const tabButtons = document.querySelectorAll(".pdp-tab-btn");
  const tabPanels = document.querySelectorAll(".pdp-tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPanelId = btn.getAttribute("data-tab-target");
      tabButtons.forEach((b) => b.classList.remove("is-active"));
      tabPanels.forEach((p) => p.classList.remove("is-active"));

      btn.classList.add("is-active");
      document.getElementById(targetPanelId)?.classList.add("is-active");
    });
  });

  // 11. Render Related Bicycles & Accessories
  const relatedBikesContainer = document.getElementById("pdp-related-bikes-grid");
  if (relatedBikesContainer) {
    const relatedBikes = products
      .filter((p) => p.id !== product.id && p.category !== "accessories")
      .slice(0, 4);
    relatedBikesContainer.innerHTML = relatedBikes.map((p) => createProductCardHTML(p)).join("");
  }

  const relatedAccessoriesContainer = document.getElementById("pdp-related-accessories-grid");
  if (relatedAccessoriesContainer) {
    const accessories = products.filter((p) => p.category === "accessories").slice(0, 4);
    relatedAccessoriesContainer.innerHTML = accessories.map((p) => createProductCardHTML(p)).join("");
  }

  // 12. Review Form submission demo
  const reviewForm = document.getElementById("pdp-review-form");
  reviewForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (window.Store) {
      window.Store.showToast("Thank you! Your verified rider review has been submitted for moderation.", "success");
    }
    reviewForm.reset();
  });
});
