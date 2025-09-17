// Modern Checkout JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("UPtxd1MC2SrpDzWal");

  // Constants
  const DISCOUNT_RATE = 0.10;
  const VAT_RATE = 0.00;
  const STORE_COORDS = [29.97325, 31.26739];

  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Form handling
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleFormSubmit);
  }

  // Location change handling
  const locationSelect = document.getElementById("locationSelect");
  if (locationSelect) {
    locationSelect.addEventListener("change", handleLocationChange);
  }

  // Initialize page
  updateCartCount();
  renderInvoice();

  // Form submission handler
  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(checkoutForm);
    const orderData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      location: formData.get("location"),
      paymentMethod: formData.get("payment-method"),
      notes: formData.get("notes") || "",
      cart: cart,
      date: new Date().toLocaleString("ar-EG"),
      orderNumber: generateOrderNumber()
    };

    // Calculate totals
    const totals = calculateTotals(cart);
    orderData.totals = totals;

    // Save order data
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Send confirmation email
    sendConfirmationEmail(orderData);

    // Show success message
    showSuccessMessage();

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "order-confirmation.html";
    }, 2000);
  }

  // Location change handler
  function handleLocationChange() {
    const selectedValue = this.value;
    let distance = 0;

    if (selectedValue && selectedValue.includes(",")) {
      const coords = selectedValue.split(",").map(Number);
      distance = haversineDistance(STORE_COORDS, coords);
    }

    localStorage.setItem("shipping_distance", distance.toFixed(2));
    renderInvoice();
  }

  // Calculate distance between coordinates
  function haversineDistance(coords1, coords2) {
    if (!coords1 || !coords2 || coords1.length !== 2 || coords2.length !== 2) {
      return 0;
    }

    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;

    const toRad = angle => angle * Math.PI / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Calculate shipping cost
  function calculateShippingCost(distance) {
    if (distance <= 1) return 10;
    return 10 + (distance - 1) * 4;
  }

  // Calculate totals
  function calculateTotals(cart) {
    let subtotal = 0;
    let itemCount = 0;

    for (let id in cart) {
      const item = cart[id];
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
    }

    const discount = subtotal * DISCOUNT_RATE;
    const vat = (subtotal - discount) * VAT_RATE;
    const distance = parseFloat(localStorage.getItem("shipping_distance") || "0");
    const shipping = calculateShippingCost(distance);
    const total = subtotal - discount + vat + shipping;

    return {
      subtotal,
      discount,
      vat,
      shipping,
      total,
      itemCount
    };
  }

  // Render invoice
  function renderInvoice() {
    const invoiceContent = document.getElementById("invoice-content");
    if (!invoiceContent) return;

    if (Object.keys(cart).length === 0) {
      invoiceContent.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <p>السلة فارغة</p>
        </div>
      `;
      return;
    }

    const totals = calculateTotals(cart);
    let itemsHTML = `
      <table class="order-table">
        <thead>
          <tr>
            <th>المنتج</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let id in cart) {
      const item = cart[id];
      const itemTotal = item.price * item.quantity;
      itemsHTML += `
        <tr>
          <td class="item-name">${item.name}</td>
          <td><span class="quantity-badge">${item.quantity}</span></td>
          <td class="item-price">${item.price.toFixed(2)} ج</td>
          <td class="item-total">${itemTotal.toFixed(2)} ج</td>
        </tr>
      `;
    }

    itemsHTML += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>المجموع الفرعي</strong></td>
            <td>${totals.subtotal.toFixed(2)} ج</td>
          </tr>
          <tr>
            <td colspan="3"><strong>الخصم (${(DISCOUNT_RATE * 100).toFixed(0)}%)</strong></td>
            <td class="discount-amount">-${totals.discount.toFixed(2)} ج</td>
          </tr>
          <tr>
            <td colspan="3"><strong>تكلفة الشحن</strong></td>
            <td>${totals.shipping.toFixed(2)} ج</td>
          </tr>
          <tr class="total-row">
            <td colspan="3"><strong>الإجمالي الكلي</strong></td>
            <td class="total-amount">${totals.total.toFixed(2)} ج</td>
          </tr>
        </tfoot>
      </table>

      <div class="order-summary">
        <div class="summary-item">
          <span><i class="fas fa-box"></i> عدد المنتجات</span>
          <span>${totals.itemCount} قطعة</span>
        </div>
        <div class="summary-item">
          <span><i class="fas fa-truck"></i> المسافة المقدرة</span>
          <span>${(parseFloat(localStorage.getItem("shipping_distance") || "0")).toFixed(1)} كم</span>
        </div>
        <div class="summary-item">
          <span><i class="fas fa-clock"></i> وقت التوصيل المقدر</span>
          <span>1-2 أيام</span>
        </div>
      </div>
    `;

    invoiceContent.innerHTML = itemsHTML;
  }

  // Send confirmation email
  function sendConfirmationEmail(orderData) {
    if (!orderData.email) return;

    const emailData = {
      to_email: orderData.email,
      from_name: "NOUJ STORE",
      to_name: orderData.name,
      order_number: orderData.orderNumber,
      customer_name: orderData.name,
      customer_phone: orderData.phone,
      customer_address: orderData.address,
      order_total: orderData.totals.total.toFixed(2),
      order_date: orderData.date
    };

    emailjs.send("service_5pcglet", "template_order_confirmation", emailData)
      .then(() => {
        console.log("Confirmation email sent successfully");
      })
      .catch(err => {
        console.error("Failed to send confirmation email:", err);
      });
  }

  // Show success message
  function showSuccessMessage() {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.innerHTML = `
      <div class="success-checkmark">
        <i class="fas fa-check"></i>
      </div>
      <h3>تم تأكيد الطلب بنجاح!</h3>
      <p>سيتم إرسال تفاصيل الطلب على بريدك الإلكتروني</p>
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  // Update cart count
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  }

  // Generate order number
  function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `NOUJ-${timestamp}-${random}`;
  }

  // Form validation
  function validateForm() {
    const requiredFields = ["name", "email", "phone", "address"];
    let isValid = true;

    requiredFields.forEach(field => {
      const element = document.getElementById(field);
      const formGroup = element.closest(".form-group");

      if (!element.value.trim()) {
        formGroup.classList.add("error");
        isValid = false;
      } else {
        formGroup.classList.remove("error");
      }
    });

    return isValid;
  }

  // Add form validation on submit
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(e) {
      if (!validateForm()) {
        e.preventDefault();
        alert("يرجى ملء جميع الحقول المطلوبة");
      }
    });
  }
});
