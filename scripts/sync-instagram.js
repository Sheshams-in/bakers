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
 * Fetch Instagram posts
 */
async function syncInstagramPosts() {
  try {
    console.log('📸 Starting Instagram sync...\n');
    
    // Fetch media (posts)
    const fields = 'id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count';
    const endpoint = `/${ACCOUNT_ID}/media?fields=${fields}&access_token=${ACCESS_TOKEN}`;
    
    const response = await makeRequest(endpoint);
    
    if (!response.data || response.data.length === 0) {
      console.log('ℹ️  No posts found');
      return [];
    }
    
    console.log(`✅ Found ${response.data.length} posts\n`);
    
    // Process posts
    const posts = [];
    
    for (const post of response.data) {
      try {
        let imageUrl = null;
        let localImagePath = null;
        
        // Download media if available
        if (post.media_url) {
          const timestamp = post.timestamp || new Date().toISOString();
          const filename = `post-${post.id}.jpg`;
          
          try {
            console.log(`⬇️  Downloading image: ${filename}`);
            await downloadImage(post.media_url, filename);
            localImagePath = `/assets/images/instagram/${filename}`;
            imageUrl = post.media_url;
          } catch (err) {
            console.warn(`⚠️  Failed to download image for post ${post.id}: ${err.message}`);
          }
        }
        
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
          categories: [] // Will be filled by n8n in Phase 3
        };
        
        posts.push(postData);
        console.log(`✔️  Processed: ${postData.caption?.substring(0, 50) || 'No caption'}...`);
        
      } catch (err) {
        console.error(`❌ Error processing post ${post.id}: ${err.message}`);
      }
    }
    
    // Sort by timestamp (newest first)
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Save to JSON
    try {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
      console.log(`\n✅ Saved ${posts.length} posts to ${OUTPUT_FILE}`);
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
