/**
 * Refined Cravings - Professional Charcuterie E-commerce
 * Interactive Features & Shopping Cart Functionality
 * Inspired by Boarderie.com's user experience patterns
 */

class RefinedCravings {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('refinedCravingsCart')) || [];
        this.currentProduct = null;
        this.isLoading = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.initializeAnimations();
        this.setupMobileMenu();
        this.setupProductInteractions();
        this.setupBookingForm();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Cart functionality
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart, .add-to-cart *')) {
                const button = e.target.closest('.add-to-cart');
                if (button) {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent card navigation
                    this.handleAddToCart(button);
                }
            }

            // Remove from cart
            if (e.target.matches('.remove-from-cart, .remove-from-cart *')) {
                const button = e.target.closest('.remove-from-cart');
                if (button) {
                    e.preventDefault();
                    this.removeFromCart(button.dataset.productId);
                }
            }

            // Cart toggle
            if (e.target.matches('.cart-toggle, .cart-toggle *')) {
                e.preventDefault();
                this.toggleCart();
            }

            // Product card navigation
            if (e.target.matches('.product-card, .product-card *')) {
                const card = e.target.closest('.product-card');
                if (card && card.dataset.productUrl) {
                    // Only navigate if the click wasn't on a button or interactive element
                    if (!e.target.closest('button, a, input, .btn')) {
                        window.location.href = card.dataset.productUrl;
                    }
                }
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Window events
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    }

    // ===== SHOPPING CART =====
    handleAddToCart(button) {
        if (this.isLoading) return;

        let product;
        const productCard = button.closest('.product-card');
        
        if (productCard) {
            // Handle product cards on main page
            product = this.extractProductData(productCard);
        } else if (button.dataset.productName) {
            // Handle product page buttons with data attributes
            product = this.extractProductDataFromButton(button);
        } else {
            return; // No valid product data found
        }

        if (!product) return;

        this.isLoading = true;
        this.showLoadingState(button);

        // Simulate API call delay for better UX
        setTimeout(() => {
            this.addToCart(product);
            this.showSuccessState(button);
            this.isLoading = false;
            
            // Reset button after animation
            setTimeout(() => {
                this.resetButtonState(button);
            }, 2000);
        }, 500);
    }

    extractProductData(productCard) {
        const titleElement = productCard.querySelector('.product-title');
        const priceElement = productCard.querySelector('.product-price');
        const categoryElement = productCard.querySelector('.product-category');
        const imageElement = productCard.querySelector('.product-image');

        if (!titleElement || !priceElement) return null;

        return {
            id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: titleElement.textContent.trim(),
            category: categoryElement ? categoryElement.textContent.trim() : 'Charcuterie Board',
            price: this.extractPrice(priceElement.textContent),
            image: imageElement ? this.getImageUrl(imageElement) : null,
            quantity: 1,
            addedAt: new Date().toISOString()
        };
    }

    extractPrice(priceText) {
        const match = priceText.match(/\$(\d+(?:\.\d{2})?)/);
        return match ? parseFloat(match[1]) : 0;
    }

    getImageUrl(imageElement) {
        const img = imageElement.querySelector('img');
        return img ? img.src : null;
    }

    extractProductDataFromButton(button) {
        // Extract product data from button data attributes (for product pages)
        const quantityInput = document.getElementById('quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
        
        return {
            id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: button.dataset.productName,
            category: 'Artisan Collection',
            price: parseFloat(button.dataset.productPrice) || 0,
            image: button.dataset.productImage || null,
            quantity: quantity,
            addedAt: new Date().toISOString()
        };
    }

    // ===== PRODUCT PAGE QUANTITY CONTROLS =====
    increaseQuantity() {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            const currentValue = parseInt(quantityInput.value) || 1;
            const maxValue = parseInt(quantityInput.max) || 10;
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
                this.updateProductPagePrice();
            }
        }
    }

    decreaseQuantity() {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            const currentValue = parseInt(quantityInput.value) || 1;
            const minValue = parseInt(quantityInput.min) || 1;
            if (currentValue > minValue) {
                quantityInput.value = currentValue - 1;
                this.updateProductPagePrice();
            }
        }
    }

    updateProductPagePrice() {
        const quantityInput = document.getElementById('quantity');
        const addButton = document.querySelector('.add-to-cart-large');
        
        if (quantityInput && addButton) {
            const quantity = parseInt(quantityInput.value) || 1;
            const basePrice = parseFloat(addButton.dataset.productPrice) || 89.99;
            const totalPrice = (basePrice * quantity).toFixed(2);
            
            addButton.textContent = `Add to Cart - $${totalPrice}`;
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => 
            item.title === product.title && item.category === product.category
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showCartNotification();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateCartQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
        } else if (item && newQuantity <= 0) {
            this.removeFromCart(productId);
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('refinedCravingsCart', JSON.stringify(this.cart));
    }

    // ===== UI UPDATES =====
    updateCartDisplay() {
        this.updateCartBadge();
        this.updateCartDrawer();
    }

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.getCartItemCount();
        
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    updateCartDrawer() {
        const cartContent = document.querySelector('.cart-content');
        if (!cartContent) return;

        if (this.cart.length === 0) {
            cartContent.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some delicious charcuterie boards to get started!</p>
                </div>
            `;
            return;
        }

        const itemsHtml = this.cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.title}">` : '🧀'}
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p class="cart-item-category">${item.category}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" onclick="app.updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" onclick="app.updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');

        const total = this.getCartTotal();
        cartContent.innerHTML = `
            <div class="cart-items">
                ${itemsHtml}
            </div>
            <div class="cart-summary">
                <div class="cart-total">
                    <strong>Total: $${total.toFixed(2)}</strong>
                </div>
                <button class="btn btn-primary btn-lg checkout-btn" onclick="app.proceedToCheckout()">
                    Proceed to Checkout
                </button>
            </div>
        `;
    }

    // ===== BUTTON STATES =====
    showLoadingState(button) {
        const originalText = button.textContent;
        button.dataset.originalText = originalText;
        button.textContent = 'Adding...';
        button.disabled = true;
        button.classList.add('loading');
    }

    showSuccessState(button) {
        button.textContent = 'Added to Cart!';
        button.classList.remove('loading');
        button.classList.add('success');
    }

    resetButtonState(button) {
        const originalText = button.dataset.originalText || 'Add to Cart';
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading', 'success');
    }

    // ===== CART UI =====
    toggleCart() {
        const cartDrawer = document.querySelector('.cart-drawer');
        if (cartDrawer) {
            cartDrawer.classList.toggle('open');
            document.body.classList.toggle('cart-open');
        }
    }

    showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">Added to cart!</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // ===== MOBILE MENU =====
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                mobileMenuBtn.classList.toggle('active');
            });
        }
    }

    // ===== PRODUCT INTERACTIONS =====
    setupProductInteractions() {
        // Hover effects for product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // ===== BOOKING FORM =====
    setupBookingForm() {
        const bookingForm = document.querySelector('.booking-form');
        if (!bookingForm) return;

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission(bookingForm);
        });

        // Form validation
        const inputs = bookingForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleBookingSubmission(form) {
        if (!this.validateForm(form)) return;

        const formData = new FormData(form);
        const bookingData = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        this.showLoadingState(submitBtn);

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showBookingSuccess();
            form.reset();
            this.resetButtonState(submitBtn);
        }, 1500);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Phone validation
        if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        this.showFieldError(field, errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);

        if (message) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    showBookingSuccess() {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✓</div>
                <h3>Booking Request Sent!</h3>
                <p>Thank you for your interest! We'll contact you within 24 hours to confirm your event details.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }

    // ===== SCROLL HANDLING =====
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Animate elements on scroll
        this.animateOnScroll();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(element => {
            if (this.isInViewport(element)) {
                element.classList.add('animate-fade-in');
            }
        });
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== RESIZE HANDLING =====
    handleResize() {
        // Handle mobile menu on resize
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('mobile-open');
            }
        }
    }

    // ===== ANIMATIONS =====
    initializeAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.product-card, .testimonial-card').forEach((element, index) => {
            element.dataset.animate = 'true';
            element.style.animationDelay = `${index * 0.1}s`;
        });

        // Handle image loading
        this.setupImageLoading();
    }

    setupImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        images.forEach(img => {
            // Add loading state
            img.classList.add('image-loading');
            
            // Handle load event
            img.addEventListener('load', () => {
                img.classList.remove('image-loading');
                img.classList.add('loaded');
            });

            // Handle error event with fallback
            img.addEventListener('error', () => {
                img.classList.remove('image-loading');
                img.classList.add('loaded');
                
                // If it's a product image without fallback, set a generic one
                if (img.closest('.product-image') && !img.dataset.fallbackSet) {
                    img.dataset.fallbackSet = 'true';
                    
                    // Determine appropriate stock image based on product type
                    const productCard = img.closest('.product-card');
                    const category = productCard?.querySelector('.product-category')?.textContent || '';
                    
                    if (category.includes('Classic')) {
                        img.src = 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    } else if (category.includes('Premium')) {
                        img.src = 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    } else if (category.includes('Corporate')) {
                        img.src = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    } else if (category.includes('Wedding')) {
                        img.src = 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    } else {
                        img.src = 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }
                }
            });
        });
    }

    // ===== CHECKOUT =====
    proceedToCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // In a real application, this would redirect to a checkout page
        const total = this.getCartTotal();
        const itemCount = this.getCartItemCount();
        
        const message = `Ready to checkout with ${itemCount} item(s) for $${total.toFixed(2)}?\n\nThis would normally redirect to a secure checkout page.`;
        
        if (confirm(message)) {
            // Simulate checkout process
            this.processCheckout();
        }
    }

    processCheckout() {
        const checkoutData = {
            items: this.cart,
            total: this.getCartTotal(),
            timestamp: new Date().toISOString()
        };

        // In a real app, send this data to your backend
        console.log('Checkout data:', checkoutData);

        // Clear cart after successful checkout
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.toggleCart();

        // Show success message
        alert('Order placed successfully! You will receive a confirmation email shortly.');
    }

    // ===== UTILITY FUNCTIONS =====
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ===== ADDITIONAL CSS FOR INTERACTIVE FEATURES =====
const additionalStyles = `
/* Cart Drawer */
.cart-drawer {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background: white;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    z-index: 1001;
    transition: right 0.3s ease;
    overflow-y: auto;
}

.cart-drawer.open {
    right: 0;
}

.cart-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--gray-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--gray-600);
}

.cart-content {
    padding: 1rem;
}

.cart-empty {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--gray-500);
}

.cart-empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.cart-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--gray-100);
}

.cart-item-image {
    width: 60px;
    height: 60px;
    background: var(--gray-100);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    overflow: hidden;
}

.cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cart-item-details {
    flex: 1;
}

.cart-item-details h4 {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
}

.cart-item-category {
    font-size: 0.85rem;
    color: var(--gray-500);
    margin-bottom: 0.5rem;
}

.cart-item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-btn {
    width: 28px;
    height: 28px;
    border: 1px solid var(--gray-300);
    background: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
}

.quantity-btn:hover {
    background: var(--gray-50);
}

/* Cart badge styles moved to main CSS file */

/* Button States */
.btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn.success {
    background: var(--brand-sage) !important;
}

/* Notifications */
.cart-notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--brand-brown);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1002;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.cart-notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Form Validation */
.form-input.error,
.form-select.error,
.form-textarea.error {
    border-color: #EF4444;
}

.field-error {
    color: #EF4444;
    font-size: 0.85rem;
    margin-top: 0.25rem;
}

/* Success Modal */
.success-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1003;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.success-modal.show {
    opacity: 1;
}

.modal-content {
    background: white;
    padding: 3rem;
    border-radius: 12px;
    text-align: center;
    max-width: 400px;
    margin: 1rem;
}

.success-icon {
    font-size: 3rem;
    color: var(--brand-sage);
    margin-bottom: 1rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
    .cart-drawer {
        width: 100vw;
        right: -100vw;
    }
    
    .nav-links.mobile-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid var(--gray-200);
        padding: 1rem;
        box-shadow: var(--shadow-lg);
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
const app = new RefinedCravings();
// Make app globally accessible for onclick handlers
window.app = app;