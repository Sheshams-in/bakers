const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Check Gallery page
    console.log('📸 GALLERY PAGE CHECK:');
    await page.goto('http://localhost:8084/gallery', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/screenshot-gallery.png', fullPage: true });
    
    const galleryContainer = await page.$('.gallery');
    const galleryGrid = await page.$('#galleryGrid');
    const galleryFilters = await page.$('.gallery__filters');
    const galleryCards = await page.locator('.gallery__item').count();
    
    console.log(`  .gallery container: ${galleryContainer ? '✅' : '❌'}`);
    console.log(`  .gallery__filters: ${galleryFilters ? '✅' : '❌'}`);
    console.log(`  #galleryGrid: ${galleryGrid ? '✅' : '❌'}`);
    console.log(`  Gallery items visible: ${galleryCards} cards`);
    
    // Check Menu page
    console.log('\n🍕 MENU PAGE CHECK:');
    await page.goto('http://localhost:8084/menu', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/screenshot-menu.png', fullPage: true });
    
    const foodSection = await page.$('.food_section');
    const menuItems = await page.locator('.box').count();
    const filterButtons = await page.locator('.filters_menu li').count();
    
    console.log(`  .food_section: ${foodSection ? '✅' : '❌'}`);
    console.log(`  Menu filter buttons: ${filterButtons}`);
    console.log(`  Menu items: ${menuItems}`);
    
    // Check About page
    console.log('\n👥 ABOUT PAGE CHECK:');
    await page.goto('http://localhost:8084/about', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/screenshot-about.png', fullPage: true });
    const aboutSection = await page.$('.about_section');
    console.log(`  About section present: ${aboutSection ? '✅' : '❌'}`);
    
    // Check Contact page
    console.log('\n📧 CONTACT PAGE CHECK:');
    await page.goto('http://localhost:8084/contact', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/screenshot-contact.png', fullPage: true });
    const contactSection = await page.$('.contact_section');
    console.log(`  Contact section present: ${contactSection ? '✅' : '❌'}`);
    
    console.log('\n✅ Screenshots saved to /tmp/screenshot-*.png');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
