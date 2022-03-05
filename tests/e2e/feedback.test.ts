import { test, expect } from '@playwright/test';

test.describe('Feedback Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('#feedback');
  });

  test('Reset Feedback Form', async ({ page }) => {
    await page.type('#name', 'some name');
    await page.type('#email', 'email@gmail.com');
    await page.type('#subject', 'some subject');
    await page.type('#comment', 'some nice comment about the application');

    await page.click("input[name='clear']");

    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const subjectInput = page.locator('#subject');
    const commentInput = page.locator('#comment');

    await expect(nameInput).toBeEmpty();
    await expect(emailInput).toBeEmpty();
    await expect(subjectInput).toBeEmpty();
    await expect(commentInput).toBeEmpty();
  });

  test('Submit Feedback Form', async ({ page }) => {
    await page.type('#name', 'some name');
    await page.type('#email', 'email@gmail.com');
    await page.type('#subject', 'some subject');
    await page.type('#comment', 'some nice comment about the application');

    await page.click("input[name='clear']");
    await page.waitForSelector('#feedback-title');
  });
});
