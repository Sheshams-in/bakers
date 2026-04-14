/* Gallery and Search Functionality */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize gallery
  await initGallery();
  
  // Initialize search
  initSearch();
  
  // Initialize filters
  initFilters();
});

// Fetch and display Instagram posts
async function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  
  try {
    const response = await fetch('/posts/instagram-feed.json');
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    if (posts.length === 0) {
      galleryGrid.innerHTML = '<p class="gallery__loading">No posts yet. Check back soon!</p>';
      return;
    }
    
    // Store posts globally for search
    window.allPosts = posts;
    
    // Render posts
    renderPosts(posts, galleryGrid);
    updateResultCount(posts.length);
    
  } catch (error) {
    console.error('Error loading posts:', error);
    galleryGrid.innerHTML = '<p class="gallery__loading">Unable to load gallery. Please try again later.</p>';
  }
}

// Render posts to gallery grid
function renderPosts(posts, container) {
  container.innerHTML = '';
  
  posts.forEach(post => {
    const card = createPostCard(post);
    container.appendChild(card);
  });
}

// Create a post card element
function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.setAttribute('data-categories', (post.categories || []).join(',').toLowerCase());
  
  const categories = post.categories || [];
  const categoriesBadges = categories
    .map(cat => `<span class="post-card__category-badge">${cat}</span>`)
    .join('');
  
  const imageHtml = post.mediaType === 'VIDEO' && post.videoEmbed
    ? `<div class="post-card__video-overlay"><span class="post-card__play-icon">▶</span></div>${post.videoEmbed}`
    : `<img src="${post.imageUrl || '/assets/images/placeholder.jpg'}" alt="Sheshams Bakers cake" class="post-card__image" loading="lazy">`;
  
  const timestamp = new Date(post.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  card.innerHTML = `
    <a href="${post.instagramUrl || '#'}" target="_blank" class="post-card__link">
      <div class="post-card__image-container">
        ${imageHtml}
      </div>
    </a>
    <div class="post-card__content">
      ${categories.length > 0 ? `<div class="post-card__categories">${categoriesBadges}</div>` : ''}
      <p class="post-card__caption">${(post.caption || 'Beautiful cake').substring(0, 80)}...</p>
      <div class="post-card__meta">
        <span class="post-card__likes">❤️ ${post.likes || 0}</span>
        <span class="post-card__comments">💬 ${post.comments || 0}</span>
      </div>
      <time class="post-card__date">${timestamp}</time>
    </div>
  `;
  
  return card;
}

// Update result count
function updateResultCount(count) {
  const resultCountEl = document.getElementById('resultCount');
  if (resultCountEl) {
    resultCountEl.textContent = count;
  }
}

// Initialize filters
function initFilters() {
  const filterButtons = document.querySelectorAll('.gallery__filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('gallery__filter-btn--active'));
      button.classList.add('gallery__filter-btn--active');
      
      // Filter and display
      const filter = button.getAttribute('data-filter');
      filterGallery(filter);
    });
  });
}

// Filter gallery by category
function filterGallery(filter) {
  if (!window.allPosts) return;
  
  let filtered = window.allPosts;
  
  if (filter !== 'all') {
    filtered = window.allPosts.filter(post => {
      const categories = (post.categories || [])
        .map(c => c.toLowerCase().replace(/\s+/g, '-'))
        .join(',');
      return categories.includes(filter);
    });
  }
  
  const galleryGrid = document.getElementById('galleryGrid');
  renderPosts(filtered, galleryGrid);
  updateResultCount(filtered.length);
  
  // Reset search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }
}

// Initialize search
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (!query.trim()) {
      // Reset to all posts
      const galleryGrid = document.getElementById('galleryGrid');
      renderPosts(window.allPosts, galleryGrid);
      updateResultCount(window.allPosts.length);
      return;
    }
    
    // Simple search through captions and categories
    const filtered = window.allPosts.filter(post => {
      const caption = (post.caption || '').toLowerCase();
      const categories = (post.categories || [])
        .join(' ')
        .toLowerCase();
      
      return caption.includes(query) || categories.includes(query);
    });
    
    const galleryGrid = document.getElementById('galleryGrid');
    renderPosts(filtered, galleryGrid);
    updateResultCount(filtered.length);
  });
}

// Format date helper
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
