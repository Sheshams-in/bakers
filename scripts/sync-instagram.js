#!/usr/bin/env node

/**
 * Instagram Post Sync Script
 * Fetches posts from Instagram Business Account and saves to JSON
 * Run: INSTAGRAM_ACCESS_TOKEN=your_token INSTAGRAM_ACCOUNT_ID=your_id node scripts/sync-instagram.js
 */

require('dotenv').config();

const https = require('https');
const fs = require('fs');
const path = require('path');

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;
const OUTPUT_FILE = path.join(__dirname, '../posts/instagram-feed.json');
const IMAGES_DIR = path.join(__dirname, '../assets/images/instagram');

if (!ACCESS_TOKEN || !ACCOUNT_ID) {
  console.error('❌ Error: INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_ACCOUNT_ID are required');
  console.error('Set them in .env file or as environment variables');
  process.exit(1);
}

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

/**
 * Make HTTPS request to Facebook Graph API
 */
function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `https://graph.instagram.com${endpoint}`;
    
    console.log(`🔗 Fetching: ${endpoint}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`API Error (${res.statusCode}): ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Download image from URL and save locally
 */
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(IMAGES_DIR, filename);
    
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filename);
        });
        fileStream.on('error', reject);
      } else {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

/**
 * Auto-detect categories from caption
 */
function detectCategory(caption) {
  if (!caption) return [];
  
  const lowerCaption = caption.toLowerCase();
  const categories = [];
  
  // Expanded category keywords
  const categoryMap = {
    // Occasion
    'Birthday': ['birthday', 'happy birthday', 'bday', 'cake for', 'birth day'],
    'Wedding': ['wedding', 'bridal', 'bride', 'groom', 'engagement'],
    'Anniversary': ['anniversary', 'celebrate'],
    'Kids': ['kids', 'children', 'toddler', 'baby', 'little one'],
    
    // Cake Type
    'Cupcakes': ['cupcake', 'cupcakes', 'cup cake'],
    'Tresletches': ['tres', 'tres leches', 'tresleches'],
    'Cheesecake': ['cheesecake', 'cheese cake'],
    'Brownie': ['brownie', 'brownie cake'],
    'Mini Cakes': ['mini cake', 'mini cakes', 'small cake'],
    
    // Decoration Style
    'Fondant': ['fondant', 'painted cake', 'painted'],
    'Matte': ['matte', 'matte finish'],
    'Gloss': ['gloss', 'shiny'],
    'Ombre': ['ombre'],
    'Naked Cake': ['naked', 'unfrosted'],
    
    // Decoration Type
    'Speciality': ['special', 'custom', 'theme', 'robot', 'character', 'superhero', 'princess', 'mickey'],
    'Floral': ['floral', 'flower', 'roses', 'petals', 'blooms'],
    'Glitter': ['glitter', 'sparkle', 'shine'],
    
    // Frosting Type
    'Whipped Cream': ['whipped', 'whipped cream', 'whippedcream'],
    'Butter cream': ['buttercream', 'butter cream', 'frosting', 'frosted', 'icing'],
    'Cream Cheese': ['cream cheese', 'cream cheese frosting', 'cream cheese icing'],
    
    // Flavor
    'Chocolate': ['chocolate', 'cocoa', 'dark chocolate'],
    'Strawberry': ['strawberry', 'strawberries'],
    'Vanilla': ['vanilla'],
    'Red Velvet': ['red velvet'],
    'Eggless': ['eggless', 'egg-less', 'egg less', 'vegan'],
    'Vegan': ['vegan', 'plant-based'],
    'Gluten-free': ['gluten-free', 'gluten free', 'gf cake'],
    
    // Other
    'Premium': ['premium', 'luxe', 'exclusive'],
    'Seasonal': ['seasonal', 'summer', 'winter', 'christmas', 'easter', 'holiday']
  };
  
  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some(kw => lowerCaption.includes(kw))) {
      categories.push(category);
    }
  }
  
  return categories.length > 0 ? categories : [];
}

/**
 * Fetch Instagram posts with pagination support
 */
async function syncInstagramPosts() {
  try {
    console.log('📸 Starting Instagram sync...\n');
    
    const posts = [];
    let allFetched = false;
    let after = null;
    let pageCount = 0;
    
    // Fetch all pages of posts
    while (!allFetched) {
      pageCount++;
      const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count';
      let endpoint = `/${ACCOUNT_ID}/media?fields=${fields}&access_token=${ACCESS_TOKEN}&limit=100`;
      
      if (after) {
        endpoint += `&after=${after}`;
      }
      
      console.log(`📄 Fetching page ${pageCount}...`);
      const response = await makeRequest(endpoint);
      
      if (!response.data || response.data.length === 0) {
        if (pageCount === 1) {
          console.log('ℹ️  No posts found');
        }
        allFetched = true;
        break;
      }
      
      console.log(`  ✅ Found ${response.data.length} posts on page ${pageCount}`);
      
      // Process posts
      for (const post of response.data) {
        try {
          let imageUrl = null;
          let localImagePath = null;
          const isVideo = post.media_type === 'VIDEO' || post.media_type === 'CAROUSEL_ALBUM';
          
          // For videos/carousels, use thumbnail_url; for images use media_url
          const sourceUrl = isVideo && post.thumbnail_url ? post.thumbnail_url : post.media_url;
          
          if (sourceUrl) {
            const filename = `post-${post.id}.jpg`;
            
            try {
              console.log(`  ⬇️  ${post.media_type}: ${filename}`);
              await downloadImage(sourceUrl, filename);
              localImagePath = `/assets/images/instagram/${filename}`;
              imageUrl = sourceUrl;
            } catch (err) {
              console.warn(`    ⚠️  Failed to download: ${err.message}`);
              // Fallback to Instagram URL if local download fails
              imageUrl = sourceUrl;
            }
          }
          
          // Auto-detect categories from caption
          const detectedCategories = detectCategory(post.caption);
          
          // Create post object
          const postData = {
            id: post.id,
            caption: post.caption || '',
            mediaType: post.media_type || 'IMAGE',
            timestamp: post.timestamp,
            permalink: post.permalink,
            imageUrl: imageUrl,
            localImagePath: localImagePath,
            likes: post.like_count || 0,
            comments: post.comments_count || 0,
            categories: detectedCategories // Auto-filled; can be overridden by n8n in Phase 3
          };
          
          posts.push(postData);
          
        } catch (err) {
          console.error(`  ❌ Error processing post ${post.id}: ${err.message}`);
        }
      }
      
      // Check for pagination
      if (response.paging && response.paging.cursors && response.paging.cursors.after) {
        after = response.paging.cursors.after;
      } else {
        allFetched = true;
      }
    }
    
    // Sort by timestamp (newest first)
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Save to JSON
    try {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
      console.log(`\n✅ Fetched ${posts.length} posts across ${pageCount} pages`);
      console.log(`📁 Saved to ${OUTPUT_FILE}`);
    } catch (err) {
      console.error(`❌ Failed to save JSON: ${err.message}`);
      throw err;
    }
    
    return posts;
    
  } catch (error) {
    console.error(`\n❌ Sync failed: ${error.message}`);
    process.exit(1);
  }
}

// Run sync
syncInstagramPosts().then((posts) => {
  console.log(`\n🎉 Phase 2 sync complete! ${posts.length} posts ready for gallery.`);
  process.exit(0);
}).catch((err) => {
  console.error(`\n💥 Fatal error: ${err.message}`);
  process.exit(1);
});
