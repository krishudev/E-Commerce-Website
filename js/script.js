// BrewHaven Roasters - Main Script (Indian Rupees - INR)
// State Management
let cart = [];
let wishlist = [];
let currentFilter = 'all';
let searchQuery = '';
let orders = [];

// Currency Formatter for INR
function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

// Generate Order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `BH${timestamp}${random}`;
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderProducts();
    initEventListeners();
    updateBadges();
    checkAdminMode();
    loadOrders();
});

// Load Cart, Wishlist & Orders from LocalStorage
function loadFromLocalStorage() {
    const savedCart = localStorage.getItem('brewhaven_cart');
    const savedWishlist = localStorage.getItem('brewhaven_wishlist');
    const savedOrders = localStorage.getItem('brewhaven_orders');

    if (savedCart) cart = JSON.parse(savedCart);
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
    if (savedOrders) orders = JSON.parse(savedOrders);
}

// Save to LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('brewhaven_cart', JSON.stringify(cart));
    localStorage.setItem('brewhaven_wishlist', JSON.stringify(wishlist));
}

// Event Listeners
function initEventListeners() {
    // Mobile Menu
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('open');
    });

    document.getElementById('close-mobile-menu').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('open');
    });

    // Mobile menu links
    document.querySelectorAll('.mobile-menu nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('open');
        });
    });

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderProducts();
    });

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.category;
            renderProducts();
        });
    });

    // Cart
    document.getElementById('cart-btn').addEventListener('click', openCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    document.getElementById('close-cart').addEventListener('click', closeCart);

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', openCheckout);
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

    // Wishlist
    document.getElementById('wishlist-btn').addEventListener('click', openWishlist);
    document.getElementById('close-wishlist-modal').addEventListener('click', closeWishlist);
    document.getElementById('wishlist-modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeWishlist();
    });

    // Product Modal
    document.getElementById('close-product-modal').addEventListener('click', closeProductModal);
    document.getElementById('product-modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeProductModal();
    });

    // Checkout Modal
    document.getElementById('close-checkout-modal').addEventListener('click', closeCheckout);
    document.getElementById('checkout-modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeCheckout();
    });

    // Checkout Form
    document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

    // Success Overlay
    document.getElementById('close-success').addEventListener('click', () => {
        document.getElementById('success-overlay').classList.remove('active');
    });

    // Admin Orders
    document.getElementById('admin-orders-link').addEventListener('click', (e) => {
        e.preventDefault();
        showAdminOrders();
    });

    document.getElementById('close-admin-btn').addEventListener('click', closeAdminOrders);
    document.getElementById('refresh-orders-btn').addEventListener('click', () => {
        loadOrders();
        renderOrders();
    });
    document.getElementById('clear-orders-btn').addEventListener('click', clearAllOrders);
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('product-grid');

    let filtered = products;

    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply search filter
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            (p.origin && p.origin.toLowerCase().includes(searchQuery))
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #999;">No products found.</p>';
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="card-actions">
                    <button class="wishlist-toggle ${isInWishlist(product.id) ? 'active' : ''}" data-id="${product.id}">
                        <i class="ph-fill ph-heart"></i>
                    </button>
                </div>
            </div>
            <div class="card-info">
                <div class="card-category">${getCategoryLabel(product.category)}</div>
                <h3 class="card-title">${product.name}</h3>
                <div class="card-price">${formatINR(product.price)}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="ph ph-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        const cardImg = card.querySelector('.card-image');

        cardImg.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openProductModal(id);
        });

        card.querySelector('.card-info h3').addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openProductModal(id);
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });

    // Wishlist toggles
    document.querySelectorAll('.wishlist-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id);
        });
    });
}

// Helper Functions
function getCategoryLabel(category) {
    const labels = {
        'coffee': 'Classic Hot Coffees',
        'kaapi': 'South Indian Filter Kaapi',
        'cold': 'Cold Coffees & Frappes',
        'tea': 'Indian Masala & Speciality',
        'refresher': 'Refreshers & Coolers',
        'food': 'Food & Snacks'
    };
    return labels[category] || category;
}

function isInWishlist(id) {
    return wishlist.some(item => item.id === id);
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveToLocalStorage();
    updateBadges();
    renderCart();

    // Visual feedback
    const btn = document.querySelector(`.add-to-cart-btn[data-id="${productId}"]`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="ph-fill ph-check"></i> Added!';
        btn.style.background = '#27AE60';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 1000);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveToLocalStorage();
    updateBadges();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveToLocalStorage();
            renderCart();
        }
    }
}

function clearCart() {
    if (cart.length === 0) return;

    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveToLocalStorage();
        updateBadges();
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart-msg">Your cart is empty. Time to brew something up!</div>';
        checkoutBtn.disabled = true;
        updateCartTotals();
        return;
    }

    checkoutBtn.disabled = false;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatINR(item.price)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-ctrl">
                        <button onclick="updateQuantity(${item.id}, -1)">
                            <i class="ph ph-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">
                            <i class="ph ph-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18; // 18% GST
    const shipping = subtotal >= 999 ? 0 : 79; // Free shipping over ₹999, else ₹79
    const total = subtotal + gst + shipping;

    document.getElementById('cart-subtotal').textContent = formatINR(subtotal);
    document.getElementById('cart-tax').textContent = formatINR(gst);
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : formatINR(shipping);
    document.getElementById('cart-total').textContent = formatINR(total);

    // Update checkout total display
    const checkoutTotal = document.getElementById('checkout-total-display');
    if (checkoutTotal) {
        checkoutTotal.textContent = formatINR(total);
    }
}

function openCart() {
    renderCart();
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-sidebar').classList.add('open');
}

function closeCart() {
    document.getElementById('cart-overlay').classList.remove('open');
    document.getElementById('cart-sidebar').classList.remove('open');
}

// Wishlist Functions
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existingIndex = wishlist.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        wishlist.push(product);
    }

    saveToLocalStorage();
    updateBadges();
    renderProducts();

    if (document.getElementById('wishlist-modal-overlay').classList.contains('open')) {
        renderWishlist();
    }
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<div class="empty-cart-msg">Your wishlist is empty.</div>';
        return;
    }

    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-info">
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">${formatINR(item.price)}</div>
            </div>
            <button onclick="addToCart(${item.id}); toggleWishlist(${item.id});">Add to Cart</button>
        </div>
    `).join('');
}

function openWishlist() {
    renderWishlist();
    document.getElementById('wishlist-modal-overlay').classList.add('open');
}

function closeWishlist() {
    document.getElementById('wishlist-modal-overlay').classList.remove('open');
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalContent = document.getElementById('product-modal-content');

    modalContent.innerHTML = `
        <div class="product-modal-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-modal-info">
            <span class="modal-tag">${getCategoryLabel(product.category)}</span>
            <h2>${product.name}</h2>
            <div class="modal-price">${formatINR(product.price)}</div>
            <p class="modal-description">${product.description}</p>
            
            <div class="modal-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}); closeProductModal();">
                    <i class="ph ph-shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="wishlist-toggle ${isInWishlist(product.id) ? 'active' : ''}" 
                        style="padding: 10px 20px; border: 1px solid #E0E0E0; border-radius: 6px;"
                        onclick="toggleWishlist(${product.id})">
                    <i class="ph-fill ph-heart"></i>
                </button>
            </div>
        </div>
    `;

    document.getElementById('product-modal-overlay').classList.add('open');
}

function closeProductModal() {
    document.getElementById('product-modal-overlay').classList.remove('open');
}

// Checkout
function openCheckout() {
    if (cart.length === 0) return;

    updateCartTotals();
    closeCart();
    document.getElementById('checkout-modal-overlay').classList.add('open');
}

function closeCheckout() {
    document.getElementById('checkout-modal-overlay').classList.remove('open');
}

function handleCheckout(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const customerDetails = {
        name: formData.get('name'),
        mobile: formData.get('mobile'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode')
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const shipping = subtotal >= 999 ? 0 : 79;
    const total = subtotal + gst + shipping;

    // Create order object
    const orderId = generateOrderId();
    const order = {
        orderId: orderId,
        date: new Date().toISOString(),
        dateFormatted: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        customer: customerDetails,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity
        })),
        subtotal: subtotal,
        gst: gst,
        shipping: shipping,
        total: total,
        status: 'Confirmed'
    };

    // Save order to LocalStorage
    orders.push(order);
    localStorage.setItem('brewhaven_orders', JSON.stringify(orders));

    // Close checkout modal
    closeCheckout();

    // Show success overlay with order ID
    document.getElementById('order-id-display').textContent = `Order ID: #${orderId}`;
    document.getElementById('success-overlay').classList.add('active');

    // Clear cart
    cart = [];
    saveToLocalStorage();
    updateBadges();
    renderCart();

    // Reset form
    e.target.reset();

    // Auto-close success after 5 seconds
    setTimeout(() => {
        document.getElementById('success-overlay').classList.remove('active');
    }, 5000);

    // Log to console
    console.log('Order saved to LocalStorage:', order);
    console.log('All orders:', orders);
}

// Update Badges
function updateBadges() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = wishlist.length;

    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('wishlist-count').textContent = wishlistCount;
}

// Make functions globally accessible
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.toggleWishlist = toggleWishlist;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
