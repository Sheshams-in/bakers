import { test, expect } from '@playwright/test';

test('Menu filter should hide non-matching items', async ({ page }) => {
  await page.goto('/menu/');
  
  // Wait for menu grid to load
  await page.waitForSelector('#menuGrid', { timeout: 5000 });
  
  // Get initial item count
  const allItems = await page.locator('#menuGrid [class*="col-"]').count();
  console.log(`Total items on page: ${allItems}`);
  
  // Get items with tresletches class
  const tresletches = await page.locator('#menuGrid .tresletches').count();
  console.log(`Items with tresletches class: ${tresletches}`);
  
  // Click tresletches filter button
  const filterButton = page.locator('.filters_menu li[data-filter=".tresletches"]');
  console.log(`Filter button exists: ${await filterButton.count() > 0}`);
  
  if (await filterButton.count() > 0) {
    await filterButton.click();
    await page.waitForTimeout(1000); // Wait for animation
    
    // Check visibility after filter
    const visibleItems = await page.locator('#menuGrid [class*="col-"]:visible').count();
    const hiddenItems = await page.locator('#menuGrid [class*="col-"][style*="display: none"]').count();
    
    console.log(`\nAfter filtering by tresletches:`);
    console.log(`Visible items (no display:none): ${visibleItems}`);
    console.log(`Hidden items (display:none): ${hiddenItems}`);
    
    // Log each item's display style
    const items = await page.locator('#menuGrid [class*="col-"]').all();
    for (let i = 0; i < Math.min(5, items.length); i++) {
      const style = await items[i].getAttribute('style');
      const classes = await items[i].getAttribute('class');
      console.log(`Item ${i}: classes="${classes}" style="${style}"`);
    }
    
    // Check if grid height changed
    const gridHeight = await page.locator('#menuGrid').evaluate(el => el.style.height);
    console.log(`\nGrid height: ${gridHeight}`);
  } else {
    console.log('Filter button not found');
  }
});
