import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
  plugins: [
    // OpenPGP.js and other code paths require `globalThis.crypto.subtle`, which
    // browsers only expose in secure contexts (HTTPS, or localhost). Plain
    // `http://<LAN-ip>:5173` is not secure, so LAN testing must use HTTPS.
    basicSsl(),
    vue(),
    // WebAssembly ESM Integration: required by the Polkadot stack
    // (`@polkadot/wasm-crypto`, `@polkadot/wasm-bridge`,
    // `@polkadot/wasm-crypto-init`) and by other crypto deps that ship
    // `import init from 'pkg.wasm'` syntax (e.g. `tiny-secp256k1@2`).
    // Vite does not handle the WASM ESM proposal natively; this plugin
    // adapts those imports to Vite's module pipeline.
    wasm(),
    // Top-level `await` is required to instantiate WASM at module load time.
    // Browsers in legacy targets (and esbuild's default lowering) reject TLA
    // unless this plugin rewrites it into an async wrapper.
    topLevelAwait(),
  ],
  resolve: {
    alias: {
      // Mirror of `tsconfig.app.json` -> compilerOptions.paths["@/*"].
      // Required because many files under `src/lib/cores/currencyCore/currencies`
      // use `@/...` to reference modules from the `src/` root.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    // Eagerly prebundle every npm package the currency modules dynamically
    // import via `await import(...)`. Without this list, Vite only scans
    // *static* imports at startup, so each `await import('bs58')` etc.
    // triggers a serial rebundle at runtime — and concurrent rebundles
    // invalidate already-issued `?v=<hash>` URLs mid-flight, surfacing as
    // "Failed to fetch dynamically imported module" 504s in the browser.
    // Listing them here forces a single prebundle pass at startup.
    include: [
      // Node-compat polyfill (binding lives in `src/main.ts`); listed here so
      // Vite's prebundler ships it on the first request alongside the rest of
      // the crypto stack instead of deferring it to runtime.
      'buffer',
      // Noble suite
      '@noble/curves/ed25519.js',
      '@noble/curves/secp256k1.js',
      '@noble/ed25519',
      '@noble/hashes/blake2.js',
      // `hkdf.js` is statically imported by
      // `src/lib/cores/cryptographyCore/encryption.crypto.PublicKey.ed25519.ts`
      // (SPCK v2 / X25519 ECIES). Omitting it lets Vite discover the import
      // mid-request and trigger a prebundle rebundle that bumps every
      // `?v=<hash>` URL, surfacing as "Failed to fetch dynamically imported
      // module" on the next-largest in-flight chunk (typically @solana/web3.js).
      // See docs/findings/20260511.findings.sol.derive.failed.to.fetch.solana.web3.js.md.
      '@noble/hashes/hkdf.js',
      '@noble/hashes/legacy.js',
      '@noble/hashes/sha2.js',
      '@noble/hashes/utils.js',
      '@noble/secp256k1',
      // Scure suite
      '@scure/base',
      '@scure/bip32',
      '@scure/btc-signer',
      // Chain-specific SDKs
      '@solana/web3.js',
      '@stacks/network',
      '@stacks/transactions',
      '@stellar/stellar-base',
      '@waves/ts-lib-crypto',
      'algosdk',
      'arweave',
      'ripple-keypairs',
      'xrpl',
      // Encoding / key formats
      'bech32',
      'bip39',
      'bs58',
      'bs58check',
      'wif',
      // Crypto primitives
      'crypto-js',
      'libsodium-wrappers-sumo',
      'scrypt-js',
      'tweetnacl',
      // Bitcoin tooling
      'bitcoinjs-lib',
      'ecpair',
    ],
    // Only exclude packages that use the WebAssembly ESM Integration
    // Proposal (`import * as wasm from "./foo.wasm"`). Vite cannot
    // pre-bundle those because esbuild rejects the syntax; excluding them
    // forces the request through the dev-server pipeline where
    // `vite-plugin-wasm` is active.
    //
    // `tiny-secp256k1` v2 ships `wasm_loader.browser.js` with that exact
    // syntax — confirmed offender for this project.
    //
    // DO NOT add `@polkadot/wasm-*` here. Those packages load their WASM
    // via inline byte arrays + `WebAssembly.compile()` (no ESM-WASM
    // proposal usage), and they ship dual cjs/esm builds. Excluding them
    // causes Vite to serve the raw CJS bundle with no named exports, which
    // breaks the ESM import-graph (`bundle.js` -> `import { bytes } from
    // './bytes.js'` fails because `cjs/bytes.js` only has
    // `module.exports`). Let the prebundle step convert them.
    exclude: [
      'tiny-secp256k1',
    ],
  },
})
