import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mundialenvivo.live",
  output: "static",
  integrations: [],
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },
});
