/**
 * CYCLE SPHERE - State Store & Global Utilities
 * Manages Cart, Wishlist, Theme, Toast Notifications, and Search Overlay
 */

const Store = {
  CART_KEY: "cycle_sphere_cart_v1",
  WISHLIST_KEY: "cycle_sphere_wishlist_v1",
  THEME_KEY: "cycle_sphere_theme_v1",
  COUPON_KEY: "cycle_sphere_active_coupon_v1",

  validCoupons: {
    CYCLESPO10: { discountPercent: 10, label: "10% Off Welcome Discount" },
    VELO15: { discountPercent: 15, label: "15% Off VIP Rider" },
    FREESHIP: { freeShipping: true, label: "Complimentary Expedited Shipping" }
  },

  // -------------------------------------------------------------
  // Theme Management
  // -------------------------------------------------------------
  initTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme, false);
    } else {
      this.setTheme("dark", false);
    }
  },

  getTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  },

  setTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (save) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
    this.updateThemeIcons(theme);
  },

  toggleTheme() {
    const current = this.getTheme();
    const next = current === "dark" ? "light" : "dark";
    this.setTheme(next, true);
    this.showToast(`Switched to ${next} mode`, "info");
  },

  updateThemeIcons(theme) {
    const togglers = document.querySelectorAll(".theme-toggle-btn");
    togglers.forEach((btn) => {
      btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
      btn.innerHTML =
        theme === "dark"
          ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
          : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    });
  },

  // -------------------------------------------------------------
  // Cart Management
  // -------------------------------------------------------------
  getCart() {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse cart", e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.notifyCartChange();
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  },

  addToCart(product, size, color, quantity = 1) {
    const cart = this.getCart();
    const chosenSize = size || (product.sizes && product.sizes[0]) || "Standard";
    const chosenColor = color || (product.colors && product.colors[0]?.name) || "Default";
    const cartItemId = `${product.id}__${chosenSize}__${chosenColor}`;

    const existingIndex = cart.findIndex((item) => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.categoryLabel,
        size: chosenSize,
        color: chosenColor,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    this.showToast(`Added "${product.name}" (${chosenSize}) to cart`, "success");
  },

  updateQuantity(cartItemId, newQty) {
    let cart = this.getCart();
    if (newQty <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }
    const target = cart.find((item) => item.cartItemId === cartItemId);
    if (target) {
      target.quantity = newQty;
      this.saveCart(cart);
    }
  },

  removeFromCart(cartItemId) {
    let cart = this.getCart();
    const removedItem = cart.find((item) => item.cartItemId === cartItemId);
    cart = cart.filter((item) => item.cartItemId !== cartItemId);
    this.saveCart(cart);
    if (removedItem) {
      this.showToast(`Removed "${removedItem.name}" from cart`, "info");
    }
  },

  clearCart() {
    localStorage.removeItem(this.CART_KEY);
    this.notifyCartChange();
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  },

  getCartSubtotal() {
    const cart = this.getCart();
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },

  // Coupon handling
  getActiveCoupon() {
    try {
      const code = localStorage.getItem(this.COUPON_KEY);
      if (code && this.validCoupons[code]) {
        return { code, ...this.validCoupons[code] };
      }
      return null;
    } catch {
      return null;
    }
  },

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (this.validCoupons[cleanCode]) {
      localStorage.setItem(this.COUPON_KEY, cleanCode);
      this.notifyCartChange();
      this.showToast(`Coupon "${cleanCode}" applied: ${this.validCoupons[cleanCode].label}`, "success");
      return { success: true, coupon: this.validCoupons[cleanCode] };
    }
    return { success: false, message: "Invalid promo code. Try 'CYCLESPO10' or 'VELO15'." };
  },

  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
    this.notifyCartChange();
    this.showToast("Coupon removed", "info");
  },

  notifyCartChange() {
    const count = this.getCartCount();
    document.querySelectorAll(".cart-count-badge").forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });
    window.dispatchEvent(new CustomEvent("cycleSphereCartUpdated", { detail: { count, cart: this.getCart() } }));
  },

  // -------------------------------------------------------------
  // Wishlist Management
  // -------------------------------------------------------------
  getWishlist() {
    try {
      const data = localStorage.getItem(this.WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(list));
      this.notifyWishlistChange();
    } catch (e) {
      console.error(e);
    }
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  toggleWishlist(productId) {
    let list = this.getWishlist();
    const product = window.CYCLE_SPHERE_PRODUCTS?.find((p) => p.id === productId);
    const prodName = product ? product.name : "Product";

    if (list.includes(productId)) {
      list = list.filter((id) => id !== productId);
      this.saveWishlist(list);
      this.showToast(`Removed "${prodName}" from wishlist`, "info");
    } else {
      list.push(productId);
      this.saveWishlist(list);
      this.showToast(`Saved "${prodName}" to your wishlist`, "success");
    }

    this.updateWishlistButtons(productId);
    return this.isInWishlist(productId);
  },

  updateWishlistButtons(targetId = null) {
    const buttons = document.querySelectorAll("[data-wishlist-id]");
    const list = this.getWishlist();
    buttons.forEach((btn) => {
      const id = btn.getAttribute("data-wishlist-id");
      if (!targetId || targetId === id) {
        const active = list.includes(id);
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
      }
    });
  },

  notifyWishlistChange() {
    const count = this.getWishlist().length;
    document.querySelectorAll(".wishlist-count-badge").forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });
    window.dispatchEvent(new CustomEvent("cycleSphereWishlistUpdated", { detail: { count, wishlist: this.getWishlist() } }));
  },

  // -------------------------------------------------------------
  // Toast Notification System
  // -------------------------------------------------------------
  showToast(message, type = "success", duration = 3200) {
    let container = document.getElementById("cs-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "cs-toast-container";
      container.className = "cs-toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `cs-toast cs-toast-${type}`;

    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === "warning") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div class="cs-toast-icon">${iconSvg}</div>
      <div class="cs-toast-message">${message}</div>
      <button class="cs-toast-close" aria-label="Close notification">&times;</button>
    `;

    toast.querySelector(".cs-toast-close").addEventListener("click", () => {
      toast.classList.add("cs-toast-hiding");
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add("cs-toast-hiding");
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  },

  // -------------------------------------------------------------
  // Quick View Modal
  // -------------------------------------------------------------
  openQuickView(productId) {
    const product = window.CYCLE_SPHERE_PRODUCTS?.find((p) => p.id === productId);
    if (!product) return;

    let modal = document.getElementById("cs-quickview-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cs-quickview-modal";
      modal.className = "cs-modal-backdrop";
      document.body.appendChild(modal);
    }

    let selectedSize = product.sizes ? product.sizes[0] : "Standard";
    let selectedColor = product.colors ? product.colors[0].name : "Default";

    const ratingStars = this.renderRatingStars(product.rating);

    const sizesHtml = product.sizes && product.sizes.length
      ? `
        <div class="qv-option-group">
          <label class="qv-option-label">Select Frame / Fit Size: <span id="qv-selected-size-text" class="text-accent-weight">${selectedSize}</span></label>
          <div class="qv-size-buttons">
            ${product.sizes
              .map(
                (s, i) =>
                  `<button type="button" class="qv-size-btn ${i === 0 ? "is-selected" : ""}" data-size="${s}">${s}</button>`
              )
              .join("")}
          </div>
        </div>
      `
      : "";

    const colorsHtml = product.colors && product.colors.length
      ? `
        <div class="qv-option-group">
          <label class="qv-option-label">Finish: <span id="qv-selected-color-text" class="text-accent-weight">${selectedColor}</span></label>
          <div class="qv-color-swatches">
            ${product.colors
              .map(
                (c, i) =>
                  `<button type="button" class="qv-swatch-btn ${i === 0 ? "is-selected" : ""}" style="background-color: ${c.hex};" title="${c.name}" data-color="${c.name}"></button>`
              )
              .join("")}
          </div>
        </div>
      `
      : "";

    modal.innerHTML = `
      <div class="cs-modal-dialog cs-quickview-dialog">
        <button class="cs-modal-close" aria-label="Close dialog">&times;</button>
        <div class="cs-quickview-grid">
          <div class="cs-quickview-media">
            <div class="cs-quickview-main-image">
              <img id="qv-main-img" src="${product.images[0]}" alt="${product.name}" />
            </div>
            ${
              product.images.length > 1
                ? `<div class="cs-quickview-thumbs">
                    ${product.images
                      .map(
                        (img, idx) =>
                          `<button type="button" class="qv-thumb-btn ${idx === 0 ? "is-active" : ""}" data-src="${img}">
                            <img src="${img}" alt="${product.name} view ${idx + 1}" />
                          </button>`
                      )
                      .join("")}
                  </div>`
                : ""
            }
          </div>
          <div class="cs-quickview-details">
            <div class="qv-badge-row">
              <span class="product-category-tag">${product.categoryLabel}</span>
              ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge.toUpperCase()}</span>` : ""}
            </div>
            <h2 class="qv-product-title">${product.name}</h2>
            <div class="qv-meta-row">
              <div class="product-rating">${ratingStars} <span class="rating-num">(${product.rating})</span></div>
              <span class="product-stock-status in-stock"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> In Stock & Ready to Ship</span>
            </div>

            <div class="qv-price-row">
              <span class="qv-price">$${product.price.toLocaleString()}</span>
              ${product.originalPrice ? `<span class="qv-original-price">$${product.originalPrice.toLocaleString()}</span>` : ""}
            </div>

            <p class="qv-description">${product.shortDescription}</p>

            ${sizesHtml}
            ${colorsHtml}

            <div class="qv-actions-row">
              <div class="quantity-stepper">
                <button type="button" class="qty-btn" id="qv-qty-minus" aria-label="Decrease quantity">-</button>
                <input type="number" id="qv-qty-input" value="1" min="1" max="10" readonly />
                <button type="button" class="qty-btn" id="qv-qty-plus" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="btn btn-primary btn-add-cart-qv" id="qv-add-cart-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Cart
              </button>
            </div>

            <div class="qv-footer-links">
              <a href="product-details.html?id=${product.id}" class="btn-text-link">View Full Specifications & Geometry &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event handlers inside modal
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";

    // Close logic
    const closeModal = () => {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    modal.querySelector(".cs-modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Thumbs
    modal.querySelectorAll(".qv-thumb-btn").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        modal.querySelectorAll(".qv-thumb-btn").forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
        modal.querySelector("#qv-main-img").src = thumb.getAttribute("data-src");
      });
    });

    // Sizes
    modal.querySelectorAll(".qv-size-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.querySelectorAll(".qv-size-btn").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selectedSize = btn.getAttribute("data-size");
        const label = modal.querySelector("#qv-selected-size-text");
        if (label) label.textContent = selectedSize;
      });
    });

    // Colors
    modal.querySelectorAll(".qv-swatch-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.querySelectorAll(".qv-swatch-btn").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        selectedColor = btn.getAttribute("data-color");
        const label = modal.querySelector("#qv-selected-color-text");
        if (label) label.textContent = selectedColor;
      });
    });

    // Quantity
    const qtyInput = modal.querySelector("#qv-qty-input");
    modal.querySelector("#qv-qty-minus")?.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
    modal.querySelector("#qv-qty-plus")?.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val < 10) qtyInput.value = val + 1;
    });

    // Add to cart from quick view
    modal.querySelector("#qv-add-cart-btn")?.addEventListener("click", () => {
      const qty = parseInt(qtyInput.value) || 1;
      this.addToCart(product, selectedSize, selectedColor, qty);
      closeModal();
    });
  },

  // -------------------------------------------------------------
  // Search Overlay
  // -------------------------------------------------------------
  initSearch() {
    let overlay = document.getElementById("cs-search-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "cs-search-overlay";
      overlay.className = "cs-search-overlay";
      overlay.innerHTML = `
        <div class="cs-search-modal">
          <div class="cs-search-header">
            <div class="cs-search-input-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="cs-search-input" placeholder="Search road bikes, mountain trails, helmets, accessories..." autocomplete="off" />
              <button type="button" id="cs-search-clear" class="cs-search-clear-btn" aria-label="Clear query">&times;</button>
            </div>
            <button type="button" id="cs-search-close" class="btn btn-ghost" aria-label="Close search">ESC</button>
          </div>
          <div class="cs-search-body">
            <div class="cs-search-suggestions" id="cs-search-suggestions">
              <span class="search-hint-label">Popular Searches:</span>
              <button class="search-tag-pill" data-query="carbon">Carbon Road</button>
              <button class="search-tag-pill" data-query="mountain">Full Suspension</button>
              <button class="search-tag-pill" data-query="commuter">Urban Commuter</button>
              <button class="search-tag-pill" data-query="helmet">MIPS Helmet</button>
              <button class="search-tag-pill" data-query="light">Smart Lights</button>
            </div>
            <div class="cs-search-results" id="cs-search-results"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const input = overlay.querySelector("#cs-search-input");
      const resultsContainer = overlay.querySelector("#cs-search-results");
      const clearBtn = overlay.querySelector("#cs-search-clear");
      const closeBtn = overlay.querySelector("#cs-search-close");

      const closeSearch = () => {
        overlay.classList.remove("is-open");
        document.body.style.overflow = "";
      };

      closeBtn.addEventListener("click", closeSearch);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeSearch();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("is-open")) {
          closeSearch();
        }
      });

      clearBtn.addEventListener("click", () => {
        input.value = "";
        input.focus();
        resultsContainer.innerHTML = "";
      });

      // Query pills
      overlay.querySelectorAll(".search-tag-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          input.value = pill.getAttribute("data-query");
          renderResults(input.value);
        });
      });

      const renderResults = (query) => {
        const q = (query || "").trim().toLowerCase();
        if (!q) {
          resultsContainer.innerHTML = "";
          return;
        }

        const matches = (window.CYCLE_SPHERE_PRODUCTS || []).filter((p) => {
          return (
            p.name.toLowerCase().includes(q) ||
            p.categoryLabel.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q)
          );
        });

        if (matches.length === 0) {
          resultsContainer.innerHTML = `
            <div class="search-empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p>No bicycles or accessories found for "<strong>${query}</strong>"</p>
              <a href="shop.html" class="btn btn-secondary btn-sm" onclick="document.getElementById('cs-search-overlay').classList.remove('is-open')">Browse All Gear</a>
            </div>
          `;
          return;
        }

        resultsContainer.innerHTML = `
          <div class="search-results-list">
            ${matches
              .map(
                (p) => `
                <a href="product-details.html?id=${p.id}" class="search-result-item" onclick="document.getElementById('cs-search-overlay').classList.remove('is-open')">
                  <div class="search-result-thumb">
                    <img src="${p.images[0]}" alt="${p.name}" />
                  </div>
                  <div class="search-result-info">
                    <span class="search-item-cat">${p.categoryLabel}</span>
                    <h4 class="search-item-title">${p.name}</h4>
                    <span class="search-item-price">$${p.price.toLocaleString()}</span>
                  </div>
                  <span class="search-item-arrow">&rarr;</span>
                </a>
              `
              )
              .join("")}
          </div>
        `;
      };

      input.addEventListener("input", (e) => {
        renderResults(e.target.value);
      });
    }

    // Attach open handlers
    document.querySelectorAll(".open-search-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("is-open");
        document.querySelector(".mobile-drawer-backdrop")?.classList.remove("is-open");
        document.body.style.overflow = "hidden";
        const input = overlay.querySelector("#cs-search-input");
        setTimeout(() => input?.focus(), 100);
      });
    });
  },

  // -------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------
  renderRatingStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars += `<svg class="star filled" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else if (i === full && half) {
        stars += `<svg class="star half" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/></svg>`;
      } else {
        stars += `<svg class="star empty" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }
    }
    return stars;
  },

  formatCurrency(amount) {
    return "$" + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
};

// Global initialization on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  Store.initTheme();
  Store.notifyCartChange();
  Store.notifyWishlistChange();
  Store.updateWishlistButtons();
  Store.initSearch();

  // Global theme toggle button listener
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => Store.toggleTheme());
  });

  // Global wishlist button delegator
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-wishlist-id]");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-wishlist-id");
      Store.toggleWishlist(id);
    }

    const qvBtn = e.target.closest("[data-quickview-id]");
    if (qvBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = qvBtn.getAttribute("data-quickview-id");
      Store.openQuickView(id);
    }
  });
});

if (typeof window !== "undefined") {
  window.Store = Store;
}

