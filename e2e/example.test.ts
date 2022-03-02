import { test, expect } from '@playwright/test';

test('Simple starter Test', async ({ page }) => {
  await page.goto('https://example.com');

  const pageTitle = page.locator('h1');

  await expect(pageTitle).toContainText('Example Domain');
});

test('Click on Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/');

  await page.click('#signin_button');

  await page.click('text=Sign in');

  const errorMessage = await page.locator('.alert-error');

  await expect(errorMessage).toContainText('Login and/or password are wrong.');
});
