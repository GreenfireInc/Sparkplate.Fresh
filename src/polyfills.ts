// Polyfill for Buffer (Node.js compatibility)
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
  (window as any).global = window;
  (window as any).process = { env: {} };
}

// Polyfill for crypto.getRandomValues
if (typeof window !== 'undefined' && !window.crypto) {
  window.crypto = {} as Crypto;
}

if (typeof window !== 'undefined' && window.crypto && !window.crypto.getRandomValues) {
  window.crypto.getRandomValues = function(array: Uint8Array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  };
}

// Configure @noble/ed25519 with SHA-512 implementation (required for Solana)
// Reference: docs/from/loginStandard/progress/09022025.progress.solana.sha512fix.md
//
// NOTE: @noble/ed25519 v3 expects `hashes.sha512` to be set (not `etc.sha512Sync`).
// Also, noble-hashes exports SHA-512 from `@noble/hashes/sha2.js` in our setup.
import * as ed25519 from '@noble/ed25519'
import { sha512 } from '@noble/hashes/sha2.js'

ed25519.hashes.sha512 = sha512
ed25519.hashes.sha512Async = (m: Uint8Array) => Promise.resolve(sha512(m))

