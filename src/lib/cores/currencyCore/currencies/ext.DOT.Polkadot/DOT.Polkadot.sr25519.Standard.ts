// ==========================================
// DOT.Polkadot.sr25519.Standard - Standard PKCS#8 Keystore Decryption
// ==========================================
// This module handles standard single-account Polkadot keystore decryption
// Based on polkadot-js standard approach and reference wallet implementations
// Focus: Single-layer PKCS#8 keystore decryption

import {
  Keyring
} from '@polkadot/keyring';
import {
  u8aToHex
} from '@polkadot/util';
import {
  cryptoWaitReady
} from '@polkadot/util-crypto';

/**
 * Interface for standard PKCS#8 keystore structure
 * Based on Polkadot.js keyring format specification
 */
interface StandardKeystoreJson {
  encoded: string; // Base64-encoded encrypted private key data
  encoding: {
    content: string[]; // ["pkcs8", "sr25519"] or ["pkcs8", "ed25519"]
    type: string[]; // ["scrypt", "xsalsa20-poly1305"]
    version: string; // "3"
  };
  address: string; // SS58-encoded address
  meta?: {
    name?: string;
    [key: string]: unknown;
  };
}

/**
 * Decrypts a standard single-account PKCS#8 keystore
 * Uses the proven polkadot-js standard approach as documented in reference wallets
 * 
 * @param keystoreObj - Standard PKCS#8 keystore object
 * @param password - Keystore password
 * @returns Promise<string> - Hex-encoded public key (without 0x prefix)
 * 
 * References:
 * - SubWallet: Uses keyring.addFromJson() + pair.decodePkcs8()
 * - Talisman: Standard polkadot-js approach for single keystores
 * - Polkadot.js UI: Direct keyring integration
 */
export async function decryptStandardKeystore(
  keystoreObj: StandardKeystoreJson, 
  password: string
): Promise<string> {
  console.log('🔧 [SR25519-Standard] Decrypting standard PKCS#8 keystore...');

  await cryptoWaitReady();

  // Detect crypto type from keystore metadata
  // Based on polkadot-js UI-master pattern: encoding.content[1] contains the crypto type
  const cryptoType = Array.isArray(keystoreObj.encoding.content) 
    ? keystoreObj.encoding.content[1] 
    : 'ed25519';
  
  console.log(`[SR25519-Standard] Detected crypto type: ${cryptoType}`);
  console.log(`[SR25519-Standard] Keystore address: ${keystoreObj.address}`);

  // Use standard polkadot-js approach
  // This is the exact method used by SubWallet and other professional wallets
  const keyring = new Keyring({ type: cryptoType as any });
  const pair = keyring.addFromJson(keystoreObj);
  
  // Decrypt the keystore with the provided password
  pair.decodePkcs8(password);

  if (pair.isLocked) {
    throw new Error('Pair is still locked after decryption - invalid password or corrupted keystore');
  }

  console.log('✅ [SR25519-Standard] Keystore decrypted successfully');

  // Extract the public key directly from the decrypted pair
  const publicKeyHex = u8aToHex(pair.publicKey).slice(2); // Remove '0x' prefix

  console.log(`✅ [SR25519-Standard] Extracted public key, length: ${publicKeyHex.length}`);
  console.log(`🔑 [SR25519-Standard] Public key: 0x${publicKeyHex}`);

  // Validate the generated address matches the keystore address
  const generatedAddress = pair.address;
  if (generatedAddress !== keystoreObj.address) {
    console.warn(`⚠️ [SR25519-Standard] Address mismatch:`);
    console.warn(`  Keystore address: ${keystoreObj.address}`);
    console.warn(`  Generated address: ${generatedAddress}`);
  } else {
    console.log(`✅ [SR25519-Standard] Address validation successful: ${generatedAddress}`);
  }

  // Prefix with special marker so router knows this is a keystore-derived public key
  // Format: PKCS8_PUB: followed by the public key hex
  const markedPublicKey = `PKCS8_PUB:${publicKeyHex}`;
  console.log(`🏷️ [SR25519-Standard] Marked as keystore public key: ${markedPublicKey.substring(0, 20)}...`);

  return markedPublicKey;
}

/**
 * Validates if a keystore object is a standard PKCS#8 format
 * 
 * @param keystoreObj - Potential keystore object
 * @returns boolean - True if standard PKCS#8, false otherwise
 */
export function isStandardKeystore(keystoreObj: unknown): keystoreObj is StandardKeystoreJson {
  if (!keystoreObj || typeof keystoreObj !== 'object') {
    return false;
  }

  const keystore = keystoreObj as any;
  
  // Check for required fields
  if (!keystore.encoded || !keystore.encoding || !keystore.address) {
    return false;
  }

  // Check encoding structure
  if (!Array.isArray(keystore.encoding.content) || !Array.isArray(keystore.encoding.type)) {
    return false;
  }

  // Verify it's NOT a batch export
  if (keystore.encoding.content.includes('batch-pkcs8')) {
    return false;
  }

  // Verify it contains PKCS#8 content
  if (!keystore.encoding.content.includes('pkcs8')) {
    return false;
  }

  // Verify standard encryption types
  const hasScrypt = keystore.encoding.type.includes('scrypt');
  const hasXSalsa = keystore.encoding.type.includes('xsalsa20-poly1305');
  
  return hasScrypt && hasXSalsa;
}

/**
 * Gets supported crypto types from a standard keystore
 * 
 * @param keystoreObj - Standard keystore object
 * @returns string - The crypto type (sr25519, ed25519, ecdsa)
 */
export function getKeystoreCryptoType(keystoreObj: StandardKeystoreJson): string {
  if (Array.isArray(keystoreObj.encoding.content) && keystoreObj.encoding.content.length >= 2) {
    return keystoreObj.encoding.content[1];
  }
  
  // Default fallback (though this should rarely be used)
  return 'sr25519';
}

/**
 * Gets keystore metadata information
 * 
 * @param keystoreObj - Standard keystore object
 * @returns object - Keystore metadata
 */
export function getKeystoreMetadata(keystoreObj: StandardKeystoreJson) {
  return {
    address: keystoreObj.address,
    name: keystoreObj.meta?.name || 'Unnamed Account',
    cryptoType: getKeystoreCryptoType(keystoreObj),
    version: keystoreObj.encoding.version,
    encryptionTypes: keystoreObj.encoding.type
  };
}
