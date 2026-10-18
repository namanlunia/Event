/**
 * Link Crawler and Verification Script
 * Validates that all internal links across the OWOC platform resolve with HTTP 200 (no 404s).
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const SEED_ROUTES = [
  "/",
  "/about",
  "/ambassadors",
  "/apply/mentor",
  "/apply/project-admin",
  "/blog",
  "/blog/announcing-owoc-2026",
  "/certificate",
  "/certificate/OWOC-2026-C-9821",
  "/code-of-conduct",
  "/contact",
  "/dashboard/admin",
  "/dashboard/ambassador",
  "/dashboard/contributor",
  "/dashboard/forbidden",
  "/dashboard/maintainer",
  "/dashboard/mentor",
  "/dashboard/project-admin",
  "/faq",
  "/leaderboard",
  "/login",
  "/mentors",
  "/privacy",
  "/projects",
  "/projects/proj-1",
  "/projects/proj-2",
  "/register",
  "/rules",
  "/sponsors",
  "/team",
  "/terms",
  "/timeline",
];

const visited = new Set();
const toVisit = new Set(SEED_ROUTES);
const brokenLinks = [];
const discoveredLinks = new Map(); // destination -> [sourcePage, ...]

function extractLinks(html, currentPath) {
  const links = new Set();
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    const rawHref = match[1];

    // Filter out external protocols, hashes, mailto, tel
    if (
      rawHref.startsWith("http://") ||
      rawHref.startsWith("https://") ||
      rawHref.startsWith("mailto:") ||
      rawHref.startsWith("tel:") ||
      rawHref.startsWith("javascript:") ||
      rawHref === "#" ||
      rawHref.startsWith("#")
    ) {
      continue;
    }

    // Clean anchor and query parameters for base route checking
    const cleanPath = rawHref.split("#")[0].split("?")[0];
    if (cleanPath.startsWith("/")) {
      links.add(cleanPath);
    }
  }

  return Array.from(links);
}

async function checkRoute(path) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "OWOC-LinkChecker/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (res.status >= 400) {
      return { ok: false, status: res.status, html: "" };
    }

    const html = await res.text();
    return { ok: true, status: res.status, html };
  } catch (err) {
    return { ok: false, status: 0, error: err.message, html: "" };
  }
}

async function run() {
  console.log(`\n🔍 OWOC Link Checker Starting...`);
  console.log(`Target: ${BASE_URL}\n`);

  while (toVisit.size > 0) {
    const current = toVisit.values().next().value;
    toVisit.delete(current);
    if (visited.has(current)) continue;
    visited.add(current);

    process.stdout.write(`Checking ${current}... `);
    const result = await checkRoute(current);

    if (!result.ok) {
      console.log(`❌ FAILED (${result.status || result.error})`);
      const sources = discoveredLinks.get(current) || ["SEED"];
      brokenLinks.push({ path: current, status: result.status, sources });
    } else {
      console.log(`✅ OK (${result.status})`);
      const newLinks = extractLinks(result.html, current);
      for (const link of newLinks) {
        if (!discoveredLinks.has(link)) {
          discoveredLinks.set(link, []);
        }
        discoveredLinks.get(link).push(current);

        if (!visited.has(link)) {
          toVisit.add(link);
        }
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Crawl Finished: ${visited.size} internal paths checked.`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  console.log(`========================================\n`);

  if (brokenLinks.length > 0) {
    console.error(`🚨 BROKEN INTERNAL LINKS DETECTED:`);
    for (const b of brokenLinks) {
      console.error(
        ` - ${b.path} (HTTP ${b.status}) discovered from: ${b.sources.slice(0, 3).join(", ")}`
      );
    }
    process.exit(1);
  }

  console.log(`✨ All internal links resolved successfully! Zero 404s detected.\n`);
}

run();
