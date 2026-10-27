import { test, expect } from '@playwright/test';

test.describe('Role consistency, navigation, and persona synchronization', () => {
  test('Demo mode banner is hidden in launch mode', async ({ page }) => {
    await page.goto('/');

    // Verify demo mode banner is not visible in launch mode
    const banner = page.locator('[data-testid="demo-mode-banner"]');
    await expect(banner).toHaveCount(0);
  });

  test('Direct role dashboard access and absence of interactive role switcher', async ({ page }) => {
    // 1. Contributor Dashboard
    await page.goto('/dashboard/contributor');
    const userAvatar = page.locator('[data-testid="user-menu-avatar"]').first();
    await expect(userAvatar).toBeVisible();
    await expect(userAvatar).toHaveText('CO');

    // No interactive role switcher dropdown
    await expect(page.locator('[data-testid="role-switcher-button"]')).toHaveCount(0);
    await expect(page.locator('[data-testid="role-switcher-current"]')).toHaveCount(0);

    // Sidebar has contributor navigation items
    const sidebarNav = page.locator('[data-testid="dashboard-sidebar-nav"]');
    await expect(sidebarNav).toBeVisible();
    await expect(sidebarNav).toContainText('My Activity & PRs');
    await expect(sidebarNav).toContainText('Browse Projects');
    await expect(sidebarNav).toContainText('Points & Rules');

    // 2. Project Admin Dashboard
    await page.goto('/dashboard/project-admin');
    await expect(page.locator('[data-testid="sidebar-avatar-initials"]')).toHaveText('PA');
    await expect(page.locator('[data-testid="dashboard-sidebar-nav"]')).toContainText('My Projects');

    // 3. Mentor Dashboard
    await page.goto('/dashboard/mentor');
    await expect(page.locator('[data-testid="sidebar-avatar-initials"]')).toHaveText('ME');
    await expect(page.locator('[data-testid="dashboard-sidebar-nav"]')).toContainText('Mentee Directory');

    // 4. Ambassador Dashboard
    await page.goto('/dashboard/ambassador');
    await expect(page.locator('[data-testid="sidebar-avatar-initials"]')).toHaveText('CA');
    await expect(page.locator('[data-testid="dashboard-sidebar-nav"]')).toContainText('Referral Kit & Stats');

    // 5. Super Admin Dashboard
    await page.goto('/dashboard/admin');
    await expect(page.locator('[data-testid="sidebar-avatar-initials"]')).toHaveText('SA');
    await expect(page.locator('[data-testid="dashboard-sidebar-nav"]')).toContainText('Approvals Queue');
  });

  test('Subpage navigation and page refresh persistence', async ({ page }) => {
    // 1. Directly navigate to Mentor -> Mentees tab
    await page.goto('/dashboard/mentor?tab=mentees');

    // Confirms active role is Mentor and mentees tab content is rendered
    const sidebarInitials = page.locator('[data-testid="sidebar-avatar-initials"]');
    await expect(sidebarInitials).toHaveText('ME');
    await expect(page.locator('text=Assigned Mentees').first()).toBeVisible();

    // 2. Refreshes the page
    await page.reload();

    // Confirms active role is still Mentor and tab is still Mentees
    await expect(sidebarInitials).toHaveText('ME');
    expect(page.url()).toContain('/dashboard/mentor?tab=mentees');
    await expect(page.locator('text=Assigned Mentees').first()).toBeVisible();
  });
});
