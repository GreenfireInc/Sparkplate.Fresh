// ==========================================
// LTC.Litecoin.P2PKH - Legacy Address Generation
// ==========================================
// This module handles Litecoin P2PKH (Pay-to-Public-Key-Hash) address generation
// P2PKH is the original Bitcoin/Litecoin address format
// Address format: Starts with 'L' (Litecoin mainnet)
// Based on key-generator-key-generator-vue3 reference implementation

import type { CurrencyData, DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

export const litecoinP2PKHData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    try {
      // Import dependencies when needed to avoid loading them if not used
      const { sha256 } = await import('@noble/hashes/sha256');
      const { ripemd160 } = await import('@noble/hashes/ripemd160');
      const secp = await import('@noble/secp256k1');
      const { decode: wifDecode } = await import('wif');
      const bs58 = await import('bs58');

      // Litecoin P2PKH constants (from key-generator reference)
      const LTC_PUBKEY_HASH = 0x30; // base58 prefix for Litecoin P2PKH (produces 'L' addresses)
      const LTC_WIF_PREFIX = 0xb0;   // Litecoin WIF private key prefix (mainnet)

      console.log('🔧 [LTC P2PKH] Deriving Litecoin P2PKH (Legacy) address...');

      // Step 1: Parse the private key from various formats
      let privateKeyBytes: Uint8Array;

      // First try to parse as WIF (Wallet Import Format)
      if (privateKey.length >= 50 && privateKey.length <= 52) {
        try {
          const decoded = wifDecode(privateKey);
          privateKeyBytes = new Uint8Array(decoded.privateKey);

          // Validate the WIF is for Litecoin network
          if (decoded.version !== LTC_WIF_PREFIX && decoded.version !== 0x80) {
            console.warn("[LTC P2PKH] Warning: WIF key may not be for Litecoin network");
          }

          console.log('[LTC P2PKH] Successfully parsed WIF private key');
        } catch (wifError) {
          throw new Error(`Invalid Litecoin WIF key: ${wifError.message}`);
        }
      }
      // Handle hex format (with or without 0x prefix)
      else {
        try {
          privateKeyBytes = fromHex(privateKey);

          if (privateKeyBytes.length !== 32) {
            throw new Error(`Expected 32 bytes, got ${privateKeyBytes.length}`);
          }

          console.log('[LTC P2PKH] Successfully parsed hex private key');
        } catch (hexError) {
          throw new Error(`Invalid Litecoin private key: ${hexError.message}`);
        }
      }

      // Step 2: Derive the public key using secp256k1 elliptic curve
      // In Litecoin, compressed public keys are commonly used (33 bytes starting with 0x02 or 0x03)
      const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);
      const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);

      console.log(`[LTC P2PKH] Public key (compressed): 0x${toHex(publicKeyCompressed)}`);

      // Step 3: Generate Litecoin P2PKH address from the public key
      // This follows the same process as Bitcoin but with Litecoin-specific constants

      // 3.1: Apply SHA-256 hashing to the compressed public key
      const hash1 = sha256(publicKeyCompressed);

      // 3.2: Apply RIPEMD-160 hashing to the result
      const hash2 = ripemd160(hash1);

      // 3.3: Add network prefix byte (0x30 for Litecoin P2PKH) to create payload
      const payload = new Uint8Array(1 + hash2.length);
      payload[0] = LTC_PUBKEY_HASH;
      payload.set(hash2, 1);

      // 3.4: Compute the checksum (first 4 bytes of double SHA-256 of payload)
      const checksum = sha256(sha256(payload)).slice(0, 4);

      // 3.5: Combine payload and checksum, then encode with Base58
      const addressBytes = new Uint8Array(payload.length + checksum.length);
      addressBytes.set(payload);
      addressBytes.set(checksum, payload.length);
      const address = bs58.default.encode(addressBytes);

      // Validate that the address starts with 'L' for Litecoin P2PKH
      if (!address.startsWith('L')) {
        throw new Error(`Generated address does not start with 'L': ${address}`);
      }

      console.log(`✅ [LTC P2PKH] Successfully generated P2PKH address: ${address}`);

      // Return the results
      return {
        publicKey: toHex(publicKeyCompressed),
        publicKeyUncompressed: toHex(publicKeyUncompressed),
        address,
        formatDescription: "P2PKH (Legacy) - starts with 'L'"
      };

    } catch (error) {
      console.error('[LTC P2PKH] Error deriving Litecoin P2PKH address:', error);
      throw new Error(`Litecoin P2PKH derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
