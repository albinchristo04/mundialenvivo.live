import type { APIRoute } from "astro";
import { fixtures } from "@/utils/fixtures";

const BASE = "https://mundialenvivo.live";
const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { url: `${BASE}/`,           priority: "1.0", changefreq: "daily" },
  { url: `${BASE}/calendario`, priority: "0.9", changefreq: "daily" },
  { url: `${BASE}/faq`,        priority: "0.8", changefreq: "weekly" },
  { url: `${BASE}/argentina`,  priority: "0.9", changefreq: "daily" },
  { url: `${BASE}/colombia`,   priority: "0.9", changefreq: "daily" },
  { url: `${BASE}/uruguay`,    priority: "0.9", changefreq: "daily" },
  { url: `${BASE}/ecuador`,    priority: "0.9", changefreq: "daily" },
  { url: `${BASE}/chile`,      priority: "0.8", changefreq: "daily" },
  { url: `${BASE}/peru`,       priority: "0.8", changefreq: "daily" },
  { url: `${BASE}/venezuela`,  priority: "0.8", changefreq: "daily" },
  { url: `${BASE}/mexico`,     priority: "0.8", changefreq: "daily" },
];

export const GET: APIRoute = () => {
  const matchPages = fixtures.map((f) => ({
    url: `${BASE}/${f.slug}`,
    priority: f.group ? "0.9" : "0.7",
    changefreq: "daily",
    lastmod: f.date.split("T")[0],
  }));

  const allPages = [...staticPages, ...matchPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${"lastmod" in p ? p.lastmod : today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
};
