const apiKey = "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBek1qSXhOaXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5kSno4YmtfREZuR0piU2ZDbXdxZ3Q1ZElpY0xSMEU4bWt4ZXhnSDRRZTBpZjlRMjB5blpuWXAtTl9BakF1MkVPd01DUkNScmJJNGZua29mc2xfY1JoUQ==";
const iframeId = "908884"; // Paymob iframe ID

document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value || "client@example.com";
  const phone = this.phone.value;
  const address = this.address.value;
  const integrationId = this["payment-method"].value;

  const totalFromCheckout = parseFloat(localStorage.getItem("checkoutTotal"));
  let totalCents = totalFromCheckout ? totalFromCheckout * 100 : 0;
    let items = [];

  for (let id in cart) {
    const item = cart[id];
    items.push({
      name: item.name,
      amount_cents: item.price * 100,
      quantity: item.quantity
    });
  }

  if (Object.keys(cart).length === 0) {
    alert("السلة فارغة! 🛒");
    return;
  }

  if (integrationId === "cod") {
    alert("✅ تم تأكيد الطلب! الدفع عند الاستلام.");
    window.location.href = "invoice.html";
    return;
  }

  // Step 1: Get Token
  fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey })
  })
    .then(res => res.json())
    .then(data => {
      const token = data.token;
      return fetch("https://accept.paymob.com/api/ecommerce/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          delivery_needed: false,
          amount_cents: totalCents,
          currency: "EGP",
          items
        })
      })
        .then(res => res.json())
        .then(order => ({ token, orderId: order.id }));
    })
    .then(({ token, orderId }) => {
      return fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: totalCents,
          expiration: 3600,
          order_id: orderId,
          billing_data: {
            apartment: "NA",
            email,
            floor: "NA",
            first_name: name,
            last_name: "Client",
            phone_number: phone,
            street: address,
            building: "NA",
            city: "Cairo",
            country: "EG",
            state: "EG"
          },
          currency: "EGP",
          integration_id: integrationId
        })
      });
    })
    .then(res => res.json())
     .then(payment => {
        const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${payment.token}`;
        window.location.href = iframeURL;
      })
      
    .catch(err => {
      console.error("❌ خطأ في الدفع:", err);
      alert("حدث خطأ أثناء إتمام الدفع. حاول لاحقًا.");
    });
});
