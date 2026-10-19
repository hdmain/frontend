/**
 * Scrape live Trustpilot score via Playwright (works where plain HTTP gets 403).
 * Writes public/trustpilot.json — safe to run in CI.
 */
import { writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "trustpilot.json");
const URL = "https://www.trustpilot.com/review/alfahost.eu";

async function loadFallback() {
  try {
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return {
      trustScore: 3.7,
      stars: 3.5,
      reviewCount: 2,
      updatedAt: new Date().toISOString(),
    };
  }
}

async function scrapeWithPlaywright() {
  const require = createRequire(import.meta.url);
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch {
    throw new Error("playwright not installed");
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(
      () => Boolean(document.getElementById("__NEXT_DATA__")),
      null,
      { timeout: 30000 },
    );
    const data = await page.evaluate(() => {
      const raw = document.getElementById("__NEXT_DATA__")?.textContent;
      if (!raw) return null;
      const json = JSON.parse(raw);
      const bu = json?.props?.pageProps?.businessUnit;
      if (!bu) return null;
      return {
        trustScore: Number(bu.trustScore),
        stars: Number(bu.stars),
        reviewCount: Number(bu.numberOfReviews),
      };
    });
    if (
      !data ||
      !Number.isFinite(data.trustScore) ||
      !Number.isFinite(data.stars) ||
      !Number.isFinite(data.reviewCount)
    ) {
      throw new Error("Could not parse businessUnit from Trustpilot page");
    }
    return { ...data, updatedAt: new Date().toISOString() };
  } finally {
    await browser.close();
  }
}

async function main() {
  const fallback = await loadFallback();
  try {
    const data = await scrapeWithPlaywright();
    await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
    console.log(
      `Trustpilot: ${data.trustScore}/5 · ${data.stars}★ · ${data.reviewCount} reviews`,
    );
  } catch (err) {
    console.warn(`Trustpilot scrape skipped: ${err.message}`);
    await writeFile(OUT, `${JSON.stringify(fallback, null, 2)}\n`);
  }
}

await main();
