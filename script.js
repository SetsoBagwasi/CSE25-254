/// =====================
// ADD TO CART
// =====================
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});

// =====================
// CART PAGE
// =====================
if (document.getElementById('cart-items')) {
  function renderCart() {
    const container = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    container.innerHTML = '';

    if (cart.length === 0) {
      container.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        subtotal += item.price * item.quantity;
        container.innerHTML += `
          <div class="cart-item">
            <div class="item-details">
              <h3>${item.name}</h3>
              <p>P${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
              <button onclick="changeQuantity('${item.name}', -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
            <button onclick="removeItem('${item.name}')">Remove</button>
          </div>`;
      });
    }

    // Shipping: free over P150, else P10
    let shipping = subtotal > 150 || subtotal === 0 ? 0 : 10;
    let total = subtotal + shipping;

    if (document.getElementById('cart-subtotal')) {
      document.getElementById('cart-subtotal').textContent = `P${subtotal.toFixed(2)}`;
    }
    if (document.getElementById('cart-shipping')) {
      document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : `P${shipping.toFixed(2)}`;
    }
    if (document.getElementById('cart-total')) {
      document.getElementById('cart-total').textContent = `P${total.toFixed(2)}`;
    }
  }

  function changeQuantity(name, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.name === name);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  // Clear cart button
  if (document.getElementById('clear-cart')) {
    document.getElementById('clear-cart').addEventListener('click', () => {
      localStorage.removeItem('cart');
      renderCart();
    });
  }

  renderCart();
}

// =====================
// PAY NOW BUTTON
// =====================
if (document.getElementById('pay-btn')) {
  document.getElementById('pay-btn').addEventListener('click', () => {
    alert('Payment successful! Thank you for your order.');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });
}

// =====================
// LOGIN
// =====================
if (document.getElementById('login-btn')) {
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
      alert('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert(`Welcome back, ${user.name}!`);
      window.location.href = 'index.html';
    } else {
      alert('Incorrect email or password.');
    }
  });
}

// =====================
// REGISTER
// =====================
if (document.getElementById('register-btn')) {
  document.getElementById('register-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find(u => u.email === email);
    if (existing) {
      alert('An account with this email already exists.');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    window.location.href = 'login.html';
  });
}