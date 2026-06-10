#!/usr/bin/env node
/**
 * Pushes today's match pages + homepage to IndexNow after each build.
 * Called by the GitHub Actions freshness workflow.
 */

const { pushUrls } = require("../indexnow_push");
const fixtures = require("../fixtures.json");

const DOMAIN = "mundialenvivo.live";
const BASE = `https://${DOMAIN}`;

function todayMatches() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const prefix = `${y}-${m}-${d}`;
  return fixtures.filter((f) => f.date.startsWith(prefix));
}

async function main() {
  const todays = todayMatches();
  const urls = [
    `${BASE}/`,
    `${BASE}/calendario`,
    ...todays.map((f) => `${BASE}/${f.slug}`),
  ];

  if (todays.length === 0) {
    console.log("No matches today — pushing homepage + calendario only.");
  } else {
    console.log(`Pushing ${todays.length} match page(s) + site roots.`);
  }

  await pushUrls(urls);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
