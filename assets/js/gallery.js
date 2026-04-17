/* Gallery and Search Functionality */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize gallery
  await initGallery();
  
  // Initialize search
  initSearch();
  
  // Initialize filters
  initFilters();
  
  // Initialize modal
  initModal();
});

// Fetch and display Instagram posts
async function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  
  try {
    const basePath = window.basePath || '';
    const feedUrl = basePath ? basePath + '/posts/instagram-feed.json' : '/posts/instagram-feed.json';
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error('Failed to load posts');
    }
    
    const data = await response.json();
    // Handle both array format and object with posts property
    const posts = Array.isArray(data) ? data : (data.posts || []);
    
    if (posts.length === 0) {
      galleryGrid.innerHTML = '<p class="gallery__loading">No posts yet. Check back soon!</p>';
      return;
    }
    
    // Store posts globally for search
    window.allPosts = posts;
    
    // Render posts
    renderPosts(posts, galleryGrid);
    updateGalleryResultCount(posts.length);
    
  } catch (error) {
    console.error('Error loading posts:', error);
    galleryGrid.innerHTML = '<p class="gallery__loading">Unable to load gallery. Please try again later.</p>';
  }
}

// Update gallery result count
function updateGalleryResultCount(count) {
  const resultSpan = document.getElementById('resultCount');
  if (resultSpan) {
    resultSpan.textContent = count || 0;
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
  
  const isVideo = post.mediaType === 'VIDEO';
  const videoOverlay = isVideo ? '<div class="post-card__video-overlay"><span class="post-card__play-icon">▶</span></div>' : '';
  
  const imageHtml = `
    <div class="post-card__media-wrapper ${isVideo ? 'post-card__media-wrapper--video' : ''}">
      ${videoOverlay}
      <img src="${post.imageUrl || post.localImagePath || (window.basePath || '') + '/assets/images/placeholder.jpg'}" alt="Sheshams Bakers cake" class="post-card__image" loading="lazy">
    </div>
  `;
  
  const timestamp = new Date(post.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  card.innerHTML = `
    <div class="post-card__link post-card__link--modal" data-post-id="${post.id}">
      <div class="post-card__image-container">
        ${imageHtml}
      </div>
    </div>
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

// Initialize modal handlers
function initModal() {
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.image-modal__close');
  const overlay = document.querySelector('.image-modal__overlay');
  
  if (!modal) return;
  
  // Add click handler to all post cards
  document.addEventListener('click', (e) => {
    const cardLink = e.target.closest('.post-card__link--modal');
    if (cardLink) {
      e.preventDefault();
      const postId = cardLink.getAttribute('data-post-id');
      const post = window.allPosts.find(p => p.id === postId);
      if (post) {
        openModal(post);
      }
    }
  });
  
  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('image-modal--active')) {
      closeModal();
    }
  });
}

// Open modal with post data
function openModal(post) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalLikes = document.getElementById('modalLikes');
  const modalComments = document.getElementById('modalComments');
  const modalInstagramLink = document.getElementById('modalInstagramLink');
  
  // Set content
  modalImage.src = post.imageUrl || post.localImagePath;
  modalImage.alt = post.caption;
  modalCaption.textContent = (post.caption || 'Beautiful cake').substring(0, 100);
  modalLikes.textContent = `❤️ ${post.likes || 0}`;
  modalComments.textContent = `💬 ${post.comments || 0}`;
  modalInstagramLink.href = post.permalink;
  
  // Show modal
  modal.classList.add('image-modal--active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('image-modal--active');
  document.body.style.overflow = '';
}
