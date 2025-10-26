/**
 * Product Page JavaScript
 * Handles gallery, customization, and product-specific interactions
 */

class ProductPage {
    constructor() {
        this.currentMediaIndex = 0;
        this.mediaItems = [];
        this.currentPrice = 89.99;
        this.basePrice = 89.99;
        this.selectedSize = 'medium';
        this.quantity = 1;
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupGallery();
        this.setupCustomization();
        this.setupQuantityControls();
        this.setupProductInteractions();
        this.updatePrice();
    }

    // ===== GALLERY FUNCTIONALITY =====
    setupGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        this.mediaItems = Array.from(thumbnails);

        // Set up thumbnail click handlers
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.showMedia(index);
            });
        });

        // Initialize first media item
        if (this.mediaItems.length > 0) {
            this.showMedia(0);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousMedia();
            } else if (e.key === 'ArrowRight') {
                this.nextMedia();
            } else if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    showMedia(index) {
        if (index < 0 || index >= this.mediaItems.length) return;

        this.currentMediaIndex = index;
        const mediaItem = this.mediaItems[index];
        const mediaType = mediaItem.dataset.media;
        const mediaSrc = mediaItem.dataset.src;

        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        mediaItem.classList.add('active');

        // Update main display
        const mainContainer = document.querySelector('.media-container');
        
        if (mediaType === 'video') {
            mainContainer.innerHTML = `
                <iframe class="main-video active" 
                        src="${mediaSrc}" 
                        frameborder="0" 
                        allowfullscreen>
                </iframe>
            `;
        } else {
            mainContainer.innerHTML = `
                <img id="main-media" 
                     class="main-image active" 
                     src="${mediaSrc}" 
                     alt="Product image">
            `;
        }
    }

    previousMedia() {
        const newIndex = this.currentMediaIndex > 0 
            ? this.currentMediaIndex - 1 
            : this.mediaItems.length - 1;
        this.showMedia(newIndex);
    }

    nextMedia() {
        const newIndex = this.currentMediaIndex < this.mediaItems.length - 1 
            ? this.currentMediaIndex + 1 
            : 0;
        this.showMedia(newIndex);
    }

    // ===== LIGHTBOX FUNCTIONALITY =====
    openLightbox() {
        const currentMedia = this.mediaItems[this.currentMediaIndex];
        const mediaType = currentMedia.dataset.media;
        
        if (mediaType === 'image') {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightbox-image');
            
            lightboxImage.src = currentMedia.dataset.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousLightboxMedia() {
        this.previousMedia();
        const currentMedia = this.mediaItems[this.currentMediaIndex];
        if (currentMedia.dataset.media === 'image') {
            document.getElementById('lightbox-image').src = currentMedia.dataset.src;
        } else {
            this.closeLightbox();
        }
    }

    nextLightboxMedia() {
        this.nextMedia();
        const currentMedia = this.mediaItems[this.currentMediaIndex];
        if (currentMedia.dataset.media === 'image') {
            document.getElementById('lightbox-image').src = currentMedia.dataset.src;
        } else {
            this.closeLightbox();
        }
    }

    // ===== CUSTOMIZATION =====
    setupCustomization() {
        // Size selection
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all buttons
                sizeButtons.forEach(b => b.classList.remove('active'));
                
                // Add active to clicked button
                btn.classList.add('active');
                
                // Update price and size
                this.selectedSize = btn.dataset.size;
                this.basePrice = parseFloat(btn.dataset.price);
                this.updatePrice();
            });
        });

        // Dietary options
        const dietaryCheckboxes = document.querySelectorAll('input[name="dietary"]');
        dietaryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updatePrice();
            });
        });
    }

    updatePrice() {
        let finalPrice = this.basePrice * this.quantity;
        
        // Add dietary option costs (example: +$5 for special options)
        const selectedDietary = document.querySelectorAll('input[name="dietary"]:checked');
        finalPrice += selectedDietary.length * 5;

        this.currentPrice = finalPrice;
        
        // Update price displays
        const priceElements = document.querySelectorAll('.current-price');
        priceElements.forEach(el => {
            el.textContent = `$${finalPrice.toFixed(2)}`;
        });

        const addToCartBtn = document.querySelector('.add-to-cart-large');
        if (addToCartBtn) {
            addToCartBtn.textContent = `Add to Cart - $${finalPrice.toFixed(2)}`;
        }

        // Update per-person calculation
        const breakdown = document.querySelector('.price-breakdown small');
        if (breakdown) {
            const servingSize = this.getServingSize();
            const perPerson = (finalPrice / servingSize).toFixed(2);
            breakdown.textContent = `Serves ${servingSize} people • $${perPerson} per person`;
        }
    }

    getServingSize() {
        switch (this.selectedSize) {
            case 'medium': return 10;
            case 'large': return 15;
            case 'xlarge': return 22;
            default: return 10;
        }
    }

    // ===== QUANTITY CONTROLS =====
    setupQuantityControls() {
        const quantityInput = document.getElementById('quantity');
        const decreaseBtn = document.querySelector('.qty-btn.decrease');
        const increaseBtn = document.querySelector('.qty-btn.increase');

        if (quantityInput) {
            quantityInput.addEventListener('input', (e) => {
                const value = parseInt(e.target.value) || 1;
                this.quantity = Math.max(1, Math.min(10, value));
                e.target.value = this.quantity;
                this.updatePrice();
            });
        }

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                this.decreaseQuantity();
            });
        }

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.increaseQuantity();
            });
        }
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
            document.getElementById('quantity').value = this.quantity;
            this.updatePrice();
        }
    }

    increaseQuantity() {
        if (this.quantity < 10) {
            this.quantity++;
            document.getElementById('quantity').value = this.quantity;
            this.updatePrice();
        }
    }

    // ===== PRODUCT INTERACTIONS =====
    setupProductInteractions() {
        // Add to cart from product page
        const addToCartBtn = document.querySelector('.add-to-cart-large');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCartFromProductPage();
            });
        }

        // Custom quote button
        const customQuoteBtn = document.querySelector('.btn-secondary');
        if (customQuoteBtn && customQuoteBtn.textContent.includes('Custom Quote')) {
            customQuoteBtn.addEventListener('click', () => {
                this.openCustomizationModal();
            });
        }

        // Related product clicks
        const relatedCards = document.querySelectorAll('.related-card');
        relatedCards.forEach(card => {
            card.addEventListener('click', () => {
                // In a real app, this would navigate to the related product page
                console.log('Navigate to related product');
            });
        });

        // Write review button
        const writeReviewBtn = document.querySelector('.write-review-btn');
        if (writeReviewBtn) {
            writeReviewBtn.addEventListener('click', () => {
                this.openReviewModal();
            });
        }
    }

    addToCartFromProductPage() {
        const product = {
            id: `artisan-board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: document.querySelector('.product-title-large').textContent,
            category: document.querySelector('.product-category-large').textContent,
            price: this.basePrice,
            quantity: this.quantity,
            size: this.selectedSize,
            dietary: Array.from(document.querySelectorAll('input[name="dietary"]:checked')).map(cb => cb.value),
            specialRequests: document.querySelector('.special-requests').value,
            image: this.mediaItems[0]?.dataset.src || null,
            addedAt: new Date().toISOString()
        };

        // Use the main app's cart functionality if available
        if (window.app && typeof window.app.addToCart === 'function') {
            window.app.addToCart(product);
            window.app.showCartNotification();
        } else {
            // Fallback: add to localStorage directly
            const cart = JSON.parse(localStorage.getItem('refinedCravingsCart')) || [];
            cart.push(product);
            localStorage.setItem('refinedCravingsCart', JSON.stringify(cart));
            
            // Show success message
            this.showSuccessMessage('Added to cart successfully!');
        }

        // Show loading state on button
        const button = document.querySelector('.add-to-cart-large');
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Adding to Cart...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Added to Cart!';
                button.style.background = 'var(--brand-sage)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 2000);
            }, 500);
        }
    }

    openCustomizationModal() {
        // Create and show customization modal
        const modal = document.createElement('div');
        modal.className = 'customization-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Request Custom Quote</h3>
                    <button class="modal-close" onclick="this.closest('.customization-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <p>Let us create a custom charcuterie experience tailored to your specific needs and preferences.</p>
                    <form class="custom-quote-form">
                        <div class="form-group">
                            <label>Event Type:</label>
                            <select name="event-type" required>
                                <option value="">Select event type...</option>
                                <option value="corporate">Corporate Event</option>
                                <option value="wedding">Wedding</option>
                                <option value="birthday">Birthday Party</option>
                                <option value="anniversary">Anniversary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Guest Count:</label>
                                <input type="number" name="guests" min="1" required>
                            </div>
                            <div class="form-group">
                                <label>Budget Range:</label>
                                <select name="budget">
                                    <option value="200-500">$200 - $500</option>
                                    <option value="500-1000">$500 - $1,000</option>
                                    <option value="1000-2000">$1,000 - $2,000</option>
                                    <option value="2000+">$2,000+</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Special Requirements:</label>
                            <textarea name="requirements" rows="4" placeholder="Dietary restrictions, theme preferences, special requests..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Request Quote</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    openReviewModal() {
        // Create and show review modal
        const modal = document.createElement('div');
        modal.className = 'review-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Write a Review</h3>
                    <button class="modal-close" onclick="this.closest('.review-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <form class="review-form">
                        <div class="form-group">
                            <label>Your Rating:</label>
                            <div class="star-rating">
                                <span class="star" data-rating="1">★</span>
                                <span class="star" data-rating="2">★</span>
                                <span class="star" data-rating="3">★</span>
                                <span class="star" data-rating="4">★</span>
                                <span class="star" data-rating="5">★</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Your Name:</label>
                            <input type="text" name="name" required>
                        </div>
                        <div class="form-group">
                            <label>Event Type:</label>
                            <input type="text" name="event-type" placeholder="e.g., Corporate Event, Wedding, Birthday">
                        </div>
                        <div class="form-group">
                            <label>Your Review:</label>
                            <textarea name="review" rows="5" placeholder="Tell us about your experience..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit Review</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';

        // Setup star rating
        const stars = modal.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
window.productPage = new ProductPage();

// Make functions available globally for HTML onclick handlers
window.app = window.app || {};
Object.assign(window.app, {
    previousMedia: () => window.productPage.previousMedia(),
    nextMedia: () => window.productPage.nextMedia(),
    openLightbox: () => window.productPage.openLightbox(),
    closeLightbox: () => window.productPage.closeLightbox(),
    previousLightboxMedia: () => window.productPage.previousLightboxMedia(),
    nextLightboxMedia: () => window.productPage.nextLightboxMedia(),
    decreaseQuantity: () => window.productPage.decreaseQuantity(),
    increaseQuantity: () => window.productPage.increaseQuantity(),
    addToCartFromProductPage: () => window.productPage.addToCartFromProductPage(),
    openCustomizationModal: () => window.productPage.openCustomizationModal()
});

// Add CSS for modals and notifications
const modalStyles = `
<style>
.customization-modal,
.review-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: relative;
    background: white;
    border-radius: var(--radius-xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid var(--gray-200);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: var(--gray-900);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--gray-500);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 2rem;
}

.custom-quote-form .form-group,
.review-form .form-group {
    margin-bottom: 1.5rem;
}

.custom-quote-form label,
.review-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--gray-900);
}

.custom-quote-form input,
.custom-quote-form select,
.custom-quote-form textarea,
.review-form input,
.review-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--gray-200);
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    transition: border-color 0.2s ease;
}

.custom-quote-form input:focus,
.custom-quote-form select:focus,
.custom-quote-form textarea:focus,
.review-form input:focus,
.review-form textarea:focus {
    outline: none;
    border-color: var(--brand-brown);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.star-rating {
    display: flex;
    gap: 0.25rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.star {
    cursor: pointer;
    color: var(--gray-300);
    transition: color 0.2s ease;
}

.star:hover,
.star.active {
    color: var(--brand-gold);
}

.success-notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--brand-sage);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1002;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.success-notification.show {
    transform: translateX(0);
}

@media (max-width: 768px) {
    .modal-content {
        margin: 1rem;
        max-height: calc(100vh - 2rem);
    }
    
    .modal-header,
    .modal-body {
        padding: 1.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);