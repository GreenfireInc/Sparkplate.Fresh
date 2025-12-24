// Bitcoin Router - Centralizes all Bitcoin imports and ECC setup
// This file manages all Bitcoin address format implementations and ECC library initialization

import * as bitcoin from 'bitcoinjs-lib';
import * as tinysecp256k1 from 'tiny-secp256k1';

// Use tiny-secp256k1 as ECC library (officially supported by bitcoinjs-lib)
export const eccLib = tinysecp256k1;

// Initialize ECC library for bitcoinjs-lib (done once at module level)
bitcoin.initEccLib(eccLib);

// Export bitcoinjs-lib with initialized ECC
export { bitcoin };

// Re-export all Bitcoin address format implementations
export { bitcoinP2PKHData } from './BTC.Bitcoin.P2PKH';
export { bitcoinP2SHData } from './BTC.Bitcoin.P2SH';
export { bitcoinP2WPKHData } from './BTC.Bitcoin.P2WPKH';
export { bitcoinP2TRData } from './BTC.Bitcoin.P2TR';

// Bitcoin address format types
export type BitcoinAddressFormat = 'P2PKH' | 'P2SH' | 'P2WPKH' | 'P2TR';
