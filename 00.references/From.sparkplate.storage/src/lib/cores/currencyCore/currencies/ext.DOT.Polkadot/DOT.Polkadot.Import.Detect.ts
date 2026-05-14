// ==========================================
// Format Detection for Polkadot Import
// ==========================================

import type {
  PolkadotInputFormat,
  PolkadotImportMethod,
  FormatDetectionResult,
  PolkadotKeystoreJson,
  LoginStandardPolkadotJson
} from './DOT.Polkadot.Import.Types';

/**
 * Detects the input format and suggests an import method
 */
export function detectPolkadotFormat(input: string | object): FormatDetectionResult {
  console.log('🔍 [POLKADOT-IMPORT] Detecting format...');

  // Handle object input (parsed JSON or keystore)
  if (typeof input === 'object') {
    return detectJsonFormat(input);
  }

  // Handle string input
  const trimmed = input.trim();

  // Check for private key (64-char hex)
  if (isPrivateKey(trimmed)) {
    return {
      format: 'privateKey',
      method: 'auto', // Will try both methods
      confidence: 'high',
      indicators: ['64-character hex string']
    };
  }

  // Check for mnemonic (12/24 words)
  if (isMnemonic(trimmed)) {
    return {
      format: 'mnemonic',
      method: 'auto', // Will try both methods
      confidence: 'high',
      indicators: ['BIP39 mnemonic phrase detected']
    };
  }

  // Try parsing as JSON
  try {
    const parsed = JSON.parse(trimmed);
    return detectJsonFormat(parsed);
  } catch {
    // Not valid JSON
  }

  // Unknown format
  return {
    format: 'privateKey', // Default fallback
    method: 'auto',
    confidence: 'low',
    indicators: ['Unknown format, defaulting to private key']
  };
}

/**
 * Detects JSON format (keystore vs plain JSON)
 */
function detectJsonFormat(obj: unknown): FormatDetectionResult {
  // Check for Polkadot keystore format
  if (isPolkadotKeystore(obj)) {
    const method = detectKeystoreMethod(obj);
    return {
      format: 'keystore',
      method: method,
      confidence: 'high',
      indicators: [
        'Polkadot keystore detected',
        `Encoding: ${obj.encoding?.content?.join(', ')}`,
        `Method: ${method}`
      ]
    };
  }

  // Check for LoginStandard JSON format
  if (isLoginStandardJson(obj)) {
    return {
      format: 'json',
      method: 'polkadotjs', // LoginStandard uses Polkadot.js method
      confidence: 'high',
      indicators: [
        'LoginStandard JSON format',
        'Contains unencrypted private key'
      ]
    };
  }

  // Unknown JSON structure
  return {
    format: 'json',
    method: 'auto',
    confidence: 'low',
    indicators: ['Unknown JSON structure']
  };
}

/**
 * Checks if input is a valid private key
 */
function isPrivateKey(input: string): boolean {
  const cleaned = input.replace(/^0x/, '');
  return /^[0-9a-fA-F]{64}$/.test(cleaned);
}

/**
 * Checks if input is a valid mnemonic
 */
function isMnemonic(input: string): boolean {
  const words = input.trim().split(/\s+/);
  return [12, 15, 18, 21, 24].includes(words.length);
}

/**
 * Checks if object is a Polkadot keystore
 */
function isPolkadotKeystore(obj: unknown): obj is PolkadotKeystoreJson {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'encoded' in obj &&
    typeof obj.encoded === 'string' &&
    'encoding' in obj &&
    typeof obj.encoding === 'object' &&
    obj.encoding !== null &&
    'content' in obj.encoding &&
    Array.isArray(obj.encoding.content) &&
    'type' in obj.encoding &&
    Array.isArray(obj.encoding.type) &&
    'address' in obj &&
    typeof obj.address === 'string'
  );
}

/**
 * Checks if object is LoginStandard JSON format
 */
function isLoginStandardJson(obj: unknown): obj is LoginStandardPolkadotJson {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'currency' in obj &&
    obj.currency === 'DOT' &&
    'privateKey' in obj &&
    typeof obj.privateKey === 'string' &&
    'address' in obj &&
    typeof obj.address === 'string' &&
    'exportedBy' in obj &&
    obj.exportedBy === 'LoginStandard'
  );
}

/**
 * Detects which method created the keystore
 */
function detectKeystoreMethod(keystore: PolkadotKeystoreJson): PolkadotImportMethod {
  // Check meta.name for indicators
  const name = keystore.meta?.name?.toLowerCase() || '';

  if (name.includes('exodus')) {
    return 'exodus';
  }

  if (name.includes('polkadot') || name.includes('talisman') || name.includes('subwallet')) {
    return 'polkadotjs';
  }

  // Check address prefix
  // Exodus may use different SS58 prefix
  const address = keystore.address;
  if (address.startsWith('5')) {
    // Standard Polkadot address (prefix 0)
    return 'polkadotjs';
  }

  // Default to auto (will try both)
  return 'auto';
}

/**
 * Validates password strength for encryption
 */
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  return { valid: true };
}
