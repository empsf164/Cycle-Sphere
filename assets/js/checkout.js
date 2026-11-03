/**
 * CYCLE SPHERE - Checkout Experience Engine
 * Form validation, payment method tabs, order summary sync, and order confirmation modal
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.Store) return;

  const cart = window.Store.getCart();
  const summaryItemsList = document.getElementById("checkout-summary-items");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const shippingEl = document.getElementById("checkout-shipping");
  const discountRow = document.getElementById("checkout-discount-row");
  const discountAmountEl = document.getElementById("checkout-discount-amount");
  const totalEl = document.getElementById("checkout-total");

  const checkoutForm = document.getElementById("checkout-form");
  const placeOrderBtn = document.getElementById("place-order-btn");
  const checkoutMainLayout = document.getElementById("checkout-main-layout");
  const confirmationContainer = document.getElementById("checkout-confirmation-container");

  let shippingCost = 0; // Default Free

  // 1. If Cart is completely empty and we're not on confirmation, redirect or show message
  if (cart.length === 0 && !sessionStorage.getItem("cycle_sphere_last_order")) {
    if (checkoutMainLayout) {
      checkoutMainLayout.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; margin: 4rem auto;">
          <div class="empty-state-icon">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h3>Your Shopping Cart is Empty</h3>
          <p>Please select a bicycle or accessory from our collection before proceeding to checkout.</p>
          <a href="shop.html" class="btn btn-primary btn-lg">Browse Bicycle Fleet &rarr;</a>
        </div>
      `;
    }
    return;
  }

  // 2. Render Order Summary Items
  if (summaryItemsList) {
    summaryItemsList.innerHTML = cart
      .map(
        (item) => `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="position: relative; width: 50px; height: 42px; border-radius: var(--radius-sm); overflow: hidden; background: var(--bg-secondary);">
              <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
              <span style="position: absolute; top: -4px; right: -4px; background: var(--primary); color: #fff; font-size: 0.65rem; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${item.quantity}</span>
            </div>
            <div>
              <h5 style="font-size: 0.88rem; line-height: 1.2;">${item.name}</h5>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${item.size} &bull; ${item.color}</span>
            </div>
          </div>
          <strong style="font-family: var(--font-heading); font-size: 0.95rem;">$${(item.price * item.quantity).toLocaleString()}</strong>
        </div>
      `
      )
      .join("");
  }

  // 3. Calculate Totals
  const updateSummary = () => {
    const subtotal = window.Store.getCartSubtotal();
    const coupon = window.Store.getActiveCoupon();

    let discount = 0;
    if (coupon) {
      if (coupon.discountPercent) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      }
      if (coupon.freeShipping) {
        shippingCost = 0;
      }
    }

    const total = Math.max(0, subtotal - discount + shippingCost);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = shippingCost === 0 ? "Free" : `$${shippingCost}`;

    if (discountRow) {
      if (coupon) {
        discountRow.style.display = "flex";
        if (discountAmountEl) discountAmountEl.textContent = `-$${discount.toLocaleString()}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
  };

  updateSummary();

  // 4. Delivery Method radios
  document.querySelectorAll('input[name="shipping_method"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      shippingCost = parseFloat(e.target.value) || 0;
      updateSummary();
    });
  });

  // 5. Payment Method Tabs
  const paymentTabs = document.querySelectorAll(".payment-method-pill");
  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      paymentTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      const method = tab.getAttribute("data-method");

      // Show/hide credit card specific fields
      const ccFields = document.getElementById("cc-fields-box");
      const altNotice = document.getElementById("alt-payment-notice");

      if (method === "card") {
        if (ccFields) ccFields.style.display = "block";
        if (altNotice) altNotice.style.display = "none";
      } else {
        if (ccFields) ccFields.style.display = "none";
        if (altNotice) {
          altNotice.style.display = "block";
          altNotice.textContent = `Demo: You have selected ${tab.textContent.trim()}. No actual debit will occur during this template test.`;
        }
      }
    });
  });

  // 6. Billing Address Checkbox Toggle
  const billingCheckbox = document.getElementById("same-as-shipping");
  const billingFields = document.getElementById("billing-address-fields");
  billingCheckbox?.addEventListener("change", (e) => {
    if (billingFields) {
      billingFields.style.display = e.target.checked ? "none" : "block";
    }
  });

  // 7. Form Submission & Order Simulation
  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Disable button & show spinner state
    if (placeOrderBtn) {
      placeOrderBtn.disabled = true;
      placeOrderBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-animation" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        Calibrating Order &amp; Encrypting...
      `;
    }

    // Simulate 1.2 second processing
    setTimeout(() => {
      const orderNumber = "CS-" + Math.floor(100000 + Math.random() * 900000);
      const email = document.getElementById("cust-email")?.value || "rider@cyclesphere.com";
      const name = (document.getElementById("cust-fname")?.value || "") + " " + (document.getElementById("cust-lname")?.value || "Rider");

      const orderData = {
        orderNumber,
        email,
        name,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        items: [...cart],
        subtotal: window.Store.getCartSubtotal(),
        total: totalEl?.textContent || "$0"
      };

      // Clear cart
      window.Store.clearCart();
      window.Store.removeCoupon();

      // Show Confirmation Card
      showOrderConfirmation(orderData);
    }, 1200);
  });

  const showOrderConfirmation = (order) => {
    if (checkoutMainLayout) checkoutMainLayout.style.display = "none";
    if (confirmationContainer) {
      confirmationContainer.style.display = "block";
      confirmationContainer.innerHTML = `
        <div class="confirmation-card">
          <div class="confirmation-check-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="product-badge badge-bestseller" style="margin-bottom: 0.75rem;">ORDER CONFIRMED &bull; WORKSHOP TUNING QUEUED</span>
          <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Thank You, ${order.name.trim() || "Rider"}!</h2>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem;">
            Your bicycle configuration has been sent to our master technician team. Order reference: <strong>${order.orderNumber}</strong>. A demo confirmation receipt has been sent to <strong>${order.email}</strong>.
          </p>

          <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; text-align: left; margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem; font-size: 0.9rem;">
              <span>Order Date: <strong>${order.date}</strong></span>
              <span>Total Paid: <strong style="color: var(--primary); font-family: var(--font-heading); font-size: 1.1rem;">${order.total}</strong></span>
            </div>
            <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem;">Reserved Gear (${order.items.length} items):</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${order.items.map((i) => `<div>&bull; ${i.quantity}x <strong>${i.name}</strong> (${i.size}, ${i.color})</div>`).join("")}
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline" onclick="window.print()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print Demo Receipt
            </button>
            <a href="index.html" class="btn btn-primary">
              Return to Fleet Homepage
            </a>
          </div>
        </div>
      `;

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
});

