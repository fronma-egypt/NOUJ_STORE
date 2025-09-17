// عداد تنازلي للعروض
function startCountdown(duration, elementId) {
  let countDownDate = new Date().getTime() + duration * 1000;

  let interval = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(elementId).innerHTML = minutes + "د " + seconds + "ث ";

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById(elementId).innerHTML = "انتهى العرض!";
    }
  }, 1000);
}

// تشغيل العداد للعروض
startCountdown(300, "countdown");
// عداد تنازلي للعروض اليومية
function startCountdown(duration, elementId) {
  let countDownDate = new Date().getTime() + duration * 1000;

  let interval = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(elementId).innerHTML = minutes + "د " + seconds + "ث ";

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById(elementId).innerHTML = "🎉 انتهى العرض!";
    }
  }, 1000);
}

// تشغيل العداد التنازلي لمدة 5 دقائق
startCountdown(300, "countdown");

// نسخ كوبون الخصم
function copyCoupon() {
  let coupon = document.getElementById("coupon-code").textContent;
  navigator.clipboard.writeText(coupon).then(() => {
    alert("✅ تم نسخ الكوبون: " + coupon);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0;
  const cartCountElement = document.getElementById("cart-count");

  // وظيفة لإضافة المنتج إلى السلة
  function addToCart() {
      cartCount++;
      cartCountElement.innerText = cartCount;
  }

  // وظيفة لإزالة المنتج من السلة
  function removeFromCart() {
      if (cartCount > 0) {
          cartCount--;
          cartCountElement.innerText = cartCount;
      }
  }

  // ربط الأزرار بالأحداث
  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", addToCart);
  });

  document.querySelectorAll(".remove-from-cart").forEach(button => {
      button.addEventListener("click", removeFromCart);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  updateCartDisplay();

  function addToCart(event) {
      let product = event.target.closest(".product");
      let productId = product.getAttribute("data-id");
      let productPrice = parseInt(product.getAttribute("data-price"));

      if (!cart[productId]) {
          cart[productId] = { quantity: 1, price: productPrice };
      } else {
          cart[productId].quantity++;
      }

      saveCart();
      updateCartDisplay();
      showNotification("تمت إضافة المنتج إلى السلة! 🛍️");
  }

  function removeFromCart(event) {
      let product = event.target.closest(".product");
      let productId = product.getAttribute("data-id");

      if (cart[productId]) {
          cart[productId].quantity--;
          if (cart[productId].quantity <= 0) {
              delete cart[productId];
          }
      }

      saveCart();
      updateCartDisplay();
      showNotification("تمت إزالة المنتج من السلة ❌");
  }

  function updateCartDisplay() {
      let cartCount = 0;
      let totalPrice = 0;

      for (let key in cart) {
          cartCount += cart[key].quantity;
          totalPrice += cart[key].quantity * cart[key].price;
      }

      document.getElementById("cart-count").innerText = cartCount;
      document.getElementById("total-price").innerText = totalPrice;
  }

  function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  function showNotification(message) {
      let notification = document.getElementById("notification");
      notification.innerText = message;
      notification.classList.add("show");

      setTimeout(() => {
          notification.classList.remove("show");
      }, 3000);
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", addToCart);
  });

  document.querySelectorAll(".remove-from-cart").forEach(button => {
      button.addEventListener("click", removeFromCart);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  updateCartDisplay();

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
          let product = this.closest(".product");
          let productId = product.getAttribute("data-id");
          let productPrice = parseInt(product.getAttribute("data-price"));

          if (!cart[productId]) {
              cart[productId] = { quantity: 1, price: productPrice };
          } else {
              cart[productId].quantity++;
          }

          saveCart();
          updateCartDisplay();
      });
  });

  function updateCartDisplay() {
      let cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
      let totalPrice = Object.values(cart).reduce((acc, item) => acc + (item.quantity * item.price), 0);
      document.getElementById("total-price").innerText = totalPrice;
  }

  function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
  }
});
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  updateCartDisplay();

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
          let product = this.closest(".product");
          let productId = product.getAttribute("data-id");
          let productPrice = parseInt(product.getAttribute("data-price"));

          if (!cart[productId]) {
              cart[productId] = { quantity: 1, price: productPrice };
          } else {
              cart[productId].quantity++;
          }

          saveCart();
          updateCartDisplay();
          animateButton(this);
      });
  });

  function updateCartDisplay() {
      let totalPrice = Object.values(cart).reduce((acc, item) => acc + (item.quantity * item.price), 0);
      document.getElementById("total-price").innerText = totalPrice;
  }

  function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  function animateButton(button) {
      button.classList.add("clicked");
      setTimeout(() => button.classList.remove("clicked"), 300);
  }
});
.btn.clicked {
  transform: scale(0.95);
  background: linear-gradient(135deg, #ff6b81, #ff8c94);
}
document.addEventListener("DOMContentLoaded", function () {
  let scrollLinks = document.querySelectorAll(".navbar a");

  scrollLinks.forEach(link => {
      link.addEventListener("click", function (e) {
          e.preventDefault();
          let targetId = this.getAttribute("href").substring(1);
          let targetSection = document.getElementById(targetId);
          window.scrollTo({
              top: targetSection.offsetTop - 60,
              behavior: "smooth"
          });
      });
  });
});






document.addEventListener("DOMContentLoaded", function () {
  let loginModal = document.querySelector(".login-modal");
  let loginButton = document.querySelector(".login-btn");
  let closeButton = document.querySelector(".close-btn");

  loginButton.addEventListener("click", function () {
      loginModal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
      loginModal.style.display = "none";
  });

  window.onclick = function (event) {
      if (event.target === loginModal) {
          loginModal.style.display = "none";
      }
  };
});
document.querySelector(".submit-review").addEventListener("click", function () {
  let reviewText = document.getElementById("review-input").value;
  if (reviewText.trim() !== "") {
      let reviewContainer = document.querySelector(".reviews");
      let newReview = document.createElement("div");
      newReview.classList.add("review");
      newReview.innerHTML = `<p>⭐⭐⭐⭐⭐</p><p>${reviewText}</p>`;
      reviewContainer.appendChild(newReview);
      document.getElementById("review-input").value = "";
  }
});
document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.querySelector(".checkout-form");
    const couponInput = document.querySelector("input[name='coupon_code']");
    const totalPrice = document.querySelector(".total strong");

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let selectedPayment = document.querySelector("input[name='payment_method']:checked");
        if (!selectedPayment) {
            alert("يرجى اختيار طريقة الدفع!");
            return;
        }

        alert("تم إرسال الطلب بنجاح! ✅");
        this.submit();
    });

    couponInput.addEventListener("input", function () {
        if (this.value === "DISCOUNT10") {
            totalPrice.textContent = "148.5 جنيه (بعد الخصم)";
        } else {
            totalPrice.textContent = "165 جنيه";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    
    testimonials.forEach((testimonial) => {
        testimonial.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "0.3s";
        });

        testimonial.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
        });
    });
});document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        const cartCountEl = document.getElementById("cart-count");
        if (cartCountEl) cartCountEl.innerText = cartCount;
    }

    function addToCart(productElement) {
        const id = productElement.getAttribute("data-id");
        const name = productElement.getAttribute("data-name");
        const price = parseFloat(productElement.getAttribute("data-price"));

        if (!cart[id]) {
            cart[id] = { name, price, quantity: 1 };
        } else {
            cart[id].quantity++;
        }

        saveCart();
        updateCartCount();
        alert(`✅ تمت إضافة ${name} إلى السلة!`);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            addToCart(product);
        });
    });

    updateCartCount(); // تحديث العداد عند تحميل الصفحة
});
document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const list = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    let total = 0;
    for (let id in cart) {
        const item = cart[id];
        const li = document.createElement("li");
        li.textContent = `${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه`;
        list.appendChild(li);
        total += item.price * item.quantity;
    }

    totalPrice.textContent = total;
});
<script>
  // دالة تضيف المنتج لـ localStorage
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // تقدر تضيف منطق لمنع التكرار هنا لو عايز
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`✅ تم إضافة ${product.name} إلى السلة!`);
  }

  // اسمع زر الضغط
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price
      };

      addToCart(product);
    });
  });
</script>
document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function addToCart(product) {
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
  
      if (!cart[id]) {
        cart[id] = { name, price, quantity: 1 };
      } else {
        cart[id].quantity++;
      }
  
      saveCart();
      alert(`✅ تم إضافة ${name} إلى السلة`);
    }
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function () {
        const product = this.closest(".product");
        addToCart(product);
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
  
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    function updateCartCount() {
      const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
      const cartCountEl = document.getElementById("cart-count");
      if (cartCountEl) cartCountEl.textContent = count;
    }
  
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", function () {
        const product = this.closest(".product");
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);
  
        if (!cart[id]) {
          cart[id] = { name, price, quantity: 1 };
        } else {
          cart[id].quantity++;
        }
  
        saveCart();
        updateCartCount();
        alert(`✅ تم إضافة ${name} إلى السلة!`);
      });
    });
  
    updateCartCount();
  });
  document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = this.name.value;
    const phone = this.phone.value;
    const address = this.address.value;
    const payment = this.payment.value;
  
    const customerInfo = { name, phone, address, payment };
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  
    window.location.href = "invoice.html";
  });
    
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
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
    showToast(name);
  }

  function showToast(name) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = `✅ تمت إضافة ${name} إلى السلة`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price
      };
      addToCart(product);
    });
  });

  updateCartCount(); // عند تحميل الصفحة
});
document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  const counter = document.getElementById("cart-count");
  const addSound = document.getElementById("add-sound");

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    if (counter) {
      counter.innerText = count;
      counter.classList.add("bump");
      setTimeout(() => counter.classList.remove("bump"), 300);
    }
  }

  function showToast(name) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = `✅ تمت إضافة ${name} إلى السلة`;
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#4caf50',
      color: '#fff',
      padding: '12px 18px',
      borderRadius: '8px',
      zIndex: 9999,
      fontSize: '16px'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function addToCart(product, button) {
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
    if (addSound) addSound.play();
    showToast(name);

    if (button) {
      button.classList.add("clicked");
      setTimeout(() => button.classList.remove("clicked"), 300);
    }
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const product = {
        id: this.dataset.id,
        name: this.dataset.name,
        price: this.dataset.price
      };
      addToCart(product, this);
    });
  });

  updateCartCount(); // عند تحميل الصفحة
});
document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(this));
  const orderData = {
    ...data,
    cart,
    date: new Date().toLocaleDateString("ar-EG")
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  alert("✅ تم تأكيد الطلب!");
  window.location.href = "thankyou.html"; // أو اعرض رسالة
});
