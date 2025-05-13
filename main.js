// Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const text = "مرحبًا بك في عالم التسوق الأنيق!";
    const target = document.querySelector(".typewriter");
    if (target) {
      let i = 0;
      const interval = setInterval(() => {
        target.textContent = text.slice(0, i++);
        if (i > text.length) clearInterval(interval);
      }, 100);
    }
  
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function updateCartCount() {
      const count = Object.values(cart).reduce((a, item) => a + item.quantity, 0);
      const el = document.getElementById("cart-count");
      if (el) el.textContent = count;
    }
  
    function addToCart(productElement) {
      const id = productElement.dataset.id;
      const name = productElement.dataset.name;
      const price = +productElement.dataset.price;
  
      if (!cart[id]) cart[id] = { name, price, quantity: 1 };
      else cart[id].quantity++;
  
      saveCart();
      updateCartCount();
      alert(`✅ تمت إضافة ${name} للسلة!`);
    }
  
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(btn.closest(".product"));
      });
    });
  
    // Cart page logic
    if (window.location.pathname.includes("cart.html")) {
      const list = document.getElementById("cart-items");
      const total = document.getElementById("cart-total");
      let totalPrice = 0;
  
      for (let id in cart) {
        const item = cart[id];
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.name} - ${item.price} جنيه × ${item.quantity}
          <button onclick="changeQty('${id}', 1)">➕</button>
          <button onclick="changeQty('${id}', -1)">➖</button>
          <button onclick="removeItem('${id}')">❌</button>
        `;
        list.appendChild(li);
        totalPrice += item.price * item.quantity;
      }
      total.textContent = totalPrice;
    }
  
    // Checkout form
    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this));
        localStorage.setItem("client", JSON.stringify(data));
        window.location.href = "invoice.html";
      });
    }
  
    // Invoice page
    if (window.location.pathname.includes("invoice.html")) {
      const data = JSON.parse(localStorage.getItem("client"));
      const cart = JSON.parse(localStorage.getItem("cart"));
      const invoiceDiv = document.getElementById("invoice-details");
  
      let html = `
        <p>الاسم: ${data.name}</p>
        <p>العنوان: ${data.address}</p>
        <p>الهاتف: ${data.phone}</p>
        <p>طريقة الدفع: ${data.payment}</p>
        <hr/>
        <ul>
      `;
      let total = 0;
      for (let id in cart) {
        const item = cart[id];
        html += `<li>${item.name} × ${item.quantity} = ${item.quantity * item.price} جنيه</li>`;
        total += item.quantity * item.price;
      }
      html += `</ul><hr><p>الإجمالي: ${total} جنيه</p>`;
      invoiceDiv.innerHTML = html;
    }
  
    updateCartCount();
  });
  
  // تغيير الكمية أو الحذف
  function changeQty(id, delta) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[id]) {
      cart[id].quantity += delta;
      if (cart[id].quantity <= 0) delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
  
  function removeItem(id) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
  <script>
  document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
      const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
      const counter = document.getElementById("cart-count");
      if (counter) counter.innerText = count;
    }

    function addToCart(product) {
      const { id, name, price } = product;
      if (!cart[id]) {
        cart[id] = {
          name,
          price: parseFloat(price),
          quantity: 1
        };
      } else {
        cart[id].quantity++;
      }

      saveCart();
      updateCartCount();
      showAddedToast(name);
    }

    function showAddedToast(name) {
      const msg = document.createElement("div");
      msg.className = "toast";
      msg.textContent = `✅ تمت إضافة ${name} إلى السلة`;
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const product = {
          id: this.dataset.id,
          name: this.dataset.name,
          price: this.dataset.price
        };
        addToCart(product);
      })
    });

    updateCartCount();
  });
</script>
// Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const text = "مرحبًا بك في عالم التسوق الأنيق!";
    const target = document.querySelector(".typewriter");
    if (target) {
      let i = 0;
      const interval = setInterval(() => {
        target.textContent = text.slice(0, i++);
        if (i > text.length) clearInterval(interval);
      }, 100);
    }
  
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function updateCartCount() {
      const count = Object.values(cart).reduce((a, item) => a + item.quantity, 0);
      const el = document.getElementById("cart-count");
      if (el) el.textContent = count;
    }
  
    function addToCart(productElement) {
      const id = productElement.dataset.id;
      const name = productElement.dataset.name;
      const price = +productElement.dataset.price;
  
      if (!cart[id]) cart[id] = { name, price, quantity: 1 };
      else cart[id].quantity++;
  
      saveCart();
      updateCartCount();
      alert(`✅ تمت إضافة ${name} للسلة!`);
    }
  
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(btn.closest(".product"));
      });
    });
  
    // Cart page logic
    if (window.location.pathname.includes("cart.html")) {
      const list = document.getElementById("cart-items");
      const total = document.getElementById("cart-total");
      let totalPrice = 0;
  
      for (let id in cart) {
        const item = cart[id];
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.name} - ${item.price} جنيه × ${item.quantity}
          <button onclick="changeQty('${id}', 1)">➕</button>
          <button onclick="changeQty('${id}', -1)">➖</button>
          <button onclick="removeItem('${id}')">❌</button>
        `;
        list.appendChild(li);
        totalPrice += item.price * item.quantity;
      }
      total.textContent = totalPrice;
    }
  
    // Checkout form
    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this));
        localStorage.setItem("client", JSON.stringify(data));
        window.location.href = "invoice.html";
      });
    }
  
    // Invoice page
    if (window.location.pathname.includes("invoice.html")) {
      const data = JSON.parse(localStorage.getItem("client"));
      const cart = JSON.parse(localStorage.getItem("cart"));
      const invoiceDiv = document.getElementById("invoice-details");
  
      let html = `
        <p>الاسم: ${data.name}</p>
        <p>العنوان: ${data.address}</p>
        <p>الهاتف: ${data.phone}</p>
        <p>طريقة الدفع: ${data.payment}</p>
        <hr/>
        <ul>
      `;
      let total = 0;
      for (let id in cart) {
        const item = cart[id];
        html += `<li>${item.name} × ${item.quantity} = ${item.quantity * item.price} جنيه</li>`;
        total += item.quantity * item.price;
      }
      html += `</ul><hr><p>الإجمالي: ${total} جنيه</p>`;
      invoiceDiv.innerHTML = html;
    }
  
    updateCartCount();
  });
  
  // تغيير الكمية أو الحذف
  function changeQty(id, delta) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[id]) {
      cart[id].quantity += delta;
      if (cart[id].quantity <= 0) delete cart[id];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
  
  function removeItem(id) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
  <script>
  document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
      const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
      const counter = document.getElementById("cart-count");
      if (counter) counter.innerText = count;
    }

    function addToCart(product) {
      const { id, name, price } = product;
      if (!cart[id]) {
        cart[id] = {
          name,
          price: parseFloat(price),
          quantity: 1
        };
      } else {
        cart[id].quantity++;
      }

      saveCart();
      updateCartCount();
      showAddedToast(name);
    }

    function showAddedToast(name) {
      const msg = document.createElement("div");
      msg.className = "toast";
      msg.textContent = `✅ تمت إضافة ${name} إلى السلة`;
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const product = {
          id: this.dataset.id,
          name: this.dataset.name,
          price: this.dataset.price
        };
        addToCart(product);
      })
    });

    updateCartCount();
  });
</script>