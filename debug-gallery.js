const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture console messages
  const messages = [];
  page.on('console', msg => {
    messages.push({ type: msg.type(), text: msg.text() });
  });
  
  page.on('response', response => {
    if (response.url().includes('instagram-feed.json')) {
      console.log('📍 instagram-feed.json response:', response.status());
    }
  });
  
  try {
    await page.goto('http://localhost:8084/gallery', { waitUntil: 'load' });
    await page.waitForTimeout(2000); // Wait for JS to run
    
    console.log('Console messages:');
    messages.forEach(msg => {
      if (msg.type === 'error') {
        console.log('  ❌ ERROR:', msg.text);
      } else if (msg.type === 'log') {
        console.log('  ℹ️', msg.text);
      }
    });
    
    const galleryState = await page.evaluate(() => {
      return {
        galleryGrid: !!document.getElementById('galleryGrid'),
        gridContent: document.getElementById('galleryGrid')?.innerHTML.substring(0, 100) || 'not found',
        allPosts: window.allPosts ? window.allPosts.length : 0,
      };
    });
    
    console.log('\nGallery state:');
    console.log('  Grid found:', galleryState.galleryGrid);
    console.log('  Grid content:', galleryState.gridContent);
    console.log('  window.allPosts:', galleryState.allPosts);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
