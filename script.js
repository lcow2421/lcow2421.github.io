document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(0);
    displayCart();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productsPerPage = 3;
let currentPage = 0;

function fetchProducts(page) {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            let productSection = document.getElementById('product-list');
            let start = page * productsPerPage;
            let end = start + productsPerPage;
            let productsToShow = data.slice(start, end);

            productsToShow.forEach(product => {
                let productCard = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>$${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>`;
                productSection.innerHTML += productCard;
            });

            if (end >= data.length) {
                document.getElementById('show-more').style.display = 'none';
            }
        });
}

function fetchMoreProducts() {
    currentPage++;
    fetchProducts(currentPage);
}

function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            let product = products.find(p => p.id === productId);
            let cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        });
}

function displayCart() {
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        let cartItem = `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>Quantity: <button onclick="decreaseQuantity(${item.id})">-</button> ${item.quantity} <button onclick="increaseQuantity(${item.id})">+</button></p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>`;
        cartItems.innerHTML += cartItem;
    });

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

function increaseQuantity(productId) {
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function decreaseQuantity(productId) {
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}
