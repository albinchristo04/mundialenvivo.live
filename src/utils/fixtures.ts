import rawFixtures from "../../fixtures.json";

export interface Fixture {
  id: string;
  group: string | null;
  matchday: number | null;
  teamA: string;
  teamB: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  slug: string;
  stage?: string;
}

export const fixtures: Fixture[] = rawFixtures as Fixture[];

export function groupFixtures(): Fixture[] {
  return fixtures.filter((f) => f.group !== null);
}

export function upcomingFixtures(n = 8): Fixture[] {
  const now = Date.now();
  return fixtures
    .filter((f) => new Date(f.date).getTime() > now - 7200_000)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, n);
}

/** Argentina time is UTC-3 year-round (no daylight saving) */
const TZ_OFFSETS: Record<string, number> = {
  "ARG/URU": -3,
  "CHI/VEN": -4,
  "COL/PER/ECU": -5,
  CDMX: -6,
};

export function multiTzBlock(isoDate: string): string {
  const d = new Date(isoDate);
  const parts = Object.entries(TZ_OFFSETS).map(([label, offset]) => {
    const local = new Date(d.getTime() + offset * 3600_000);
    const hh = String(local.getUTCHours()).padStart(2, "0");
    const mm = String(local.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm} (${label})`;
  });
  return parts.join(" · ");
}

export function formatDateEs(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  });
}
