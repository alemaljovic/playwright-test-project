const { test, expect } = require('@playwright/test');

test.describe('Smoke Tests', () => {

  test('Product Search', async ({ page }) => {
    await page.goto('https://www.buzzsneakers.ba');

    await page.locator('input[placeholder="Search"]').fill('Nike');
    await page.locator('button:has-text("Search")').click();

    const searchResults = await page.locator('.search-results');
    await expect(searchResults).toBeVisible();

    const productName = await searchResults.locator('.product-name').first().textContent();
    expect(productName).toContain('Nike');
  });
});
