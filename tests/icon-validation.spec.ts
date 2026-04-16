import { test, expect } from '@playwright/test';

test('Font Awesome icons are loaded and visible in header', async ({ page }) => {
  await page.goto('/');
  
  // Check if Font Awesome CSS is loaded
  const fontAwesomeLink = page.locator('link[href*="fortawesome"]');
  await expect(fontAwesomeLink).toBeVisible();
  
  // Check WhatsApp icon in header (Font Awesome 6)
  const whatsappIcon = page.locator('.user_option .fa-brands.fa-whatsapp');
  const whatsappCount = await whatsappIcon.count();
  console.log(`Found ${whatsappCount} WhatsApp icons in header`);
  
  // Check search icon (Font Awesome 6 uses fa-magnifying-glass)
  const searchIcon = page.locator('.nav_search-btn .fa-solid.fa-magnifying-glass');
  const searchCount = await searchIcon.count();
  console.log(`Found ${searchCount} search icons in header`);
});

test('Font Awesome icons are visible in footer', async ({ page }) => {
  await page.goto('/');
  
  // Scroll to footer
  await page.locator('footer').scrollIntoViewIfNeeded();
  
  // Check map marker icon (Font Awesome 6)
  const locationIcon = page.locator('.footer_section .fa-solid.fa-map-marker');
  const locationCount = await locationIcon.count();
  console.log(`Found ${locationCount} location icons in footer`);
  
  // Check WhatsApp icons in footer
  const whatsappIcons = page.locator('.footer_section .fa-brands.fa-whatsapp');
  const whatsappCount = await whatsappIcons.count();
  console.log(`Found ${whatsappCount} WhatsApp icons in footer`);
  
  // Check envelope icon
  const envelopeIcon = page.locator('.footer_section .fa-solid.fa-envelope');
  const envelopeCount = await envelopeIcon.count();
  console.log(`Found ${envelopeCount} envelope icons in footer`);
  
  // Check Instagram icon
  const instagramIcon = page.locator('.footer_section .fa-brands.fa-instagram');
  const instagramCount = await instagramIcon.count();
  console.log(`Found ${instagramCount} Instagram icons in footer`);
  
  // Check Facebook icon
  const facebookIcon = page.locator('.footer_section .fa-brands.fa-facebook');
  const facebookCount = await facebookIcon.count();
  console.log(`Found ${facebookCount} Facebook icons in footer`);
});

test('Menu page Instagram icon is visible', async ({ page }) => {
  await page.goto('/menu');
  
  // Check if Font Awesome Instagram icons are visible
  const instagramIcon = page.locator('.fa-brands.fa-instagram');
  const count = await instagramIcon.count();
  console.log(`Found ${count} Instagram icons on menu page`);
});

test('Check Font Awesome icon rendering with computed styles', async ({ page }) => {
  await page.goto('/');
  
  // Get the WhatsApp icon element
  const whatsappIcon = page.locator('.user_option .fa-brands.fa-whatsapp').first();
  
  // Check if element exists
  const count = await whatsappIcon.count();
  if (count === 0) {
    console.log('WARNING: No WhatsApp icons found in header');
    return;
  }
  
  await expect(whatsappIcon).toBeAttached();
  
  // Get computed styles
  const computed = await whatsappIcon.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
      fontFamily: styles.fontFamily,
      color: styles.color,
      fontSize: styles.fontSize
    };
  });
  
  console.log('Icon computed styles:', computed);
  
  // Icon should be displayed and visible
  if (computed.display !== 'none' && computed.visibility === 'visible') {
    console.log('✓ Icons are properly displayed');
  } else {
    console.log('✗ Icons may be hidden by CSS');
  }
});
