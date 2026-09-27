import { test, expect } from '@playwright/test';

test.describe('keyboard operation', () => {
  test('skip link is the first tab stop and moves focus to main', async ({ page }) => {
    await page.goto('/he/');
    await page.keyboard.press('Tab');
    const skip = page.locator('a.skip');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('every interactive element can be reached with Tab and shows a focus ring', async ({ page }) => {
    await page.goto('/en/');
    const seen = new Set<string>();
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        return { tag: el.tagName, text: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40), outline: cs.outlineStyle, width: cs.outlineWidth };
      });
      if (!info) break;
      seen.add(`${info.tag}:${info.text}`);
      expect(info.outline, `focus outline on ${info.tag} ${info.text}`).not.toBe('none');
    }
    expect(seen.size).toBeGreaterThan(20);
  });

  test('mobile menu: aria-expanded, focus moves in, Escape closes and returns focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/he/');
    const burger = page.locator('button.burger');
    const menu = page.locator('#mobile-menu');
    await expect(burger).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(burger).toHaveAttribute('aria-controls', 'mobile-menu');
    await burger.focus();
    await page.keyboard.press('Enter');
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();
    await expect(menu.locator('a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();
    await expect(burger).toBeFocused();
  });

  test('FAQ accordion: buttons, aria-expanded/controls, arrow keys', async ({ page }) => {
    await page.goto('/en/');
    const buttons = page.locator('.faq__btn');
    await expect(buttons).toHaveCount(5);
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#faq-panel-0')).toBeVisible();
    await buttons.nth(1).focus();
    await page.keyboard.press('Enter');
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#faq-panel-1')).toBeVisible();
    await expect(page.locator('#faq-panel-0')).toBeHidden();
    await page.keyboard.press('ArrowDown');
    await expect(buttons.nth(2)).toBeFocused();
    await page.keyboard.press('End');
    await expect(buttons.nth(4)).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(buttons.nth(0)).toBeFocused();
  });

  test('screenshot strip is focusable and the arrow buttons scroll it', async ({ page }) => {
    await page.goto('/en/');
    const strip = page.locator('#wa-strip');
    await expect(strip).toHaveAttribute('role', 'region');
    await expect(strip).toHaveAttribute('tabindex', '0');
    await strip.scrollIntoViewIfNeeded();
    const before = await strip.evaluate((el) => el.scrollLeft);
    await page.locator('[data-strip-next]').click();
    await page.waitForTimeout(700);
    const after = await strip.evaluate((el) => el.scrollLeft);
    expect(after).not.toBe(before);
  });
});
