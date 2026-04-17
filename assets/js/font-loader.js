/**
 * Font loader - injects Sail font with proper basePath handling
 */

(function() {
  // Wait for basePath to be available
  const checkAndLoadFont = () => {
    if (typeof window.basePath !== 'undefined') {
      const basePath = window.basePath || '';
      const fontPath = basePath ? basePath + '/assets/fonts/Sail-Regular.ttf' : '/assets/fonts/Sail-Regular.ttf';
      
      // Create @font-face rule with correct path
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Sail';
          src: url('${fontPath}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `;
      
      document.head.appendChild(style);
      console.log('✓ Sail font loaded from:', fontPath);
    } else {
      // Retry if basePath not yet set
      setTimeout(checkAndLoadFont, 50);
    }
  };
  
  // Load font after basePath is established
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndLoadFont);
  } else {
    checkAndLoadFont();
  }
})();
