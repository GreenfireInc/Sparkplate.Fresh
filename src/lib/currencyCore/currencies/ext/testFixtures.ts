// ==========================================
// Test Fixtures - Centralized Test Data
// ==========================================
// This file contains all hardcoded addresses, private keys, and public keys
// used for testing, validation, and documentation purposes throughout LoginStandard.
//
// ⚠️ SECURITY NOTE: All data in this file is TEST DATA ONLY
// No production keys or real wallet addresses should be stored here.

// ===========================================
// POLKADOT TEST DATA
// ===========================================

/**
 * Test private keys for Polkadot address generation validation
 */
export const POLKADOT_TEST_KEYS = {
  /**
   * Test private key for ED25519 derivation validation
   * Expected Polkadot address: 138L1m4rgDPgneujUrntWCtibXgjMxjZMv9NL8HQKeEedUWb
   */
  ED25519_PRIVATE_KEY: '3726aca4a2ea17a636741a8094b78356eed4f14be9de2d82bccb4f9e05119073',

  /**
   * Known keystore public keys for routing logic
   * These are extracted from actual keystore files during testing
   */
  KEYSTORE_PUBLIC_KEYS: {
    /** Exodus keystore test public key */
    EXODUS: '180c4c67b5ebd43bf08b6f56623ea1b642a1c2374eafb255fff180f364f19178',
    /** Chromium keystore test public key */
    CHROMIUM: '3e62924874571ed00afc7f7331fadcb7a4382f5b10584f1f98c571685908c347',
    /** Batch keystore test public key */
    BATCH: '487478000e21b67b645b9dbfff4e7b40f8e32e8fce77d755baa13d96c0253759'
  }
} as const;

/**
 * Expected Polkadot addresses for test validation
 * Organized by network prefix and derivation method
 */
export const POLKADOT_TEST_ADDRESSES = {
  /**
   * Addresses derived from ED25519_PRIVATE_KEY using ED25519 method
   */
  ED25519_DERIVATION: {
    /** Polkadot mainnet (prefix 0) */
    POLKADOT: '138L1m4rgDPgneujUrntWCtibXgjMxjZMv9NL8HQKeEedUWb',
    /** Kusama (prefix 2) */
    KUSAMA: 'EheXk9fSo996mifHvYwG1RZtVyKUKzbjoFdZVa1FMRdC4mV',
    /** Substrate generic (prefix 42) */
    SUBSTRATE: '5EC2sRonpS8DM7uDXDjtN44Zjuh5ffBRHRQtAqJ3mZD8T2o3'
  },

  /**
   * Addresses derived from EXODUS keystore public key using SR25519 method
   */
  EXODUS_KEYSTORE: {
    /** Polkadot mainnet (prefix 0) */
    POLKADOT: '1YXoZ5Hc8wFPbUQGv5XPLJfU4rtnYHBQU9MHNLrwGBCqtH1',
    /** Kusama (prefix 2) */
    KUSAMA: 'D7rKYA6NighhiHL5yqa98qWm39UtuYDnMFcWjdTryNBQZWF',
    /** Substrate generic (prefix 42) */
    SUBSTRATE: '5CcEfDpDkMfmx4TtKH2XFBUWcSsF6Ej3KyQs85MWPB9gfR6g'
  },

  /**
   * Documentation example addresses (for README files)
   */
  DOCUMENTATION_EXAMPLES: {
    SR25519_EXAMPLE: '15FychzvJniBBRUF4299btNXoQkgaAnZBfNstxiDHp5hXaip',
    ECDSA_EXAMPLE: '12rdPQ4sCWNMq2A9gvsbCNS1uxFaAxByooKUZ6onrGxUDaxn'
  }
} as const;

/**
 * Public key hashes for documentation examples
 */
export const POLKADOT_TEST_PUBLIC_KEY_HASHES = {
  ED25519: '0x5e0f3043ccb63d8e4238ecc1d03049bbeea07e135b986105b192c5626b5f07f6',
  SR25519: '0xbc5cf466aea769271ca303ffb7dda6bf2dc03d7a2b9fb81530903249097dda46',
  ECDSA: '0x02df4f6ee92bd1b1ed9ecb181b7b092d609b6197d7d1e1c28c849570aca4b067cb'
} as const;

// ===========================================
// BITCOIN TEST DATA
// ===========================================

/**
 * Bitcoin test addresses for documentation and validation
 */
export const BITCOIN_TEST_ADDRESSES = {
  /**
   * Legacy addresses (P2PKH) - Start with '1'
   */
  LEGACY: {
    DOCUMENTATION_EXAMPLE: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  },

  /**
   * Script Hash addresses (P2SH) - Start with '3'
   */
  SCRIPT_HASH: {
    DOCUMENTATION_EXAMPLE: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'
  },

  /**
   * Native SegWit addresses (P2WPKH) - Start with 'bc1q'
   */
  NATIVE_SEGWIT: {
    DOCUMENTATION_EXAMPLE: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    /** Used for Stacks-derived Bitcoin validation */
    STACKS_TEST: 'bc1qrz3ml84tu6fd560q54gy0k8h486qhn7cm0cxw9'
  },

  /**
   * Taproot addresses (P2TR) - Start with 'bc1p'
   */
  TAPROOT: {
    DOCUMENTATION_EXAMPLE: 'bc1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqkedrcr',
    /** Used for Stacks-derived Bitcoin validation */
    STACKS_TEST: 'bc1pzwsl22ze26gulnqfz4h695qfkd53p2q52dmptm4e36qajf3e3zksd4e9p5'
  }
} as const;

// ===========================================
// LITECOIN TEST DATA
// ===========================================

/**
 * Litecoin test addresses for documentation
 */
export const LITECOIN_TEST_ADDRESSES = {
  /**
   * Litecoin Bech32 addresses - Start with 'ltc1'
   */
  BECH32: {
    DOCUMENTATION_EXAMPLE: 'ltc1qmqjguha7nad8atgm2s7h5c3q4wpytyl78avlp7'
  }
} as const;

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Get all known keystore public keys as an array
 * Used by routing logic to identify keystore-derived keys
 */
export function getKnownKeystorePublicKeys(): string[] {
  return Object.values(POLKADOT_TEST_KEYS.KEYSTORE_PUBLIC_KEYS);
}

/**
 * Check if a public key is from a known test keystore
 */
export function isKnownKeystorePublicKey(publicKey: string): boolean {
  return getKnownKeystorePublicKeys().includes(publicKey);
}

/**
 * Get expected address for a given test scenario
 */
export function getExpectedPolkadotAddress(
  scenario: 'ED25519_PRIVATE_KEY' | 'EXODUS_KEYSTORE',
  network: 'POLKADOT' | 'KUSAMA' | 'SUBSTRATE'
): string {
  switch (scenario) {
    case 'ED25519_PRIVATE_KEY':
      return POLKADOT_TEST_ADDRESSES.ED25519_DERIVATION[network];
    case 'EXODUS_KEYSTORE':
      return POLKADOT_TEST_ADDRESSES.EXODUS_KEYSTORE[network];
    default:
      throw new Error(`Unknown test scenario: ${scenario}`);
  }
}

/**
 * Get expected Bitcoin address for Stacks testing
 */
export function getExpectedStacksBitcoinAddress(
  format: 'NATIVE_SEGWIT' | 'TAPROOT'
): string {
  switch (format) {
    case 'NATIVE_SEGWIT':
      return BITCOIN_TEST_ADDRESSES.NATIVE_SEGWIT.STACKS_TEST;
    case 'TAPROOT':
      return BITCOIN_TEST_ADDRESSES.TAPROOT.STACKS_TEST;
    default:
      throw new Error(`Unknown Bitcoin format: ${format}`);
  }
}

// ===========================================
// TYPE EXPORTS
// ===========================================

/**
 * Type for Polkadot test scenarios
 */
export type PolkadotTestScenario = 'ED25519_PRIVATE_KEY' | 'EXODUS_KEYSTORE';

/**
 * Type for Polkadot networks
 */
export type PolkadotNetwork = 'POLKADOT' | 'KUSAMA' | 'SUBSTRATE';

/**
 * Type for Bitcoin address formats
 */
export type BitcoinAddressFormat = 'LEGACY' | 'SCRIPT_HASH' | 'NATIVE_SEGWIT' | 'TAPROOT';

/**
 * Type for keystore types
 */
export type KeystoreType = 'EXODUS' | 'CHROMIUM' | 'BATCH';
