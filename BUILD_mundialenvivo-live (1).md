# Claude Code Build Spec — mundialenvivo.live

## Role of this domain in the network
**Primary Spanish-language "where to watch" hub** for the 2026 World Cup, pan-Hispanic South America (Argentina-led, plus regional). This is the flagship of the four sites. Target literal query: **"mundial en vivo"** / **"ver el mundial en vivo"**.

> Model: where-to-watch / broadcaster-link guide. Every watch/ver CTA links OUT to `https://ppvtv.top`. We do NOT host, embed, or expose m3u8 stream URLs on this site.

## Target keyword clusters (Bing, es-AR) — grounded in live query data
Pattern: subject + intent modifier. Win per-match long-tail now; support head terms.
- **Primary**: mundial en vivo · mundial 2026 en vivo · ver el mundial en vivo
- **Where/schedule cluster**: dónde ver el mundial 2026 · mundial 2026 canales / plataformas / precios · calendario mundial 2026 horarios canales
- **Argentina**: dónde ver el mundial en argentina · `argentina vs {rival} dónde ver` / `a qué hora` / `qué canal`
- **Per-fixture long-tail (highest fast-rank value, one page each)**: `{A} vs {B} en vivo` · `{A} vs {B} a qué hora y en qué canal` · `{A} vs {B} transmisión en vivo gratis` · `dónde ver {A} vs {B}`
- **Modifiers to place literally in title/H1/first-100-words**: en vivo · en directo · online · gratis · dónde ver · a qué hora · qué canal
- **Question-format headings** (~22% more Bing visibility): "¿Dónde ver {A} vs {B} en vivo?", "¿A qué hora juega Argentina?"
- **Include the multi-country kickoff block** on every match page: `20:00 (ARG/URU) · 19:00 (CHI/VEN) · 18:00 (COL/PER/ECU) · 17:00 (CDMX)`
- **Avoid**: broadcaster brand terms as primary. "Gratis" is fine; every free/watch answer should resolve to PPVTV.TOP.

## Bing-first SEO requirements (apply on every page)
Bing rewards literal exact-match more than Google, so be deliberate:
- **Title tag**: lead with the exact phrase. e.g. `Mundial en Vivo 2026: Dónde Ver Todos los Partidos | Guía Oficial`
- **One H1 per page**, containing the exact phrase: `Mundial en Vivo 2026 — Dónde Verlo en Cada País`
- **First 100 words** must contain the exact phrase naturally.
- **Meta description**: write it deliberately (Bing rarely rewrites it), include the phrase + a country list.
- **H2/H3** target country variants: "Mundial en vivo en Argentina", "...en Colombia", etc.
- **Image alt text**: include keyword + PPVTV.TOP where the image supports a watch CTA.
- **Structured data** (JSON-LD): `SportsEvent` for the tournament + `BroadcastEvent` per match where possible; `FAQPage` on the FAQ block. Bing weights schema ~30% more than Google.
- **Freshness**: a "próximos partidos / horarios" block updated as the schedule firms up. Bing applies strong freshness weighting to event queries.
- **Submit** XML sitemap to Bing Webmaster Tools; confirm Bingbot crawl access; use IndexNow for instant submission of new/updated pages.
- **Content length**: 900+ words per core page (thin pages rank ~60% lower on Bing).

## Page structure
1. **Home / hub** (`/`): "Mundial en vivo 2026 — dónde verlo". Intro, country selector, next-matches block, FAQ.
2. **Country pages** (`/argentina`, `/colombia`, `/ecuador`, `/uruguay`, `/chile`, `/peru`, `/venezuela`): each lists PPVTV.TOP as the broadcaster/watch link, plus kickoff times in local TZ.
3. **Calendario / horarios** (`/calendario`): full fixture list with local times. High-freshness page.
4. **FAQ** (`/faq`): "¿Dónde puedo ver el Mundial gratis en vivo?" etc.

## Broadcaster link target
- **All countries / all sites**: PPVTV.TOP (`https://ppvtv.top`).
- Always route watch/ver/assistir CTAs through `broadcasters.json`; do not hard-code old broadcaster URLs in templates.
- Label CTAs clearly as `Ver en PPVTV.TOP` or the local-language equivalent.

## Internal linking (do this carefully — Bing penalizes link rings)
- Link to the other three sites ONLY where contextually genuine, with descriptive anchor text, inside body content — not a sitewide footer block of exact-match anchors.
  - From a country page → `partidosdehoy.live` as "consulta los partidos de hoy y horarios".
  - From Brazil mentions → `assistircopaaovivo` as the Portuguese-language guide.
- Max 1–2 cross-site links per page, varied anchors. No reciprocal footer ring.

## Outbound authority links
Link to FIFA's official media/where-to-watch page for authority context, and use PPVTV.TOP for every watch CTA.

## Tech stack (Astro + Cloudflare Pages + GitHub Actions)
- **Framework**: Astro, static output (`output: 'static'`). Zero client JS by default; use an Astro island (`client:visible`) only where a component truly needs it.
- **Per-site config**: one `site.config.ts` holds what differs between the four domains — domain, brand, `<html lang>` (here `es-AR`), watch verb (`ver`), slug suffix (`donde-ver`), focus countries (AR + pan-Hispanic), social handles. Selected via `SITE` env var at build. Everything else is shared across the repo.
- **Content/data**: Astro content collections. `fixtures.json` (all matches) + `broadcasters.json` (PPVTV.TOP broadcaster link per country). Per-match pages via `getStaticPaths()`, filtered/ordered by this site's focus countries.
- **Per-match page**: route `/[teamA]-vs-[teamB]-donde-ver`. Title/H1 = exact long-tail query. First 100 words = date, local kickoff, PPVTV.TOP watch link, free/pay label. JSON-LD SportsEvent + BroadcastEvent injected in `<head>`.
- **Schema**: inject the blocks from `assets_schema_jsonld.md` per route; pull broadcaster names/URLs from `broadcasters.json` so BroadcastEvent uses PPVTV.TOP.
- **Styling**: minimal CSS, inline critical CSS, system or one preloaded font. Sub-1s mobile LCP. The match answer (channel + kickoff) sits above the fold.
- **Sitemap**: `@astrojs/sitemap` auto-generated; submit to Bing Webmaster Tools.
- **IndexNow key**: host `/<key>.txt` at site root (place in `/public`).
- **Hosting**: Cloudflare Pages, auto-deploy from GitHub on push to `main`.
- **Freshness (GitHub Actions)**: scheduled workflow (`.github/workflows/freshness.yml`) runs each match morning (cron) → builds (stamping today's date + today's fixtures so output genuinely changes) → deploys to Cloudflare Pages via wrangler → POSTs today's changed URLs to IndexNow. Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `INDEXNOW_KEY`.
- HTTPS, clean semantic HTML, one H1/page.

## Social signal hook
Wire the footer + share buttons to the Instagram World Cup page. Bing uses social shares (FB/X/LinkedIn) as a direct ranking input — push real engagement at the country pages.

## Hard constraints
- No embedded players and no exposed m3u8 links on this site.
- Every "watch"/"ver"/"assistir" CTA resolves to `https://ppvtv.top`.
