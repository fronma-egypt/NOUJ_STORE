// Global Cart Utility
class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || {};
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  addToCart(id, name, price, image = "", unit = "قطعة", discount = 0) {
    if (!this.cart[id]) {
      this.cart[id] = {
        id,
        name,
        price: parseFloat(price),
        image,
        unit,
        discount,
        quantity: 1
      };
    } else {
      this.cart[id].quantity++;
    }
    this.saveCart();
    this.updateCartCount();
    this.showToast(`تمت إضافة ${name} إلى السلة`, "success");
  }

  removeItem(id) {
    if (this.cart[id]) {
      delete this.cart[id];
      this.saveCart();
      this.updateCartCount();
      this.showToast("تم حذف المنتج من السلة", "info");
    }
  }

  changeQuantity(id, delta) {
    if (!this.cart[id]) return;
    this.cart[id].quantity += delta;
    if (this.cart[id].quantity < 1) {
      this.removeItem(id);
    } else {
      this.saveCart();
      this.updateCartCount();
      this.showToast("تم تحديث الكمية", "success");
    }
  }

  getCart() {
    return this.cart;
  }

  getTotalItems() {
    return Object.values(this.cart).reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartCount() {
    const count = this.getTotalItems();
    const cartCountElem = document.getElementById("cart-count");
    if (cartCountElem) {
      cartCountElem.textContent = count;
    }
  }

  showToast(message, type = "info") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast show ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove("show");
      toast.remove();
    }, 3000);
  }

  clearCart() {
    this.cart = {};
    this.saveCart();
    this.updateCartCount();
  }
}

// Create global instance
window.cartInstance = new Cart();

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  window.cartInstance.updateCartCount();
});
