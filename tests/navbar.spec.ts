import { test, expect } from '@playwright/test';

const DESKTOP_WIDTHS = [1920, 1440, 1280];
const MOBILE_WIDTHS = [1100, 768, 390];

const EXPECTED_NAV_LINKS = [
  'Home',
  'Projects',
  'Leaderboard',
  'Timeline',
  'Mentors',
  'Ambassadors',
  'Rules & Points',
];

test.describe('Navbar Layout & Responsiveness', () => {
  for (const width of DESKTOP_WIDTHS) {
    test(`Desktop navbar at ${width}px: full width, 7 links on single row, no role dropdown, no horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);

      // 1. Navbar container spans full viewport width
      const navContainer = page.locator('header > div.w-full');
      await expect(navContainer).toBeVisible();
      const containerBox = await navContainer.boundingBox();
      expect(containerBox).not.toBeNull();
      if (containerBox) {
        expect(containerBox.width).toBeGreaterThanOrEqual(width - 4);
      }

      // 2. Desktop nav is visible
      const desktopNav = page.locator('header nav');
      await expect(desktopNav).toBeVisible();

      // 3. All 7 links are visible with expected names
      const navLinks = desktopNav.locator('a');
      await expect(navLinks).toHaveCount(7);
      const linkTexts = await navLinks.allTextContents();
      for (const expected of EXPECTED_NAV_LINKS) {
        expect(linkTexts).toContain(expected);
      }

      // 4. All links lie on the exact same horizontal row (bounding box y within 2px)
      const linkBoxes = [];
      for (let i = 0; i < EXPECTED_NAV_LINKS.length; i++) {
        const box = await navLinks.nth(i).boundingBox();
        expect(box).not.toBeNull();
        if (box) linkBoxes.push(box);
      }
      expect(linkBoxes.length).toBe(EXPECTED_NAV_LINKS.length);
      const baselineY = linkBoxes[0].y;
      for (let i = 1; i < linkBoxes.length; i++) {
        expect(Math.abs(linkBoxes[i].y - baselineY)).toBeLessThanOrEqual(2);
      }

      // 5. Register link and Dashboard button are visible
      const registerLink = page.locator('header a[href="/register"]').first();
      await expect(registerLink).toBeVisible();
      await expect(registerLink).toContainText('Register');

      const dashboardBtn = page.locator('header a:has-text("Dashboard")').first();
      await expect(dashboardBtn).toBeVisible();

      // 6. Hamburger button is hidden at desktop widths
      const hamburgerBtn = page.locator('header button[aria-label="Toggle menu"]');
      await expect(hamburgerBtn).not.toBeVisible();

      // 7. No role dropdown exists in the navbar
      await expect(page.locator('header').getByText(/Role:/i)).toHaveCount(0);
      await expect(page.locator('header [data-testid="role-dropdown-trigger"]')).toHaveCount(0);

      // 8. No horizontal page scroll
      const noHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      );
      expect(noHorizontalScroll).toBe(true);
    });
  }

  for (const width of MOBILE_WIDTHS) {
    test(`Mobile/drawer navbar at ${width}px: hamburger toggle opens drawer with all 7 links, Register & Dashboard`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(300);

      // 1. Desktop nav links are hidden
      const desktopNav = page.locator('header nav');
      await expect(desktopNav).not.toBeVisible();

      // 2. Hamburger toggle button is visible
      const hamburgerBtn = page.locator('header button[aria-label="Toggle menu"]');
      await expect(hamburgerBtn).toBeVisible();

      // 3. Open drawer
      await hamburgerBtn.click();
      await page.waitForTimeout(300);

      // 4. Assert drawer opens and lists all 7 links
      for (const name of EXPECTED_NAV_LINKS) {
        const drawerLink = page.locator(`header a:has-text("${name}")`).last();
        await expect(drawerLink).toBeVisible();
      }

      // 5. Drawer includes Register and Dashboard
      const drawerRegister = page.locator('header a[href="/register"]').last();
      await expect(drawerRegister).toBeVisible();
      await expect(drawerRegister).toContainText('Register');

      const drawerDashboard = page.locator('header a:has-text("Dashboard")').last();
      await expect(drawerDashboard).toBeVisible();

      // 6. No role dropdown exists in the mobile navbar or drawer
      await expect(page.locator('header').getByText(/Role:/i)).toHaveCount(0);
      await expect(page.locator('header [data-testid="role-dropdown-trigger"]')).toHaveCount(0);

      // 7. No horizontal page scroll
      const noHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      );
      expect(noHorizontalScroll).toBe(true);
    });
  }

  test('Footer has no "Stay Informed" section and maintains 3-column layout', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify "Stay Informed" newsletter input and button are removed
    await expect(footer.getByText('Stay Informed')).toHaveCount(0);
    await expect(footer.locator('input[type="email"]')).toHaveCount(0);
    await expect(footer.locator('button:has-text("Subscribe")')).toHaveCount(0);

    // Verify preserved columns
    await expect(footer.getByRole('heading', { name: 'Program' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Community' })).toBeVisible();
    await expect(footer.getByText('Omnikon Winter of Code')).toBeVisible();

    // Verify critical footer links are preserved (and certificate verification link removed)
    await expect(footer.locator('a[href="/rules"]')).toBeVisible();
    await expect(footer.locator('a[href="/projects"]')).toBeVisible();
    await expect(footer.locator('a[href="/certificate"]')).toHaveCount(0);
    await expect(footer.locator('a[href="/timeline"]')).toBeVisible();
    await expect(footer.locator('a[href="/leaderboard"]')).toBeVisible();
  });
});
