// Sample menu items data
const menuItems = [
  {
    id: 1,
    name: "Siomay Ayam< Min 6  >",
    price: 30000,
    image: "https://github.com/kijangemas02/kijang02/blob/main/1c9bff3cd355a67efb8bfa3ce17613ab_enhanced.jpg?raw=true"
  },
  {
    id: 2,
    name: "Siomay Udang < min 6 >",
    price: 36000,
    image: "https://github.com/kijangemas02/kijang02/blob/main/181fff13bf7c876281a118470dcbb864_enhanced.jpg?raw=true"
  },
  {
    id: 3,
    name: "Siomay Ayam Isi keju < min 6 >",
    price: 36000,
    image: "https://github.com/kijangemas02/kijang02/blob/main/8f09fb42e3584aeb0910cd17cf368898_enhanced.jpg?raw=true"
  },
  {
    id: 4,
    name: "Siomay Ayam udang Isi Keju < min 6 >",
    price: 42000,
    image: "https://github.com/kijangemas02/kijang02/blob/main/0b11787e3c836ab37af388b0a5c442d0_enhanced.jpg?raw=true"
  }
];

// Enhanced cart functionality
let cart = [];

// Helper function to format currency in IDR
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Display menu items
function displayMenuItems() {
  const menuContainer = document.getElementById('menu-items');
  menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-item-content">
        <h3>${item.name}</h3>
        <p class="price">${formatRupiah(item.price)}</p>
        <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
    menuContainer.appendChild(menuItem);
  });
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1
    });
  }
  
  updateCartCount();
  showNotification(`${item.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Enhanced notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${message}
  `;
  document.body.appendChild(notification);
  
  // Add animation
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s reverse';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Enhanced cart display
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  cartItems.innerHTML = '';
  let total = 0;
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
        <p>Your cart is empty</p>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-price">${formatRupiah(item.price)}</p>
          <div class="cart-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${index})" class="remove-btn">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartItems.appendChild(cartItem);
    });
  }
  
  cartTotal.textContent = formatRupiah(total).replace('Rp', '');
}

// Update quantity
function updateQuantity(index, change) {
  const item = cart[index];
  const newQuantity = item.quantity + change;
  
  if (newQuantity > 0) {
    item.quantity = newQuantity;
  } else {
    cart.splice(index, 1);
  }
  
  updateCartCount();
  displayCart();
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  displayCart();
}

// Cart modal functionality
const cartIcon = document.querySelector('.cart-icon');
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');

cartIcon.addEventListener('click', (e) => {
  e.preventDefault();
  displayCart();
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Enhanced checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Calculate total amount
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Show payment details in a custom modal
  const paymentModal = document.createElement('div');
  paymentModal.className = 'payment-modal';
  paymentModal.innerHTML = `
    <div class="payment-content">
      <h3>Payment Details</h3>
      <div class="payment-info">
        <p class="total-amount">Total Amount: ${formatRupiah(total)}</p>
        <div class="bank-details">
          <img src="https://github.com/kijangemas02/kijang02/blob/main/Logo%20BCA_Biru.png?raw=true" alt="BCA Logo" class="bca-logo">
          <p>Please transfer to:</p>
          <p class="account-number">BCA: 675-065-8651</p>
          <p class="account-name">a.n. Jocelyn Shienarta</p>
        </div>
        <button class="close-payment" onclick="closePaymentModal()">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(paymentModal);
  
  // Animate modal entrance
  setTimeout(() => {
    paymentModal.classList.add('show');
  }, 10);
});

// Function to close payment modal
function closePaymentModal() {
  const paymentModal = document.querySelector('.payment-modal');
  paymentModal.classList.remove('show');
  setTimeout(() => {
    paymentModal.remove();
    // Clear cart after showing payment details
    cart = [];
    updateCartCount();
    modal.style.display = 'none';
  }, 300);
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add intersection observer for fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.menu-item').forEach(item => {
  observer.observe(item);
});

// Initialize the page
displayMenuItems();