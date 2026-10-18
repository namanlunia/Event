import { test, expect } from '@playwright/test';

test.describe('Omnikon Banner Component & Section Integration', () => {
  test('Banner is rendered immediately before the Frequently Asked Questions section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const banner = page.locator('[data-testid="omnikon-banner"]');
    await expect(banner).toBeVisible();

    // Verify DOM placement: the parent section of the banner is immediately followed by FAQ section
    const bannerSection = banner.locator('xpath=ancestor::section[1]');
    await expect(bannerSection).toBeVisible();

    const nextSection = bannerSection.locator('xpath=following-sibling::section[1]');
    await expect(nextSection).toBeVisible();
    await expect(nextSection).toContainText('Frequently Asked Questions');
  });

  test('Banner displays accessible wordmark and HUD corner elements', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const banner = page.locator('[data-testid="omnikon-banner"]');
    await banner.scrollIntoViewIfNeeded();

    // Accessible wordmark container
    const wordmark = banner.locator('[aria-label="OMNIKON"]');
    await expect(wordmark).toBeVisible();

    // Contains all 7 letters O-M-N-I-K-O-N
    const letters = ['O', 'M', 'N', 'I', 'K', 'O', 'N'];
    const letterSpans = wordmark.locator('span[aria-hidden="true"]');
    await expect(letterSpans).toHaveCount(letters.length);

    for (let i = 0; i < letters.length; i++) {
      await expect(letterSpans.nth(i)).toHaveText(letters[i]);
    }

    // 4 HUD corner brackets
    await expect(banner.locator('[data-testid="hud-corner-tl"]')).toBeVisible();
    await expect(banner.locator('[data-testid="hud-corner-tr"]')).toBeVisible();
    await expect(banner.locator('[data-testid="hud-corner-bl"]')).toBeVisible();
    await expect(banner.locator('[data-testid="hud-corner-br"]')).toBeVisible();

    // Glow line element
    await expect(banner.locator('[data-testid="banner-glow-line"]')).toBeVisible();
  });

  test('No horizontal overflow across all key viewport widths', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1440, height: 900 },
      { width: 1100, height: 800 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/', { waitUntil: 'networkidle' });

      const banner = page.locator('[data-testid="omnikon-banner"]');
      await banner.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);

      // Verify no horizontal overflow on window/body
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll, `Horizontal scroll detected at ${vp.width}px`).toBe(false);

      // Verify banner bounding box is within viewport
      const box = await banner.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(vp.width);
      }
    }
  });

  test('Reduced motion mode hides particle canvas and renders clean static banner', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'networkidle' });

    const banner = page.locator('[data-testid="omnikon-banner"]');
    await banner.scrollIntoViewIfNeeded();
    await expect(banner).toBeVisible();

    // In reduced motion, canvas should either not be attached or have hidden/display:none
    const canvas = banner.locator('canvas');
    if (await canvas.count() > 0) {
      const isVisible = await canvas.isVisible();
      expect(isVisible).toBe(false);
    }

    // Wordmark remains visible
    const wordmark = banner.locator('[aria-label="OMNIKON"]');
    await expect(wordmark).toBeVisible();

    await context.close();
  });

  test('No console errors or hydration warnings', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    const banner = page.locator('[data-testid="omnikon-banner"]');
    await banner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const relevantErrors = consoleErrors.filter(
      (err) =>
        !err.includes('favicon') &&
        !err.includes('Third-party cookie') &&
        !err.includes('WebSocket')
    );
    expect(relevantErrors).toHaveLength(0);
  });
});
