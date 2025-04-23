document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".checkout-form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const orderData = {
        name: form.full_name.value,
        email: form.email.value,
        address: form.address.value,
        phone: form.phone.value,
        payment: form.payment_method.value,
        cart: JSON.parse(localStorage.getItem("cart")) || {},
        date: new Date().toLocaleString("ar-EG")
      };
  
      localStorage.setItem("orderData", JSON.stringify(orderData));
  // 👇 التحكم من هنا فقط
const discountActive = true; // ← خليها false لما تحب توقف الخصم
const discountPercentage = 10; // ← نسبة الخصم (مثلاً 10%)

function calculateTotals(cart) {
  let total = 0;
  for (let id in cart) {
    total += cart[id].price * cart[id].quantity;
  }

  let discountAmount = 0;
  if (discountActive) {
    discountAmount = total * (discountPercentage / 100);
  }

  let finalTotal = total - discountAmount;

  return {
    total,
    discountAmount,
    finalTotal
  };
}

      // ممكن نضيف تنبيه أو Toast هنا
      window.location.href = "invoice.html";
    });
  });
  <script>
document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const invoiceBox = document.getElementById("invoice-details");

  if (!invoiceBox || Object.keys(cart).length === 0) return;

  let subtotal = 0;
  let itemsHTML = `
    <table>
      <thead>
        <tr>
          <th>المنتج</th>
          <th>الكمية</th>
          <th>السعر</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let id in cart) {
    const item = cart[id];
    const totalItem = item.price * item.quantity;
    subtotal += totalItem;
    itemsHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${totalItem.toFixed(2)} جنيه</td>
    </tr>`;
  }

  const discountRate = 0.10;
  const vatRate = 0.14;
  const discount = subtotal * discountRate;
  const vat = (subtotal - discount) * vatRate;
  const total = subtotal - discount + vat;

  itemsHTML += `
    </tbody>
    </table>
    <p>💵 المجموع: ${subtotal.toFixed(2)} جنيه</p>
    <p>🎁 الخصم (${discountRate * 100}%): ${discount.toFixed(2)} جنيه</p>
    <p>🧾 الضريبة (${vatRate * 100}%): ${vat.toFixed(2)} جنيه</p>
    <hr />
    <p><strong>💰 الإجمالي: ${total.toFixed(2)} جنيه</strong></p>
  `;

  invoiceBox.innerHTML = itemsHTML;
});
</script>
