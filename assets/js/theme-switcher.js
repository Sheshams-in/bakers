/* ============================================
   Theme Switcher - Easy Color Theme Management
   ============================================ */

/**
 * Switch between different color themes
 * Usage: switchTheme('purple') or switchTheme('gold')
 */
function switchTheme(themeName) {
  const themeLink = document.getElementById('theme-stylesheet');
  
  if (!themeLink) {
    console.error('Theme stylesheet link not found in HTML');
    return;
  }
  
  // Build theme path with proper handling of basePath
  // Note: The | url filter in Nunjucks already handles basePath, 
  // so we use relative path from root
  const basePath = window.basePath || '';
  let themePath = '';
  
  switch(themeName.toLowerCase()) {
    case 'gold':
      themePath = '/assets/css/theme-gold.css';
      break;
    case 'purple':
      themePath = '/assets/css/theme-purple.css';
      break;
    default:
      console.error(`Theme "${themeName}" not found. Available themes: gold, purple`);
      return;
  }
  
  // If basePath is set (e.g., /bakers for GitHub Pages), prepend it
  if (basePath && basePath !== '/') {
    themePath = basePath + themePath;
  }
  
  // Update the stylesheet href
  themeLink.href = themePath;
  
  // Save preference to localStorage (optional)
  localStorage.setItem('preferred-theme', themeName);
  
  console.log(`Theme switched to: ${themeName} (path: ${themePath})`);
}

/**
 * Load the user's preferred theme on page load
 */
function loadPreferredTheme() {
  // Wait a brief moment to ensure window.basePath is set
  if (typeof window.basePath === 'undefined') {
    setTimeout(loadPreferredTheme, 100);
    return;
  }
  
  const preferredTheme = localStorage.getItem('preferred-theme') || 'gold';
  switchTheme(preferredTheme);
}

// Auto-load preferred theme when DOM is ready
document.addEventListener('DOMContentLoaded', loadPreferredTheme);
