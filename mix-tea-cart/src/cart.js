document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const toast = document.getElementById("toast-msg");
  const cartCountEl = document.getElementById("cart-count");

  const discountActive = true;
  const discountPercentage = 10;

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = "toast show " + type;
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function calculateTotals(cart) {
    let total = 0;
    for (let id in cart) {
      total += cart[id].price * cart[id].quantity;
    }

    const discountAmount = discountActive ? total * discountPercentage / 100 : 0;
    const finalTotal = total - discountAmount;

    return { total, discountAmount, finalTotal };
  }

  function updateTotal() {
    const totals = calculateTotals(cart);

    if (totalPriceEl) totalPriceEl.textContent = totals.finalTotal.toFixed(2);

    const original = document.getElementById("original-total");
    const discount = document.getElementById("discount-amount");

    if (original) original.textContent = totals.total.toFixed(2);
    if (discount) discount.textContent = totals.discountAmount.toFixed(2);
  }

  function updateCartCount() {
    if (!cartCountEl) return;
    const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.textContent = count;
    cartCountEl.classList.add("bump");
    setTimeout(() => cartCountEl.classList.remove("bump"), 300);
  }

  function renderCart() {
    cartContainer.innerHTML = "";

    if (Object.keys(cart).length === 0) {
      cartContainer.innerHTML = `<p class="empty-message">🛒 السلة فارغة</p>`;
      updateTotal();
      updateCartCount();
      return;
    }

    for (let id in cart) {
      const item = cart[id];

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div class="item-info">
          <strong>${item.name}</strong><br>
          <small>${item.price} جنيه × ${item.quantity}</small><br>
          <strong>${(item.price * item.quantity).toFixed(2)} جنيه</strong>
        </div>
        
        <div class="item-actions">
          <button onclick="changeQty('${id}', 1)">➕</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${id}', -1)">➖</button>
          <button class="remove-btn" onclick="removeItem('${id}')">❌</button>
        </div>
      `;
      cartContainer.appendChild(div);
    }

    updateTotal();
    updateCartCount();
  }

  window.changeQty = (id, delta) => {
    if (!cart[id]) return;

    cart[id].quantity += delta;

    if (cart[id].quantity <= 0) {
      delete cart[id];
      showToast("🗑️ تم حذف المنتج", "error");
    } else {
      showToast("✅ تم تعديل الكمية", "info");
    }

    saveCart();
    renderCart();
  };

  window.removeItem = (id) => {
    if (confirm("هل تريد إزالة هذا المنتج؟")) {
      delete cart[id];
      saveCart();
      renderCart();
      showToast("❌ تم إزالة المنتج", "error");
    }
  };

  window.goToCheckout = () => {
    if (Object.keys(cart).length === 0) {
      alert("🛒 السلة فارغة!");
      return;
    }
    window.location.href = "checkout.html";
  };

  renderCart();
});