// This script integrates the products page with the cart system
// It listens for clicks on "Add to Cart" buttons and adds the product with image and discount to the cart

document.addEventListener("DOMContentLoaded", () => {
  const cartInstance = window.cartInstance;

  if (!cartInstance) {
    console.error("Cart instance not found. Make sure cart.js is loaded.");
    return;
  }

  document.querySelectorAll(".product").forEach(productEl => {
    const addToCartBtn = productEl.querySelector(".add-to-cart");
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener("click", () => {
      const id = productEl.dataset.id;
      const name = productEl.dataset.name.trim();
      const price = parseFloat(productEl.dataset.price);
      const unit = "قطعة"; // Default unit, can be enhanced if needed

      // Find the main product image inside the product element
      const imgEl = productEl.querySelector("img");
      const image = imgEl ? imgEl.getAttribute("src") : "";

      // Find discount text if available
      const discountEl = productEl.querySelector(".discount");
      let discount = 0;
      if (discountEl) {
        const discountText = discountEl.textContent.trim();
        const match = discountText.match(/(\d+)%/);
        if (match) {
          discount = parseInt(match[1], 10);
        }
      }

      cartInstance.addToCart(id, name, price, image, unit, discount);
    });
  });
});
