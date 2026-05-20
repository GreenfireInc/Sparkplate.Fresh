import { ref, watch, type Ref } from 'vue';
import * as secp from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha2.js';
import { ripemd160 } from '@noble/hashes/legacy.js';
import { hmac } from '@noble/hashes/hmac.js';
import { Wallet } from 'ethers';
import bs58check from 'bs58check';

// Wire sync hash helpers required by @noble/secp256k1 v3.
secp.hashes.sha256 = sha256;
secp.hashes.hmacSha256 = (key, msg) => hmac(sha256, key, msg);

// secp256k1-based P2PKH coins keyed by their address version byte.
export const P2PKH_VERSIONS: Record<string, number> = {
  BTC: 0x00,
  LTC: 0x30,
  DOGE: 0x1e,
  BCH: 0x00,
  DASH: 0x4c,
};

export const SUPPORTED_TICKERS = ['BTC', 'ETH', 'LTC', 'DOGE', 'BCH', 'DASH'] as const;

export type SupportedTicker = (typeof SUPPORTED_TICKERS)[number];

export interface CryptocurrencyDerivation {
  ticker: string;
  publicKey: string;
  walletAddress: string;
}

export type DerivationResult =
  | { ok: true; value: CryptocurrencyDerivation }
  | { ok: false; ticker?: string; error: string };

export const hexToBytes = (hex: string): Uint8Array => {
  const h = hex.replace(/^0x/i, '');
  if (h.length === 0 || h.length % 2 !== 0) {
    throw new Error('Private key hex must have an even, non-zero length');
  }
  if (!/^[0-9a-fA-F]+$/.test(h)) {
    throw new Error('Private key contains non-hex characters');
  }
  const bytes = new Uint8Array(h.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(h.substr(i * 2, 2), 16);
  }
  return bytes;
};

export const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const deriveBitcoinLikeAddress = (
  pubKeyCompressed: Uint8Array,
  version: number,
): string => {
  const hash160 = ripemd160(sha256(pubKeyCompressed));
  const payload = new Uint8Array(21);
  payload[0] = version;
  payload.set(hash160, 1);
  return bs58check.encode(payload);
};

/**
 * Parse a `%tickerSymbol%://%privateKey%` string and derive the public key
 * and wallet address for the detected currency.
 */
export const deriveCryptocurrency = (input: string): DerivationResult => {
  const raw = input.trim();
  if (!raw) {
    return { ok: false, error: '' };
  }

  const match = raw.match(/^([A-Za-z0-9]+):\/\/(.+)$/);
  if (!match || match[1] === undefined || match[2] === undefined) {
    return {
      ok: false,
      error:
        'Format must be %tickerSymbol%://%privateKey% (e.g., BTC://abcdef0123...).',
    };
  }

  const ticker = match[1].toUpperCase();
  const privKey = match[2].trim();

  if (!(SUPPORTED_TICKERS as readonly string[]).includes(ticker)) {
    return {
      ok: false,
      ticker,
      error: `Unsupported ticker: ${ticker}. Supported: ${SUPPORTED_TICKERS.join(', ')}.`,
    };
  }

  try {
    if (ticker === 'ETH') {
      const normalized = privKey.startsWith('0x') ? privKey : `0x${privKey}`;
      const wallet = new Wallet(normalized);
      return {
        ok: true,
        value: {
          ticker,
          publicKey: wallet.signingKey.publicKey,
          walletAddress: wallet.address,
        },
      };
    }

    const version = P2PKH_VERSIONS[ticker];
    if (version === undefined) {
      throw new Error(`No address derivation rule registered for ${ticker}`);
    }
    const pkBytes = hexToBytes(privKey);
    if (pkBytes.length !== 32) {
      throw new Error('Private key must be 32 bytes (64 hex chars)');
    }
    if (!secp.utils.isValidSecretKey(pkBytes)) {
      throw new Error('Private key is out of valid secp256k1 range');
    }
    const pubKeyCompressed = secp.getPublicKey(pkBytes, true);
    return {
      ok: true,
      value: {
        ticker,
        publicKey: `0x${bytesToHex(pubKeyCompressed)}`,
        walletAddress: deriveBitcoinLikeAddress(pubKeyCompressed, version),
      },
    };
  } catch (error) {
    return { ok: false, ticker, error: `Error: ${(error as Error).message}` };
  }
};

export interface CryptocurrencyEngine {
  ticker: Ref<string>;
  publicKey: Ref<string>;
  walletAddress: Ref<string>;
  errorMessage: Ref<string>;
}

/**
 * Vue composable that watches a `%ticker%://%privateKey%` input ref and
 * keeps derived ticker / public key / wallet address / error refs in sync.
 */
export const useCryptocurrencyEngine = (
  input: Ref<string>,
): CryptocurrencyEngine => {
  const ticker = ref('');
  const publicKey = ref('');
  const walletAddress = ref('');
  const errorMessage = ref('');

  const reset = () => {
    ticker.value = '';
    publicKey.value = '';
    walletAddress.value = '';
    errorMessage.value = '';
  };

  const recompute = () => {
    reset();
    const result = deriveCryptocurrency(input.value);
    if (result.ok) {
      ticker.value = result.value.ticker;
      publicKey.value = result.value.publicKey;
      walletAddress.value = result.value.walletAddress;
      return;
    }
    if (result.ticker) {
      ticker.value = result.ticker;
    }
    if (result.error) {
      errorMessage.value = result.error;
    }
  };

  watch(input, recompute);

  return { ticker, publicKey, walletAddress, errorMessage };
};
