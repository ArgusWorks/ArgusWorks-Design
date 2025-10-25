// Base JavaScript for Client Templates
class WebsiteCore {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupContactForm();
    this.setupScrollAnimations();
  }

  // Navigation scroll effect
  setupNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Contact form handling for Netlify Forms
  setupContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
          this.showSuccessMessage();
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        this.showErrorMessage();
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Scroll animations using Intersection Observer
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  showSuccessMessage() {
    this.showMessage('Thank you! Your message has been sent successfully.', 'success');
  }

  showErrorMessage() {
    this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
  }

  showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const message = document.createElement('div');
    message.className = `form-message form-message--${type}`;
    message.textContent = text;

    // Add styles
    message.style.cssText = `
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0.5rem;
      font-weight: 600;
      ${type === 'success' 
        ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #10b981;' 
        : 'background-color: #fee2e2; color: #991b1b; border: 1px solid #ef4444;'
      }
    `;

    // Insert message after form
    const contactForm = document.querySelector('#contact-form');
    contactForm.parentNode.insertBefore(message, contactForm.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => {
      message.remove();
    }, 5000);
  }
}

// Utility functions for client customization
const Utils = {
  // Color theme switcher for easy client customization
  setTheme(primaryColor, secondaryColor = null) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    if (secondaryColor) {
      root.style.setProperty('--secondary-color', secondaryColor);
    }
  },

  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Simple analytics tracking (can be replaced with Google Analytics)
  trackEvent(eventName, properties = {}) {
    // Basic event tracking - replace with your analytics service
    console.log('Event tracked:', eventName, properties);
    
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }
  },

  // Format phone numbers
  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }
};

// Professional web design business specific functionality
class MainSiteFunctionality {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupNavigationEffects();
    this.setupCardInteractions();
    this.setupStatsAnimation();
  }

  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed nav
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Add scroll effect to navigation
  setupNavigationEffects() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(255,255,255,0.98)';
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
      } else {
        nav.style.background = 'rgba(255,255,255,0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      }
    });
  }

  // Portfolio and service card interactions
  setupCardInteractions() {
    // Portfolio card interactions
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
      });
    });

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      });
    });
  }

  // Stats counter animation
  setupStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'pulse 0.6s ease-out';
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }
}

// Handle demo clicks for development and production
function handleDemoClick(event, filePath) {
  // Check if we're in development mode (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // In development, open the file directly
    event.preventDefault();
    window.open(filePath, '_blank');
  }
  // In production, let the normal link behavior work with Netlify redirects
}

// Business analytics tracking (placeholder)
function trackBusinessGoal(action, value) {
  console.log('Business Goal:', action, value);
  // Analytics integration would go here
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WebsiteCore();
  new MainSiteFunctionality();
  Utils.lazyLoadImages();
});

// Export for use in other scripts
window.WebsiteCore = WebsiteCore;
window.Utils = Utils;
window.handleDemoClick = handleDemoClick;
window.trackBusinessGoal = trackBusinessGoal;