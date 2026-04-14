/* Main Site JavaScript - Enhanced with Modern Animations */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all systems
  initMobileMenu();
  initAOS();
  initSmoothScrollLinks();
  addDateFilter();
  handleParallaxEffects();
  observeAnimationTriggers();
});

// ============================================
// AOS (Animate On Scroll) Initialization
// ============================================
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      offset: 100,
      delay: 50,
      easing: 'ease-in-out-cubic',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom'
    });
    
    // Refresh on images loaded
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  }
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
  
  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScrollLinks() {
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
}

// ============================================
// Smooth Scroll Utility Function
// ============================================
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ============================================
// Parallax Scrolling Effects
// ============================================
function handleParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = element.getBoundingClientRect().top + scrollPosition;
      const distance = scrollPosition - elementOffset;
      
      // Apply parallax effect
      element.style.transform = `translateY(${distance * 0.5}px)`;
    });
  });
}

// ============================================
// Intersection Observer for Staggered Animations
// ============================================
function observeAnimationTriggers() {
  const cards = document.querySelectorAll('.product-card, .testimonial-card, .featured__card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on position
        entry.target.style.animationDelay = `${index * 0.1}s`;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
}

// ============================================
// Analytics Event Tracking
// ============================================
function trackEvent(category, action, label) {
  if (window.gtag) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
  
  // Console log for development
  console.log(`Event: ${category} > ${action} [${label}]`);
}

// ============================================
// Lazy Load Images with Intersection Observer
// ============================================
function lazyLoadImages() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Handle background images
          if (img.dataset.bg) {
            img.style.backgroundImage = `url(${img.dataset.bg})`;
            img.classList.add('loaded');
          }
          
          // Handle regular images
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    document.querySelectorAll('img.lazy, [data-bg]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ============================================
// Add Date Filter (if needed in templates)
// ============================================
function addDateFilter() {
  // This is typically done in 11ty config
  // For client-side formatting if needed
  window.formatDate = function(dateString, format = 'short') {
    const date = new Date(dateString);
    const options = format === 'short' 
      ? { month: 'short', day: 'numeric', year: 'numeric' }
      : { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
}

// ============================================
// Scroll to Top Button
// ============================================
function initScrollToTopButton() {
  const scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) {
    // Create button if it doesn't exist
    const btn = document.createElement('button');
    btn.id = 'scrollToTop';
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);
  }
  
  const button = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Enhanced Button Click Feedback
// ============================================
function enhanceButtonInteractions() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      btn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// ============================================
// Page Load Complete - Show Welcome Animation
// ============================================
window.addEventListener('load', () => {
  lazyLoadImages();
  initScrollToTopButton();
  enhanceButtonInteractions();
  document.body.classList.add('loaded');
  
  // Trigger AOS refresh after all images loaded
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});

// ============================================
// Export Global Utilities
// ============================================
window.SheshamsBakers = {
  smoothScrollTo,
  trackEvent,
  lazyLoadImages,
  formatDate: (dateString, format) => {
    const date = new Date(dateString);
    const options = format === 'short' 
      ? { month: 'short', day: 'numeric', year: 'numeric' }
      : { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};
