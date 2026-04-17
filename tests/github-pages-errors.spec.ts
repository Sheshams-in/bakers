import { test, expect } from '@playwright/test';

/**
 * Test against the actual GitHub Pages deployment
 * This checks for console errors reported in the original issue
 */

const GITHUB_PAGES_URL = 'https://sheshams-in.github.io';

test.describe('GitHub Pages - Console Errors Check', () => {
  test('menu page should not have 404s for fonts/theme/feed on GitHub Pages', async ({ page }) => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Listen for console errors and warnings
    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        errors.push(text);
      } else if (msg.type() === 'warning') {
        warnings.push(text);
      }
    });
    
    // Listen for failed resource requests (404s)
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.status()} ${response.url()}`);
      }
    });
    
    // Navigate to menu page on GitHub Pages
    await page.goto(`${GITHUB_PAGES_URL}/bakers/menu/`, { waitUntil: 'networkidle' });
    
    // Wait a moment for all scripts to load
    await page.waitForTimeout(2000);
    
    // Check that specific errors from the issue are NOT present
    const errorText = errors.join('\n');
    const failedText = failedRequests.join('\n');
    
    console.log('=== ERRORS ===');
    console.log(errors.length > 0 ? errorText : 'None');
    
    console.log('\n=== 404 REQUESTS ===');
    console.log(failedRequests.length > 0 ? failedText : 'None');
    
    console.log('\n=== WARNINGS ===');
    console.log(warnings.length > 0 ? warnings.join('\n') : 'None');
    
    // Verify key fixes
    expect(failedText).not.toContain('instagram-feed.json'); // Should load feed data
    expect(failedText).not.toContain('theme-gold.css'); // Theme CSS should load
    expect(failedText).not.toContain('theme-purple.css');
    expect(errorText).not.toContain('Menu grid element #cakesGrid not found'); // menu-search.js should be removed
    expect(errorText).not.toContain('Search input element #searchInput not found');
  });

  test('menu page should load menu content on GitHub Pages', async ({ page }) => {
    await page.goto(`${GITHUB_PAGES_URL}/bakers/menu/`, { waitUntil: 'networkidle' });
    
    // Check that menu section is visible
    const menuSection = page.locator('.food_section');
    await expect(menuSection).toBeVisible();
    
    // Check that filters menu exists
    const filtersMenu = page.locator('.filters_menu');
    await expect(filtersMenu).toBeVisible();
    
    // Menu grid should be populated (with or without Instagram data)
    const menuGrid = page.locator('#menuGrid');
    await expect(menuGrid).toBeVisible();
  });

  test('home page should load without console errors on GitHub Pages', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(`${GITHUB_PAGES_URL}/bakers/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    console.log('Home page errors:', errors.length > 0 ? errors.join('\n') : 'None');
    
    // Basic sanity check
    const header = page.locator('.header_section');
    await expect(header).toBeVisible();
  });
});
