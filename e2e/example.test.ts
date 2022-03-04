import { test, expect } from '@playwright/test';
import { loadPage, assertTitle } from './custom/helpers';

test.describe.parallel('Playwright Fundamentals', () => {
  test('Simple starter Test', async ({ page }) => {
    await page.goto('https://example.com');

    const pageTitle = page.locator('h1');

    await expect(pageTitle).toContainText('Example Domain');
  });

  test('Click on Elements', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#signin_button');

    await page.click('text=Sign in');

    const errorMessage = page.locator('.alert-error');

    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  });

  test.only('Working with Input', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#signin_button');

    await page.type('#user_login', 'johndoe');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');

    const errorMessage = page.locator('.alert-error');

    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  });

  test('Assertions', async ({ page }) => {
    await page.goto('https://example.com');

    await expect(page).toHaveURL('https://example.com');
    await expect(page).toHaveTitle('Example Domain'); // this refers to HTML title tag

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');

    const nonExistingElement = page.locator('h5');
    await expect(nonExistingElement).not.toBeVisible();
  });

  test('Screenshot', async ({ page }) => {
    await page.goto('https://example.com');

    await page.screenshot({
      path: './e2e/screenshots/page_screenshot.png',
      fullPage: true,
    });
  });

  test('Single element Screenshot', async ({ page }) => {
    await page.goto('http://example.com');

    const element = page.locator('h1');

    await element.screenshot({
      path: './e2e/screenshots/element_screenshot.png',
    });
  });

  test('Custom Helpers', async ({ page }) => {
    await loadPage(page);
    await assertTitle(page);
  });
});
