/**
 * Menu initialization - runs AFTER jQuery is loaded
 * Handles Instagram feed loading, Isotope filtering, and search
 */

let $gridInstance = null; // Global Isotope instance

document.addEventListener('DOMContentLoaded', async function() {
  console.log('=== MENU INIT SCRIPT STARTING ===');
  
  // Only run on menu pages
  if (!document.getElementById('menuGrid')) {
    console.log('menuGrid element not found - skipping menu init');
    return;
  }
  
  console.log('✓ Found menuGrid element');

  const menuGrid = document.getElementById('menuGrid');
  
  try {
    // Get basePath set by base.njk (no trailing slash)
    const basePath = window.basePath || '';
    const feedUrl = basePath ? basePath + '/posts/instagram-feed.json' : '/posts/instagram-feed.json';
    
    console.log('Loading Instagram feed from:', feedUrl);
    
    // Load Instagram feed data
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`Failed to load posts from: ${feedUrl}`);
    }
    
    const posts = await response.json();
    console.log('Loaded', posts.length, 'posts from Instagram feed');
    
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
    
    console.log('✓ Rendered', posts.length, 'items to menuGrid');
    
    // Wait a tiny bit for DOM to settle
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Initialize Isotope filtering AFTER items are rendered
    if (typeof jQuery === 'undefined') {
      console.error('❌ jQuery is not available! Isotope will not work.');
      return;
    }
    
    const $grid = jQuery('#menuGrid');
    console.log('jQuery grid reference:', $grid.length, 'elements');
    
    if ($grid.length === 0) {
      console.error('❌ Isotope grid not found!');
      return;
    }
    
    console.log('Grid has', $grid.find('[class*="all"]').length, 'items');
    
    // Initialize Isotope
    $grid.isotope({
      itemSelector: '.all',
      layoutMode: 'fitRows',
      transitionDuration: '0.6s'
    });
    
    $gridInstance = $grid; // Store globally
    console.log('✓ Isotope initialized successfully');
    
    // Attach filter event listeners USING VANILLA JS for reliability
    const filterButtons = document.querySelectorAll('.filters_menu li');
    console.log('Found', filterButtons.length, 'filter buttons');
    
    filterButtons.forEach((button, index) => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const filterValue = this.getAttribute('data-filter');
        const filterText = this.textContent.trim();
        
        console.log('▶ FILTER BUTTON CLICKED:', filterText, '| Selector:', filterValue);
        
        // Update active state
        document.querySelectorAll('.filters_menu li').forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // MANUAL FILTERING: Hide/show items based on classes
        const allItems = document.querySelectorAll('#menuGrid [class*="all"]');
        console.log('Processing', allItems.length, 'items');
        
        let visibleCount = 0;
        let hiddenCount = 0;
        
        allItems.forEach(item => {
          let shouldShow = false;
          
          if (filterValue === '*') {
            // Show all
            shouldShow = true;
          } else {
            // Extract the class name from filterValue (e.g., ".tresletches" -> "tresletches")
            const classToMatch = filterValue.replace(/^\./, '');
            
            // Check if item has this class
            shouldShow = item.classList.contains(classToMatch);
          }
          
          // Apply visibility using CSS classes (with !important override)
          if (shouldShow) {
            item.classList.remove('isotope-hidden');
            item.classList.add('isotope-visible');
            visibleCount++;
          } else {
            item.classList.remove('isotope-visible');
            item.classList.add('isotope-hidden');
            hiddenCount++;
          }
        });
        
        console.log('✓ Manual filter applied - Visible:', visibleCount, '| Hidden:', hiddenCount);
        
        // Now use Isotope to recalculate layout for visible items
        $grid.isotope('reloadItems').isotope();
        console.log('✓ Isotope layout recalculated');
      });
    });
    
    console.log('✓ Event listeners attached to all filter buttons');
    console.log('=== MENU INIT COMPLETE ===\n');
    
  } catch (error) {
    console.error('❌ Error loading menu:', error);
    menuGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Unable to load menu. Please try again later.</p>';
  }
});
