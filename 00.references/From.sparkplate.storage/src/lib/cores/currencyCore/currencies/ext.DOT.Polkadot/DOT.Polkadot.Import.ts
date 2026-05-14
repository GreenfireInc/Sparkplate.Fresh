// ==========================================
// Main Polkadot Import Orchestrator
// ==========================================

import { detectPolkadotFormat } from './DOT.Polkadot.Import.Detect';
import {
  importPrivateKeyPolkadotJs,
  importMnemonicPolkadotJs,
  importKeystorePolkadotJs,
  importJsonPolkadotJs
} from './DOT.Polkadot.Import.PolkadotJs';
import {
  importPrivateKeyExodus,
  importMnemonicExodus,
  importKeystoreExodus
} from './DOT.Polkadot.Import.Exodus';
import type {
  PolkadotImportInput,
  PolkadotImportResult,
  PolkadotImportMethod
} from './DOT.Polkadot.Import.Types';

/**
 * Main import function - handles all formats and methods
 */
export async function importPolkadot(input: PolkadotImportInput): Promise<PolkadotImportResult> {
  console.log('🚀 [POLKADOT-IMPORT] Starting import process...');
  console.log(`[POLKADOT-IMPORT] Format: ${input.format}`);
  console.log(`[POLKADOT-IMPORT] Method: ${input.method || 'auto'}`);

  // Auto-detect format if needed
  if (!input.format) {
    const detection = detectPolkadotFormat(input.data);
    console.log(`[POLKADOT-IMPORT] Auto-detected format: ${detection.format}`);
    console.log(`[POLKADOT-IMPORT] Suggested method: ${detection.method}`);
    input.format = detection.format;
    input.method = input.method || detection.method;
  }

  // Determine final method
  const method = input.method || 'auto';

  // Route to appropriate import function
  switch (input.format) {
    case 'privateKey':
      return importPrivateKey(input.data as string, method, input.cryptoType);

    case 'mnemonic':
      return importMnemonic(input.data as string, method, input.cryptoType);

    case 'keystore':
      if (!input.password) {
        return {
          success: false,
          method: method,
          error: 'Password required for keystore import'
        };
      }
      return importKeystore(input.data, method, input.password);

    case 'json':
      return importJson(input.data, method);

    default:
      return {
        success: false,
        method: method,
        error: `Unsupported format: ${input.format}`
      };
  }
}

/**
 * Import private key with method selection
 */
async function importPrivateKey(
  privateKey: string,
  method: PolkadotImportMethod,
  cryptoType?: 'sr25519' | 'ed25519'
): Promise<PolkadotImportResult> {
  const crypto = cryptoType || 'sr25519';

  if (method === 'exodus') {
    return importPrivateKeyExodus(privateKey, crypto);
  }

  if (method === 'polkadotjs') {
    return importPrivateKeyPolkadotJs(privateKey, crypto);
  }

  // Auto mode: try both methods
  console.log('[POLKADOT-IMPORT] Auto mode: trying both methods...');

  // Try Polkadot.js first
  const pjsResult = await importPrivateKeyPolkadotJs(privateKey, crypto);
  if (pjsResult.success) {
    return pjsResult;
  }

  // Try Exodus
  const exodusResult = await importPrivateKeyExodus(privateKey, crypto);
  if (exodusResult.success) {
    return exodusResult;
  }

  // Both failed
  return {
    success: false,
    method: 'auto',
    error: 'Failed to import with both methods',
    warnings: [
      `Polkadot.js error: ${pjsResult.error}`,
      `Exodus error: ${exodusResult.error}`
    ]
  };
}

/**
 * Import mnemonic with method selection
 */
async function importMnemonic(
  mnemonic: string,
  method: PolkadotImportMethod,
  cryptoType?: 'sr25519' | 'ed25519'
): Promise<PolkadotImportResult> {
  const crypto = cryptoType || 'sr25519';

  if (method === 'exodus') {
    return importMnemonicExodus(mnemonic, crypto);
  }

  if (method === 'polkadotjs') {
    return importMnemonicPolkadotJs(mnemonic, crypto);
  }

  // Auto mode: try both methods
  console.log('[POLKADOT-IMPORT] Auto mode: trying both methods...');

  // Try Polkadot.js first (more common)
  const pjsResult = await importMnemonicPolkadotJs(mnemonic, crypto);
  if (pjsResult.success) {
    return pjsResult;
  }

  // Try Exodus
  const exodusResult = await importMnemonicExodus(mnemonic, crypto);
  if (exodusResult.success) {
    return exodusResult;
  }

  // Both failed
  return {
    success: false,
    method: 'auto',
    error: 'Failed to import with both methods'
  };
}

/**
 * Import keystore with method selection
 */
async function importKeystore(
  data: string | object,
  method: PolkadotImportMethod,
  password: string
): Promise<PolkadotImportResult> {
  // Parse if string
  const keystore = typeof data === 'string' ? JSON.parse(data) : data;

  if (method === 'exodus') {
    return importKeystoreExodus(keystore, password);
  }

  if (method === 'polkadotjs') {
    return importKeystorePolkadotJs(keystore, password);
  }

  // Auto mode: both methods use same standard
  return importKeystorePolkadotJs(keystore, password);
}

/**
 * Import JSON with method selection
 */
async function importJson(
  data: string | object,
  method: PolkadotImportMethod
): Promise<PolkadotImportResult> {
  // Parse if string
  const json = typeof data === 'string' ? JSON.parse(data) : data;

  // LoginStandard JSON contains plain private key
  return importJsonPolkadotJs(json);
}
