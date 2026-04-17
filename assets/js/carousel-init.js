/**
 * Carousel initialization with touch/swipe support
 * Runs AFTER jQuery is loaded
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run if carousel exists
  if (!document.getElementById('customCarousel1')) {
    return;
  }

  // jQuery is guaranteed to be loaded at this point
  const carousel = jQuery('#customCarousel1');
  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize carousel with auto-slide
  carousel.carousel({
    interval: 5000
  });

  // Touch event handlers for swipe detection
  carousel.on('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
  });

  carousel.on('touchend', function(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  // Detect swipe direction and move carousel
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to trigger swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        carousel.carousel('next');
      } else {
        // Swiped right - go to previous slide
        carousel.carousel('prev');
      }
    }
  }
});
