// Bitcoin P2SH (Pay-to-Script-Hash) - SegWit Compatibility Addresses
// Address format: Starts with "3"
// Uses: Script hash wrapped in P2SH for SegWit compatibility

import type { DerivedInfo } from '../currencyData';
import { toHex, fromHex } from '../utils';

// Import bitcoinjs-lib with pre-initialized ECC from router
import { bitcoin } from './router.BTC.Bitcoin';

export const bitcoinP2SHData = {
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const { sha256 } = await import('@noble/hashes/sha2.js');
    const { ripemd160 } = await import('@noble/hashes/legacy.js');
    const secp = await import('@noble/secp256k1');
    const { decode: wifDecode } = await import('wif');
    const bs58 = await import('bs58');

    // Bitcoin P2SH constants
    const BTC_SCRIPT_HASH = 0x05; // Base58 prefix for Bitcoin P2SH
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
    // For P2SH-wrapped P2WPKH, we use compressed public keys (33 bytes starting with 0x02 or 0x03)
    const publicKeyCompressed = secp.getPublicKey(privateKeyBytes, true);

    // We can also derive the uncompressed public key (65 bytes starting with 0x04)
    const publicKeyUncompressed = secp.getPublicKey(privateKeyBytes, false);

    // Step 3: Create the P2WPKH output script (this will be the redeem script)
    // First, get the hash160 of the compressed public key
    const pubKeyHash = ripemd160(sha256(publicKeyCompressed));

    // Step 4: Create the P2WPKH output script: OP_0 <pubKeyHash>
    const redeemScript = new Uint8Array(22);
    redeemScript[0] = 0x00; // OP_0 (witness version 0)
    redeemScript[1] = 0x14; // PUSH 20 bytes
    redeemScript.set(pubKeyHash, 2);

    // Step 5: Hash the redeem script to get the script hash (for P2SH)
    const scriptHash = ripemd160(sha256(redeemScript));

    // Step 6: Create the P2SH address
    // Add network prefix byte (0x05 for Bitcoin P2SH) to create payload
    const payload = new Uint8Array(21);
    payload[0] = BTC_SCRIPT_HASH;
    payload.set(scriptHash, 1);

    // Step 7: Compute the checksum (first 4 bytes of double SHA-256 of payload)
    const checksum = sha256(sha256(payload)).slice(0, 4);

    // Step 8: Combine payload and checksum, then encode with Base58
    const addressBytes = new Uint8Array(25);
    addressBytes.set(payload, 0);
    addressBytes.set(checksum, 21);
    const address = bs58.default.encode(addressBytes);

    // Validate that the address starts with "3" (P2SH format)
    if (!address.startsWith('3')) {
      throw new Error(`Generated address does not start with '3': ${address}`);
    }

    // Return both the compressed public key (hex) and the derived P2SH address
    return {
      publicKey: toHex(publicKeyCompressed),
      publicKeyUncompressed: toHex(publicKeyUncompressed),
      address
    };
  }
};
