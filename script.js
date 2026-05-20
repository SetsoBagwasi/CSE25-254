// Sample dummy items to populate the cart if it is empty
const defaultCart = [
    { id: 1, name: "White Hoodie", price:  99.99, quantity: 1 },
    { id: 2, name: "Hermes slides", price: 149.99, quantity: 2 }
];

// Load cart data from localStorage, or use defaults if empty
let cart = JSON.parse(localStorage.getItem('myShoppingCart')) || defaultCart;

// Render the cart items on the page
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing HTML

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        updateTotals();
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        itemElement.innerHTML = `
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });

    updateTotals();
    saveToStorage();
}

// Change item quantity (+1 or -1)
function changeQuantity(id, change) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity += change;
        // Prevent quantity from dropping below 1
        if (item.quantity < 1) item.quantity = 1; 
    }
    renderCart();
}

// Remove an item entirely from the cart
function removeItem(id) {
    cart = cart.filter(product => product.id !== id);
    renderCart();
}

// Calculate prices, shipping, and total sum
function updateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    // Simple business logic: Free shipping over $150, else $10 flat rate
    let shipping = subtotal > 150 || subtotal === 0 ? 0 : 10.00;
    let total = subtotal + shipping;

    document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').innerText = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

// Save current cart array state to browser storage
function saveToStorage() {
    localStorage.setItem('myShoppingCart', JSON.stringify(cart));
}

// Handle the checkout button action
function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to secure payment gateway...");
    // Here you would typically redirect the user to a Stripe or backend URL
}

// Run the script on page load
renderCart();
