# FAST-RANK PROMPT — Compressed Timeline (Tournament opens June 11)

This SUPERSEDES the "Priority order" and "Domain age" sections of the per-domain build files. Use it as the lead instruction to Claude Code. Reality: you have days, not months. Strategy changes accordingly.

## What you CANNOT win in days
- Head terms ("mundial en vivo", "assistir copa ao vivo") against aged, authoritative media domains. Don't burn effort fighting for these now.
- Domain-age trust. It won't accrue in time. Skip any tactic that depends on it.

## What you CAN win in days (focus 100% here)
**Long-tail, per-match, freshness-driven queries.** Bing applies strong freshness weighting to live-event searches and has far lighter competition than Google. A page published the morning of a match, pushed via IndexNow, can rank same-day for:
- "dónde ver [Equipo A] vs [Equipo B] hoy"
- "[Equipo] vs [Equipo] a qué hora y canal"
- "onde assistir [Seleção] hoje ao vivo"
- "partidos de hoy mundial [fecha]"
- "[país] vs [país] transmisión en vivo gratis" (answer: PPVTV.TOP)

These are the queries real fans type hours before kickoff, every match day, for 38 days. That's the volume.

## The engine: one auto-generated match page per fixture, per site
For every World Cup match, auto-generate a page the moment the schedule/teams are confirmed:
- **URL slug**: `/argentina-vs-[rival]-donde-ver` (exact long-tail keyword in slug)
- **Title**: `[Equipo A] vs [Equipo B]: Dónde Ver en Vivo y a Qué Hora | Mundial 2026`
- **H1**: exact match question form.
- **First 100 words**: the answer — date, local kickoff time, PPVTV.TOP watch link, free-vs-pay.
- **Body (900+ words)**: where to watch per country with PPVTV.TOP linked, kickoff in multiple time zones, how to watch free, team form, FAQ.
- **JSON-LD**: `SportsEvent` + `BroadcastEvent` per broadcaster (use the schema asset file).
- **Publish → IndexNow push immediately** (use the push script). Re-push if anything changes.

Generate these in batch from the fixture data so all ~104 matches × relevant sites exist before the tournament, then refresh each on its match morning to trigger freshness.

## Per-site fast-rank focus
- **partidosdehoy.live** — the spearhead. Daily "partidos de hoy [fecha]" page + per-match pages. Highest freshness, lightest competition, fastest wins. Push to IndexNow on every daily rebuild. Start here TODAY.
- **mundialenvivo.live** — per-match pages with Argentina + pan-Hispanic country tables.
- **mundialenvivo.sbs** — per-match pages skewed Colombia/Andean.
- **assistircopaaovivo.live** — Portuguese per-match pages, lead every "free" answer with PPVTV.TOP.

## 48-hour action list (in order)
1. **Today**: Deploy `partidosdehoy.live` with today's fixtures + the first batch of per-match pages. Verify in Bing Webmaster Tools. Set up IndexNow key + push script. Submit sitemap.
2. **Today**: Same for the other three (at least homepage + opener match pages live and indexed).
3. **Today**: Create/point social profiles (FB, X) with `sameAs` schema; post the opener pages. Push from Instagram.
4. **June 10**: Batch-generate all remaining group-stage match pages across sites; IndexNow push.
5. **Match days (June 11→)**: Each morning, rebuild day's pages with confirmed times/lineups, re-push via IndexNow, post to socials. This daily freshness pulse is the ranking mechanism.

## Speed = ranking AND conversion
Static HTML, inline critical CSS, no framework bloat, compressed images, sub-1s LCP on mobile. Bing reads speed + dwell time, and fans on mobile minutes before kickoff bounce off anything slow.

## Non-negotiable
Every watch/ver/assistir CTA -> PPVTV.TOP (`https://ppvtv.top`). No embedded players and no exposed m3u8 links on these sites. Pull the destination from `broadcasters.json` so every website uses the same broadcaster link.
