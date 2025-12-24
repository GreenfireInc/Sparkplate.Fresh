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
import { createRequire } from 'node:module'
import sass from 'sass'
import tailwindcss from '@tailwindcss/vite'

const require = createRequire(import.meta.url)

// Map of @noble imports to their actual file paths within the package
// Note: @noble/hashes v2 only exports .js files directly, no esm folder
const noblePathMappings: Record<string, { pkg: string; file: string }> = {
  // @noble/curves - direct .js files in package root
  '@noble/curves/ed25519': { pkg: '@noble/curves', file: 'ed25519.js' },
  '@noble/curves/secp256k1': { pkg: '@noble/curves', file: 'secp256k1.js' },
  '@noble/curves/utils': { pkg: '@noble/curves', file: 'utils.js' },
  '@noble/curves/abstract/utils': { pkg: '@noble/curves', file: 'utils.js' },
  '@noble/curves/abstract/modular': { pkg: '@noble/curves', file: 'abstract/modular.js' },
  '@noble/curves/abstract/weierstrass': { pkg: '@noble/curves', file: 'abstract/weierstrass.js' },
  '@noble/curves/abstract/edwards': { pkg: '@noble/curves', file: 'abstract/edwards.js' },
  '@noble/curves/abstract/curve': { pkg: '@noble/curves', file: 'abstract/curve.js' },
  // @noble/hashes - direct .js files in package root
  // Note: sha256/sha512 -> sha2.js, ripemd160 -> legacy.js, blake2b -> blake2.js
  '@noble/hashes/hmac': { pkg: '@noble/hashes', file: 'hmac.js' },
  '@noble/hashes/pbkdf2': { pkg: '@noble/hashes', file: 'pbkdf2.js' },
  '@noble/hashes/sha256': { pkg: '@noble/hashes', file: 'sha2.js' },
  '@noble/hashes/sha512': { pkg: '@noble/hashes', file: 'sha2.js' },
  '@noble/hashes/sha2': { pkg: '@noble/hashes', file: 'sha2.js' },
  '@noble/hashes/sha3': { pkg: '@noble/hashes', file: 'sha3.js' },
  '@noble/hashes/ripemd160': { pkg: '@noble/hashes', file: 'legacy.js' },
  '@noble/hashes/blake2b': { pkg: '@noble/hashes', file: 'blake2.js' },
  '@noble/hashes/blake2s': { pkg: '@noble/hashes', file: 'blake2.js' },
  '@noble/hashes/blake2': { pkg: '@noble/hashes', file: 'blake2.js' },
  '@noble/hashes/scrypt': { pkg: '@noble/hashes', file: 'scrypt.js' },
  '@noble/hashes/utils': { pkg: '@noble/hashes', file: 'utils.js' },
  '@noble/hashes/legacy': { pkg: '@noble/hashes', file: 'legacy.js' },
  '@noble/hashes/hkdf': { pkg: '@noble/hashes', file: 'hkdf.js' },
}

// Helper function to resolve the absolute path to a @noble module
function resolveNoblePath(importPath: string): string | null {
  const mapping = noblePathMappings[importPath]
  if (!mapping) return null
  
  try {
    // Get the package.json path to find the package root
    const pkgJsonPath = require.resolve(`${mapping.pkg}/package.json`)
    const pkgRoot = path.dirname(pkgJsonPath)
    return path.join(pkgRoot, mapping.file)
  } catch {
    // Fallback to node_modules path
    return path.resolve(__dirname, 'node_modules', mapping.pkg, mapping.file)
  }
}

// Vite plugin to fix @noble package imports
function nobleAliasPlugin() {
  return {
    name: 'vite-noble-alias-fix',
    enforce: 'pre' as const,
    resolveId(source: string) {
      const resolved = resolveNoblePath(source)
      if (resolved) {
        return resolved
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
        // @noble packages - core crypto libraries
        '@noble/curves',
        '@noble/hashes',
        '@noble/secp256k1',
        '@noble/ed25519',
        // @scure packages - depend on @noble
        '@scure/bip32',
        '@scure/bip39',
        '@scure/btc-signer',
        '@scure/base',
        // Packages that import @noble
        'bip39',
        'c32check',
        '@stacks/transactions',
        '@stacks/encryption',
        '@stacks/common',
        '@polkadot/util-crypto',
        '@polkadot/keyring',
        '@polkadot/util',
        '@polkadot/wasm-crypto',
        '@polkadot/wasm-crypto-wasm',
        '@polkadot/wasm-crypto-asmjs',
        '@polkadot/wasm-util',
        '@polkadot/networks',
        '@polkadot/x-randomvalues',
        '@polkadot/x-bigint',
        '@polkadot/x-global',
        '@polkadot/x-textdecoder',
        '@polkadot/x-textencoder',
        '@xrplf/isomorphic',
        'ripple-keypairs',
        'xrpl',
        // Other crypto/blockchain packages
        '@taquito/taquito',
        '@taquito/tzip16',
        '@taquito/signer',
        '@taquito/utils',
        '@taquito/local-forging',
        'lucide-vue-next',
        '@solana/web3.js',
        '@bonfida/spl-name-service',
        'scrypt-js',
        'libsodium-wrappers-sumo',
        'ecpair',
        'bitcoinjs-lib',
        'tiny-secp256k1',
        'bs58check',
        'ethers',
        'tronweb',
        'web3',
        'react',
        'lucide-react',
      ],
      entries: [
        'index.html',
        '!src/lib/currencyCore/currencies/ext/**/*.tsx',
        '!src/lib/currencyCore/domains/**/*.tsx',
      ],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        supported: {
          'top-level-await': true
        },
        mainFields: ['module', 'main'],
        resolveExtensions: ['.js', '.ts', '.mjs', '.json'],
        plugins: [
          {
            name: 'noble-esbuild-resolver',
            setup(build) {
              // Handle @noble imports - resolve to absolute paths
              build.onResolve({ filter: /^@noble\/(curves|hashes)/ }, (args) => {
                // First try our mapping table
                const resolved = resolveNoblePath(args.path)
                if (resolved && fs.existsSync(resolved)) {
                  return { path: resolved }
                }
                
                // Fallback: try to resolve the path directly
                const match = args.path.match(/^(@noble\/(?:curves|hashes))(?:\/(.*))?$/)
                if (match) {
                  const [, pkg, subpath] = match
                  try {
                    const pkgJsonPath = require.resolve(`${pkg}/package.json`)
                    const pkgRoot = path.dirname(pkgJsonPath)
                    
                    if (subpath) {
                      // Try with and without .js extension
                      const candidates = [
                        path.join(pkgRoot, subpath),
                        path.join(pkgRoot, `${subpath}.js`),
                      ]
                      for (const candidate of candidates) {
                        if (fs.existsSync(candidate)) {
                          return { path: candidate }
                        }
                      }
                    }
                  } catch {}
                }
                
                // Let esbuild handle it normally if we can't resolve
                return undefined
              })
            },
          },
        ],
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
      nobleAliasPlugin(), // Add custom plugin FIRST
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
