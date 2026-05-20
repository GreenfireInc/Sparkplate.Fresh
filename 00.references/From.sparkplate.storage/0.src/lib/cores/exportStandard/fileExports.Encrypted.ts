/**
 * Standard encrypted-file export naming.
 *
 * Decides what extension (and therefore final filename) an SPCK / ECIES
 * envelope should be written under when the recipient public key was derived
 * from a known cryptocurrency ticker.
 *
 * Output filename convention:
 *   `<originalFilename>.<TICKER>.spck`        (when ticker is known)
 *   `<originalFilename>.spck`                 (when ticker is unknown)
 *
 * "Known" means the public key the user is encrypting *to* matches the public
 * key currently derived in the cryptocurrency tab. When the user pastes a raw
 * SEC1 hex key directly we have no ticker context and fall back to the bare
 * `.spck` extension.
 */
import { CRYPTO_PUBKEY_FILE_EXTENSION } from '../cryptographyCore/encryption.crypto.PublicKey.general';

/**
 * Lower-cases a hex public key and strips an optional `0x` prefix so two keys
 * that differ only in casing or prefix compare equal.
 */
export const normalizeHexKey = (k: string): string =>
  k.trim().toLowerCase().replace(/^0x/, '');

export interface EncryptedExtensionResolution {
  /** Uppercase ticker (e.g. `"DOGE"`) when the encryption key is recognized; `''` otherwise. */
  ticker: string;
  /** Extension portion to append, e.g. `"DOGE.spck"` or just `"spck"`. */
  extension: string;
}

/**
 * Returns the ticker (if any) and extension to use when writing an SPCK
 * envelope to disk.
 *
 * @param encryptionPublicKey   The public key the file is being encrypted to (raw hex).
 * @param derivedCryptoPublicKey The public key currently derived in the crypto tab (raw hex).
 * @param derivedTickerSymbol   The ticker symbol associated with `derivedCryptoPublicKey`.
 */
export const resolveEncryptedExtension = (
  encryptionPublicKey: string,
  derivedCryptoPublicKey: string,
  derivedTickerSymbol: string,
): EncryptedExtensionResolution => {
  const ticker =
    derivedTickerSymbol &&
    derivedCryptoPublicKey &&
    normalizeHexKey(derivedCryptoPublicKey) ===
      normalizeHexKey(encryptionPublicKey)
      ? derivedTickerSymbol.toUpperCase()
      : '';
  const extension = ticker
    ? `${ticker}.${CRYPTO_PUBKEY_FILE_EXTENSION}`
    : CRYPTO_PUBKEY_FILE_EXTENSION;
  return { ticker, extension };
};

/**
 * Convenience: appends `resolution.extension` to `originalFilename`.
 * Kept separate so callers can still inspect `resolution.ticker` (e.g. for
 * status messages) without re-deriving it.
 */
export const buildEncryptedFilename = (
  originalFilename: string,
  resolution: EncryptedExtensionResolution,
): string => `${originalFilename}.${resolution.extension}`;
