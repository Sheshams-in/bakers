/**
 * Menu initialization - runs AFTER jQuery is loaded
 * Handles Instagram feed loading, Isotope filtering, and search
 */

document.addEventListener('DOMContentLoaded', async function() {
  // Only run on menu pages
  if (!document.getElementById('menuGrid')) {
    return;
  }

  const menuGrid = document.getElementById('menuGrid');
  
  try {
    // Get basePath set by base.njk
    const basePath = window.basePath || '';
    const feedUrl = (basePath ? basePath : '') + '/posts/instagram-feed.json';
    
    // Load Instagram feed data
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to load posts from: ${feedUrl}`);
    }
    
    const posts = await response.json();
    
    // Render posts
    posts.forEach(post => {
      const categories = (post.categories || []).map(cat => cat.toLowerCase().replace(/\s+/g, '-')).join(' ');
      
      const col = document.createElement('div');
      col.className = `col-sm-6 col-lg-4 all ${categories}`;
      
      // Handle image paths with basePath
      const imagePath = post.localImagePath || post.imageUrl;
      let imgSrc = imagePath || (basePath ? basePath : '') + '/assets/images/placeholder.jpg';
      if (imagePath && imagePath.startsWith('/') && basePath) {
        imgSrc = basePath + imagePath;
      }
      
      col.innerHTML = `
        <div class="box">
          <div class="img-box">
            <img src="${imgSrc}" alt="${post.caption || 'Sheshams Bakers cake'}">
          </div>
          <div class="detail-box">
            <h5>${(post.categories && post.categories[0]) || 'Our Creation'}</h5>
            <p>${(post.caption || 'Beautiful handcrafted cake').substring(0, 80)}...</p>
          </div>
          <div class="box-footer">
            <a href="${post.permalink}" target="_blank" class="instagram-btn">
              <i class="fa-brands fa-instagram"></i>
              <span>View more</span>
            </a>
          </div>
        </div>
      `;
      
      menuGrid.appendChild(col);
    });
    
    // Initialize Isotope filtering AFTER items are rendered
    const $grid = jQuery('.grid');
    $grid.isotope({
      itemSelector: '.col-sm-6',
      layoutMode: 'fitRows'
    });
    
    // Filter functionality
    jQuery('.filters_menu li').on('click', function() {
      const filterValue = jQuery(this).attr('data-filter');
      jQuery('.filters_menu li').removeClass('active');
      jQuery(this).addClass('active');
      
      // Apply filter
      $grid.isotope({ 
        filter: filterValue 
      });
      
      // Force layout recalculation after items change visibility
      setTimeout(() => {
        $grid.isotope('layout');
      }, 50);
    });
    
  } catch (error) {
    console.error('Error loading menu:', error);
    menuGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Unable to load menu. Please try again later.</p>';
  }
});
