import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Sheshams Bakers/);
  
  // Check header is visible
  const header = page.locator('.header_section');
  await expect(header).toBeVisible();
  
  // Check navbar brand
  const brand = page.locator('.navbar-brand');
  await expect(brand).toContainText('Sheshams Bakers');
});

test('navigation menu is accessible', async ({ page }) => {
  await page.goto('/');
  
  // Check all main nav links exist
  const navLinks = page.locator('.navbar-nav a');
  await expect(navLinks).toHaveCount(5);
});

test('gallery page loads', async ({ page }) => {
  await page.goto('/gallery');
  
  // Check gallery section exists
  const gallery = page.locator('.gallery');
  await expect(gallery).toBeVisible();
});

test('menu page loads', async ({ page }) => {
  await page.goto('/menu');
  
  // Check menu section exists
  const menuSection = page.locator('.food_section');
  await expect(menuSection).toBeVisible();
});

test('contact page has form', async ({ page }) => {
  await page.goto('/contact');
  
  // Check if contact form section exists
  const contactSection = page.locator('.contact_section');
  await expect(contactSection).toBeVisible();
});
