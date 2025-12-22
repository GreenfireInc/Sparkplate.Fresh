// Bitcoin P2WPKH (Pay-to-Witness-Public-Key-Hash) - Bech32 Native SegWit
// Address format: Starts with "bc1q"
// Uses: Bech32 encoding with witness program

import type { DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

// Import bitcoinjs-lib with pre-initialized ECC from router
import { bitcoin } from './router.BTC.Bitcoin';

export const bitcoinP2WPKHData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const { sha256 } = await import('@noble/hashes/sha256');
    const { ripemd160 } = await import('@noble/hashes/ripemd160');
    const secp = await import('@noble/secp256k1');
    const { decode: wifDecode } = await import('wif');
    const { bech32 } = await import('bech32');

    // Bitcoin P2WPKH constants
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
    // For P2WPKH, we use compressed public keys (33 bytes starting with 0x02 or 0x03)
    const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);

    // We can also derive the uncompressed public key (65 bytes starting with 0x04)
    const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);

    // Step 3: Create the witness program
    // 3.1: Apply SHA-256 hashing to the compressed public key
    const hash1 = sha256(publicKeyCompressed);

    // 3.2: Apply RIPEMD-160 hashing to the result
    const pubKeyHash = ripemd160(hash1);

    // Step 4: Create the Bech32 address
    // Bech32 format: bc1 + data (witness version + program)
    const witnessVersion = 0; // Witness version for P2WPKH
    const witnessProgram = pubKeyHash; // 20-byte hash

    // Convert witness program to 5-bit words for Bech32
    const words = bech32.toWords(witnessProgram);

    // Add witness version at the beginning
    words.unshift(witnessVersion);

    // Encode with Bech32
    const address = bech32.encode('bc', words);

    // Validate that the address starts with "bc1q" (P2WPKH Bech32 format)
    if (!address.startsWith('bc1q')) {
      throw new Error(`Generated address does not start with 'bc1q': ${address}`);
    }

    // Return both the compressed public key (hex) and the derived P2WPKH address
    return {
      publicKey: toHex(publicKeyCompressed),
      publicKeyUncompressed: toHex(publicKeyUncompressed),
      address
    };
  }
};
