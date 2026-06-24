# Project Plan — mundialenvivo.sbs (Legitimate Official-Broadcaster Edition)

**Date:** 2026-06-24
**Status:** Plan only — to be built later
**Author:** Planning session
**Type:** New standalone Astro static site, separate git repo

---

## 1. Purpose & Background

`mundialenvivo.live` was suspended by Cloudflare Trust & Safety on 2026-06-20
(Network block on `*.mundialenvivo.live/*` + "Video stream redirect" mitigation,
account-level suspension). The trigger was almost certainly the site's watch
mechanism: **every** country page, match page, schema block, and the promo banner
pointed to **PPVTV.TOP**, a third-party free "stream" — i.e. unauthorized
rebroadcast of World Cup matches, which rights-holders (FIFA / official
broadcasters) routinely report.

`mundialenvivo.sbs` is a **fresh, legitimate** site that keeps the same design,
content, structure, and SEO footprint of `.live`, but replaces the piracy stream
with **real official broadcasters per country + FIFA official links**. This is
both the compliant path and a more durable SEO play: legitimate "where to watch"
guides don't get taken down each match week.

> **Non-negotiable design principle:** No third-party/unauthorized stream links
> anywhere in this project. PPVTV.TOP (and any equivalent) must be fully absent
> from config, data, components, copy, and schema. If a future change would
> reintroduce a stream link, it does not belong in this project.

---

## 2. What Stays the Same vs. What Changes

### Same (copy verbatim from `.live`)
- Astro static-site architecture (`output: "static"`, `compressHTML`, inline styles).
- Layout & visual design: `src/layouts/BaseLayout.astro` (minus Google Analytics,
  which was already removed from `.live`).
- Components: `CountryPage.astro`, `SchemaOrg.astro`, `PromoBanner.astro`
  (PromoBanner repurposed — see §4).
- Pages: `index.astro`, `calendario.astro`, `faq.astro`, `[match].astro`,
  and the per-country pages (`argentina`, `chile`, `colombia`, `ecuador`,
  `mexico`, `peru`, `uruguay`, `venezuela`).
- Data/util: `fixtures.json`, `src/utils/fixtures.ts`, `scripts/build-fixtures.mjs`.
- Sitemap generation (`src/pages/sitemap.xml.ts`), favicon, Spanish (es-AR) copy.
- The match-slug structure (`<team>-vs-<team>-donde-ver`) and country slugs.

### Changed (the substance of this project)
1. **Domain / brand config** → `mundialenvivo.sbs` (new `site.ts`).
2. **`broadcasters.json` rebuilt** with real official rights-holders per country.
3. **Watch CTAs** → point to the country's official broadcaster + FIFA, never a stream.
4. **PromoBanner** → repurposed as an official "Dónde ver oficialmente" callout
   (FIFA / official broadcaster), or removed. No "Anuncio" stream ad.
5. **Schema (`SchemaOrg.astro`)** → `potentialAction` / watch references point to
   official broadcaster URLs + FIFA, not a stream.
6. **SEO identity** → new verification tokens, new IndexNow key, new sitemap URL,
   fresh Search Console / Bing properties. Do NOT reuse `.live` tokens.

---

## 3. Repository & Project Setup

This is a **separate repo**, independent of `.live`.

1. Create a new directory and git repo, e.g. `mundialenvivo-sbs`.
2. Copy the `.live` source tree into it (exclude build/VCS artifacts):
   - Include: `src/`, `public/`, `scripts/`, `fixtures.json`, `broadcasters.json`,
     `astro.config.mjs`, `package.json`, `package-lock.json`, `tsconfig.json`,
     `README.md`.
   - Exclude: `dist/`, `node_modules/`, `.astro/`, `.git/`, `wrangler.toml`
     (no Cloudflare), `.github/workflows/` (the old workflow deployed to
     Cloudflare — see §7 for the VPS deploy instead), the `.xlsx` GSC export,
     and any `.live`-specific verification files in `public/`.
3. `npm install` to regenerate `node_modules`, confirm `npm run build` produces `dist/`.
4. Initialize the new git repo and make the first commit once §4–§6 changes are in.

---

## 4. File-by-File Changes

### 4.1 `astro.config.mjs`
- Change `site: "https://mundialenvivo.live"` → `site: "https://mundialenvivo.sbs"`.
- Everything else unchanged.

### 4.2 `src/config/site.ts`
Replace stream-centric fields with official-broadcaster + FIFA values:

| Field | Old (`.live`) | New (`.sbs`) |
|-------|---------------|--------------|
| `domain` | `mundialenvivo.live` | `mundialenvivo.sbs` |
| `url` | `https://mundialenvivo.live` | `https://mundialenvivo.sbs` |
| `brand` | `Mundial en Vivo` | `Mundial en Vivo` (keep) |
| `watchCta` | `Ver en PPVTV.TOP` | `Ver en el canal oficial` |
| `watchUrl` | `https://ppvtv.top` | `https://www.fifa.com/` (FIFA fallback) |
| `watchName` | `PPVTV.TOP` | `FIFA / canal oficial` |
| `description` | mentions "gratis en PPVTV.TOP" | rewrite: official "dónde ver" guide, FIFA + canales oficiales por país |
| `defaultKeywords` | includes "gratis" stream terms | keep World Cup intent terms, drop "gratis stream" framing |

- Keep `focusCountries`, `officialAccounts` (FIFA handles), `social` as-is.
- Add a new field for FIFA's official "where to watch" URL, e.g.
  `fifaWatchUrl: "https://www.fifa.com/..."` (verify exact FIFA 2026 watch page at build time).
- Generate a **new** `indexNowKey` (do not reuse `.live`'s).

### 4.3 `broadcasters.json` — the core data work
Rebuild entirely. Replace the all-PPVTV structure with **real official
rights-holders per country**. Each country lists one or more official
broadcasters, each linking to that broadcaster's official site, plus FIFA as a
universal reference.

**Schema for each country entry:**
```json
"MX": {
  "name": "Mexico",
  "broadcasters": [
    {"name": "Televisa / Canal 5", "url": "https://www.televisa.com/", "access": "tv", "type": "official"},
    {"name": "TUDN", "url": "https://www.tudn.com/", "access": "tv-streaming", "type": "official"},
    {"name": "ViX", "url": "https://vix.com/", "access": "streaming", "type": "official"}
  ]
}
```

**Starter mapping for focus countries — VERIFY each before launch** (2026 World
Cup rights are still being finalized; treat the list below as a research starting
point, not confirmed fact):

| Code | Country | Likely official broadcaster(s) — VERIFY |
|------|---------|------------------------------------------|
| MX | Mexico | Televisa (Canal 5), TUDN, ViX, TV Azteca |
| AR | Argentina | Telefé (open TV), DSports / DirecTV Sports |
| CO | Colombia | Caracol TV, RCN |
| EC | Ecuador | Teleamazonas / official rights-holder |
| CL | Chile | Chilevisión / Mega (verify 2026 holder) |
| PE | Peru | América TV / Latina (verify) |
| VE | Venezuela | official rights-holder (verify) |
| UY | Uruguay | official rights-holder (verify) |
| US | USA | FOX / FOX Sports (English), Telemundo / Peacock (Spanish) |
| BR | Brasil | Globo / SporTV / CazéTV (verify) |
| BO | Bolivia | official rights-holder (verify) |
| PY | Paraguay | official rights-holder (verify) |

- Add a universal `FIFA` reference entry (`https://www.fifa.com/`) used as a
  fallback and shown on every page.
- Add `_lastVerified` date and a `_note` stating links are official broadcasters,
  not streams.
- Remove the `PPVTV_TOP` regional block entirely.

> **Action item before launch:** confirm each country's actual 2026 broadcast
> rights via the broadcaster's own announcements / FIFA media releases. Rights can
> differ from 2022. Do not publish a broadcaster claim you haven't verified.

### 4.4 `src/components/PromoBanner.astro`
- Remove the PPVTV stream ad. Two options:
  - **(Recommended)** Repurpose into an official callout: text like
    "Mirá el Mundial 2026 en tu canal oficial" linking to the country's official
    broadcaster (or FIFA fallback). Drop the "Anuncio" label and the
    `rel="nofollow"` ad framing — these are now editorial official links.
  - Or remove the component and its usages entirely.
- Keep the visual style (gradient/live-dot) if repurposing, so design parity holds.

### 4.5 `src/components/CountryPage.astro`
- Where it renders the watch CTA / broadcaster, read from the new
  `broadcasters.json` and render the **list of official broadcasters** for that
  country (name → official URL), plus a FIFA link.
- Replace any hardcoded PPVTV CTA with the official broadcaster list.
- Keep fixtures rendering, timezone logic, breadcrumbs, FAQ block unchanged.

### 4.6 `src/components/SchemaOrg.astro`
- Audit every URL in the JSON-LD. Any `potentialAction`, `BroadcastEvent`,
  `url`, or watch reference that pointed to PPVTV must point to the official
  broadcaster URL and/or FIFA.
- If a `BroadcastEvent` / `publishedOn` (BroadcastService) is emitted per match,
  populate it with the **real** official broadcaster for the relevant country
  (accurate schema, not a placeholder).

### 4.7 Per-country pages & `[match].astro`
- These mostly consume the components above. Verify no page hardcodes a PPVTV
  link or "gratis stream" copy. Update any inline CTA text to the official framing.

### 4.8 `index.astro`, `calendario.astro`, `faq.astro`
- Sweep copy for "PPVTV", "gratis" stream promises, and any stream CTA. Rewrite
  to the official "dónde ver oficialmente" positioning.
- FAQ: replace any "cómo ver gratis por streaming" answer with "los canales
  oficiales por país" + FIFA reference.

### 4.9 `public/`
- Remove `.live` verification files: `7789e9f16e7343e3bc7abeee9e13b316.txt`
  (old IndexNow key), `BingSiteAuth.xml` (old Bing token).
- Add new IndexNow key file matching the new key in `site.ts`.
- Keep `favicon.svg`.
- `robots.txt`: keep the clean allow-all version (already adopted on `.live`).
  Update the `Sitemap:` line to `https://mundialenvivo.sbs/sitemap.xml`.

### 4.10 `scripts/`
- `build-fixtures.mjs`: unchanged (fixtures are the same tournament data).
- `push-today.js`: update domain to `.sbs` and use the new IndexNow key.

---

## 5. Global Search-and-Destroy Checklist (PPVTV removal)

Before first commit, grep the entire project and confirm **zero** matches:

```bash
grep -rIE 'ppvtv|PPVTV' src public scripts *.json *.mjs *.ts 2>/dev/null   # must be empty
```

Also sweep for stream-promise copy: `gratis online`, `ver gratis`,
`transmisión gratis`, "stream" CTAs — rewrite to official framing.

---

## 6. SEO Identity (new, not reused)

- New Google Search Console property for `mundialenvivo.sbs` (verify via DNS or
  HTML file).
- New Bing Webmaster property + new `msvalidate.01` token in `BaseLayout.astro`
  (replace the `.live` one).
- New IndexNow key (file in `public/` + value in `site.ts`/`push-today.js`).
- Submit `https://mundialenvivo.sbs/sitemap.xml` to both engines after launch.
- `.sbs` is a distinct TLD/site — it will rank from scratch; it does **not**
  inherit `.live`'s history. Set expectations accordingly.

---

## 7. Deploy (VPS, same pattern as `.live`)

Static Astro → serve the `dist/` folder via aaPanel/nginx (NOT a Node project).

1. Build locally or on VPS: `npm ci && npm run build` → produces `dist/`.
2. aaPanel → **Website → Add site** for `mundialenvivo.sbs` (static, no PHP/DB).
3. Point document root at the `dist/` output.
4. nginx `location /` block must include:
   `try_files $uri $uri/ $uri/index.html =404;`  (pretty-URL folders → index.html).
5. SSL via Let's Encrypt (confirm auto-renew).
6. DNS A record → VPS IP. Keep DNS off Cloudflare proxy if leaving Cloudflare.
7. Optional daily redeploy cron (mirror the `.live` `deploy.sh`):
   `cd <repo> && git pull && npm run build`, with PATH set for cron and logging.

---

## 8. Build / Verification Checklist

- [ ] `npm run build` completes; page count matches `.live` (~115 pages).
- [ ] `grep -rI ppvtv` over the project returns nothing.
- [ ] Homepage, a country page, and a match page each render official broadcaster
      links + a FIFA link; no stream link present.
- [ ] JSON-LD validates (Google Rich Results test) with official URLs only.
- [ ] `robots.txt` and `sitemap.xml` reference the `.sbs` domain.
- [ ] All broadcaster URLs resolve (200) and are the broadcaster's official site.
- [ ] Every country in `broadcasters.json` has been verified against 2026 rights
      (the `_lastVerified` date is current).
- [ ] No `.live` verification tokens remain in `public/` or `BaseLayout.astro`.

---

## 9. Compliance Note (why this matters)

The `.live` suspension was an abuse/rights complaint, not a hosting fault — moving
hosts does not resolve it, and the same complaint will follow any site that links
to unauthorized streams (to the VPS provider and the domain registrar directly).
`mundialenvivo.sbs` is built to be defensible: it sends users to **legitimate
rights-holders and FIFA**, which is what a "dónde ver el Mundial" guide is
supposed to do. Keep it that way — the moment a stream link is added back, the
site re-enters the same risk that took down `.live`.

> Note: I can lay out the official-broadcaster structure, but I can't certify the
> precise 2026 broadcast rights per country — those must be verified against
> official broadcaster/FIFA announcements before launch, per §4.3.
