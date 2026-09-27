import { test, expect } from '@playwright/test';

test.describe('lead form', () => {
  test.beforeEach(async ({ page }) => {
    // Capture window.open instead of opening WhatsApp.
    await page.addInitScript(() => {
      (window as unknown as { __opened: string[] }).__opened = [];
      window.open = ((url: string) => { (window as unknown as { __opened: string[] }).__opened.push(String(url)); return null; }) as typeof window.open;
    });
  });

  test('empty submit shows accessible errors and focuses the first invalid field', async ({ page }) => {
    await page.goto('/he/');
    await page.locator('#lead-form button[type="submit"]').click();
    await expect(page.locator('#lead-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#lead-phone')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#lead-name-err')).not.toBeEmpty();
    await expect(page.locator('#lead-phone-err')).not.toBeEmpty();
    await expect(page.locator('#lead-name')).toBeFocused();
    await expect(page.locator('#lead-name')).toHaveAttribute('aria-describedby', 'lead-name-err');
  });

  test('invalid phone is rejected, valid details open WhatsApp and lock the button', async ({ page }) => {
    await page.goto('/en/');
    await page.fill('#lead-name', 'Test Person');
    await page.fill('#lead-phone', '12345');
    await page.locator('#lead-form button[type="submit"]').click();
    await expect(page.locator('#lead-phone')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#lead-phone')).toBeFocused();

    await page.fill('#lead-phone', '050-1234567');
    await page.locator('#lead-form button[type="submit"]').click();
    await expect(page.locator('#lead-phone')).toHaveAttribute('aria-invalid', 'false');
    const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
    expect(opened).toHaveLength(1);
    expect(opened[0]).toContain('972585700051');
    expect(decodeURIComponent(opened[0])).toContain('Test Person');
    expect(decodeURIComponent(opened[0])).toContain('050-1234567');
    const status = page.locator('#lead-status');
    await expect(status).toBeVisible();
    await expect(status).toHaveAttribute('role', 'status');
    await expect(page.locator('#lead-form button[type="submit"]')).toBeDisabled();
  });

  test('labels are programmatically associated', async ({ page }) => {
    await page.goto('/ar/');
    await expect(page.getByLabel(/الاسم الكامل/)).toHaveAttribute('id', 'lead-name');
    await expect(page.getByLabel(/الهاتف/)).toHaveAttribute('id', 'lead-phone');
  });
});
