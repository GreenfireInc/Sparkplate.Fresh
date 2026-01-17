// ==========================================
// Type Definitions for Polkadot Import System
// ==========================================

/**
 * Import method selection
 */
export type PolkadotImportMethod = 'exodus' | 'polkadotjs' | 'auto';

/**
 * Input format types
 */
export type PolkadotInputFormat =
  | 'privateKey'   // 64-char hex string
  | 'mnemonic'     // 12/24-word BIP39 phrase
  | 'keystore'     // Encrypted .keystore file
  | 'json';        // Plain JSON export

/**
 * Crypto type for key generation
 */
export type PolkadotCryptoType = 'sr25519' | 'ed25519' | 'ecdsa';

/**
 * Import input structure
 */
export interface PolkadotImportInput {
  format: PolkadotInputFormat;
  data: string | object; // Raw input data
  password?: string; // Required for encrypted formats
  method?: PolkadotImportMethod; // Manual override
  cryptoType?: PolkadotCryptoType; // Manual crypto type selection
}

/**
 * Import result structure
 */
export interface PolkadotImportResult {
  success: boolean;
  privateKey?: string; // 64-char hex (no 0x prefix)
  publicKey?: string; // Hex public key
  address?: string; // SS58-encoded address
  cryptoType?: PolkadotCryptoType;
  method: PolkadotImportMethod; // Which method was used
  error?: string;
  warnings?: string[];
}

/**
 * Format detection result
 */
export interface FormatDetectionResult {
  format: PolkadotInputFormat;
  method: PolkadotImportMethod;
  confidence: 'high' | 'medium' | 'low';
  indicators: string[];
}

/**
 * Keystore structure (standard Polkadot)
 */
export interface PolkadotKeystoreJson {
  encoded: string;
  encoding: {
    content: string[];
    type: string[];
    version: string;
  };
  address: string;
  meta: {
    name?: string;
    genesisHash?: string;
    whenCreated?: number;
    [key: string]: unknown;
  };
}

/**
 * LoginStandard JSON structure
 */
export interface LoginStandardPolkadotJson {
  version: number | string;
  currency: string;
  privateKey: string;
  publicKey: string;
  address: string;
  exportDate: string;
  exportedBy: string;
  warning?: string;
}
