// ==========================================
// Litecoin Router - Centralizes all Litecoin imports and address format implementations
// ==========================================
// This file manages all Litecoin address format implementations following the Bitcoin router pattern
// Supports P2PKH (Legacy), P2SH (SegWit Compatible), and P2WPKH (Native SegWit)

// Import and initialize bitcoinjs-lib with ECC library (required for P2SH and P2WPKH)
import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp256k1 from 'tiny-secp256k1';

// Use tiny-secp256k1 as ECC library (officially supported by bitcoinjs-lib)
export const eccLib = tinysecp256k1;

// Initialize ECC library for bitcoinjs-lib (done once at module level)
// This is REQUIRED for P2SH and P2WPKH generation to work
bitcoin.initEccLib(eccLib);

// Export bitcoinjs-lib with initialized ECC
export { bitcoin };

// Re-export all Litecoin address format implementations
export { litecoinP2PKHData } from './LTC.Litecoin.P2PKH';
export { litecoinP2SHData } from './LTC.Litecoin.P2SH';
export { litecoinP2WPKHData } from './LTC.Litecoin.P2WPKH';

// Litecoin address format types
export type LitecoinAddressFormat = 'P2PKH' | 'P2SH' | 'P2WPKH';

// Litecoin network configuration constants (from key-generator reference)
export const LTC_NETWORK_CONFIG = {
  messagePrefix: '\x19Litecoin Signed Message:\n',
  bech32: 'ltc',
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,  // P2PKH prefix (produces 'L' addresses)
  scriptHash: 0x32,  // P2SH prefix (produces 'M' addresses)
  wif: 0xb0,         // WIF private key prefix
};
