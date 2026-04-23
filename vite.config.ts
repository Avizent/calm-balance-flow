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
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;

          // CRITICAL: React + everything that imports React at module top-level
          // must live in ONE chunk so React is initialized before any consumer
          // runs. Splitting these caused "Cannot read properties of undefined
          // (reading 'createContext')" during prerender because consumer
          // chunks executed before react-vendor.
          if (
            /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|react-helmet-async|@remix-run[\\/]router|history)[\\/]/.test(
              id,
            )
          ) {
            return "react-vendor";
          }

          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("embla-carousel")) return "carousel";
          if (id.includes("date-fns") || id.includes("react-day-picker")) {
            return "date";
          }
          return "vendor";
        },
      },
    },
  },
}));
