import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import wasm from "vite-plugin-wasm";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    wasm(),
    react(),
    mode === "development" && componentTagger(),
    nodePolyfills({
      include: ["buffer", "crypto", "stream", "util"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ].filter(Boolean),
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  build: {
    target: "esnext",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
    esbuildOptions: {
      target: "esnext",
      define: {
        global: "window",
      },
    },
    exclude: ["@skunkteam/aes-siv"], // Exclude WASM module from optimization
  },
  define: {
    // Ensure globals are available for WASM and CommonJS modules
    'global': 'globalThis',
    'module.exports': '{}',
  },
}));
