/**
 * Sheshams Bakers - Menu Search & Filter JavaScript
 * Handles Isotope.js filtering, search functionality, and dynamic menu population
 */

let $grid; // Isotope grid instance
let allCakes = []; // Store all cakes data

document.addEventListener('DOMContentLoaded', function() {
  initializeMenuGrid();
  initializeSearchBar();
  initializeFilters();
  loadMenuData();
});

/**
 * Initialize Isotope Grid
 */
function initializeMenuGrid() {
  $grid = jQuery('#cakesGrid');
  
  if ($grid.length === 0) {
    console.warn('Menu grid element #cakesGrid not found');
    return;
  }
  
  // Initialize Isotope
  $grid.isotope({
    itemSelector: '.col-sm-6',
    layoutMode: 'fitRows',
    transitionDuration: '0.6s'
  });
}

/**
 * Initialize Search Bar
 */
function initializeSearchBar() {
  const searchInput = document.getElementById('searchInput');
  
  if (!searchInput) {
    console.warn('Search input element #searchInput not found');
    return;
  }
  
  // Debounce search to avoid excessive filtering
  let searchTimeout;
  searchInput.addEventListener('keyup', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = this.value.toLowerCase().trim();
      filterBySearch(searchTerm);
    }, 300);
  });
}

/**
 * Initialize Filter Buttons
 */
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filters_menu button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Update active state
      document.querySelectorAll('.filters_menu button').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Apply filter and re-run search if active
      applyFilter(filterValue);
      
      // If search is active, refine results
      const searchInput = document.getElementById('searchInput');
      if (searchInput && searchInput.value.trim()) {
        filterBySearch(searchInput.value.toLowerCase().trim());
      }
    });
  });
}

/**
 * Load Menu Data (from JSON or API)
 */
function loadMenuData() {
  // Try to load from instagram-feed.json with basePath support
  const basePath = window.basePath || '';
  const feedUrl = basePath ? basePath + '/posts/instagram-feed.json' : '/posts/instagram-feed.json';
  
  fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
      allCakes = processInstagramData(data);
      populateMenuItems(allCakes);
      updateResultCount();
    })
    .catch(error => {
      console.error('Error loading menu data:', error);
      // Fall back to placeholder data
      allCakes = getPlaceholderData();
      populateMenuItems(allCakes);
      updateResultCount();
    });
}

/**
 * Process Instagram Feed Data into Menu Format
 */
function processInstagramData(feedData) {
  if (!Array.isArray(feedData)) return [];
  
  return feedData.map(post => ({
    id: post.id || Math.random().toString(36).substr(2, 9),
    caption: post.caption || '',
    description: post.description || '',
    image: post.image || post.localImagePath || (window.basePath || '') + '/assets/images/placeholder.png',
    likes: post.likes || 0,
    categories: post.categories || extractCategoriesFromCaption(post.caption || ''),
    link: post.permalink || '#'
  }));
}

/**
 * Extract Categories from Caption (hashtag style: #birthday, #cupcake, etc.)
 */
function extractCategoriesFromCaption(caption) {
  const hashtagRegex = /#(\w+)/g;
  const matches = caption.match(hashtagRegex);
  return matches ? matches.map(tag => tag.substring(1).toLowerCase()) : ['speciality'];
}

/**
 * Get Placeholder Data (fallback)
 */
function getPlaceholderData() {
  return [
    {
      id: 1,
      caption: 'Classic Birthday Cake',
      description: 'Vanilla sponge with chocolate ganache and fresh berries',
      image: (window.basePath || '') + '/assets/images/placeholder-1.jpg',
      likes: 156,
      categories: ['birthday', 'fondant'],
      link: '#'
    },
    {
      id: 2,
      caption: 'Decoration Dream Cupcakes',
      description: 'Assorted flavors with artistic buttercream designs',
      image: (window.basePath || '') + '/assets/images/placeholder-2.jpg',
      likes: 203,
      categories: ['cupcakes', 'buttercream'],
      link: '#'
    },
    {
      id: 3,
      caption: 'Elegant Tresletches',
      description: 'Three-layer chocolate tresletches with premium toppings',
      image: (window.basePath || '') + '/assets/images/placeholder-3.jpg',
      likes: 189,
      categories: ['tresletches', 'chocolate'],
      link: '#'
    },
    {
      id: 4,
      caption: 'Whipped Cream Speciality',
      description: 'Fresh whipped cream cake with seasonal fruits',
      image: (window.basePath || '') + '/assets/images/placeholder-4.jpg',
      likes: 142,
      categories: ['speciality', 'whipped-cream'],
      link: '#'
    },
    {
      id: 5,
      caption: 'Garden Fondant Beauty',
      description: 'Hand-sculpted fondant with delicate sugar flowers',
      image: (window.basePath || '') + '/assets/images/placeholder-5.jpg',
      likes: 267,
      categories: ['fondant', 'wedding'],
      link: '#'
    },
    {
      id: 6,
      caption: 'Customized Celebration Cake',
      description: 'Personalized design for your special occasion',
      image: (window.basePath || '') + '/assets/images/placeholder-6.jpg',
      likes: 198,
      categories: ['custom', 'speciality'],
      link: '#'
    }
  ];
}

/**
 * Populate Menu Grid with Items
 */
function populateMenuItems(items) {
  const grid = document.getElementById('cakesGrid');
  
  if (!grid) {
    console.warn('Grid container #cakesGrid not found');
    return;
  }
  
  // Clear existing items
  grid.innerHTML = '';
  
  // Add new items
  items.forEach(cake => {
    const categoryClass = cake.categories.map(cat => `filter-${cat.toLowerCase().replace(/\s+/g, '-')}`).join(' ');
    
    const html = `
      <div class="col-sm-6 col-md-4 m-bottom ${categoryClass}" data-id="${cake.id}" data-categories="${cake.categories.join(',')}">
        <div class="box">
          <div class="img-box">
            <img src="${cake.image}" alt="${cake.caption}" />
          </div>
          <div class="detail-box">
            <h5>${cake.caption}</h5>
            <p>${cake.description}</p>
            <div class="options">
              <a href="${cake.link}" class="option1">
                📸 View
              </a>
              <span class="option2">❤️ ${cake.likes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    grid.insertAdjacentHTML('beforeend', html);
  });
  
  // Re-initialize Isotope
  if ($grid) {
    $grid.isotope('reloadItems').isotope();
  }
}

/**
 * Filter by Category
 */
function applyFilter(filterValue) {
  if (!$grid) return;
  
  let selector = '*';
  
  if (filterValue !== '*') {
    // Convert to CSS class format
    const className = `filter-${filterValue.toLowerCase().replace(/\s+/g, '-')}`;
    selector = `.${className}`;
  }
  
  $grid.isotope({ filter: selector });
}

/**
 * Real-time Search Filter
 */
function filterBySearch(searchTerm) {
  if (!$grid) return;
  
  const visibleItems = [];
  
  allCakes.forEach(cake => {
    const matches = 
      cake.caption.toLowerCase().includes(searchTerm) ||
      cake.description.toLowerCase().includes(searchTerm) ||
      cake.categories.some(cat => cat.toLowerCase().includes(searchTerm));
    
    if (matches) {
      visibleItems.push(cake.id);
    }
  });
  
  // Filter grid based on search results
  $grid.isotope({
    filter: function() {
      const $item = jQuery(this);
      const id = parseInt($item.attr('data-id'));
      return visibleItems.includes(id);
    }
  });
  
  updateResultCount();
}

/**
 * Update Result Counter
 */
function updateResultCount() {
  const resultSpan = document.getElementById('resultCount');
  
  if (!resultSpan || !$grid) return;
  
  const visibleCount = $grid.data('isotope').filteredItems.length;
  resultSpan.textContent = visibleCount;
}

/**
 * Handle Custom Order CTA
 */
function handleCustomOrder() {
  const phoneNumber = '14438582646'; // Replace with actual WhatsApp number
  const message = encodeURIComponent('Hi Sheshams Bakers! I would like to order a custom cake.');
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Export for global access if needed
window.menuSearch = {
  filterBySearch,
  applyFilter,
  updateResultCount,
  handleCustomOrder,
  populateMenuItems
};

console.log('Menu Search initialized - Ready for filtering and searching');
