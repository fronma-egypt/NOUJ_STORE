// Order Confirmation Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get order data from localStorage
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (!orderData) {
    // If no order data, redirect to home page
    window.location.href = "index.html";
    return;
  }

  // Update order number
  const orderNumSpan = document.getElementById("order-num");
  if (orderNumSpan && orderData.orderNumber) {
    orderNumSpan.textContent = orderData.orderNumber;
  }

  // Update customer information
  updateCustomerInfo(orderData);

  // Update order summary
  updateOrderSummary(orderData);

  // Update order items
  updateOrderItems(orderData);

  // Update totals
  updateTotals(orderData);

  // Generate tracking code if not exists
  generateTrackingCode();

  // Clear cart after showing confirmation
  setTimeout(() => {
    localStorage.removeItem("cart");
  }, 5000);
});

function updateCustomerInfo(orderData) {
  const customerName = document.getElementById("customer-name");
  const customerEmail = document.getElementById("customer-email");
  const customerPhone = document.getElementById("customer-phone");
  const customerAddress = document.getElementById("customer-address");

  if (customerName) customerName.textContent = orderData.name || "-";
  if (customerEmail) customerEmail.textContent = orderData.email || "-";
  if (customerPhone) customerPhone.textContent = orderData.phone || "-";
  if (customerAddress) customerAddress.textContent = orderData.address || "-";
}

function updateOrderSummary(orderData) {
  const orderDate = document.getElementById("order-date");
  const paymentMethod = document.getElementById("payment-method");
  const orderStatus = document.getElementById("order-status");
  const deliveryTime = document.getElementById("delivery-time");

  if (orderDate) orderDate.textContent = orderData.date || new Date().toLocaleDateString("ar-EG");
  if (paymentMethod) {
    const method = orderData.paymentMethod === "cod" ? "الدفع عند الاستلام" : "بطاقة ائتمان";
    paymentMethod.textContent = method;
  }
  if (orderStatus) orderStatus.textContent = "قيد المراجعة";
  if (deliveryTime) deliveryTime.textContent = "1-2 أيام عمل";
}

function updateOrderItems(orderData) {
  const orderItemsBody = document.getElementById("order-items-body");
  if (!orderItemsBody || !orderData.cart) return;

  let itemsHTML = "";
  let subtotal = 0;

  for (let id in orderData.cart) {
    const item = orderData.cart[id];
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    itemsHTML += `
      <tr>
        <td class="item-name">${item.name}</td>
        <td><span class="quantity-badge">${item.quantity}</span></td>
        <td class="item-price">${item.price.toFixed(2)} ج</td>
        <td class="item-total">${itemTotal.toFixed(2)} ج</td>
      </tr>
    `;
  }

  orderItemsBody.innerHTML = itemsHTML;
}

function updateTotals(orderData) {
  if (!orderData.totals) return;

  const subtotalEl = document.getElementById("subtotal");
  const discountEl = document.getElementById("discount");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  if (subtotalEl) subtotalEl.textContent = orderData.totals.subtotal.toFixed(2) + " ج";
  if (discountEl) discountEl.textContent = "-" + orderData.totals.discount.toFixed(2) + " ج";
  if (shippingEl) shippingEl.textContent = orderData.totals.shipping.toFixed(2) + " ج";
  if (totalEl) totalEl.textContent = orderData.totals.total.toFixed(2) + " ج";
}

function generateTrackingCode() {
  const trackingCode = localStorage.getItem("lastTracking");

  if (!trackingCode) {
    // Generate new tracking code
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const newTrackingCode = `NOUJ-TRK-${timestamp}-${random}`;

    localStorage.setItem("lastTracking", newTrackingCode);

    // Display tracking code
    displayTrackingCode(newTrackingCode);
  } else {
    // Display existing tracking code
    displayTrackingCode(trackingCode);
  }
}

function displayTrackingCode(code) {
  const trackingSection = document.querySelector(".tracking-section");
  if (!trackingSection) return;

  const trackingCodeDiv = document.createElement("div");
  trackingCodeDiv.className = "tracking-code";
  trackingCodeDiv.innerHTML = `
    <i class="fas fa-truck"></i>
    كود التتبع: <strong>${code}</strong>
  `;

  trackingSection.appendChild(trackingCodeDiv);
}

// Add print functionality
function printOrder() {
  window.print();
}

// Add event listeners for action buttons
document.addEventListener("DOMContentLoaded", function() {
  const printBtn = document.querySelector(".print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", printOrder);
  }

  // Auto redirect after 10 minutes
  setTimeout(() => {
    if (confirm("هل تريد العودة للصفحة الرئيسية؟")) {
      window.location.href = "index.html";
    }
  }, 600000); // 10 minutes
});
