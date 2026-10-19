/**
 * Refresh public/trustpilot.json from the live Trustpilot profile.
 * Best-effort: if Trustpilot blocks the request, keep the previous file.
 */
import { writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DOMAIN = "alfahost.eu";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "trustpilot.json");

async function fromHtml(html) {
  const bu = html.match(/"businessUnit":\{[^}]*"id":"([a-f0-9]+)"/);
  const trustScore = html.match(/"trustScore":([0-9.]+)/);
  const stars = html.match(/"stars":([0-9.]+)/);
  const reviewCount = html.match(/"numberOfReviews":(\d+)/);
  if (!trustScore || !stars || !reviewCount) return null;
  return {
    businessUnitId: bu?.[1] ?? "6ad54f32dea7b17b7f05e359",
    trustScore: Number(trustScore[1]),
    stars: Number(stars[1]),
    reviewCount: Number(reviewCount[1]),
    updatedAt: new Date().toISOString(),
  };
}

async function main() {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    /* first run */
  }

  try {
    const res = await fetch(`https://www.trustpilot.com/review/${DOMAIN}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; AlfaHostBuild/1.0; +https://alfahost.eu)",
        accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const data = await fromHtml(html);
    if (!data) throw new Error("Could not parse Trustpilot HTML");
    await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
    console.log(
      `Trustpilot updated: ${data.trustScore}/5 · ${data.reviewCount} reviews`,
    );
  } catch (err) {
    console.warn(`Trustpilot refresh skipped: ${err.message}`);
    if (!previous) {
      await writeFile(
        OUT,
        `${JSON.stringify(
          {
            trustScore: 3.7,
            stars: 3.5,
            reviewCount: 2,
            updatedAt: new Date().toISOString(),
          },
          null,
          2,
        )}\n`,
      );
    }
  }
}

await main();
