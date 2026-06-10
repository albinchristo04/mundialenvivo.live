#!/usr/bin/env node
/**
 * IndexNow push — instant Bing indexing for the World Cup network.
 *
 * Bing co-created IndexNow: submitted URLs are crawled in minutes, not days.
 * This is the single biggest fast-rank lever for live-event/fixture pages.
 *
 * SETUP (once per domain):
 *   1. Generate a key (32+ hex chars), e.g.  openssl rand -hex 16
 *   2. Host it at  https://<domain>/<key>.txt  (file contents = the key, nothing else)
 *   3. Set the env vars below, then call pushUrls(...) after every build/update.
 *
 * USAGE:
 *   INDEXNOW_KEY=xx"..." node indexnow_push.js https://partidosdehoy.live/ https://partidosdehoy.live/mundial
 *   or import { pushUrls } and call it from your build script.
 */

const https = require("https");

// Map each domain to its hosted key file. Fill these in.
const KEYS = {
  "partidosdehoy.live":      process.env.KEY_PARTIDOS      || "REPLACE_ME",
  "mundialenvivo.live":      process.env.KEY_MUNDIAL_LIVE  || "REPLACE_ME",
  "mundialenvivo.sbs":       process.env.KEY_MUNDIAL_SBS   || "REPLACE_ME",
  "assistircopaaovivo.live": process.env.KEY_ASSISTIR      || "REPLACE_ME",
};

function hostOf(url) {
  return new URL(url).host;
}

/**
 * Push a batch of URLs (all must share one host) to IndexNow.
 * IndexNow also fans out to Yandex, Seznam, Naver — free extra reach.
 */
function pushUrls(urls) {
  if (!urls.length) return Promise.resolve();

  const host = hostOf(urls[0]);
  const key = KEYS[host];
  if (!key || key === "REPLACE_ME") {
    throw new Error(`No IndexNow key set for ${host}`);
  }

  const payload = JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: urls,
  });

  const options = {
    hostname: "api.indexnow.org",
    path: "/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        // 200 / 202 = accepted
        console.log(`IndexNow ${host}: HTTP ${res.statusCode} (${urls.length} urls)`);
        resolve(res.statusCode);
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Group mixed-host URLs and push each group. Use this from a build that
 * regenerates several sites at once.
 */
async function pushMixed(urls) {
  const byHost = {};
  for (const u of urls) (byHost[hostOf(u)] ||= []).push(u);
  for (const group of Object.values(byHost)) await pushUrls(group);
}

// CLI: node indexnow_push.js <url> <url> ...
if (require.main === module) {
  const urls = process.argv.slice(2);
  if (!urls.length) {
    console.error("Usage: node indexnow_push.js <url> [<url> ...]");
    process.exit(1);
  }
  pushMixed(urls).catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}

module.exports = { pushUrls, pushMixed };

/* ---------------------------------------------------------------------------
 * WIRE INTO A DAILY BUILD (example, in your deploy script):
 *
 *   const { pushMixed } = require("./indexnow_push");
 *   // after generating today's pages, collect their URLs:
 *   const todays = todaysMatches.map(m =>
 *     `https://partidosdehoy.live/${m.slug}-donde-ver`);
 *   todays.push("https://partidosdehoy.live/");          // homepage (changed)
 *   todays.push(`https://partidosdehoy.live/hoy/${date}`); // daily page
 *   await pushMixed(todays);
 *
 * Run this every match morning after refreshing times/lineups. The daily
 * re-push is what triggers Bing's freshness boost for live-event queries.
 * ------------------------------------------------------------------------- */
