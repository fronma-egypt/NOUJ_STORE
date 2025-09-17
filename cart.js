// Modern and Smart Cart JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartContainer = document.getElementById("empty-cart");
  const cartCountElem = document.getElementById("cart-count");
  const itemCountElem = document.getElementById("item-count");
  const subtotalElem = document.getElementById("subtotal");
  const discountElem = document.getElementById("discount");
  const shippingCostElem = document.getElementById("shipping-cost");
  const totalPriceElem = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const toastContainer = document.getElementById("toast-container");
  const loadingOverlay = document.getElementById("loading-overlay");

  const DISCOUNT_RATE = 0.10;
  const SHIPPING_BASE_COST = 10;
  const SHIPPING_PER_KM = 4;

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast show ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove("show");
      toast.remove();
    }, 3000);
  }

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.textContent = totalItems;
    itemCountElem.textContent = totalItems;
    if (totalItems === 0) {
      emptyCartContainer.classList.remove("hidden");
      cartItemsContainer.classList.add("hidden");
      checkoutBtn.disabled = true;
    } else {
      emptyCartContainer.classList.add("hidden");
      cartItemsContainer.classList.remove("hidden");
      checkoutBtn.disabled = false;
    }
  }

  function calculateTotals() {
    let subtotal = 0;
    for (const id in cart) {
      subtotal += cart[id].price * cart[id].quantity;
    }
    const discount = subtotal * DISCOUNT_RATE;
    const shippingDistance = parseFloat(localStorage.getItem("shipping_distance")) || 0;
    const shippingCost = shippingDistance <= 1 ? SHIPPING_BASE_COST : SHIPPING_BASE_COST + (shippingDistance - 1) * SHIPPING_PER_KM;
    const total = subtotal - discount + shippingCost;
    return { subtotal, discount, shippingCost, total };
  }

  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    for (const id in cart) {
      const item = cart[id];
      const itemTotal = (item.price * item.quantity).toFixed(2);

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
        <div class="item-thumb-container">
          <img src="${item.image || 'box2.png'}" alt="${item.name}" class="item-thumb" onerror="this.src='box2.png'">
          ${item.discount ? `<div class="discount-badge">${item.discount}% خصم</div>` : ""}
        </div>
        <div class="item-info">
          <h4 class="item-name">${item.name}</h4>
          <table class="item-details">
            <tbody>
              <tr><th>الوحدة:</th><td>${item.unit || "قطعة"}</td></tr>
              <tr><th>السعر:</th><td>${item.price.toFixed(2)} جنيه</td></tr>
              <tr><th>الكمية:</th><td>${item.quantity}</td></tr>
              <tr class="total-row"><th>الإجمالي:</th><td>${itemTotal} جنيه</td></tr>
            </tbody>
          </table>
        </div>
        <div class="item-actions">
          <div class="quantity-controls">
            <button class="qty-btn minus" data-id="${id}">➖</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn plus" data-id="${id}">➕</button>
          </div>
          <button class="remove-btn" data-id="${id}">❌ حذف</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
    }
  }

  function updateTotalsUI() {
    const totals = calculateTotals();
    subtotalElem.textContent = totals.subtotal.toFixed(2);
    discountElem.textContent = totals.discount.toFixed(2);
    shippingCostElem.textContent = totals.shippingCost.toFixed(2);
    totalPriceElem.textContent = totals.total.toFixed(2);
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function changeQuantity(id, delta) {
    if (!cart[id]) return;
    cart[id].quantity += delta;
    if (cart[id].quantity < 1) {
      delete cart[id];
      showToast("تم حذف المنتج من السلة", "info");
    } else {
      showToast("تم تحديث الكمية", "success");
    }
    saveCart();
    renderCartItems();
    updateCartCount();
    updateTotalsUI();
  }

  function removeItem(id) {
    if (!cart[id]) return;
    delete cart[id];
    saveCart();
    renderCartItems();
    updateCartCount();
    updateTotalsUI();
    showToast("تم حذف المنتج من السلة", "info");
  }

  function goToCheckout() {
    if (Object.keys(cart).length === 0) {
      showToast("سلة المشتريات فارغة", "error");
      return;
    }
    window.location.href = "checkout.html";
  }

  // Event delegation for quantity buttons and remove buttons
  cartItemsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("qty-btn")) {
      const id = target.getAttribute("data-id");
      if (target.classList.contains("plus")) {
        changeQuantity(id, 1);
      } else if (target.classList.contains("minus")) {
        changeQuantity(id, -1);
      }
    } else if (target.classList.contains("remove-btn")) {
      const id = target.getAttribute("data-id");
      removeItem(id);
    }
  });

  checkoutBtn.addEventListener("click", goToCheckout);

  // Initialize
  renderCartItems();
  updateCartCount();
  updateTotalsUI();
});
