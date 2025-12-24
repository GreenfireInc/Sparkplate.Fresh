import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import packageJson from "./package.json";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy NFD API requests to avoid CORS issues
      '/api/nfd': {
        target: 'https://api.nf.domains',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nfd/, '/nfd'),
        secure: true,
      },
      '/api/testnet-nfd': {
        target: 'https://api.testnet.nf.domains',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/testnet-nfd/, '/nfd'),
        secure: true,
      },
    },
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "buffer": "buffer",
      "stream": "stream-browserify",
      "util": "util",
      "events": "events",
    },
  },
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
    'global': 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['argon2-browser', 'argon2-wasm-pro', 'hash-wasm'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  worker: {
    format: 'es',
    plugins: () => [wasm(), topLevelAwait()],
  },
}));
