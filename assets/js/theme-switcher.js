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
  
  // Map theme names to stylesheet paths
  const themeMap = {
    gold: '/assets/css/theme-gold.css',
    purple: '/assets/css/theme-purple.css',
    // Add more themes here as needed
  };
  
  const themePath = themeMap[themeName.toLowerCase()];
  
  if (!themePath) {
    console.error(`Theme "${themeName}" not found. Available themes:`, Object.keys(themeMap));
    return;
  }
  
  // Update the stylesheet href
  themeLink.href = themePath;
  
  // Save preference to localStorage (optional)
  localStorage.setItem('preferred-theme', themeName);
  
  console.log(`Theme switched to: ${themeName}`);
}

/**
 * Load the user's preferred theme on page load
 */
function loadPreferredTheme() {
  const preferredTheme = localStorage.getItem('preferred-theme') || 'gold';
  switchTheme(preferredTheme);
}

// Auto-load preferred theme when DOM is ready
document.addEventListener('DOMContentLoaded', loadPreferredTheme);
