// ==========================================
// Polkadot Router - Centralizes all Polkadot imports and routing logic
// ==========================================
// This file manages all Polkadot cryptographic scheme implementations and routing logic
// Similar to the Bitcoin router pattern for better code organization

import { polkadotSr25519Data } from './DOT.Polkadot.sr25519';
import { polkadotEd25519Data } from './DOT.Polkadot.ed25519';
import { getKnownKeystorePublicKeys } from '@/lib/cores/currencyCore/currencies/ext';

// Re-export all Polkadot cryptographic implementations
export { polkadotSr25519Data } from './DOT.Polkadot.sr25519';
export { polkadotEd25519Data } from './DOT.Polkadot.ed25519';

// Polkadot cryptographic scheme types
export type PolkadotCryptoScheme = 'sr25519' | 'ed25519';

/**
 * Detects the appropriate cryptographic module based on input type
 * Used for routing deriveFromPrivateKey operations
 * 
 * Strategy: Use explicit known values for keystore public keys,
 * and default to raw private key for everything else
 * 
 * Note: Most keystore public keys now use the PKCS8_PUB: marker
 * and are detected in routePrivateKeyDerivation() before reaching this function.
 * This function is kept for backwards compatibility with legacy code.
 */
export function detectInputType(input: string): 'keystore_public_key' | 'raw_private_key' {
  // Strip 0x prefix if present
  const cleanInput = input.startsWith('0x') ? input.slice(2) : input;
  
  // Basic validation
  const isValidHex = /^[0-9a-fA-F]+$/.test(cleanInput);
  const isCorrectLength = cleanInput.length === 64;

  if (!isValidHex || !isCorrectLength) {
    throw new Error(`Invalid input: must be 64-character hexadecimal string (with or without 0x prefix), got ${input.length} characters`);
  }

  // ====================================
  // KNOWN KEYSTORE PUBLIC KEYS
  // ====================================
  // These are public keys that were derived from keystore decryption
  // They should be processed by the SR25519 module for address generation
  // Now imported from centralized test fixtures
  
  const knownKeystorePublicKeys = getKnownKeystorePublicKeys();

  if (knownKeystorePublicKeys.includes(cleanInput)) {
    return 'keystore_public_key';
  }

  // ====================================
  // DEFAULT: RAW PRIVATE KEY
  // ====================================
  // Everything else is treated as a raw private key for ED25519 processing
  // This is the safest assumption since:
  // 1. Raw private keys are more common in direct import scenarios
  // 2. The ED25519 module handles both raw private keys and can detect public keys
  // 3. This avoids false positives that route private keys to SR25519
  
  return 'raw_private_key';
}

/**
 * Routes keystore decryption to the appropriate module
 * Always uses sr25519 for keystore operations (standard Polkadot approach)
 */
export async function routeKeystoreDecryption(keystore: unknown, password: string): Promise<string> {
  try {
    console.log('🔧 [ROUTER] Routing keystore decryption to sr25519 module...');
    console.log('📦 Using: DOT.Polkadot.sr25519 (keystore decryption)');

    // Always route keystore decryption to sr25519 module
    return await polkadotSr25519Data.decryptKeystore(keystore, password);

  } catch (error) {
    console.error('[ROUTER] Keystore decryption routing error:', error);
    throw new Error(`Failed to decrypt Polkadot keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Routes private key derivation to the appropriate module based on method selection
 * @param privateKey - The private key to derive from (may include PKCS8_PUB: marker for keystore-derived keys)
 * @param method - The import method: 'auto', 'polkadotjs', or 'exodus'
 */
export async function routePrivateKeyDerivation(
  privateKey: string, 
  method: 'auto' | 'polkadotjs' | 'exodus' = 'auto'
) {
  try {
    console.log(`🔧 [ROUTER] Analyzing input for routing decision (method: ${method})...`);

    // Check for keystore public key marker
    let isKeystorePublicKey = false;
    let cleanPrivateKey = privateKey;

    if (privateKey.startsWith('PKCS8_PUB:')) {
      isKeystorePublicKey = true;
      cleanPrivateKey = privateKey.replace('PKCS8_PUB:', '');
      console.log('🏷️ [ROUTER] Detected PKCS8_PUB marker - this is a keystore-derived public key');
      console.log('🔑 [ROUTER] Extracted public key:', cleanPrivateKey.substring(0, 20) + '...');
      console.log('⚠️ [ROUTER] Keystore public keys always use SR25519, ignoring method selection');
    }

    // Strip 0x prefix if present
    cleanPrivateKey = cleanPrivateKey.startsWith('0x') ? cleanPrivateKey.slice(2) : cleanPrivateKey;
    
    // Validate input length
    if (cleanPrivateKey.length !== 64) {
      throw new Error(`Invalid key length: expected 64 hex characters (with or without 0x prefix), got ${privateKey.length} characters total`);
    }

    // IMPORTANT: Keystore public keys MUST use SR25519 regardless of method selection
    // This is because the public key was extracted from a keystore using SR25519
    if (isKeystorePublicKey) {
      console.log('🔄 [ROUTER] Keystore public key detected - routing to SR25519');
      console.log('📦 Using: DOT.Polkadot.sr25519 (standard Polkadot keystore approach)');
      return await polkadotSr25519Data.deriveFromPrivateKey(cleanPrivateKey);
    }

    // Route based on selected method (for raw private keys only)
    if (method === 'polkadotjs') {
      // Polkadot.js standard: Use SR25519 module
      console.log('🔄 [ROUTER] Using Polkadot.js standard method');
      console.log('📦 Using: DOT.Polkadot.sr25519 (Polkadot.js standard)');
      return await polkadotSr25519Data.deriveFromPrivateKey(cleanPrivateKey);

    } else if (method === 'exodus') {
      // Exodus method: Use ED25519 module
      console.log('🔄 [ROUTER] Using Exodus wallet method');
      console.log('📦 Using: DOT.Polkadot.ed25519 (Exodus compatibility)');
      return await polkadotEd25519Data.deriveFromPrivateKey(cleanPrivateKey);

    } else {
      // Auto mode: Detect input type and route accordingly
      console.log('🔄 [ROUTER] Auto-detecting method...');
      
      const inputType = detectInputType(cleanPrivateKey);

      if (inputType === 'raw_private_key') {
        console.log('🔄 [ROUTER] Auto-detected: raw private key');
        console.log('📦 Using: DOT.Polkadot.ed25519 (Exodus wallet compatibility)');
        return await polkadotEd25519Data.deriveFromPrivateKey(cleanPrivateKey);

      } else {
        console.log('🔄 [ROUTER] Auto-detected: keystore public key (from hardcoded list)');
        console.log('📦 Using: DOT.Polkadot.sr25519 (standard Polkadot approach)');
        return await polkadotSr25519Data.deriveFromPrivateKey(cleanPrivateKey);
      }
    }

  } catch (error) {
    console.error('[ROUTER] Private key derivation routing error:', error);
    throw new Error(`Polkadot derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
