/**
 * Regenerates fixtures.json from the openfootball World Cup 2026 dataset.
 *
 * Usage: node scripts/build-fixtures.mjs
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const SOURCE_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/refs/heads/master/2026/worldcup.json";

const OUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "..", "fixtures.json");

/** English (openfootball) -> Spanish team names */
const TEAM_ES = {
  Algeria: "Argelia",
  Argentina: "Argentina",
  Australia: "Australia",
  Austria: "Austria",
  Belgium: "Bélgica",
  "Bosnia & Herzegovina": "Bosnia y Herzegovina",
  Brazil: "Brasil",
  Canada: "Canadá",
  "Cape Verde": "Cabo Verde",
  Colombia: "Colombia",
  Croatia: "Croacia",
  Curaçao: "Curazao",
  "Czech Republic": "República Checa",
  "DR Congo": "RD Congo",
  Ecuador: "Ecuador",
  Egypt: "Egipto",
  England: "Inglaterra",
  France: "Francia",
  Germany: "Alemania",
  Ghana: "Ghana",
  Haiti: "Haití",
  Iran: "Irán",
  Iraq: "Iraq",
  "Ivory Coast": "Costa de Marfil",
  Japan: "Japón",
  Jordan: "Jordania",
  Mexico: "México",
  Morocco: "Marruecos",
  Netherlands: "Países Bajos",
  "New Zealand": "Nueva Zelanda",
  Norway: "Noruega",
  Panama: "Panamá",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Catar",
  "Saudi Arabia": "Arabia Saudita",
  Scotland: "Escocia",
  Senegal: "Senegal",
  "South Africa": "Sudáfrica",
  "South Korea": "Corea del Sur",
  Spain: "España",
  Sweden: "Suecia",
  Switzerland: "Suiza",
  Tunisia: "Túnez",
  Turkey: "Turquía",
  USA: "Estados Unidos",
  Uruguay: "Uruguay",
  Uzbekistan: "Uzbekistán",
};

/** openfootball ground -> [venue, city ES, country code] */
const GROUNDS = {
  Atlanta: ["Mercedes-Benz Stadium", "Atlanta", "US"],
  "Boston (Foxborough)": ["Gillette Stadium", "Boston", "US"],
  "Dallas (Arlington)": ["AT&T Stadium", "Dallas", "US"],
  "Guadalajara (Zapopan)": ["Estadio Akron", "Guadalajara", "MX"],
  Houston: ["NRG Stadium", "Houston", "US"],
  "Kansas City": ["Arrowhead Stadium", "Kansas City", "US"],
  "Los Angeles (Inglewood)": ["SoFi Stadium", "Los Ángeles", "US"],
  "Mexico City": ["Estadio Azteca", "Ciudad de México", "MX"],
  "Miami (Miami Gardens)": ["Hard Rock Stadium", "Miami", "US"],
  "Monterrey (Guadalupe)": ["Estadio BBVA", "Monterrey", "MX"],
  "New York/New Jersey (East Rutherford)": ["MetLife Stadium", "Nueva York", "US"],
  Philadelphia: ["Lincoln Financial Field", "Filadelfia", "US"],
  "San Francisco Bay Area (Santa Clara)": ["Levi's Stadium", "San Francisco", "US"],
  Seattle: ["Lumen Field", "Seattle", "US"],
  Toronto: ["BMO Field", "Toronto", "CA"],
  Vancouver: ["BC Place", "Vancouver", "CA"],
};

const STAGES = {
  "Round of 32": { stage: "r32", slug: "dieciseisavos" },
  "Round of 16": { stage: "r16", slug: "octavos" },
  "Quarter-final": { stage: "qf", slug: "cuartos" },
  "Semi-final": { stage: "sf", slug: "semifinal" },
  "Match for third place": { stage: "third", slug: "tercer-puesto" },
  Final: { stage: "final", slug: "final-mundial-2026" },
};

function slugify(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Translate knockout placeholders like "1A", "2B", "3A/B/C/D/F", "W73", "L101" */
function placeholderEs(code) {
  let m;
  if ((m = code.match(/^([12])([A-L])$/))) return `${m[1]}º Grupo ${m[2]}`;
  if ((m = code.match(/^3([A-L/]+)$/))) return `3º Grupo ${m[1]}`;
  if ((m = code.match(/^W(\d+)$/))) return `Ganador Partido ${m[1]}`;
  if ((m = code.match(/^L(\d+)$/))) return `Perdedor Partido ${m[1]}`;
  return code;
}

function teamEs(name) {
  return TEAM_ES[name] ?? placeholderEs(name);
}

/** "2026-06-11" + "13:00 UTC-6" -> "2026-06-11T13:00:00-06:00" */
function toIso(date, time) {
  const m = time.match(/^(\d{2}):(\d{2}) UTC([+-])(\d{1,2})$/);
  if (!m) throw new Error(`Unparseable time: ${time}`);
  const [, hh, mm, sign, off] = m;
  return `${date}T${hh}:${mm}:00${sign}${off.padStart(2, "0")}:00`;
}

const res = await fetch(SOURCE_URL);
if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
const data = await res.json();

const fixtures = [];
const groupCounters = {};

for (const m of data.matches) {
  const ground = GROUNDS[m.ground];
  if (!ground) throw new Error(`Unknown ground: ${m.ground}`);
  const [venue, city, country] = ground;
  const teamA = teamEs(m.team1);
  const teamB = teamEs(m.team2);
  const date = toIso(m.date, m.time);

  if (m.group) {
    const letter = m.group.replace("Group ", "");
    groupCounters[letter] = (groupCounters[letter] ?? 0) + 1;
    fixtures.push({
      id: `${letter.toLowerCase()}${groupCounters[letter]}`,
      group: letter,
      matchday: 0, // filled in below from within-group date order
      teamA,
      teamB,
      date,
      venue,
      city,
      country,
      slug: `${slugify(teamA)}-vs-${slugify(teamB)}-donde-ver`,
    });
  } else {
    const st = STAGES[m.round];
    if (!st) throw new Error(`Unknown round: ${m.round}`);
    const slug =
      st.stage === "third" || st.stage === "final"
        ? `${st.slug}-donde-ver`
        : `${st.slug}-partido-${m.num}-donde-ver`;
    fixtures.push({
      id: m.num ? `${st.stage}_${m.num}` : st.stage,
      group: null,
      matchday: null,
      teamA,
      teamB,
      date,
      venue,
      city,
      country,
      slug,
      stage: st.stage,
    });
  }
}

// Per-group "fecha" (round 1-3): 6 matches per group, 2 per round, in date order.
const byGroup = {};
for (const f of fixtures) {
  if (f.group) (byGroup[f.group] ??= []).push(f);
}
for (const list of Object.values(byGroup)) {
  list.sort((a, b) => new Date(a.date) - new Date(b.date));
  list.forEach((f, i) => (f.matchday = Math.floor(i / 2) + 1));
}

const slugs = new Set(fixtures.map((f) => f.slug));
if (slugs.size !== fixtures.length) throw new Error("Duplicate slugs detected");

writeFileSync(OUT_FILE, JSON.stringify(fixtures, null, 1) + "\n");
console.log(`Wrote ${fixtures.length} fixtures to ${OUT_FILE}`);
