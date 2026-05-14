// Bridge: Cryptography Via Currency
//
// Replaces `src/lib/cores/engine/cryptocurrencyEngine.ts` by routing
// `%tickerSymbol%://%privateKey%` URIs through the shared `currencyByTicker`
// registry under `src/lib/cores/currencyCore/currencies` instead of relying on
// hand-written derivation rules. This means every ticker that has a
// `deriveFromPrivateKey` in `currencyCore` is automatically usable by the UI;
// no special-casing per coin is required here.
//
// Public API (drop-in compatible with the legacy engine):
//   - `SUPPORTED_TICKERS`         : runtime-iterable list of supported tickers
//   - `deriveCryptocurrencyViaCurrency(input)` : async derivation, returns
//                                                a tagged `DerivationResult`
//   - `useCryptocurrencyViaCurrency(input)`    : Vue composable returning refs
//   - `useCryptocurrencyEngine(input)`         : alias of the composable above,
//                                                so existing imports can be
//                                                redirected without changing
//                                                destructuring at the call site
//
// Extra fields exposed beyond the legacy engine (safe to ignore):
//   - `derivedInfo`        : raw `DerivedInfo` from currencyCore (multi-format
//                            addresses, keystore-related metadata, etc.)
//   - `spckCurve`          : `'secp256k1'` when the derived `publicKey` is a
//                            SEC1 hex string (SPCK v1 eligible),
//                            `'x25519'` when it is a 32-byte Ed25519 point
//                            in hex (XTZ tz1) or Base58 (SOL) (SPCK v2
//                            eligible), or `null` when no native ECIES path
//                            applies.
//   - `isSpckCompatible`   : true iff `spckCurve !== null`.
//   - `isLoading`          : true while an async derivation is in flight

import { ref, watch, type Ref } from 'vue';

import {
  currencyByTicker,
  type CurrencyData,
} from '../currencyCore/currencies';
import type { DerivedInfo } from '../currencyCore/currencies/currencyData';

// Runtime-iterable list of tickers, sourced from the shared registry rather
// than re-declared. Sorted for stable rendering in UI hint text.
export const SUPPORTED_TICKERS: ReadonlyArray<string> = Object.keys(
  currencyByTicker,
).sort();

export type SupportedTicker = string;

const URI_REGEX = /^([A-Za-z0-9]+):\/\/(.+)$/;

// Mirrors the SEC1 hex check in `encryption.crypto.PublicKey.general.ts:isHexCryptoPublicKey`.
// Kept local so this bridge has no circular dependency on `cryptographyCore`.
const SEC1_HEX_REGEX =
  /^(?:0x)?(?:(?:02|03)[0-9a-fA-F]{64}|04[0-9a-fA-F]{128})$/;

// Bare 32-byte hex (no SEC1 prefix). Length disambiguates from SEC1
// compressed (66 chars) and uncompressed (130). Matches XTZ tz1 pubkeys.
const RAW_HEX_32_REGEX = /^(?:0x)?[0-9a-fA-F]{64}$/;

// Base58 alphabet (Bitcoin/IPFS variant, used by Solana). Matched here
// purely to skip decode attempts on obviously-wrong strings; length check
// after `bs58.decode` is the authoritative test.
const BASE58_ALPHABET_REGEX = /^[1-9A-HJ-NP-Za-km-z]+$/;

/**
 * True when `value` is a SEC1-encoded secp256k1 public key in hex
 * (compressed `02|03 + 32 bytes` or uncompressed `04 + 64 bytes`,
 * with optional `0x` prefix). Such keys are eligible recipients for
 * the SPCK / ECIES envelope produced by `encryptWithCryptoPublicKey`.
 */
export const isSec1HexPublicKey = (value: string): boolean =>
  SEC1_HEX_REGEX.test(value.trim());

/**
 * Lazily-imported `bs58` reference. The bridge runs before `App.vue` finishes
 * dynamic-importing its dependencies, so we defer the import until the first
 * derivation that actually needs a Base58 check.
 */
let bs58Promise: Promise<typeof import('bs58').default> | null = null;
const loadBs58 = async (): Promise<typeof import('bs58').default> => {
  if (!bs58Promise) {
    bs58Promise = import('bs58').then((mod) => mod.default);
  }
  return bs58Promise;
};

/** Curve identifier used by SPCK to dispatch between v1 (secp256k1) and v2 (X25519). */
export type SpckCurve = 'secp256k1' | 'x25519';

/**
 * Decide the SPCK curve for a given derived public key. Returns `null` when
 * the key is in neither a SEC1 secp256k1 hex form nor a 32-byte Ed25519 form
 * (raw hex or Base58).
 */
export const resolveSpckCurve = async (
  publicKey: string,
): Promise<SpckCurve | null> => {
  const trimmed = publicKey.trim();
  if (!trimmed) return null;
  if (SEC1_HEX_REGEX.test(trimmed)) return 'secp256k1';
  if (RAW_HEX_32_REGEX.test(trimmed)) return 'x25519';
  if (BASE58_ALPHABET_REGEX.test(trimmed)) {
    try {
      const bs58 = await loadBs58();
      const decoded = bs58.decode(trimmed);
      if (decoded.length === 32) return 'x25519';
    } catch {
      /* not a base58 string */
    }
  }
  return null;
};

export interface CryptocurrencyDerivation {
  ticker: string;
  publicKey: string;
  walletAddress: string;
  derivedInfo: DerivedInfo;
  spckCurve: SpckCurve | null;
  isSpckCompatible: boolean;
}

export type DerivationResult =
  | { ok: true; value: CryptocurrencyDerivation }
  | { ok: false; ticker?: string; error: string };

/**
 * Resolve a `%tickerSymbol%://%privateKey%` string by looking up the ticker
 * in the shared `currencyByTicker` registry and invoking that currency's own
 * `deriveFromPrivateKey`. The bridge does not implement any address math
 * itself; it normalizes the registry's `DerivedInfo` into the simple shape
 * the UI expects.
 */
export const deriveCryptocurrencyViaCurrency = async (
  input: string,
): Promise<DerivationResult> => {
  const raw = input.trim();
  if (!raw) {
    return { ok: false, error: '' };
  }

  const match = raw.match(URI_REGEX);
  if (!match || match[1] === undefined || match[2] === undefined) {
    return {
      ok: false,
      error:
        'Format must be %tickerSymbol%://%privateKey% (e.g., BTC://abcdef0123...).',
    };
  }

  const ticker = match[1].toUpperCase();
  const privateKey = match[2].trim();

  const currency: CurrencyData | undefined = currencyByTicker[ticker];
  if (!currency) {
    return {
      ok: false,
      ticker,
      error: `Unsupported ticker: ${ticker}. Supported: ${SUPPORTED_TICKERS.join(', ')}.`,
    };
  }

  if (typeof currency.deriveFromPrivateKey !== 'function') {
    return {
      ok: false,
      ticker,
      error: `${ticker} does not expose private-key derivation in this build.`,
    };
  }

  try {
    const info = await currency.deriveFromPrivateKey(privateKey);
    const publicKey = typeof info.publicKey === 'string' ? info.publicKey : '';
    const walletAddress = typeof info.address === 'string' ? info.address : '';

    const spckCurve = await resolveSpckCurve(publicKey);

    return {
      ok: true,
      value: {
        ticker,
        publicKey,
        walletAddress,
        derivedInfo: info,
        spckCurve,
        isSpckCompatible: spckCurve !== null,
      },
    };
  } catch (err) {
    return {
      ok: false,
      ticker,
      error: `Error: ${(err as Error).message}`,
    };
  }
};

export interface CryptocurrencyBridge {
  ticker: Ref<string>;
  publicKey: Ref<string>;
  walletAddress: Ref<string>;
  errorMessage: Ref<string>;
  derivedInfo: Ref<DerivedInfo | null>;
  spckCurve: Ref<SpckCurve | null>;
  isSpckCompatible: Ref<boolean>;
  isLoading: Ref<boolean>;
}

/**
 * Vue composable that watches a `%ticker%://%privateKey%` input ref and keeps
 * `ticker` / `publicKey` / `walletAddress` / `errorMessage` refs in sync via
 * the shared `currencyByTicker` registry. Async-safe: if the input changes
 * mid-flight, stale derivations are discarded so the visible state always
 * reflects the latest input value.
 *
 * The first four refs match the shape of the legacy
 * `useCryptocurrencyEngine` composable so existing destructuring in `App.vue`
 * works unchanged.
 */
export const useCryptocurrencyViaCurrency = (
  input: Ref<string>,
): CryptocurrencyBridge => {
  const ticker = ref('');
  const publicKey = ref('');
  const walletAddress = ref('');
  const errorMessage = ref('');
  const derivedInfo = ref<DerivedInfo | null>(null);
  const spckCurve = ref<SpckCurve | null>(null);
  const isSpckCompatible = ref(false);
  const isLoading = ref(false);

  // Generation counter guards against out-of-order async results when the
  // user types quickly: only the most recently-started derivation is allowed
  // to update the refs.
  let generation = 0;

  const reset = () => {
    ticker.value = '';
    publicKey.value = '';
    walletAddress.value = '';
    errorMessage.value = '';
    derivedInfo.value = null;
    spckCurve.value = null;
    isSpckCompatible.value = false;
  };

  const recompute = async () => {
    const myGen = ++generation;
    reset();
    isLoading.value = true;

    try {
      const result = await deriveCryptocurrencyViaCurrency(input.value);
      if (myGen !== generation) return;

      if (result.ok) {
        ticker.value = result.value.ticker;
        publicKey.value = result.value.publicKey;
        walletAddress.value = result.value.walletAddress;
        derivedInfo.value = result.value.derivedInfo;
        spckCurve.value = result.value.spckCurve;
        isSpckCompatible.value = result.value.isSpckCompatible;
        return;
      }

      if (result.ticker) {
        ticker.value = result.ticker;
      }
      if (result.error) {
        errorMessage.value = result.error;
      }
    } finally {
      if (myGen === generation) {
        isLoading.value = false;
      }
    }
  };

  watch(
    input,
    () => {
      void recompute();
    },
    { immediate: true },
  );

  return {
    ticker,
    publicKey,
    walletAddress,
    errorMessage,
    derivedInfo,
    spckCurve,
    isSpckCompatible,
    isLoading,
  };
};

/**
 * Drop-in alias matching the legacy `useCryptocurrencyEngine` export name so
 * `App.vue` (and any other caller) can switch import paths without changing
 * the destructured names.
 */
export const useCryptocurrencyEngine = useCryptocurrencyViaCurrency;
