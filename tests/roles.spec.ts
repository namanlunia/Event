import { test, expect } from '@playwright/test';

test.describe('Role consistency, navigation, and persona synchronization', () => {
  test('Demo mode banner is visible and dismissible', async ({ page }) => {
    await page.goto('/');

    // Verify demo mode banner is visible
    const banner = page.locator('[data-testid="demo-mode-banner"]');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Demo mode active:');

    // Click dismiss button
    const dismissBtn = page.locator('[data-testid="dismiss-demo-banner"]');
    await expect(dismissBtn).toBeVisible();
    await dismissBtn.click();

    // Verify banner is dismissed
    await expect(banner).not.toBeVisible();
  });

  test('User menu avatar initials and role switcher across all roles', async ({ page }) => {
    // 1. Starts at / as a contributor
    await page.goto('/');

    // Check navbar avatar initials for default contributor (Sarah Chen -> SC)
    const navAvatar = page.locator('[data-testid="user-menu-avatar"]').first();
    await expect(navAvatar).toBeVisible();
    await expect(navAvatar).toHaveText('SC');

    // 2. Visits contributor dashboard
    await page.goto('/dashboard/contributor');

    // Confirms switcher says 'Contributor'
    const roleSwitcherCurrent = page.locator('[data-testid="role-switcher-current"]');
    await expect(roleSwitcherCurrent).toBeVisible();
    await expect(roleSwitcherCurrent).toHaveText('Contributor');

    // Confirms sidebar avatar initials & persona
    const sidebarInitials = page.locator('[data-testid="sidebar-avatar-initials"]');
    await expect(sidebarInitials).toBeVisible();
    await expect(sidebarInitials).toHaveText('SC');

    // Confirms sidebar has contributor navigation items
    const sidebarNav = page.locator('[data-testid="dashboard-sidebar-nav"]');
    await expect(sidebarNav).toBeVisible();
    await expect(sidebarNav).toContainText('My Activity & PRs');
    await expect(sidebarNav).toContainText('Browse Projects');
    await expect(sidebarNav).toContainText('Points & Rules');

    // 3. Switch to Project Admin
    const roleSwitcherBtn = page.locator('[data-testid="role-switcher-button"]');
    await roleSwitcherBtn.click();
    const projectAdminOption = page.locator('[data-testid="role-option-project_admin"]');
    await expect(projectAdminOption).toBeVisible();
    await projectAdminOption.click();

    // Confirms URL changes to /dashboard/project-admin
    await page.waitForURL('**/dashboard/project-admin');
    expect(page.url()).toContain('/dashboard/project-admin');

    // Confirms role switcher updates
    await expect(roleSwitcherCurrent).toHaveText('Project Admin');
    await expect(sidebarInitials).toHaveText('PA');

    // Confirms Project Admin navigation items appear
    await expect(sidebarNav).toContainText('My Projects');
    await expect(sidebarNav).toContainText('Submit Project');
    await expect(sidebarNav).toContainText('Announcements');

    // 4. Switch to Mentor
    await roleSwitcherBtn.click();
    const mentorOption = page.locator('[data-testid="role-option-mentor"]');
    await expect(mentorOption).toBeVisible();
    await mentorOption.click();

    await page.waitForURL('**/dashboard/mentor');
    expect(page.url()).toContain('/dashboard/mentor');
    await expect(roleSwitcherCurrent).toHaveText('Mentor');
    await expect(sidebarInitials).toHaveText('SM');
    await expect(sidebarNav).toContainText('Mentee Directory');
    await expect(sidebarNav).toContainText('PR Review Queue');
    await expect(sidebarNav).toContainText('Office Hours & Resources');

    // 5. Switch to Ambassador
    await roleSwitcherBtn.click();
    const ambassadorOption = page.locator('[data-testid="role-option-ambassador"]');
    await expect(ambassadorOption).toBeVisible();
    await ambassadorOption.click();

    await page.waitForURL('**/dashboard/ambassador');
    expect(page.url()).toContain('/dashboard/ambassador');
    await expect(roleSwitcherCurrent).toHaveText('Campus Ambassador');
    await expect(sidebarInitials).toHaveText('CA');
    await expect(sidebarNav).toContainText('Referral Kit & Stats');
    await expect(sidebarNav).toContainText('College Standings');

    // 6. Switch to Super Admin
    await roleSwitcherBtn.click();
    const adminOption = page.locator('[data-testid="role-option-super_admin"]');
    await expect(adminOption).toBeVisible();
    await adminOption.click();

    await page.waitForURL('**/dashboard/admin');
    expect(page.url()).toContain('/dashboard/admin');
    await expect(roleSwitcherCurrent).toHaveText('Super Admin');
    await expect(sidebarInitials).toHaveText('SA');
    await expect(sidebarNav).toContainText('Approvals Queue');
    await expect(sidebarNav).toContainText('User Management');
  });

  test('Subpage navigation, page refresh persistence, and clean redirect on role switch', async ({ page }) => {
    // 1. Directly navigate to Mentor -> Mentees tab
    await page.goto('/dashboard/mentor?tab=mentees');

    // Confirms active role is Mentor and mentees tab content is rendered
    const roleSwitcherCurrent = page.locator('[data-testid="role-switcher-current"]');
    await expect(roleSwitcherCurrent).toHaveText('Mentor');
    const sidebarInitials = page.locator('[data-testid="sidebar-avatar-initials"]');
    await expect(sidebarInitials).toHaveText('SM');
    await expect(page.locator('text=Assigned Mentees').first()).toBeVisible();

    // 2. Refreshes the page
    await page.reload();

    // Confirms active role is still Mentor and tab is still Mentees
    await expect(roleSwitcherCurrent).toHaveText('Mentor');
    await expect(sidebarInitials).toHaveText('SM');
    expect(page.url()).toContain('/dashboard/mentor?tab=mentees');
    await expect(page.locator('text=Assigned Mentees').first()).toBeVisible();

    // 3. Switch role to Ambassador while on that tab
    const roleSwitcherBtn = page.locator('[data-testid="role-switcher-button"]');
    await roleSwitcherBtn.click();
    const ambassadorOption = page.locator('[data-testid="role-option-ambassador"]');
    await expect(ambassadorOption).toBeVisible();
    await ambassadorOption.click();

    // Confirms user is redirected to /dashboard/ambassador (clean, not left on broken sub-tab)
    await page.waitForURL('**/dashboard/ambassador');
    expect(page.url()).toContain('/dashboard/ambassador');
    expect(page.url()).not.toContain('tab=mentees');
    await expect(roleSwitcherCurrent).toHaveText('Campus Ambassador');
    await expect(sidebarInitials).toHaveText('CA');
  });
});
