const { chromium } = require('@playwright/test');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('🔍 Navigating to http://localhost:8084...');
    await page.goto('http://localhost:8084', { waitUntil: 'networkidle' });
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/screenshot-homepage.png', fullPage: true });
    console.log('✅ Screenshot saved: /tmp/screenshot-homepage.png');
    
    // Check CSS files loaded
    console.log('\n📊 Checking CSS files...');
    const links = await page.locator('link[rel="stylesheet"]').evaluateAll(els => 
      els.map(el => ({
        href: el.href,
        loaded: !!el.sheet
      }))
    );
    links.forEach(link => {
      const status = link.loaded ? '✅' : '❌';
      const url = link.href.split('/').pop();
      console.log(`  ${status} ${url}`);
    });
    
    // Check key elements
    console.log('\n🎨 Checking key elements...');
    const header = await page.$('.header_section');
    const heroSection = await page.$('.hero_area');
    const foodSection = await page.$('.food_section');
    const gallery = await page.$('.gallery');
    const footer = await page.$('.footer_section');
    
    console.log(`  ${header ? '✅' : '❌'} Header section (.header_section)`);
    console.log(`  ${heroSection ? '✅' : '❌'} Hero section (.hero_area)`);
    console.log(`  ${foodSection ? '✅' : '❌'} Food/Menu section (.food_section)`);
    console.log(`  ${gallery ? '✅' : '❌'} Gallery section (.gallery)`);
    console.log(`  ${footer ? '✅' : '❌'} Footer section (.footer_section)`);
    
    // Check computed styles
    console.log('\n🎭 Checking computed styles...');
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const style = window.getComputedStyle(body);
      return {
        backgroundColor: style.backgroundColor,
        fontFamily: style.fontFamily,
        color: style.color
      };
    });
    console.log('  Body background:', bodyStyles.backgroundColor);
    console.log('  Font family:', bodyStyles.fontFamily);
    console.log('  Text color:', bodyStyles.color);
    
    // Check navbar
    console.log('\n🔗 Checking navbar...');
    const brandText = await page.textContent('.navbar-brand');
    const navLinks = await page.locator('.navbar-nav a').count();
    console.log(`  Brand text: "${brandText}"`);
    console.log(`  Nav links: ${navLinks}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
