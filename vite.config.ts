import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Vendor chunk splitting for better long-term caching:
    // these libraries change rarely, so isolating them lets users
    // re-use cached vendor chunks across app deploys.
    // NOTE: We intentionally do NOT lazy-split route components — the
    // Puppeteer prerender (scripts/prerender.mjs) + hydrateRoot flow
    // requires the matched route's code to be present synchronously.
    rollupOptions: {
      output: {
        // Keep ONLY the React core runtime isolated. Anything that *consumes*
        // React (router, helmet, radix, tanstack, etc.) stays in the default
        // vendor chunk — splitting them out previously caused circular
        // dependencies between react-vendor and vendor, which made React's
        // exports `undefined` when consumer modules ran during prerender
        // ("Cannot read properties of undefined (reading 'createContext')").
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-dom/client", "scheduler"],
        },
      },
    },
  },
}));
