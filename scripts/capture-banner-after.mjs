import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const AFTER_DIR = path.resolve(process.cwd(), 'qa/banner-after');
const REC_DIR = path.resolve(process.cwd(), 'qa/banner-recordings');
fs.mkdirSync(AFTER_DIR, { recursive: true });
fs.mkdirSync(REC_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });

  // 1. Screenshots at 1440px and 390px
  const sizes = [
    { label: '1440px', width: 1440, height: 900 },
    { label: '390px', width: 390, height: 844 },
  ];

  for (const s of sizes) {
    const context = await browser.newContext({
      viewport: { width: s.width, height: s.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Full page screenshot
    await page.screenshot({
      path: path.join(AFTER_DIR, `home_full_${s.label}.png`),
      fullPage: true,
    });

    // Viewport around the banner & FAQ
    const banner = page.locator('[data-testid="omnikon-banner"]');
    if (await banner.count() > 0) {
      await banner.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(AFTER_DIR, `banner_${s.label}.png`),
      });
      await page.screenshot({
        path: path.join(AFTER_DIR, `home_insertion_area_${s.label}.png`),
      });
    }

    await context.close();
    console.log(`[OK] Captured banner-after screenshots for ${s.label}`);
  }

  // 2. Reduced motion screenshot at 1440px
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const banner = page.locator('[data-testid="omnikon-banner"]');
    await banner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await banner.screenshot({
      path: path.join(AFTER_DIR, 'banner_reduced_motion_1440px.png'),
    });
    await context.close();
    console.log('[OK] Captured banner_reduced_motion_1440px.png');
  }

  // 3. Screen recordings of banner animating (10-12s) at 1440px and 390px
  for (const s of sizes) {
    const tempRecDir = path.join(REC_DIR, `temp_${s.label}`);
    fs.mkdirSync(tempRecDir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: s.width, height: s.height },
      recordVideo: {
        dir: tempRecDir,
        size: { width: s.width, height: s.height },
      },
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    const banner = page.locator('[data-testid="omnikon-banner"]');
    await banner.scrollIntoViewIfNeeded();

    // Hover mouse across banner if desktop to demonstrate pointer trail
    if (s.width >= 1024) {
      const box = await banner.boundingBox();
      if (box) {
        for (let i = 0; i < 4; i++) {
          await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5);
          await page.waitForTimeout(1000);
          await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.5);
          await page.waitForTimeout(1000);
        }
      }
    } else {
      await page.waitForTimeout(10000);
    }

    await context.close(); // Saves video

    const files = fs.readdirSync(tempRecDir);
    const videoFile = files.find((f) => f.endsWith('.webm'));
    if (videoFile) {
      const targetPath = path.join(REC_DIR, `banner_recording_${s.label}.webm`);
      fs.renameSync(path.join(tempRecDir, videoFile), targetPath);
      fs.rmSync(tempRecDir, { recursive: true, force: true });
      console.log(`[OK] Saved video recording: ${targetPath}`);
    }
  }

  await browser.close();
  console.log('All banner-after captures and recordings complete!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
