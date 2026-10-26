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

  test('Item 4: Projects directory and featured section display polished To Be Continued empty states', async ({ page, request }) => {
    // 1. Projects directory page shows To Be Continued empty state
    await page.goto('/projects');
    await expect(page.getByText('To Be Continued').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Onboard Your Repository/i })).toBeVisible();

    // 2. Stats on Home page shows TBA for repositories
    await page.goto('/');
    await expect(page.locator('text=TBA').first()).toBeVisible();

    // 3. /projects/proj-1 redirects to /projects
    const resProj = await request.get('/projects/proj-1', { maxRedirects: 0 });
    expect([307, 308]).toContain(resProj.status());
    expect(resProj.headers()['location']).toBe('/projects');
  });

  test('Item 5: Leaderboard displays cleared podium and To Be Continued standby states', async ({ page }) => {
    await page.goto('/leaderboard');
    await expect(page.getByText('Awaiting first contributors')).toHaveCount(3);
    await expect(page.getByText('To Be Continued').first()).toBeVisible();
    await expect(page.getByText('CHAMPION #1')).toBeVisible();

    // Contributor dashboard rank shows active welcome
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
