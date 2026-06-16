export const site = {
  domain: "mundialenvivo.live",
  url: "https://mundialenvivo.live",
  brand: "Mundial en Vivo",
  tagline: "Dónde Ver el Mundial 2026 en Vivo",
  lang: "es-AR",
  locale: "es_AR",
  watchVerb: "ver",
  watchCta: "Ver en PPVTV.TOP",
  slugSuffix: "donde-ver",
  watchUrl: "https://ppvtv.top",
  watchName: "PPVTV.TOP",
  focusCountries: ["AR", "CO", "UY", "EC", "CL", "PE", "VE", "MX"],
  social: {
    instagram: "",
    facebook: "",
    x: "",
    youtube: "",
  },
  indexNowKey: process.env.INDEXNOW_KEY ?? "7789e9f16e7343e3bc7abeee9e13b316",
  description:
    "Guía oficial para ver el Mundial 2026 en vivo online. Dónde ver cada partido, horarios por país y canales. Transmisión gratis en PPVTV.TOP.",
  defaultKeywords:
    "mundial 2026 en vivo, ver mundial 2026 gratis, mundial en vivo, copa mundial 2026, world cup 2026 en vivo, partidos mundial 2026, mundial 2026 online, dónde ver el mundial 2026, transmisión mundial 2026, fútbol en vivo, mundial gratis online",
} as const;

export type Site = typeof site;
