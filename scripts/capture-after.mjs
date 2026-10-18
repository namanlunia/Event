import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'qa/after');
fs.mkdirSync(OUT_DIR, { recursive: true });

const TARGETS = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'project_detail', path: '/projects/proj-1' },
  { name: 'leaderboard', path: '/leaderboard' },
  { name: 'timeline', path: '/timeline' },
  { name: 'mentors', path: '/mentors' },
  { name: 'ambassadors', path: '/ambassadors' },
  { name: 'rules', path: '/rules' },
  { name: 'certificate_verify', path: '/certificate' },
  { name: 'sponsors', path: '/sponsors' },
  // Dashboards
  { name: 'dashboard_contributor', path: '/dashboard/contributor' },
  { name: 'dashboard_project_admin_overview', path: '/dashboard/project-admin?tab=overview' },
  { name: 'dashboard_project_admin_projects', path: '/dashboard/project-admin?tab=projects' },
  { name: 'dashboard_project_admin_submit', path: '/dashboard/project-admin?tab=submit' },
  { name: 'dashboard_project_admin_applications', path: '/dashboard/project-admin?tab=applications' },
  { name: 'dashboard_project_admin_issues', path: '/dashboard/project-admin?tab=issues' },
  { name: 'dashboard_project_admin_prs', path: '/dashboard/project-admin?tab=prs' },
  { name: 'dashboard_project_admin_announcements', path: '/dashboard/project-admin?tab=announcements' },
  { name: 'dashboard_mentor_overview', path: '/dashboard/mentor?tab=overview' },
  { name: 'dashboard_mentor_mentees', path: '/dashboard/mentor?tab=mentees' },
  { name: 'dashboard_mentor_reviews', path: '/dashboard/mentor?tab=reviews' },
  { name: 'dashboard_mentor_office_hours', path: '/dashboard/mentor?tab=office-hours' },
  { name: 'dashboard_mentor_feedback', path: '/dashboard/mentor?tab=feedback' },
  { name: 'dashboard_mentor_resources', path: '/dashboard/mentor?tab=resources' },
  { name: 'dashboard_ambassador', path: '/dashboard/ambassador' },
  { name: 'dashboard_admin_overview', path: '/dashboard/admin?tab=overview' },
  { name: 'dashboard_admin_approvals', path: '/dashboard/admin?tab=approvals' },
  { name: 'dashboard_admin_users', path: '/dashboard/admin?tab=users' },
  { name: 'dashboard_admin_projects', path: '/dashboard/admin?tab=projects' },
  { name: 'dashboard_admin_points', path: '/dashboard/admin?tab=points' },
  { name: 'dashboard_admin_leaderboard', path: '/dashboard/admin?tab=leaderboard' },
  { name: 'dashboard_admin_badges', path: '/dashboard/admin?tab=badges' },
  { name: 'dashboard_admin_sponsors', path: '/dashboard/admin?tab=sponsors' },
  { name: 'dashboard_admin_certificates', path: '/dashboard/admin?tab=certificates' },
  { name: 'dashboard_admin_season', path: '/dashboard/admin?tab=season' },
  { name: 'dashboard_admin_audit', path: '/dashboard/admin?tab=audit' },
  { name: 'dashboard_admin_exports', path: '/dashboard/admin?tab=exports' },
];

const VIEWPORTS = [
  { label: '1440px', width: 1440, height: 900 },
  { label: '390px', width: 390, height: 844 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Capturing viewports: ${vp.label} ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const target of TARGETS) {
      const url = `http://localhost:3000${target.path}`;
      const filename = `${target.name}_${vp.label}.png`;
      const outPath = path.join(OUT_DIR, filename);

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(600); // allow client hydration & animations to settle
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`[OK] Saved ${filename}`);
      } catch (err) {
        console.error(`[ERR] Failed ${target.name} (${vp.label}):`, err.message);
      }
    }
    await context.close();
  }

  await browser.close();
  console.log('\nAll post-fix screenshots saved to', OUT_DIR);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
