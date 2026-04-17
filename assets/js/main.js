/**
 * Sheshams Bakers - Feane Template Main JavaScript
 * Handles mobile menu, smooth scrolls, active nav states, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap components
  initializeMobileMenu();
  initializeNavActive();
  initializeAOS();
  initializeSmoothScroll();
});

/**
 * Mobile Menu Toggle (Bootstrap 4)
 */
function initializeMobileMenu() {
  // Bootstrap 4 handles this automatically with data-toggle="collapse"
  // Just close menu on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navMenu = document.querySelector('#navbarSupportedContent');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Bootstrap collapse will auto-close on click
      if (navMenu && navMenu.classList.contains('show')) {
        // Trigger bootstrap collapse to close
        const toggle = document.querySelector('.navbar-toggler');
        if (toggle) {
          toggle.click();
        }
      }
    });
  });
}

/**
 * Set Active Navigation Link Based on Current Page
 */
function initializeNavActive() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.navbar-nav .nav-item');
  
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Check if the link matches the current path
    if ((href === '/' && (currentPath === '/' || currentPath === '/index.html')) ||
        (href !== '/' && href !== '#' && currentPath.includes(href))) {
      item.classList.add('active');
      link.classList.add('active');
    } else {
      item.classList.remove('active');
      link.classList.remove('active');
    }
  });
}

/**
 * Initialize AOS (Animate On Scroll) if available
 */
function initializeAOS() {
  // Only initialize if AOS library is loaded
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true
    });
  }
}

/**
 * Smooth Scroll to Anchors
 */
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Handle Scroll Sticky Header
 */
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header_section');
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  }
});

/**
 * Log Console Info (helpful for debugging)
 */
console.log('Sheshams Bakers - Feane Template initialized');
console.log('Built with: Bootstrap 4, Isotope.js, AOS');
