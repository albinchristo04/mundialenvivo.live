# Ready-to-Paste JSON-LD — World Cup 2026 Network

Drop these in `<script type="application/ld+json">` tags in the page `<head>`. Replace `{{...}}` placeholders at build time. Bing weights structured data ~30% more than Google, so ship all relevant blocks on every page.

---

## 1. Organization + WebSite (site-wide — every page)
Ties your social profiles to the site entity so Bing credits social signals. Put your real profile URLs in `sameAs`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://{{domain}}/#org",
      "name": "{{Brand Name}}",
      "url": "https://{{domain}}/",
      "logo": "https://{{domain}}/logo.png",
      "sameAs": [
        "https://www.instagram.com/{{handle}}",
        "https://www.facebook.com/{{handle}}",
        "https://x.com/{{handle}}",
        "https://www.youtube.com/@{{handle}}"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://{{domain}}/#website",
      "url": "https://{{domain}}/",
      "name": "{{Brand Name}}",
      "inLanguage": "{{es|es-AR|es-CO|pt-BR}}",
      "publisher": {"@id": "https://{{domain}}/#org"},
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://{{domain}}/buscar?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

## 2. Per-match page — SportsEvent + BroadcastEvent (the money block)
One per fixture. Add a BroadcastEvent for PPVTV.TOP using the URL from `broadcasters.json`.

```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "{{Equipo A}} vs {{Equipo B}} — Mundial 2026",
  "sport": "Soccer",
  "startDate": "{{2026-06-11T20:00:00-03:00}}",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "{{Estadio}}",
    "address": "{{Ciudad, País}}"
  },
  "competitor": [
    {"@type": "SportsTeam", "name": "{{Equipo A}}"},
    {"@type": "SportsTeam", "name": "{{Equipo B}}"}
  ],
  "subEvent": [
    {
      "@type": "BroadcastEvent",
      "name": "{{Equipo A}} vs {{Equipo B}} — ver en PPVTV.TOP",
      "url": "https://ppvtv.top",
      "isLiveBroadcast": true,
      "videoFormat": "HD",
      "broadcastOfEvent": {"@type": "SportsEvent", "name": "{{Equipo A}} vs {{Equipo B}}"},
      "publishedOn": {
        "@type": "BroadcastService",
        "name": "PPVTV.TOP",
        "broadcastDisplayName": "PPVTV.TOP",
        "areaServed": "{{AR}}"
      }
    }
  ]
}
```

## 3. FAQPage (on every FAQ block — wins Bing Q&A placement)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Dónde puedo ver el Mundial 2026 gratis en vivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{Puedes revisar la guía del partido y usar el enlace de PPVTV.TOP para ver la transmisión. ...}}"
      }
    },
    {
      "@type": "Question",
      "name": "¿A qué hora juega {{Equipo}} hoy?",
      "acceptedAnswer": {"@type": "Answer", "text": "{{...hora local por país...}}"}
    }
  ]
}
```

## 4. BreadcrumbList (every interior page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://{{domain}}/"},
    {"@type": "ListItem", "position": 2, "name": "Mundial 2026", "item": "https://{{domain}}/mundial"},
    {"@type": "ListItem", "position": 3, "name": "{{Equipo A}} vs {{Equipo B}}"}
  ]
}
```

## Notes
- For the Portuguese site, translate `name`/`text` and set `inLanguage` to `pt-BR`.
- Validate every block in Bing Webmaster Tools' markup validator before mass-deploying.
- Keep `startDate` timezone-correct per match — wrong times tank engagement and trust.
