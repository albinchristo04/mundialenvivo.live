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
    instagram: "{{instagram_handle}}",
    facebook: "{{facebook_handle}}",
    x: "{{x_handle}}",
    youtube: "{{youtube_handle}}",
  },
  indexNowKey: process.env.INDEXNOW_KEY ?? "7789e9f16e7343e3bc7abeee9e13b316",
  description:
    "Guía oficial para ver el Mundial 2026 en vivo online. Dónde ver cada partido, horarios por país y canales. Transmisión gratis en PPVTV.TOP.",
} as const;

export type Site = typeof site;
