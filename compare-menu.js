const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('📸 Capturing menu page screenshot...\n');
  
  try {
    // Navigate to menu page
    await page.goto('http://localhost:8080/menu/', { waitUntil: 'networkidle' });
    
    // Take full page screenshot
    await page.screenshot({ path: `/tmp/menu-page.png`, fullPage: true });
    console.log('✅ Full page screenshot saved to /tmp/menu-page.png\n');
    
    // Check for specific elements
    console.log('🔍 Analyzing Menu Page Structure:\n');
    
    // Check hero section
    const heroExists = await page.$('.sub_page_hero');
    console.log(`${heroExists ? '✅' : '❌'} Hero Section: ${heroExists ? 'PRESENT' : 'MISSING'}`);
    
    // Check featured section
    const featuredSection = await page.$('.featured_menu_section');
    console.log(`${featuredSection ? '✅' : '❌'} Featured Menu Section: ${featuredSection ? 'PRESENT' : 'MISSING'}`);
    
    if (featuredSection) {
      const menuCards = await page.$$('.menu_item_card');
      console.log(`   └─ Found ${menuCards.length} featured menu items`);
    }
    
    // Check food section with filters
    const foodSection = await page.$('.food_section .filters_menu');
    console.log(`${foodSection ? '✅' : '❌'} Filter Menu: ${foodSection ? 'PRESENT' : 'MISSING'}`);
    
    if (foodSection) {
      const filters = await page.$$('.filters_menu li');
      console.log(`   └─ Found ${filters.length} filter buttons`);
    }
    
    // Check grid layout
    const gridItems = await page.$$('.grid .col-sm-6');
    console.log(`${gridItems.length > 0 ? '✅' : '❌'} Instagram Feed Grid: ${gridItems.length} items loaded`);
    
    // Get viewport dimensions
    const dimensions = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight
    }));
    console.log(`\n📱 Viewport: ${dimensions.width}x${dimensions.height}`);
    
    // Take mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: `/tmp/menu-mobile.png`, fullPage: true });
    console.log('✅ Mobile view screenshot saved to /tmp/menu-mobile.png');
    
    // Take tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: `/tmp/menu-tablet.png`, fullPage: true });
    console.log('✅ Tablet view screenshot saved to /tmp/menu-tablet.png');
    
  } catch (e) {
    console.log(`❌ Error: ${e.message}`);
  }
  
  await browser.close();
})();
