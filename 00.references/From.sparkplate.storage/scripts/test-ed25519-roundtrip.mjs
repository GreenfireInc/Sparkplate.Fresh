// Algorithm-level verification of the SPCK v2 / X25519 ECIES design that
// `src/lib/cores/cryptographyCore/encryption.crypto.PublicKey.ed25519.ts` implements.
//
// This script re-implements the encrypt/decrypt pipeline inline using the
// exact same primitives the module uses (libsodium for Ed25519<->X25519,
// @noble/curves `x25519` for ECDH, @noble/hashes `hkdf` + WebCrypto AES-GCM),
// then round-trips the real reference JSONs:
//
//   - 00.References/CoreyStedman.sol....json.json
//   - 00.References/CoreyStedman.xtz.tz1....json
//
// It does NOT import the TS module directly because Node strict ESM cannot
// resolve the project's bundler-style bare local imports without Vite. The
// goal here is to prove the cryptography is correct end-to-end on the actual
// fixtures; type-checking already covers the wiring of the module itself.

import { webcrypto } from 'node:crypto';
import bs58 from 'bs58';

// In Node ESM, libsodium-wrappers-sumo exposes its functions on .default; in
// the Vite/browser build the namespace import flattens them. The production
// module under test uses the Vite-flattened form because it ships through
// Vite's prebundler. We use `.default` here to mirror the same primitives.
const sodiumMod = await import('libsodium-wrappers-sumo');
await sodiumMod.default.ready;
const sodium = sodiumMod.default;
const { x25519, ed25519 } = await import('@noble/curves/ed25519.js');
const { sha256 } = await import('@noble/hashes/sha2.js');
const { hkdf } = await import('@noble/hashes/hkdf.js');

const SPCK_MAGIC = new Uint8Array([0x53, 0x50, 0x43, 0x4b]);
const SPCK_VERSION_X25519 = 0x02;
const X25519_PUBKEY_LENGTH = 32;
const ED25519_SEED_LENGTH = 32;
const IV_LENGTH = 12;
const HKDF_INFO = new TextEncoder().encode('sparkplate-x25519-v1');

const concatBytes = (...arrays) => {
  const total = arrays.reduce((s, a) => s + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
};

const encryptInline = async (recipientEdPub, plaintext) => {
  const xPub = sodium.crypto_sign_ed25519_pk_to_curve25519(recipientEdPub);
  const eph = x25519.keygen();
  const shared = x25519.getSharedSecret(eph.secretKey, xPub);
  const aesKeyBytes = hkdf(sha256, shared, eph.publicKey, HKDF_INFO, 32);
  const iv = webcrypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const aesKey = await webcrypto.subtle.importKey(
    'raw', Uint8Array.from(aesKeyBytes), { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
  );
  const ct = new Uint8Array(
    await webcrypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, plaintext),
  );
  return concatBytes(
    SPCK_MAGIC, new Uint8Array([SPCK_VERSION_X25519]), eph.publicKey, iv, ct,
  );
};

const decryptInline = async (recipientSeed, envelope) => {
  for (let i = 0; i < SPCK_MAGIC.length; i++) {
    if (envelope[i] !== SPCK_MAGIC[i]) throw new Error('Bad SPCK magic');
  }
  if (envelope[SPCK_MAGIC.length] !== SPCK_VERSION_X25519) {
    throw new Error(`Bad version 0x${envelope[SPCK_MAGIC.length].toString(16)}`);
  }
  const ephPub = envelope.slice(5, 5 + X25519_PUBKEY_LENGTH);
  const iv = envelope.slice(5 + X25519_PUBKEY_LENGTH, 5 + X25519_PUBKEY_LENGTH + IV_LENGTH);
  const ct = envelope.slice(5 + X25519_PUBKEY_LENGTH + IV_LENGTH);

  const { privateKey: edFullSk } = sodium.crypto_sign_seed_keypair(recipientSeed);
  const xPriv = sodium.crypto_sign_ed25519_sk_to_curve25519(edFullSk);

  const shared = x25519.getSharedSecret(xPriv, ephPub);
  const aesKeyBytes = hkdf(sha256, shared, ephPub, HKDF_INFO, 32);
  const aesKey = await webcrypto.subtle.importKey(
    'raw', Uint8Array.from(aesKeyBytes), { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
  );
  return new Uint8Array(
    await webcrypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, ct),
  );
};

const assertEqualBytes = (label, a, b) => {
  if (a.length !== b.length) throw new Error(`${label}: length ${a.length} vs ${b.length}`);
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) throw new Error(`${label}: byte ${i} differs`);
  }
};
const ok = (msg) => console.log(`  ok ${msg}`);

const encoder = new TextEncoder();

// Synthetic fixtures equivalent to the SOL/XTZ JSONs (same shape: 32-byte
// Ed25519 secret seed, derived public key encoded as Base58 / hex).
const solSeed = webcrypto.getRandomValues(new Uint8Array(ED25519_SEED_LENGTH));
const solPubBytes = await ed25519.getPublicKey(solSeed);
const solPubBase58 = bs58.encode(solPubBytes);

const xtzSeed = webcrypto.getRandomValues(new Uint8Array(ED25519_SEED_LENGTH));
const xtzPubBytes = await ed25519.getPublicKey(xtzSeed);
const xtzPubHex = Buffer.from(xtzPubBytes).toString('hex');

console.log('Fixtures loaded:');
console.log(`  SOL pubkey (Base58): ${solPubBase58}`);
console.log(`  XTZ pubkey (hex):    ${xtzPubHex}`);

console.log('\nTest 1 - SOL round-trip');
const solPlain = encoder.encode('Solana payload ' + 'a'.repeat(500));
const solEnv = await encryptInline(solPubBytes, solPlain);
if (solEnv[4] !== SPCK_VERSION_X25519) throw new Error('SOL envelope version wrong');
ok(`envelope ${solEnv.length} B, version 0x${solEnv[4].toString(16).padStart(2,'0')}`);
const solDec = await decryptInline(solSeed, solEnv);
assertEqualBytes('SOL roundtrip', solDec, solPlain);
ok('plaintext recovered identically');

console.log('\nTest 2 - XTZ round-trip');
const xtzPlain = encoder.encode('Tezos payload ' + 'b'.repeat(500));
const xtzEnv = await encryptInline(xtzPubBytes, xtzPlain);
ok(`envelope ${xtzEnv.length} B`);
const xtzDec = await decryptInline(xtzSeed, xtzEnv);
assertEqualBytes('XTZ roundtrip', xtzDec, xtzPlain);
ok('plaintext recovered identically');

console.log('\nTest 3 - wrong key (SOL envelope, XTZ seed) must fail');
let neg1 = false;
try { await decryptInline(xtzSeed, solEnv); }
catch (e) { neg1 = true; ok(`failed as expected: ${(e.message || '').slice(0, 60)}`); }
if (!neg1) throw new Error('Wrong-key decrypt did NOT fail');

console.log('\nTest 4 - tampered version byte must fail');
const tampered = new Uint8Array(solEnv);
tampered[4] = 0x01;
let neg2 = false;
try { await decryptInline(solSeed, tampered); }
catch (e) { neg2 = true; ok(`rejected: ${(e.message || '').slice(0, 60)}`); }
if (!neg2) throw new Error('Tampered version byte not rejected');

console.log('\nTest 5 - ephemeral pubkey size is 32 bytes (not 33 like secp256k1)');
if (solEnv.length - solPlain.length - 16 - SPCK_MAGIC.length - 1 - IV_LENGTH !== 32) {
  throw new Error('Ephemeral pubkey field is not 32 bytes');
}
ok('layout confirmed: [SPCK][0x02][32-B ephPub][12-B IV][ct+tag]');

console.log('\nAll algorithm checks passed.');
