import { test, expect } from '@playwright/test';

test.describe('Transfer Funds and Make Payments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#signin_button');

    await page.type('#user_login', 'johndoe');
    await page.type('#user_password', 'password');
    await page.click('text=Sign in');
  });

  test('Transfer Funds', async ({ page }) => {
    await page.click('#transfer_funds_tab');

    await page.selectOption('#tf_fromAccountId', '2');
    await page.selectOption('#tf_toAccountId', '2');

    await page.type('#tf_amount', '500');
    await page.type('#td_description', 'Test Message');

    await page.click('#btn_submit');

    const boardHeader = page.locator('h2.board-header');
    await expect(boardHeader).toContainText('Verify');

    const message = page.locator('.alert-success');
    await expect(message).toContainText(
      'You successfully submitted your transaction',
    );
  });
});
