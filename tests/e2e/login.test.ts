import { test, expect } from '@playwright/test';

test.describe.parallel('Login / Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
  });

  test('Negative Login Scenario', async ({ page }) => {
    await page.click('#signin_button');

    await page.type('#user_login', 'johndoe');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');

    const errorMessage = page.locator('.alert-error');

    await expect(errorMessage).toContainText(
      'Login and/or password are wrong.',
    );
  });

  test.skip('Positive Login + Logout Scenario', async ({ page }) => {
    await page.click('#signin_button');

    await page.type('#user_login', 'username');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');

    const accountSummaryTab = page.locator('#account_summary_tab');

    await expect(accountSummaryTab).toBeVisible();

    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/logout.html');
  });
});
