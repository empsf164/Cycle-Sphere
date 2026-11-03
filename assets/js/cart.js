/**
 * CYCLE SPHERE - Shopping Cart Page Engine
 * Renders items, manages quantities, coupons, and subtotal calculations
 */

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("cart-table-body");
  const cartContentArea = document.getElementById("cart-content-area");
  const emptyCartState = document.getElementById("cart-empty-state");

  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping-cost");
  const discountRow = document.getElementById("cart-discount-row");
  const discountAmountEl = document.getElementById("cart-discount-amount");
  const discountDescEl = document.getElementById("cart-discount-desc");
  const totalEl = document.getElementById("cart-total");

  const shippingSelect = document.getElementById("shipping-method-select");
  const couponInput = document.getElementById("cart-coupon-input");
  const applyCouponBtn = document.getElementById("apply-coupon-btn");
  const removeCouponBtn = document.getElementById("remove-coupon-btn");

  let currentShippingCost = 0; // Free standard

  const renderCart = () => {
    if (!window.Store) return;
    const cart = window.Store.getCart();

    if (cart.length === 0) {
      if (cartContentArea) cartContentArea.style.display = "none";
      if (emptyCartState) emptyCartState.style.display = "flex";
      return;
    }

    if (cartContentArea) cartContentArea.style.display = "grid";
    if (emptyCartState) emptyCartState.style.display = "none";

    // Populate Items Table
    if (tableBody) {
      tableBody.innerHTML = cart
        .map(
          (item) => `
          <tr class="cart-item-row" data-cart-item-id="${item.cartItemId}">
            <td>
              <div class="cart-item-info">
                <a href="product-details.html?id=${item.productId}" class="cart-item-thumb">
                  <img src="${item.image}" alt="${item.name}" />
                </a>
                <div>
                  <h4 class="cart-item-title">
                    <a href="product-details.html?id=${item.productId}">${item.name}</a>
                  </h4>
                  <div class="cart-item-options">
                    Size: <strong>${item.size}</strong> &bull; Color: <strong>${item.color}</strong>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <span class="cart-item-price">$${item.price.toLocaleString()}</span>
            </td>
            <td>
              <div class="quantity-stepper">
                <button type="button" class="qty-btn btn-cart-qty-minus" data-id="${item.cartItemId}" aria-label="Decrease quantity">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" readonly />
                <button type="button" class="qty-btn btn-cart-qty-plus" data-id="${item.cartItemId}" aria-label="Increase quantity">+</button>
              </div>
            </td>
            <td>
              <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</span>
            </td>
            <td style="text-align: right;">
              <button type="button" class="cart-item-remove-btn" data-id="${item.cartItemId}" aria-label="Remove item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </td>
          </tr>
        `
        )
        .join("");

      // Bind minus/plus/remove events
      tableBody.querySelectorAll(".btn-cart-qty-minus").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const item = cart.find((i) => i.cartItemId === id);
          if (item) window.Store.updateQuantity(id, item.quantity - 1);
        });
      });

      tableBody.querySelectorAll(".btn-cart-qty-plus").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          const item = cart.find((i) => i.cartItemId === id);
          if (item) window.Store.updateQuantity(id, item.quantity + 1);
        });
      });

      tableBody.querySelectorAll(".cart-item-remove-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.Store.removeFromCart(id);
        });
      });
    }

    // Calculations
    updateSummary();
  };

  const updateSummary = () => {
    if (!window.Store) return;
    const subtotal = window.Store.getCartSubtotal();
    const coupon = window.Store.getActiveCoupon();

    let discount = 0;
    if (coupon) {
      if (coupon.discountPercent) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      }
      if (coupon.freeShipping) {
        currentShippingCost = 0;
      }
    }

    const total = Math.max(0, subtotal - discount + currentShippingCost);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = currentShippingCost === 0 ? "Free" : `$${currentShippingCost}`;

    if (discountRow) {
      if (coupon) {
        discountRow.style.display = "flex";
        if (discountAmountEl) discountAmountEl.textContent = `-$${discount.toLocaleString()}`;
        if (discountDescEl) discountDescEl.textContent = `(${coupon.code}: ${coupon.label})`;
        if (removeCouponBtn) removeCouponBtn.style.display = "inline";
      } else {
        discountRow.style.display = "none";
        if (removeCouponBtn) removeCouponBtn.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
  };

  // Shipping Method selection
  shippingSelect?.addEventListener("change", (e) => {
    currentShippingCost = parseFloat(e.target.value) || 0;
    updateSummary();
  });

  // Coupon Submission
  applyCouponBtn?.addEventListener("click", () => {
    const code = couponInput?.value;
    if (!code) {
      window.Store.showToast("Please enter a coupon code.", "warning");
      return;
    }
    const res = window.Store.applyCoupon(code);
    if (!res.success) {
      window.Store.showToast(res.message, "warning");
    } else {
      if (couponInput) couponInput.value = "";
    }
  });

  removeCouponBtn?.addEventListener("click", () => {
    window.Store.removeCoupon();
  });

  // Re-render when cart changes
  window.addEventListener("cycleSphereCartUpdated", () => {
    renderCart();
  });

  // Initial
  renderCart();
});

