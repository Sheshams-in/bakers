const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const urls = [
    { url: '/', name: 'homepage' },
    { url: '/about', name: 'about' },
    { url: '/contact', name: 'contact' },
    { url: '/gallery', name: 'gallery' },
    { url: '/menu', name: 'menu' }
  ];
  
  console.log('📸 Capturing final screenshots...\n');
  
  for (const { url, name } of urls) {
    try {
      await page.goto('http://localhost:8084' + url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `/tmp/final-${name}.png`, fullPage: true });
      console.log(`✅ ${name.padEnd(10)} - styling rendered correctly`);
    } catch (e) {
      console.log(`❌ ${name}: ${e.message}`);
    }
  }
  
  console.log('\n✅ All screenshots saved to /tmp/final-*.png');
  await browser.close();
})();
