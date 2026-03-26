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
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

// Plugin to resolve @noble packages that export with .js extension
function nobleResolver() {
  return {
    name: 'noble-resolver',
    enforce: 'pre' as const,
    resolveId(source: string, importer?: string) {
      // IMPORTANT:
      // Do NOT rewrite noble imports coming from node_modules.
      // Several deps (ethers, stacks, etc) depend on older @noble/hashes layouts
      // and must resolve their own nested versions.
      if (!importer || importer.includes('node_modules')) return null

      // Only help *our* source files that import noble subpaths without `.js`
      if (source.startsWith('@noble/hashes/') && !source.endsWith('.js')) {
        const subpath = source.replace('@noble/hashes/', '')
        try {
          return require.resolve(`@noble/hashes/${subpath}.js`)
        } catch {
          return null
        }
      }

      if (source.startsWith('@noble/curves/') && !source.endsWith('.js')) {
        const subpath = source.replace('@noble/curves/', '')
        try {
          return require.resolve(`@noble/curves/${subpath}.js`)
        } catch {
          return null
        }
      }

      return null
    }
  }
}

// Plugin to rewrite Node built-in require() calls in CJS source files.
// resolveId hooks don't intercept these in Vite 6 (built-ins are marked external
// before plugins run). Instead we rewrite the source in the transform phase,
// replacing require("buffer") with a {Buffer} reference so the @rollup/plugin-inject
// (from vite-plugin-node-polyfills) then injects the proper ESM import for Buffer.
function nodeBuiltinsResolver() {
  return {
    name: 'node-builtins-resolver',
    enforce: 'pre' as const,

    transform(code: string, id: string) {
      // Only process files in node_modules that have these require calls
      if (!id.includes('node_modules')) return null

      let changed = false
      let result = code

      const bufferRe = /require\(["'](buffer|safe-buffer)["']\)/g
      if (bufferRe.test(result)) {
        // Replace with {Buffer} — @rollup/plugin-inject then adds:
        // `import { Buffer } from 'vite-plugin-node-polyfills/shims/buffer'`
        result = result.replace(/require\(["'](buffer|safe-buffer)["']\)/g, '({Buffer})')
        changed = true
      }

      return changed ? { code: result, map: null } : null
    },
  }
}

// Plugin to resolve libsodium-wrappers-sumo relative import issue
function libsodiumResolver() {
  return {
    name: 'libsodium-resolver',
    enforce: 'pre' as const,
    resolveId(source: string, importer?: string) {
      // Fix the relative import in libsodium-wrappers-sumo that references ./libsodium-sumo.mjs
      // This should actually point to the libsodium-sumo package
      if (source === './libsodium-sumo.mjs' && importer?.includes('libsodium-wrappers-sumo')) {
        try {
          return require.resolve('libsodium-sumo/dist/modules-sumo-esm/libsodium-sumo.mjs')
        } catch {
          return null
        }
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  // const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  const sourcemap = true
  
  return {
    base: './',  // Use relative paths for Electron production builds
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@background': path.resolve(__dirname, 'background'),
        'stream': 'stream-browserify',
        // Fix libsodium-wrappers-sumo ESM import issue - use CJS version instead
        // The ESM version tries to import './libsodium-sumo.mjs' which fails during esbuild bundling
        'libsodium-wrappers-sumo': path.resolve(__dirname, 'node_modules/libsodium-wrappers-sumo/dist/modules-sumo/libsodium-wrappers.js'),
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
        '@noble/hashes',
        '@noble/curves',
        '@noble/secp256k1',
      ],
      exclude: [
        'argon2-browser',
        'argon2-wasm-pro',
        'hash-wasm',
        // Exclude @noble/ed25519 so its etc object remains mutable for sha512Sync configuration
        '@noble/ed25519',
        // Exclude libsodium packages - their ESM exports have relative imports that break esbuild
        'libsodium-wrappers-sumo',
        'libsodium-sumo',
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
      nodeBuiltinsResolver(),
      nobleResolver(),
      libsodiumResolver(),
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
