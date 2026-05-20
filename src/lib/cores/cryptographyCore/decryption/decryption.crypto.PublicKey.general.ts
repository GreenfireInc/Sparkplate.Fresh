import { SUPPORTED_TICKERS } from '../../bridge/bridge.Cryptography.Via.Currency';
import {
  CRYPTO_PUBKEY_FILE_EXTENSION,
  SPCK_MAGIC,
  decryptWithCryptoPrivateKey,
} from '../encryption/encryption.crypto.PublicKey.general';
import {
  SPCK_VERSION_X25519,
  decryptWithEd25519PrivateKey,
  hasSpckX25519Header,
} from '../encryption/encryption.crypto.PublicKey.ed25519';

const SUPPORTED_TICKER_SET = new Set(SUPPORTED_TICKERS.map((t) => t.toUpperCase()));

/** True when bytes begin with the shared SPCK file magic (ASCII `SPCK`). */
export function hasSpckMagic(bytes: Uint8Array): boolean {
  if (bytes.length < SPCK_MAGIC.length) return false;
  for (let i = 0; i < SPCK_MAGIC.length; i++) {
    if (bytes[i] !== SPCK_MAGIC[i]) return false;
  }
  return true;
}

/**
 * Restores the original filename for SPCK plaintext downloads: drops `.spck` and an optional preceding
 * `.TICKER` segment when the ticker is registered (mirrors encrypt-side naming).
 */
export function stripSpckSuffix(name: string): string {
  const withoutExt = name.replace(
    new RegExp(`\\.${CRYPTO_PUBKEY_FILE_EXTENSION}$`, 'i'),
    '',
  );
  if (withoutExt === name) return name;
  const tickerMatch = withoutExt.match(/\.([A-Za-z0-9]+)$/);
  const tickerCandidate = tickerMatch?.[1];
  if (tickerCandidate && SUPPORTED_TICKER_SET.has(tickerCandidate.toUpperCase())) {
    return withoutExt.slice(0, -(tickerCandidate.length + 1));
  }
  return withoutExt;
}

export type TryDecryptSpckFileResult =
  | { success: true; plaintext: Uint8Array; outputName: string; statusMessage: string }
  | { success: false; errorMessage: string };

/**
 * If `fileBytes` are an SPCK envelope, decrypts with **ticker-native** `trimmedPrivateKey` (secp256k1 v1 or Ed25519/X25519 v2).
 * Returns `null` if the blob is not SPCK — caller should try OpenPGP armored decrypt.
 */
export async function tryDecryptSpckFile(
  fileBytes: Uint8Array,
  trimmedPrivateKey: string,
  originalFileName: string,
): Promise<TryDecryptSpckFileResult | null> {
  if (!hasSpckMagic(fileBytes)) return null;

  const outputName = stripSpckSuffix(originalFileName);

  if (hasSpckX25519Header(fileBytes)) {
    const plaintext = await decryptWithEd25519PrivateKey(trimmedPrivateKey, fileBytes);
    return {
      success: true,
      plaintext,
      outputName,
      statusMessage: 'File decrypted with Ed25519 private key (SPCK v2 / X25519 ECIES)!',
    };
  }

  const versionIndex = SPCK_MAGIC.length;
  const versionByte = fileBytes[versionIndex];
  if (versionByte === undefined) {
    return {
      success: false,
      errorMessage: 'SPCK envelope is truncated (missing version byte).',
    };
  }
  if (versionByte !== 0x01) {
    return {
      success: false,
      errorMessage: `Unknown SPCK envelope version 0x${versionByte.toString(16).padStart(2, '0')}. Expected 0x01 (secp256k1) or 0x${SPCK_VERSION_X25519.toString(16).padStart(2, '0')} (X25519).`,
    };
  }

  const plaintext = await decryptWithCryptoPrivateKey(trimmedPrivateKey, fileBytes);
  return {
    success: true,
    plaintext,
    outputName,
    statusMessage: 'File decrypted with secp256k1 private key (SPCK v1 / ECIES)!',
  };
}
