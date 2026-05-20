import * as secp from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha2.js';
import { hmac } from '@noble/hashes/hmac.js';
import { hkdf } from '@noble/hashes/hkdf.js';

// Wire sync hash helpers required by @noble/secp256k1 v3 (idempotent).
secp.hashes.sha256 = sha256;
secp.hashes.hmacSha256 = (key, msg) => hmac(sha256, key, msg);

/**
 * File-magic identifying envelopes produced by this module: ASCII "SPCK"
 * followed by a single version byte. Allows decryptors to detect the
 * Sparkplate Crypto-pubKey ECIES format and reject unrelated blobs.
 */
export const SPCK_MAGIC = new Uint8Array([0x53, 0x50, 0x43, 0x4b]);
export const SPCK_VERSION = 0x01;

/** File extension recommended for ECIES-encrypted output. */
export const CRYPTO_PUBKEY_FILE_EXTENSION = 'spck';

const HKDF_INFO = new TextEncoder().encode('sparkplate-ecies-v1');
const IV_LENGTH = 12;
const COMPRESSED_PUBKEY_LENGTH = 33;
const HEADER_LENGTH = SPCK_MAGIC.length + 1 + COMPRESSED_PUBKEY_LENGTH + IV_LENGTH;

const stripHexPrefix = (hex: string) => hex.replace(/^0x/i, '').trim();

const hexToBytes = (hex: string): Uint8Array<ArrayBuffer> => {
  const h = stripHexPrefix(hex);
  if (h.length === 0 || h.length % 2 !== 0) {
    throw new Error('Public key hex must have an even, non-zero length');
  }
  if (!/^[0-9a-fA-F]+$/.test(h)) {
    throw new Error('Public key contains non-hex characters');
  }
  const bytes = new Uint8Array(h.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(h.substr(i * 2, 2), 16);
  }
  return bytes;
};

/**
 * Returns true when `value` looks like a SEC1-encoded secp256k1 public key in
 * hex (compressed `02|03 + 32 bytes` or uncompressed `04 + 64 bytes`).
 * Optional `0x` prefix is allowed.
 */
export const isHexCryptoPublicKey = (value: string): boolean => {
  const h = stripHexPrefix(value);
  return /^(02|03)[0-9a-fA-F]{64}$/.test(h) || /^04[0-9a-fA-F]{128}$/.test(h);
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

const requireSubtleCrypto = (): SubtleCrypto => {
  if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
    throw new Error('Web Crypto (crypto.subtle) is not available in this environment');
  }
  return globalThis.crypto.subtle;
};

const requireGetRandomValues = (): Crypto => {
  if (
    typeof globalThis.crypto === 'undefined' ||
    typeof globalThis.crypto.getRandomValues !== 'function'
  ) {
    throw new Error('crypto.getRandomValues is not available in this environment');
  }
  return globalThis.crypto;
};

/** Result of an ECIES encryption operation. */
export interface CryptoPublicKeyEncryptionResult {
  /** Full encrypted envelope ready to be written to disk. */
  envelope: Uint8Array<ArrayBuffer>;
  /** SEC1-encoded compressed ephemeral public key generated for this message. */
  ephemeralPublicKey: Uint8Array<ArrayBuffer>;
  /** Random IV used for the AES-GCM payload. */
  iv: Uint8Array<ArrayBuffer>;
}

/**
 * Encrypt arbitrary bytes to a secp256k1 recipient public key using ECIES:
 *
 *   1. Generate an ephemeral secp256k1 keypair.
 *   2. Derive `sharedX = ECDH(ephemeralPriv, recipientPub).x` (32 bytes).
 *   3. `aesKey = HKDF-SHA256(sharedX, salt=ephemeralPub, info='sparkplate-ecies-v1', 32)`.
 *   4. Encrypt plaintext with AES-256-GCM using a 12-byte random IV.
 *
 * The returned envelope is laid out as:
 *
 *   [4]  magic   = "SPCK"
 *   [1]  version = 0x01
 *   [33] ephemeralPublicKey (compressed)
 *   [12] iv
 *   [N]  AES-GCM ciphertext + 16-byte auth tag
 */
export const encryptWithCryptoPublicKey = async (
  recipientPublicKey: string | Uint8Array,
  plaintext: Uint8Array,
): Promise<CryptoPublicKeyEncryptionResult> => {
  const subtle = requireSubtleCrypto();
  const cryptoApi = requireGetRandomValues();

  const recipientBytes =
    typeof recipientPublicKey === 'string'
      ? hexToBytes(recipientPublicKey)
      : recipientPublicKey;

  if (
    recipientBytes.length !== 33 &&
    recipientBytes.length !== 65
  ) {
    throw new Error(
      'Recipient public key must be a SEC1-encoded secp256k1 key (33 bytes compressed or 65 bytes uncompressed)',
    );
  }
  if (!secp.utils.isValidPublicKey(recipientBytes, recipientBytes.length === 33)) {
    throw new Error('Recipient public key is not a valid secp256k1 point');
  }

  const ephemeralPrivateKey = secp.utils.randomSecretKey();
  const ephemeralPublicKey: Uint8Array<ArrayBuffer> = Uint8Array.from(
    secp.getPublicKey(ephemeralPrivateKey, true),
  );

  // ECDH returns a SEC1-encoded point; drop the 1-byte prefix to get the
  // 32-byte X coordinate, which is what ECIES uses as input keying material.
  const sharedPoint = Uint8Array.from(
    secp.getSharedSecret(ephemeralPrivateKey, recipientBytes, true),
  );
  const sharedX = sharedPoint.slice(1);

  // Mix the ephemeral public key into the salt so each message produces a
  // distinct AES key even with deterministic plaintext.
  const aesKeyBytes = hkdf(sha256, sharedX, ephemeralPublicKey, HKDF_INFO, 32);

  const iv = new Uint8Array(IV_LENGTH);
  cryptoApi.getRandomValues(iv);

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

  const versionByte = new Uint8Array([SPCK_VERSION]);
  const envelope = concatBytes(
    SPCK_MAGIC,
    versionByte,
    ephemeralPublicKey,
    iv,
    ciphertext,
  );

  return {
    envelope,
    ephemeralPublicKey,
    iv,
  };
};

/**
 * Counterpart to {@link encryptWithCryptoPublicKey}. Recovers the plaintext
 * from an ECIES envelope using the recipient's secp256k1 private key.
 */
export const decryptWithCryptoPrivateKey = async (
  recipientPrivateKey: string | Uint8Array,
  envelope: Uint8Array,
): Promise<Uint8Array> => {
  const subtle = requireSubtleCrypto();

  if (envelope.length < HEADER_LENGTH) {
    throw new Error('Envelope is too short to be a valid SPCK message');
  }

  for (let i = 0; i < SPCK_MAGIC.length; i++) {
    if (envelope[i] !== SPCK_MAGIC[i]) {
      throw new Error('Envelope does not have the expected SPCK magic header');
    }
  }
  const version = envelope[SPCK_MAGIC.length];
  if (version !== SPCK_VERSION) {
    throw new Error(`Unsupported SPCK envelope version: ${version}`);
  }

  const ephemeralPublicKey = envelope.slice(
    SPCK_MAGIC.length + 1,
    SPCK_MAGIC.length + 1 + COMPRESSED_PUBKEY_LENGTH,
  );
  const iv = envelope.slice(
    SPCK_MAGIC.length + 1 + COMPRESSED_PUBKEY_LENGTH,
    HEADER_LENGTH,
  );
  const ciphertext = envelope.slice(HEADER_LENGTH);

  const privateBytes =
    typeof recipientPrivateKey === 'string'
      ? hexToBytes(recipientPrivateKey)
      : recipientPrivateKey;
  if (privateBytes.length !== 32) {
    throw new Error('Private key must be 32 bytes (64 hex chars)');
  }
  if (!secp.utils.isValidSecretKey(privateBytes)) {
    throw new Error('Private key is out of valid secp256k1 range');
  }

  const sharedPoint = secp.getSharedSecret(privateBytes, ephemeralPublicKey, true);
  const sharedX = sharedPoint.slice(1);
  const aesKeyBytes = hkdf(sha256, sharedX, ephemeralPublicKey, HKDF_INFO, 32);

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
    ciphertext,
  );
  return new Uint8Array(plaintextBuffer);
};
