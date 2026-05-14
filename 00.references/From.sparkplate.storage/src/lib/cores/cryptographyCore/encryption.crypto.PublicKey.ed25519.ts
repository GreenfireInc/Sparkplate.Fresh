// X25519 / SPCK v2 ECIES envelope for Ed25519-based recipients (SOL, XTZ tz1, …).
//
// Companion to `encryption.crypto.PublicKey.general.ts` (secp256k1 / SPCK v1). The two
// modules share the `"SPCK"` magic header; the version byte (`0x01` vs `0x02`)
// distinguishes the curve at decrypt time. The KDF is domain-separated by the
// `info` string so a shared point can never decrypt across envelope versions.
//
// Algorithm:
//   1. Convert the recipient's Ed25519 public key to its X25519 (Curve25519)
//      equivalent via the standard Edwards->Montgomery birational map
//      (libsodium's `crypto_sign_ed25519_pk_to_curve25519`).
//   2. Generate an ephemeral X25519 keypair (`@noble/curves/ed25519` `x25519`).
//   3. ECDH: `shared = X25519(ephemeralPriv, recipientX25519Pub)` (32 bytes).
//   4. KDF: `aesKey = HKDF-SHA256(shared, salt=ephemeralPub, info='sparkplate-x25519-v1', 32)`.
//   5. Encrypt with AES-256-GCM under a 12-byte random IV (WebCrypto `subtle`).
//
// Envelope layout (SPCK v2):
//   [4]  magic   = "SPCK"
//   [1]  version = 0x02
//   [32] ephemeralPublicKey (raw X25519 u-coordinate)
//   [12] iv
//   [N]  AES-GCM ciphertext + 16-byte auth tag

import { x25519 } from '@noble/curves/ed25519.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { hkdf } from '@noble/hashes/hkdf.js';
import bs58 from 'bs58';

import { SPCK_MAGIC } from './encryption.crypto.PublicKey.general';

/** Envelope version byte that identifies the X25519 / Ed25519-recipient layout. */
export const SPCK_VERSION_X25519 = 0x02;

/** Length, in bytes, of an X25519 (and Ed25519) public key. */
export const X25519_PUBKEY_LENGTH = 32;

/** Length, in bytes, of an Ed25519 secret-key seed. */
export const ED25519_SEED_LENGTH = 32;

const IV_LENGTH = 12;
const HEADER_LENGTH = SPCK_MAGIC.length + 1 + X25519_PUBKEY_LENGTH + IV_LENGTH;
const HKDF_INFO = new TextEncoder().encode('sparkplate-x25519-v1');

// Tezos `edsk...` base58check version-prefix bytes (4 bytes). When the input
// is the standard 40-byte edsk envelope, bytes `[4, 36)` are the 32-byte seed.
// (Documented in src/lib/cores/currencyCore/currencies/XTZ.Tezos.ts:414-444.)
const TEZOS_EDSK_PREFIX_LEN = 4;

const stripHexPrefix = (hex: string) => hex.replace(/^0x/i, '').trim();

const requireSubtleCrypto = (): SubtleCrypto => {
  if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
    throw new Error('Web Crypto (crypto.subtle) is not available in this environment');
  }
  return globalThis.crypto.subtle;
};

const concatBytes = (...arrays: ArrayLike<number>[]): Uint8Array<ArrayBuffer> => {
  const total = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
};

const hexToBytes = (hex: string): Uint8Array => {
  const h = stripHexPrefix(hex);
  if (h.length === 0 || h.length % 2 !== 0) {
    throw new Error('Hex string must have an even, non-zero length');
  }
  if (!/^[0-9a-fA-F]+$/.test(h)) {
    throw new Error('Hex string contains non-hex characters');
  }
  const bytes = new Uint8Array(h.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(h.substr(i * 2, 2), 16);
  }
  return bytes;
};

const tryDecodeBase58 = (value: string): Uint8Array | null => {
  try {
    return bs58.decode(value);
  } catch {
    return null;
  }
};

const tryParseJsonArray = (value: string): Uint8Array | null => {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[')) return null;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (
      Array.isArray(parsed) &&
      parsed.every((n) => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n <= 255)
    ) {
      return new Uint8Array(parsed as number[]);
    }
  } catch {
    /* fall through */
  }
  return null;
};

/**
 * Predicate: `value` is a Base58 string that decodes to exactly 32 bytes.
 * This is the shape Solana exposes for its derived public key (Ed25519 point
 * compressed to its 32 raw bytes, encoded with `bs58`).
 */
export const isBase58Ed25519PublicKey = (value: string): boolean => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Base58 alphabet sanity-check before paying the decode cost.
  if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(trimmed)) return false;
  const decoded = tryDecodeBase58(trimmed);
  return decoded !== null && decoded.length === ED25519_SEED_LENGTH;
};

/**
 * Predicate: `value` is exactly 64 hex characters (optionally `0x`-prefixed).
 * A 32-byte raw point in hex is unambiguously *not* SEC1
 * (compressed = 66 chars, uncompressed = 130), so this predicate cleanly
 * separates Tezos tz1 Ed25519 pubkeys from secp256k1 keys.
 */
export const isHexEd25519PublicKey = (value: string): boolean => {
  const h = stripHexPrefix(value);
  return /^[0-9a-fA-F]{64}$/.test(h);
};

/**
 * Returns true when `value` is recognized as an Ed25519 public key in any of
 * the encodings the UI may surface (Base58 32-byte for SOL, raw hex for XTZ).
 */
export const isEd25519PublicKey = (value: string): boolean =>
  isBase58Ed25519PublicKey(value) || isHexEd25519PublicKey(value);

/**
 * Decode an Ed25519 public key string (hex or Base58) to its raw 32 bytes.
 * Throws if `value` is not in one of the recognized encodings or doesn't
 * decode to exactly 32 bytes.
 */
export const normalizeEd25519PublicKey = (value: string): Uint8Array => {
  const trimmed = value.trim();
  if (!trimmed) throw new Error('Public key is empty');

  if (isHexEd25519PublicKey(trimmed)) {
    return hexToBytes(trimmed);
  }
  if (isBase58Ed25519PublicKey(trimmed)) {
    return tryDecodeBase58(trimmed)!;
  }
  throw new Error(
    'Public key is not a recognized Ed25519 encoding (expected 32-byte hex or Base58).',
  );
};

/**
 * Normalize a recipient's *private* material to a 32-byte Ed25519 seed.
 *
 * Accepts:
 *   - Tezos `edsk...` (base58check, 40 / 68 / 72 bytes after decode — bytes
 *     `[4, 36)` are the seed; matches `XTZ.Tezos.ts:428-442`).
 *   - Raw 32-byte hex (64 chars, optional `0x` prefix).
 *   - Solana base58 secret (32 bytes raw, or 64-byte `seed || pubkey` keypair).
 *   - Solana JSON-array keystore (32 or 64 numbers in `[0..255]`).
 */
export const normalizeEd25519Seed = (value: string | Uint8Array): Uint8Array => {
  if (value instanceof Uint8Array) {
    if (value.length === ED25519_SEED_LENGTH) return value;
    if (value.length === 64) return value.slice(0, ED25519_SEED_LENGTH);
    throw new Error(`Ed25519 seed must be 32 or 64 bytes, got ${value.length}`);
  }

  const trimmed = value.trim();
  if (!trimmed) throw new Error('Private key is empty');

  if (trimmed.startsWith('edsk')) {
    const decoded = tryDecodeBase58(trimmed);
    if (!decoded || decoded.length < TEZOS_EDSK_PREFIX_LEN + ED25519_SEED_LENGTH) {
      throw new Error(`Invalid Tezos edsk private key (decoded length ${decoded?.length ?? 0})`);
    }
    return decoded.slice(TEZOS_EDSK_PREFIX_LEN, TEZOS_EDSK_PREFIX_LEN + ED25519_SEED_LENGTH);
  }

  // JSON-array (Solana keystore format).
  const jsonBytes = tryParseJsonArray(trimmed);
  if (jsonBytes) {
    if (jsonBytes.length === ED25519_SEED_LENGTH) return jsonBytes;
    if (jsonBytes.length === 64) return jsonBytes.slice(0, ED25519_SEED_LENGTH);
    throw new Error(
      `JSON-array private key must contain 32 or 64 bytes, got ${jsonBytes.length}`,
    );
  }

  // Raw hex (64 or 128 chars).
  if (/^(0x)?[0-9a-fA-F]+$/.test(trimmed)) {
    const stripped = stripHexPrefix(trimmed);
    if (stripped.length === 64 || stripped.length === 128) {
      const bytes = hexToBytes(stripped);
      if (bytes.length === ED25519_SEED_LENGTH) return bytes;
      if (bytes.length === 64) return bytes.slice(0, ED25519_SEED_LENGTH);
    }
  }

  // Base58 fallback (Solana — most common).
  const base58Bytes = tryDecodeBase58(trimmed);
  if (base58Bytes) {
    if (base58Bytes.length === ED25519_SEED_LENGTH) return base58Bytes;
    if (base58Bytes.length === 64) return base58Bytes.slice(0, ED25519_SEED_LENGTH);
  }

  throw new Error(
    'Unrecognized Ed25519 private key format. Expected Tezos edsk..., raw 32-byte hex, ' +
      'Solana base58 (32 or 64 bytes), or JSON-array keystore.',
  );
};

// Minimal runtime surface of `libsodium-wrappers-sumo` that this module uses.
// The ESM build of libsodium attaches every `crypto_*` function to the
// *default* export object after `ready` resolves; they are NOT re-exported
// as named bindings (see
// docs/findings/20260511.findings.xtz.encrypt.libsodium.crypto.functions.on.default.export.md).
// Declaring only what we touch keeps the surface honest and immune to
// CJS/ESM `.d.ts` mismatches in upstream type packages.
interface SodiumRuntime {
  ready: Promise<void>;
  crypto_sign_ed25519_pk_to_curve25519: (pk: Uint8Array) => Uint8Array;
  crypto_sign_ed25519_sk_to_curve25519: (sk: Uint8Array) => Uint8Array;
  crypto_sign_seed_keypair: (seed: Uint8Array) => {
    publicKey: Uint8Array;
    privateKey: Uint8Array;
    keyType: 'ed25519';
  };
}

/**
 * Lazily load `libsodium-wrappers-sumo`. Idempotent: subsequent calls reuse
 * the same module reference once `sodium.ready` has resolved.
 *
 * libsodium exposes the standard Edwards->Montgomery conversion as one-line
 * helpers (`crypto_sign_ed25519_*_to_curve25519`). Implementing that map by
 * hand would require Edwards point decompression and modular inversion in
 * the field of order `2^255 - 19`; the libsodium primitives are widely
 * audited and roughly 25 KB of WASM that is already used elsewhere in this
 * project (XTZ keystore decryption).
 *
 * The ESM build only re-exports a handful of formatting helpers (`ready`,
 * `to_hex`, `from_base64`, …) as named bindings; every `crypto_*` primitive
 * lives on the default export object. We prefer `mod.default` and fall back
 * to the namespace so this module works under Vite's strict-ESM dev server,
 * Node ESM, and any bundler that does forward namespace access to default.
 */
let sodiumPromise: Promise<SodiumRuntime> | null = null;
const loadSodium = async (): Promise<SodiumRuntime> => {
  if (!sodiumPromise) {
    sodiumPromise = (async () => {
      const mod = (await import('libsodium-wrappers-sumo')) as unknown as {
        default?: SodiumRuntime;
      } & Partial<SodiumRuntime>;
      const sodium = (mod.default ?? (mod as unknown)) as SodiumRuntime;
      await sodium.ready;
      return sodium;
    })();
  }
  return sodiumPromise;
};

/**
 * Convert an Ed25519 public key (32 raw bytes) to its X25519 (Montgomery `u`)
 * equivalent. Wraps `libsodium.crypto_sign_ed25519_pk_to_curve25519`.
 */
export const ed25519PubToCurve25519 = async (
  edPub: Uint8Array,
): Promise<Uint8Array> => {
  if (edPub.length !== X25519_PUBKEY_LENGTH) {
    throw new Error(`Ed25519 public key must be 32 bytes, got ${edPub.length}`);
  }
  const sodium = await loadSodium();
  return sodium.crypto_sign_ed25519_pk_to_curve25519(edPub);
};

/**
 * Convert an Ed25519 *seed* (32 bytes) to an X25519 secret key (32 bytes).
 *
 * libsodium's helper expects the 64-byte secret-key form (`seed || pubkey`).
 * We derive the matching public key with `crypto_sign_seed_keypair` and then
 * call `crypto_sign_ed25519_sk_to_curve25519`. The resulting bytes are
 * pre-clamped per RFC 7748.
 */
export const ed25519SeedToCurve25519Priv = async (
  seed: Uint8Array,
): Promise<Uint8Array> => {
  if (seed.length !== ED25519_SEED_LENGTH) {
    throw new Error(`Ed25519 seed must be 32 bytes, got ${seed.length}`);
  }
  const sodium = await loadSodium();
  const { privateKey: ed25519FullSk } = sodium.crypto_sign_seed_keypair(seed);
  return sodium.crypto_sign_ed25519_sk_to_curve25519(ed25519FullSk);
};

/** Detect the SPCK v2 magic + version prefix on a candidate envelope. */
export const hasSpckX25519Header = (bytes: Uint8Array): boolean => {
  if (bytes.length < SPCK_MAGIC.length + 1) return false;
  for (let i = 0; i < SPCK_MAGIC.length; i++) {
    if (bytes[i] !== SPCK_MAGIC[i]) return false;
  }
  return bytes[SPCK_MAGIC.length] === SPCK_VERSION_X25519;
};

/** Result of an SPCK v2 encryption operation. */
export interface Ed25519PublicKeyEncryptionResult {
  /** Full encrypted envelope ready to be written to disk. */
  envelope: Uint8Array<ArrayBuffer>;
  /** Raw 32-byte X25519 ephemeral public key generated for this message. */
  ephemeralX25519PublicKey: Uint8Array<ArrayBuffer>;
  /** Random 12-byte IV used for the AES-GCM payload. */
  iv: Uint8Array<ArrayBuffer>;
}

/**
 * Encrypt arbitrary bytes to an Ed25519 recipient. The recipient's public key
 * may be supplied either as a Base58 string (Solana) or as a raw 32-byte hex
 * string (Tezos tz1) — `normalizeEd25519PublicKey` accepts both.
 */
export const encryptWithEd25519PublicKey = async (
  recipientPublicKey: string | Uint8Array,
  plaintext: Uint8Array,
): Promise<Ed25519PublicKeyEncryptionResult> => {
  const subtle = requireSubtleCrypto();

  const recipientEdPub =
    typeof recipientPublicKey === 'string'
      ? normalizeEd25519PublicKey(recipientPublicKey)
      : recipientPublicKey;

  if (recipientEdPub.length !== X25519_PUBKEY_LENGTH) {
    throw new Error(
      `Recipient Ed25519 public key must be 32 bytes, got ${recipientEdPub.length}`,
    );
  }

  const recipientXPub = await ed25519PubToCurve25519(recipientEdPub);

  // Ephemeral X25519 keypair for this single message.
  const ephemeral = x25519.keygen();
  const ephemeralPriv = ephemeral.secretKey;
  const ephemeralPub = ephemeral.publicKey;

  // ECDH on Curve25519: rejects low-order inputs that would otherwise yield
  // the all-zero shared secret.
  const shared = x25519.getSharedSecret(ephemeralPriv, recipientXPub);

  // Mix the ephemeral public key into the salt so each message produces a
  // distinct AES key even with identical plaintext + recipient.
  const aesKeyBytes = hkdf(sha256, shared, ephemeralPub, HKDF_INFO, 32);

  const iv = new Uint8Array(IV_LENGTH);
  globalThis.crypto.getRandomValues(iv);

  const aesKey = await subtle.importKey(
    'raw',
    Uint8Array.from(aesKeyBytes),
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );

  const ciphertextBuffer = await subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    plaintext as BufferSource,
  );
  const ciphertext = new Uint8Array(ciphertextBuffer);

  const versionByte = new Uint8Array([SPCK_VERSION_X25519]);
  const envelope = concatBytes(
    SPCK_MAGIC,
    versionByte,
    ephemeralPub,
    iv,
    ciphertext,
  );

  return {
    envelope,
    ephemeralX25519PublicKey: Uint8Array.from(ephemeralPub) as Uint8Array<ArrayBuffer>,
    iv: iv as Uint8Array<ArrayBuffer>,
  };
};

/**
 * Counterpart to {@link encryptWithEd25519PublicKey}. Recovers the plaintext
 * from an SPCK v2 envelope using the recipient's Ed25519 seed (32 bytes) in
 * any supported encoding (Tezos `edsk...`, Solana Base58 / JSON-array, raw
 * hex; see {@link normalizeEd25519Seed}).
 */
export const decryptWithEd25519PrivateKey = async (
  recipientPrivateKey: string | Uint8Array,
  envelope: Uint8Array,
): Promise<Uint8Array> => {
  const subtle = requireSubtleCrypto();

  if (envelope.length < HEADER_LENGTH) {
    throw new Error('Envelope is too short to be a valid SPCK v2 message');
  }
  for (let i = 0; i < SPCK_MAGIC.length; i++) {
    if (envelope[i] !== SPCK_MAGIC[i]) {
      throw new Error('Envelope does not have the expected SPCK magic header');
    }
  }
  const version = envelope[SPCK_MAGIC.length];
  if (version !== SPCK_VERSION_X25519) {
    throw new Error(
      `Unsupported SPCK envelope version for X25519 decrypt: 0x${version.toString(16).padStart(2, '0')}`,
    );
  }

  const ephemeralPub = envelope.slice(
    SPCK_MAGIC.length + 1,
    SPCK_MAGIC.length + 1 + X25519_PUBKEY_LENGTH,
  );
  const iv = envelope.slice(
    SPCK_MAGIC.length + 1 + X25519_PUBKEY_LENGTH,
    HEADER_LENGTH,
  );
  const ciphertext = envelope.slice(HEADER_LENGTH);

  const seed = normalizeEd25519Seed(recipientPrivateKey);
  const recipientXPriv = await ed25519SeedToCurve25519Priv(seed);

  const shared = x25519.getSharedSecret(recipientXPriv, ephemeralPub);
  const aesKeyBytes = hkdf(sha256, shared, ephemeralPub, HKDF_INFO, 32);

  const aesKey = await subtle.importKey(
    'raw',
    Uint8Array.from(aesKeyBytes),
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );

  const plaintextBuffer = await subtle.decrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    ciphertext as BufferSource,
  );
  return new Uint8Array(plaintextBuffer);
};
