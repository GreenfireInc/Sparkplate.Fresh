// Bitcoin P2PKH (Pay-to-Public-Key-Hash) - Legacy Addresses
// Address format: Starts with "1"
// Uses: SHA-256 + RIPEMD-160 hashing, Base58 encoding

import type { DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

// Import bitcoinjs-lib with pre-initialized ECC from router
import { bitcoin } from './router.BTC.Bitcoin';

export const bitcoinP2PKHData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const { sha256 } = await import('@noble/hashes/sha256');
    const { ripemd160 } = await import('@noble/hashes/ripemd160');
    const secp = await import('@noble/secp256k1');
    const { decode: wifDecode } = await import('wif');
    const bs58 = await import('bs58');

    // Bitcoin P2PKH constants
    const BTC_PUBKEY_HASH = 0x00; // Base58 prefix for Bitcoin P2PKH
    const BTC_WIF_PREFIX = 0x80; // Bitcoin WIF private key prefix (mainnet)

    // Step 1: Parse the private key from various formats
    let privateKeyBytes: Uint8Array;

    try {
      // First try to parse as WIF (Wallet Import Format)
      if (privateKey.length >= 50 && privateKey.length <= 52) { // Typical WIF length
        try {
          const decoded = wifDecode(privateKey);
          privateKeyBytes = new Uint8Array(decoded.privateKey);

          // Validate the WIF is for Bitcoin network
          if (decoded.version !== BTC_WIF_PREFIX) {
            console.warn("Warning: WIF key may not be for Bitcoin network");
          }
        } catch (wifError) {
          throw new Error(`Invalid Bitcoin WIF key: ${wifError.message}`);
        }
      }
      // Handle hex format (with or without 0x prefix)
      else {
        try {
          privateKeyBytes = fromHex(privateKey);

          if (privateKeyBytes.length !== 32) {
            throw new Error(`Expected 32 bytes, got ${privateKeyBytes.length}`);
          }
        } catch (hexError) {
          throw new Error(`Invalid Bitcoin private key: ${hexError.message}`);
        }
      }
    } catch (error) {
      throw new Error(`Failed to parse Bitcoin private key: ${error.message}`);
    }

    // Step 2: Derive the public key using secp256k1 elliptic curve
    // For P2PKH, we use compressed public keys (33 bytes starting with 0x02 or 0x03)
    const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);

    // We can also derive the uncompressed public key (65 bytes starting with 0x04)
    const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);

    // Step 3: Generate Bitcoin P2PKH address from the public key
    // 3.1: Apply SHA-256 hashing to the compressed public key
    const hash1 = sha256(publicKeyCompressed);

    // 3.2: Apply RIPEMD-160 hashing to the result
    const hash2 = ripemd160(hash1);

    // 3.3: Add network prefix byte (0x00 for Bitcoin P2PKH) to create payload
    const payload = new Uint8Array(1 + hash2.length);
    payload[0] = BTC_PUBKEY_HASH;
    payload.set(hash2, 1);

    // 3.4: Compute the checksum (first 4 bytes of double SHA-256 of payload)
    const checksum = sha256(sha256(payload)).slice(0, 4);

    // 3.5: Combine payload and checksum, then encode with Base58
    const addressBytes = new Uint8Array(payload.length + checksum.length);
    addressBytes.set(payload);
    addressBytes.set(checksum, payload.length);
    const address = bs58.default.encode(addressBytes);

    // Validate that the address starts with "1" (P2PKH format)
    if (!address.startsWith('1')) {
      throw new Error(`Generated address does not start with '1': ${address}`);
    }

    // Return both the compressed public key (hex) and the derived P2PKH address
    return {
      publicKey: toHex(publicKeyCompressed),
      publicKeyUncompressed: toHex(publicKeyUncompressed),
      address
    };
  }
};
