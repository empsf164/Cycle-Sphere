/**
 * CYCLE SPHERE - Shop Page Engine
 * Dynamic filtering, sorting, view toggling, URL param syncing, and pagination
 */

document.addEventListener("DOMContentLoaded", () => {
  const products = window.CYCLE_SPHERE_PRODUCTS || [];
  const gridContainer = document.getElementById("shop-products-grid");
  const resultCountEl = document.getElementById("shop-result-count");
  const chipsContainer = document.getElementById("active-filter-chips");
  const sortSelect = document.getElementById("sort-by-select");
  const gridViewBtn = document.getElementById("view-grid-btn");
  const listViewBtn = document.getElementById("view-list-btn");
  const clearAllBtn = document.getElementById("clear-all-filters-btn");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const loadMoreWrap = document.getElementById("load-more-wrap");

  // Mobile filter drawer elements
  const mobileFilterTrigger = document.getElementById("mobile-filter-trigger");
  const shopSidebar = document.getElementById("shop-sidebar");
  const shopSidebarBackdrop = document.getElementById("shop-sidebar-backdrop");
  const closeSidebarBtn = document.getElementById("close-sidebar-btn");

  // Filter State
  const state = {
    category: "all", // all, road, mountain, city, accessories
    subcategory: null,
    minPrice: 0,
    maxPrice: 10000,
    brands: [],
    materials: [],
    sizes: [],
    wheelSizes: [],
    inStockOnly: false,
    specialFilter: null, // bestseller, new, wishlist, collections
    sortBy: "featured",
    viewMode: "grid",
    page: 1,
    perPage: 9
  };

  // 1. Read URL Parameters
  const parseUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("cat")) {
      state.category = params.get("cat");
    }
    if (params.has("sub")) {
      state.subcategory = params.get("sub");
    }
    if (params.has("filter")) {
      state.specialFilter = params.get("filter");
    }
    if (params.has("sort")) {
      state.sortBy = params.get("sort");
      if (sortSelect) sortSelect.value = state.sortBy;
    }

    // Sync HTML inputs with URL state
    syncInputsWithState();
  };

  const syncInputsWithState = () => {
    // Category radio
    const catInput = document.querySelector(`input[name="filter-cat"][value="${state.category}"]`);
    if (catInput) catInput.checked = true;

    // Price
    const minInput = document.getElementById("price-min");
    const maxInput = document.getElementById("price-max");
    if (minInput && state.minPrice > 0) minInput.value = state.minPrice;
    if (maxInput && state.maxPrice < 10000) maxInput.value = state.maxPrice;

    // Stock
    const stockInput = document.getElementById("filter-instock");
    if (stockInput) stockInput.checked = state.inStockOnly;
  };

  // 2. Filter & Sort Logic
  const getFilteredProducts = () => {
    return products.filter((p) => {
      // Wishlist filter mode
      if (state.specialFilter === "wishlist") {
        if (!window.Store || !window.Store.isInWishlist(p.id)) return false;
      }

      // Special Filter: bestsellers
      if (state.specialFilter === "bestseller" && p.badge !== "bestseller") {
        return false;
      }

      // Special Filter: new
      if (state.specialFilter === "new" && p.badge !== "new") {
        return false;
      }

      // Category
      if (state.category !== "all" && p.category !== state.category) {
        return false;
      }

      // Subcategory
      if (state.subcategory && p.subcategory !== state.subcategory) {
        return false;
      }

      // Price
      if (p.price < state.minPrice || p.price > state.maxPrice) {
        return false;
      }

      // Brand
      if (state.brands.length > 0 && !state.brands.includes(p.brand)) {
        return false;
      }

      // Frame Material
      if (state.materials.length > 0) {
        const mat = (p.specifications?.frameMaterial || "").toLowerCase();
        const matchesMat = state.materials.some((m) => mat.includes(m.toLowerCase()));
        if (!matchesMat) return false;
      }

      // Sizes
      if (state.sizes.length > 0) {
        const availableSizes = p.sizes || [];
        const hasSize = state.sizes.some((reqSize) =>
          availableSizes.some((s) => s.toUpperCase().startsWith(reqSize.toUpperCase()))
        );
        if (!hasSize) return false;
      }

      // Wheel Sizes
      if (state.wheelSizes.length > 0) {
        const wheel = p.specifications?.wheelSize || "";
        const matchesWheel = state.wheelSizes.some((w) => wheel.includes(w));
        if (!matchesWheel) return false;
      }

      // In Stock
      if (state.inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    });
  };

  const sortProducts = (items) => {
    const list = [...items];
    switch (state.sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => (b.badge === "new" ? 1 : 0) - (a.badge === "new" ? 1 : 0));
      case "featured":
      default:
        return list.sort((a, b) => (b.badge === "bestseller" ? 1 : 0) - (a.badge === "bestseller" ? 1 : 0));
    }
  };

  // 3. Render
  const render = () => {
    const filtered = getFilteredProducts();
    const sorted = sortProducts(filtered);

    // Result Count
    if (resultCountEl) {
      resultCountEl.innerHTML = `Showing <strong>${Math.min(state.page * state.perPage, sorted.length)}</strong> of <strong>${sorted.length}</strong> bicycles & gear`;
    }

    // Active Chips
    renderActiveChips();

    // Empty State Check
    if (sorted.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3>No Bicycles or Gear Found</h3>
          <p>We couldn't find matches for your active filter combination. Try resetting your criteria or clearing individual filters.</p>
          <button type="button" class="btn btn-primary" id="empty-reset-btn">Reset All Filters</button>
        </div>
      `;
      document.getElementById("empty-reset-btn")?.addEventListener("click", resetFilters);
      if (loadMoreWrap) loadMoreWrap.style.display = "none";
      return;
    }

    // Pagination slice
    const paginated = sorted.slice(0, state.page * state.perPage);
    gridContainer.innerHTML = paginated.map((p) => createProductCardHTML(p)).join("");

    // Toggle list view class
    if (state.viewMode === "list") {
      gridContainer.classList.add("list-view");
    } else {
      gridContainer.classList.remove("list-view");
    }

    // Load More Visibility
    if (loadMoreWrap) {
      if (paginated.length < sorted.length) {
        loadMoreWrap.style.display = "flex";
      } else {
        loadMoreWrap.style.display = "none";
      }
    }
  };

  // 4. Active Filter Chips
  const renderActiveChips = () => {
    if (!chipsContainer) return;
    const chips = [];

    if (state.specialFilter) {
      chips.push({ label: `Filter: ${state.specialFilter}`, key: "specialFilter" });
    }
    if (state.category !== "all") {
      chips.push({ label: `Category: ${state.category.toUpperCase()}`, key: "category" });
    }
    if (state.subcategory) {
      chips.push({ label: `Sub: ${state.subcategory}`, key: "subcategory" });
    }
    if (state.minPrice > 0 || state.maxPrice < 10000) {
      chips.push({ label: `$${state.minPrice} - $${state.maxPrice}`, key: "price" });
    }
    state.brands.forEach((b) => chips.push({ label: b, key: "brand", val: b }));
    state.materials.forEach((m) => chips.push({ label: m, key: "material", val: m }));
    state.sizes.forEach((s) => chips.push({ label: `Size: ${s}`, key: "size", val: s }));
    state.wheelSizes.forEach((w) => chips.push({ label: `Wheel: ${w}`, key: "wheel", val: w }));
    if (state.inStockOnly) {
      chips.push({ label: "In Stock Only", key: "inStockOnly" });
    }

    if (chips.length === 0) {
      chipsContainer.innerHTML = "";
      chipsContainer.style.display = "none";
      return;
    }

    chipsContainer.style.display = "flex";
    chipsContainer.innerHTML = `
      <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600;">Active Filters:</span>
      ${chips
        .map(
          (c) => `
          <span class="filter-chip">
            ${c.label}
            <span class="filter-chip-remove" data-chip-key="${c.key}" data-chip-val="${c.val || ""}">&times;</span>
          </span>
        `
        )
        .join("")}
      <button type="button" class="btn btn-ghost btn-sm" id="chips-clear-all" style="padding: 0.2rem 0.5rem; font-size: 0.78rem;">Clear All</button>
    `;

    chipsContainer.querySelectorAll(".filter-chip-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-chip-key");
        const val = btn.getAttribute("data-chip-val");
        removeFilter(key, val);
      });
    });

    document.getElementById("chips-clear-all")?.addEventListener("click", resetFilters);
  };

  const removeFilter = (key, val) => {
    if (key === "specialFilter") state.specialFilter = null;
    if (key === "category") {
      state.category = "all";
      const radio = document.querySelector('input[name="filter-cat"][value="all"]');
      if (radio) radio.checked = true;
    }
    if (key === "subcategory") state.subcategory = null;
    if (key === "price") {
      state.minPrice = 0;
      state.maxPrice = 10000;
      const minInput = document.getElementById("price-min");
      const maxInput = document.getElementById("price-max");
      if (minInput) minInput.value = "";
      if (maxInput) maxInput.value = "";
    }
    if (key === "brand") {
      state.brands = state.brands.filter((b) => b !== val);
      const cb = document.querySelector(`input[name="filter-brand"][value="${val}"]`);
      if (cb) cb.checked = false;
    }
    if (key === "material") {
      state.materials = state.materials.filter((m) => m !== val);
      const cb = document.querySelector(`input[name="filter-material"][value="${val}"]`);
      if (cb) cb.checked = false;
    }
    if (key === "size") {
      state.sizes = state.sizes.filter((s) => s !== val);
      const cb = document.querySelector(`input[name="filter-size"][value="${val}"]`);
      if (cb) cb.checked = false;
    }
    if (key === "wheel") {
      state.wheelSizes = state.wheelSizes.filter((w) => w !== val);
      const cb = document.querySelector(`input[name="filter-wheel"][value="${val}"]`);
      if (cb) cb.checked = false;
    }
    if (key === "inStockOnly") {
      state.inStockOnly = false;
      const cb = document.getElementById("filter-instock");
      if (cb) cb.checked = false;
    }

    state.page = 1;
    render();
  };

  const resetFilters = () => {
    state.category = "all";
    state.subcategory = null;
    state.minPrice = 0;
    state.maxPrice = 10000;
    state.brands = [];
    state.materials = [];
    state.sizes = [];
    state.wheelSizes = [];
    state.inStockOnly = false;
    state.specialFilter = null;
    state.page = 1;

    // Reset DOM form controls
    document.querySelectorAll(".shop-sidebar input[type='checkbox']").forEach((cb) => (cb.checked = false));
    const allCatRadio = document.querySelector('input[name="filter-cat"][value="all"]');
    if (allCatRadio) allCatRadio.checked = true;
    const minInput = document.getElementById("price-min");
    const maxInput = document.getElementById("price-max");
    if (minInput) minInput.value = "";
    if (maxInput) maxInput.value = "";

    // Clear search URL params cleanly
    window.history.replaceState({}, document.title, window.location.pathname);

    render();
  };

  // 5. Event Listeners for Filters
  // Category Radio buttons
  document.querySelectorAll('input[name="filter-cat"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      state.category = e.target.value;
      state.subcategory = null;
      state.specialFilter = null;
      state.page = 1;
      render();
    });
  });

  // Price Range Inputs
  const applyPriceBtn = document.getElementById("apply-price-btn");
  applyPriceBtn?.addEventListener("click", () => {
    const min = parseFloat(document.getElementById("price-min")?.value) || 0;
    const max = parseFloat(document.getElementById("price-max")?.value) || 10000;
    state.minPrice = min;
    state.maxPrice = max;
    state.page = 1;
    render();
  });

  // Checkboxes (brand, material, size, wheel)
  const setupCheckboxGroup = (name, stateKey) => {
    document.querySelectorAll(`input[name="${name}"]`).forEach((cb) => {
      cb.addEventListener("change", () => {
        const checkedVals = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((c) => c.value);
        state[stateKey] = checkedVals;
        state.page = 1;
        render();
      });
    });
  };

  setupCheckboxGroup("filter-brand", "brands");
  setupCheckboxGroup("filter-material", "materials");
  setupCheckboxGroup("filter-size", "sizes");
  setupCheckboxGroup("filter-wheel", "wheelSizes");

  // In Stock checkbox
  document.getElementById("filter-instock")?.addEventListener("change", (e) => {
    state.inStockOnly = e.target.checked;
    state.page = 1;
    render();
  });

  // Clear all button in sidebar
  clearAllBtn?.addEventListener("click", resetFilters);

  // Sorting
  sortSelect?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    render();
  });

  // View Mode (Grid vs List)
  gridViewBtn?.addEventListener("click", () => {
    state.viewMode = "grid";
    gridViewBtn.classList.add("is-active");
    listViewBtn?.classList.remove("is-active");
    render();
  });

  listViewBtn?.addEventListener("click", () => {
    state.viewMode = "list";
    listViewBtn.classList.add("is-active");
    gridViewBtn?.classList.remove("is-active");
    render();
  });

  // Load More Button
  loadMoreBtn?.addEventListener("click", () => {
    state.page += 1;
    render();
  });

  // Mobile Filter Drawer Toggle
  const openSidebar = () => {
    shopSidebar?.classList.add("is-open");
    shopSidebarBackdrop?.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    shopSidebar?.classList.remove("is-open");
    shopSidebarBackdrop?.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  mobileFilterTrigger?.addEventListener("click", openSidebar);
  closeSidebarBtn?.addEventListener("click", closeSidebar);
  shopSidebarBackdrop?.addEventListener("click", closeSidebar);

  // Listen to Wishlist updates to refresh wishlist filter mode live if open
  window.addEventListener("cycleSphereWishlistUpdated", () => {
    if (state.specialFilter === "wishlist") {
      render();
    }
  });

  // Init
  parseUrlParams();
  render();
});

