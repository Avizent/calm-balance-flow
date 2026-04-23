import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __PRERENDERED__?: boolean;
  }
}

const container = document.getElementById("root")!;

if (window.__PRERENDERED__) {
  // Hydrate the prerendered HTML produced by scripts/prerender.mjs
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
