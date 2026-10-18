import { test, expect } from '@playwright/test';

test.describe('Omnikon Brand Logo & Favicon Integration', () => {
  test('Navbar and footer display Omnikon logo image with naturalWidth > 0', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // 1. Navbar brand logo image
    const navLogo = page.locator('header img[alt="Omnikon logo"]').first();
    await expect(navLogo).toBeVisible();

    const navLoaded = await navLogo.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    );
    expect(navLoaded).toBe(true);

    // 2. Footer brand logo image
    const footerLogo = page.locator('footer img[alt="Omnikon logo"]').first();
    await expect(footerLogo).toBeVisible();
    await footerLogo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const footerLoaded = await footerLogo.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    );
    expect(footerLoaded).toBe(true);

    // 3. No Flame brand icon remains in navbar or footer
    // In Navbar brand link:
    const navBrandLink = page.locator('header a[href="/"]').first();
    await expect(navBrandLink.locator('svg.lucide-flame')).toHaveCount(0);

    // In Footer brand link:
    const footerBrandLink = page.locator('footer a[href="/"]').first();
    await expect(footerBrandLink.locator('svg.lucide-flame')).toHaveCount(0);
  });

  test('Non-brand flame icons (streaks, buttons) remain preserved', async ({ page }) => {
    // 1. Check Hero CTA has its flame button icon
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const heroFlame = page.locator('section a[href*="projects"] svg, section a[href*="register"] svg, section div svg.lucide-flame');
    expect(await heroFlame.count()).toBeGreaterThan(0);

    // 2. Check Contributor Dashboard has streak flame
    await page.goto('/dashboard/contributor', { waitUntil: 'domcontentloaded' });
    const streakFlame = page.locator('svg.lucide-flame');
    expect(await streakFlame.count()).toBeGreaterThan(0);
  });

  test('Favicon and app icon endpoints respond with HTTP 200 and valid image content types', async ({ request }) => {
    // 1. Favicon.ico
    const favRes = await request.get('/favicon.ico');
    expect(favRes.status()).toBe(200);
    const favType = favRes.headers()['content-type'];
    expect(favType).toMatch(/image\/(x-icon|vnd\.microsoft\.icon|ico|png)/);

    // 2. icon.png
    const iconRes = await request.get('/icon.png');
    expect(iconRes.status()).toBe(200);
    expect(iconRes.headers()['content-type']).toContain('image/png');

    // 3. apple-icon.png
    const appleRes = await request.get('/apple-icon.png');
    expect(appleRes.status()).toBe(200);
    expect(appleRes.headers()['content-type']).toContain('image/png');
  });

  test('Head element contains rel="icon" link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const iconLink = page.locator('head link[rel*="icon"]');
    await expect(iconLink.first()).toHaveCount(1);

    const relTypes = await iconLink.evaluateAll((links: HTMLLinkElement[]) =>
      links.map((l) => l.rel)
    );
    expect(relTypes.some((r) => r.includes('icon'))).toBe(true);
  });
});
