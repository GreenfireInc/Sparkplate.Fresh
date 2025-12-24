// Utility functions for cryptocurrency derivation

/**
 * Convert a Uint8Array to a hex string
 */
export function toHex(data: Uint8Array): string {
  return Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert a hex string to a Uint8Array
 */
export function fromHex(hexString: string): Uint8Array {
  // Remove 0x prefix if it exists
  const hex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
  // Ensure even length
  const cleanHex = hex.length % 2 !== 0 ? `0${hex}` : hex;
  
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  
  return bytes;
}

/**
 * Concatenate multiple Uint8Arrays
 */
export function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(arrays.reduce((sum, arr) => sum + arr.length, 0));
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

/**
 * Encode data with Base58Check encoding (used by many cryptocurrencies)
 */
export async function base58checkEncode(data: Uint8Array): Promise<string> {
  const { sha256 } = await import('@noble/hashes/sha2.js');
  const bs58 = await import('bs58');
  
  const checksum = sha256(sha256(data)).slice(0, 4);
  const payload = concatBytes(data, checksum);
  return bs58.default.encode(payload);
}

/**
 * Tezos address prefixes
 */
export const TEZOS_PREFIX = {
  tz1: new Uint8Array([6, 161, 159]),
  tz2: new Uint8Array([6, 161, 161]),
  tz3: new Uint8Array([6, 161, 164]),
  edpk: new Uint8Array([13, 15, 37, 217])
};

/**
 * Cosmos address prefixes and constants
 */
export const COSMOS_PREFIX = {
  // Cosmos Hub mainnet prefix
  cosmos: 'cosmos',
  // Other Cosmos chains
  osmosis: 'osmo',
  akash: 'akash',
  juno: 'juno',
  // Cosmos private key prefix (for base58 encoded keys)
  cosmosPriv: new Uint8Array([0x2d, 0x2a, 0x61, 0x62]),
  // Cosmos public key prefix
  cosmosPub: new Uint8Array([0xeb, 0x5a, 0xe9, 0x87])
};
