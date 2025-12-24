import fs from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import pkg from './package.json'
import path from 'node:path'
import sass from 'sass'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    base: './',  // Use relative paths for Electron production builds
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@background': path.resolve(__dirname, 'background'),
        // Alias buffer to use the polyfill
        'buffer': 'buffer/',
        'stream': 'stream-browserify',
      },
    },
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      // Removed force: true to avoid re-optimization on every start
      include: [
        'buffer',
        'process',
        'stream-browserify',
        'bn.js',
      ],
      exclude: [
        'argon2-browser',
        'argon2-wasm-pro',
        'hash-wasm',
      ],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
      },
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
      rollupOptions: {
        // Removed problematic CommonJS and Node Resolve plugins
        // Will use lazy loading for blockchain libraries instead
      },
      target: 'esnext',
    },
    worker: {
      format: 'es',
      plugins: () => [wasm(), topLevelAwait()],
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      wasm(),
      topLevelAwait(),
      tailwindcss(),
      vue(),
      nodePolyfills({
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        // Polyfill Node.js built-in modules
        include: [
          'buffer',
          'process',
          'util',
          'stream',
          'events',
          'string_decoder',
          'crypto'
        ],
        // Override specific modules
        overrides: {
          fs: 'memfs',
        },
      }),
      electron({
        main: {
          entry: 'background/main/index.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log('[startup] Electron App')
            } else {
              startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist/background',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        preload: {
          input: 'background/preload/index.ts',
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined,
              minify: isBuild,
              outDir: 'dist/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        renderer: {},
      }),
    ],
    server: process.env.VSCODE_DEBUG && (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })(),
    clearScreen: false,
  }
})
