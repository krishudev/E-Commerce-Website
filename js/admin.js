// Admin Orders Management Functions

// Check for admin mode via URL parameter
function checkAdminMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.has('admin');

    if (isAdmin) {
        document.getElementById('admin-note').style.display = 'block';
        console.log('🔒 ADMIN MODE: Orders stored in LocalStorage (key: brewhaven_orders)');
        console.log('📦 Total orders:', orders.length);
    }

    // Show admin link if ?admin is in URL
    if (isAdmin) {
        document.getElementById('admin-orders-link').style.fontWeight = '600';
        document.getElementById('admin-orders-link').style.color = '#D2691E';
    }
}

// Load orders from LocalStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('brewhaven_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

// Show Admin Orders Section
function showAdminOrders() {
    // Hide main sections
    document.getElementById('hero').style.display = 'none';
    document.getElementById('shop').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.querySelector('footer').style.display = 'none';

    // Show admin section
    document.getElementById('admin-orders').style.display = 'block';

    // Render orders
    renderOrders();

    // Scroll to top
    window.scrollTo(0, 0);
}

// Close Admin Orders Section
function closeAdminOrders() {
    // Show main sections
    document.getElementById('hero').style.display = 'block';
    document.getElementById('shop').style.display = 'block';
    document.getElementById('about').style.display = 'block';
    document.querySelector('footer').style.display = 'block';

    // Hide admin section
    document.getElementById('admin-orders').style.display = 'none';

    // Scroll to top
    window.scrollTo(0, 0);
}

// Render Orders List
function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    const totalOrdersEl = document.getElementById('total-orders');
    const totalRevenueEl = document.getElementById('total-revenue');

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <i class="ph ph-package"></i>
                <h3>No Orders Yet</h3>
                <p>Orders will appear here once customers place them.</p>
            </div>
        `;
        totalOrdersEl.textContent = '0';
        totalRevenueEl.textContent = '₹0';
        return;
    }

    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    totalOrdersEl.textContent = orders.length;
    totalRevenueEl.textContent = formatINR(totalRevenue);

    // Render orders (newest first)
    ordersList.innerHTML = orders.slice().reverse().map(order => `
        <div class="order-card" id="order-${order.orderId}">
            <div class="order-header" onclick="toggleOrderDetails('${order.orderId}')">
                <div class="order-info">
                    <div class="order-info-item">
                        <div class="order-info-label">Order ID</div>
                        <div class="order-info-value">#${order.orderId}</div>
                    </div>
                    <div class="order-info-item">
                        <div class="order-info-label">Date & Time</div>
                        <div class="order-info-value">${order.dateFormatted}</div>
                    </div>
                    <div class="order-info-item">
                        <div class="order-info-label">Customer</div>
                        <div class="order-info-value">${order.customer.name}</div>
                    </div>
                    <div class="order-info-item">
                        <div class="order-info-label">Items</div>
                        <div class="order-info-value">${order.items.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="order-total">${formatINR(order.total)}</div>
                    <span class="order-status">${order.status}</span>
                </div>
            </div>
            
            <div class="order-details">
                <div class="order-section">
                    <h4>Customer Details</h4>
                    <div class="customer-details">
                        <div class="detail-item">
                            <div class="detail-label">Name</div>
                            <div class="detail-value">${order.customer.name}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Mobile</div>
                            <div class="detail-value">${order.customer.mobile}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Address</div>
                            <div class="detail-value">${order.customer.address}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">City</div>
                            <div class="detail-value">${order.customer.city}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">State</div>
                            <div class="detail-value">${order.customer.state}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Pin Code</div>
                            <div class="detail-value">${order.customer.pincode}</div>
                        </div>
                    </div>
                </div>
                
                <div class="order-section">
                    <h4>Order Items</h4>
                    <table class="order-items-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${formatINR(item.price)}</td>
                                    <td>${item.quantity}</td>
                                    <td>${formatINR(item.subtotal)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <table class="order-summary-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td style="text-align: right;">${formatINR(order.subtotal)}</td>
                        </tr>
                        <tr>
                            <td>GST (18%):</td>
                            <td style="text-align: right;">${formatINR(order.gst)}</td>
                        </tr>
                        <tr>
                            <td>Shipping:</td>
                            <td style="text-align: right;">${order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}</td>
                        </tr>
                        <tr class="total-row">
                            <td>Total:</td>
                            <td style="text-align: right;">${formatINR(order.total)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Order Details
function toggleOrderDetails(orderId) {
    const orderCard = document.getElementById(`order-${orderId}`);
    orderCard.classList.toggle('expanded');
}

// Clear All Orders
function clearAllOrders() {
    if (orders.length === 0) {
        alert('No orders to clear.');
        return;
    }

    if (confirm(`Are you sure you want to delete all ${orders.length} orders? This cannot be undone.`)) {
        orders = [];
        localStorage.removeItem('brewhaven_orders');
        renderOrders();
        console.log('All orders cleared from LocalStorage');
    }
}

// Make functions globally accessible
window.toggleOrderDetails = toggleOrderDetails;
window.showAdminOrders = showAdminOrders;
window.closeAdminOrders = closeAdminOrders;
