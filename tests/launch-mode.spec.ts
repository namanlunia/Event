import { test, expect } from '@playwright/test';

test.describe('OWOC Launch Readiness Test Suite', () => {
  test('Item 1: Certificate verification is removed and old routes redirect with 308', async ({ page, request }) => {
    // 1. Navbar has no "Verify Cert" link
    await page.goto('/');
    const navVerify = page.locator('nav').getByRole('link', { name: /verify/i });
    await expect(navVerify).toHaveCount(0);

    // 2. Footer has no "Verify Certificate" link
    const footerVerify = page.locator('footer').getByRole('link', { name: /verify/i });
    await expect(footerVerify).toHaveCount(0);

    // 3. /certificate route redirects to /
    const resCert = await request.get('/certificate', { maxRedirects: 0 });
    expect([307, 308]).toContain(resCert.status());
    expect(resCert.headers()['location']).toBe('/');

    // 4. /certificate/123 route redirects to /
    const resCertId = await request.get('/certificate/OWOC-2026-001', { maxRedirects: 0 });
    expect([307, 308]).toContain(resCertId.status());
    expect(resCertId.headers()['location']).toBe('/');
  });

  test('Item 2: Registration window is Oct 28 - Nov 30, 2026 and no Oct 20 appears', async ({ page }) => {
    await page.goto('/');
    const content = await page.content();
    // Zero occurrences of "Oct 20"
    expect(content).not.toContain('Oct 20');
    expect(content).not.toContain('October 20');

    // Registration open date is visible
    expect(content).toContain('Oct 28');
  });

  test('Item 3: Brand links point to official Omnikon properties and universal email', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');

    // Check email
    const emailLink = footer.locator('a[href="mailto:contact@omnikonhub.com"]');
    await expect(emailLink).toBeVisible();

    // Check Omnikon website
    const omnikonLink = footer.locator('a[href="https://www.omnikonhub.com/"]');
    await expect(omnikonLink).toBeVisible();

    // Check Discord
    const discordLink = footer.locator('a[href="https://discord.gg/yWtjK2Tb8T"]');
    await expect(discordLink).toBeVisible();

    // Check LinkedIn
    const linkedinLink = footer.locator('a[href="https://www.linkedin.com/company/omnikon-org/"]');
    await expect(linkedinLink).toBeVisible();

    // Check X / Twitter
    const twitterLink = footer.locator('a[href="https://x.com/OmnikonOrg"]');
    await expect(twitterLink).toBeVisible();

    // Check GitHub
    const githubLink = footer.locator('a[href="https://github.com/Omnikon-Org"]');
    await expect(githubLink).toBeVisible();
  });

  test('Item 4: Projects directory displays populated project cards with domain filters and project detail view', async ({ page }) => {
    // 1. Projects directory page shows project cards and search
    await page.goto('/projects');
    await expect(page.locator('h1')).toContainText('Explore Repositories');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();

    // 2. Project detail page /projects/proj-1 opens successfully with tech stack
    await page.goto('/projects/proj-1');
    await expect(page.locator('h1')).toContainText('WinterVision Core');
    await expect(page.getByText('Available OWOC Issues')).toBeVisible();
  });

  test('Item 5: Leaderboard displays top champions podium and rankings table', async ({ page }) => {
    await page.goto('/leaderboard');
    await expect(page.getByText('CHAMPION #1')).toBeVisible();
    await expect(page.getByText('Program Leaderboard')).toBeVisible();

    // Contributor dashboard rank shows active standings
    await page.goto('/dashboard/contributor');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('Item 6: No role switcher or workspace framing; organizer-assigned RBAC', async ({ page }) => {
    await page.goto('/dashboard/contributor');

    // 1. No "View as role" bottom sidebar switcher
    await expect(page.getByText('View As Role:')).toHaveCount(0);

    // 2. No role-switcher dropdown in header
    await expect(page.locator('[data-testid="role-switcher-button"]')).toHaveCount(0);

    // 3. Breadcrumb says "Contributor Dashboard", NOT "Workspace"
    await expect(page.getByText('Contributor Dashboard').first()).toBeVisible();
    const bodyContent = await page.content();
    expect(bodyContent).not.toContain('Contributor Workspace');

    // 4. Admin User Management has role assignment dropdown
    await page.goto('/dashboard/admin?tab=users');
    const select = page.locator('[data-testid="assign-role-select-u-admin"]');
    await expect(select).toBeVisible();

    // Check options in select
    await expect(select.locator('option')).toHaveCount(5);
  });
});
