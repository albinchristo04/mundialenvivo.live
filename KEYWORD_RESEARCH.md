# Keyword Research — World Cup 2026 Network (Bing, ES + PT)

Grounded in live SERP/query patterns observed during the tournament window (June 2026). Use this to map keywords → pages. The build files carry each domain's own cluster; this is the cross-network reference and the modifier system.

---

## How fans actually search (the pattern)
Every query = **subject + intent modifier**. The subject is a match, a team, "the World Cup", or "today". The modifier signals intent:

| Intent | Spanish modifiers | Portuguese modifiers |
|---|---|---|
| Live | en vivo, en directo | ao vivo |
| Free | gratis, ver gratis, online gratis | grátis, de graça |
| Schedule/time | a qué hora, horario, calendario | que horas, horário (de Brasília) |
| Where/channel | dónde ver, qué canal, en qué canal, plataformas, canales | onde assistir, qual canal, transmissão |
| Today | hoy, partidos de hoy | hoje, jogos de hoje |
| Online | online, ver online, canal online | online, transmissão online |

**Bing notes**: target the *literal* modifier string in title + H1 + first 100 words. Question-format titles ("¿A qué hora juega…?", "Que horas é o jogo…?") get ~22% more Bing visibility. Per-match long-tail is the fast-rank target — head terms are owned by broadcasters/big media and won't move in days.

## Intent buckets → which page wins them
1. **Per-match (highest fast-rank value)** — "[A] vs [B] dónde ver / a qué hora / en qué canal", "onde assistir [seleção] hoje". Low competition, freshness-driven, one page per fixture per site.
2. **Free** — "ver el mundial gratis", "assistir copa grátis", "CazéTV ao vivo". High volume; answer honestly with the free official source (CazéTV / TV Pública / Globo open / SBT).
3. **Schedule** — "calendario mundial 2026 horarios canales", "jogos de hoje na TV". Recurring; the hub + daily pages.
4. **Where-to-watch by country** — "dónde ver el mundial en [país]". Country pages.
5. **Today / recurring** — "partidos de hoy", "jogos de hoje". Evergreen daily traffic, builds trust.

## Long-tail templates (generate per fixture)
**ES**: `{A} vs {B} dónde ver en vivo`, `{A} vs {B} a qué hora y en qué canal`, `{A} vs {B} online gratis`, `a qué hora juega {equipo} hoy`, `dónde ver {equipo} hoy`
**PT**: `{A} vs {B} onde assistir ao vivo`, `que horas é o jogo do {seleção}`, `{seleção} hoje ao vivo grátis`, `onde assistir {A} x {B}`

Multi-country kickoff block (real format fans expect — include on every ES match page):
`20:00 (ARG/URU) · 19:00 (CHI/VEN) · 18:00 (COL/PER/ECU) · 17:00 (CDMX)`

---

## Per-domain keyword map

### partidosdehoy.live (ES · daily hub · all countries)
- **Primary**: partidos de hoy · fútbol hoy · partidos de hoy en vivo
- **WC**: partidos del mundial hoy · mundial 2026 partidos de hoy · qué partidos del mundial hay hoy
- **Country**: partidos de hoy en argentina / colombia / méxico / …
- **Long-tail**: per-fixture templates above
- Role: owns "today" intent; daily freshness pulse.

### mundialenvivo.live (es-AR · AR + pan-Hispanic)
- **Primary**: mundial en vivo · mundial 2026 en vivo · ver el mundial en vivo
- **Cluster**: dónde ver el mundial 2026 · mundial 2026 canales / plataformas / precios · calendario mundial 2026 horarios canales
- **AR**: dónde ver el mundial en argentina · argentina vs {rival} dónde ver / a qué hora / qué canal
- **Long-tail**: {partido} en vivo · {partido} transmisión en vivo gratis

### mundialenvivo.sbs (es-CO · Colombia + Andean)
- **Primary**: mundial en vivo colombia · dónde ver el mundial en colombia
- **Cluster**: mundial 2026 colombia canales (Caracol · RCN · Win Sports) · ver el mundial gratis colombia
- **Andean**: dónde ver el mundial en ecuador / perú / venezuela / bolivia
- **Long-tail**: colombia vs {rival} dónde ver / a qué hora (times in Bogotá/Lima/Quito/Caracas)
- Differentiates from .live by region — no shared-keyword cannibalization.

### assistircopaaovivo.live (pt-BR · Brazil)
- **Primary**: assistir copa ao vivo · copa do mundo ao vivo · onde assistir a copa
- **Free (big)**: assistir copa do mundo 2026 grátis · copa ao vivo grátis · CazéTV ao vivo · jogo do brasil ao vivo grátis
- **Seleção**: que horas é o jogo do brasil · jogos do brasil na copa 2026 · brasil vs {rival} onde assistir / que horas
- **Daily**: jogos de hoje · jogos de hoje na tv · futebol ao vivo hoje
- Lead every free answer with CazéTV (YouTube, all 104 free) + Globo/SBT open TV.

---

## Negative / avoid
- Don't target broadcaster brand terms as primary (e.g. "globoplay copa", "directv mundial") — you'll lose to the brand and it adds nothing.
- Don't chase pure head terms ("mundial en vivo") expecting fast wins — support them, but win on long-tail now.
- No pirate-intent phrasing that implies an unlicensed stream ("ver mundial pirata", "rojadirecta…") — off-model and a de-indexing risk. "Gratis/grátis" is fine because the legal free answer is real.
