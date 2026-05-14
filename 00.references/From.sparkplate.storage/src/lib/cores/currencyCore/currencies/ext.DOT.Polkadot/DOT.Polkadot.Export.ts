// ==========================================
// DOT.Polkadot.Export - Official Polkadot Keystore Export
// ==========================================
// This module generates keystores compatible with official Polkadot wallets
// Uses the standard Polkadot.js approach: scrypt + xsalsa20-poly1305 + PKCS#8
// Compatible with: Talisman, SubWallet, Nova Spektr, Enkrypt, Polkadot.js

import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { hexToU8a } from '@polkadot/util';

/**
 * Interface for official Polkadot keystore structure
 * Based on Polkadot.js standard and reference wallet implementations
 */
export interface PolkadotKeystoreJson {
  encoded: string; // Base64-encoded encrypted private key data
  encoding: {
    content: string[]; // ["pkcs8", "sr25519"] or ["pkcs8", "ed25519"]
    type: string[]; // ["scrypt", "xsalsa20-poly1305"]
    version: string; // "3"
  };
  address: string; // SS58-encoded address
  meta: {
    name?: string;
    genesisHash?: string;
    whenCreated?: number;
    [key: string]: unknown;
  };
}

/**
 * Exports a private key as a standard Polkadot keystore file
 * Uses Polkadot.js pair.toJson() method for guaranteed compatibility
 * 
 * @param privateKeyHex - 64-character hex private key (with or without 0x prefix)
 * @param password - Password to encrypt the keystore
 * @param metadata - Optional metadata (name, address, etc.)
 * @returns Promise<PolkadotKeystoreJson> - Standard Polkadot keystore object
 * 
 * Implementation Notes:
 * - Uses sr25519 by default (Polkadot standard)
 * - Generates PKCS#8 encoded private key
 * - Uses scrypt + xsalsa20-poly1305 encryption
 * - Compatible with all major Polkadot wallets
 * 
 * References:
 * - Chromium.json (standard single account)
 * - Exodus.json (standard single account)
 * - Talisman wallet implementation
 * - SubWallet wallet implementation
 */
export async function exportPolkadotKeystore(
  privateKeyHex: string,
  password: string,
  metadata?: { 
    name?: string; 
    address?: string;
    cryptoType?: 'sr25519' | 'ed25519';
  }
): Promise<PolkadotKeystoreJson> {
  console.log('🔧 [POLKADOT-EXPORT] Generating official Polkadot keystore...');
  
  // Ensure crypto libraries are ready
  await cryptoWaitReady();

  // Check for keystore public key marker
  if (privateKeyHex.startsWith('PKCS8_PUB:')) {
    throw new Error('Cannot export keystore from a public key. You need the original private key to create a new keystore. If you imported from a keystore file, you already have the keystore - no need to export again.');
  }

  // Strip 0x prefix if present
  const cleanPrivateKey = privateKeyHex.startsWith('0x') 
    ? privateKeyHex.slice(2) 
    : privateKeyHex;

  // Validate private key length
  if (cleanPrivateKey.length !== 64) {
    throw new Error(`Invalid private key length: expected 64 hex characters, got ${cleanPrivateKey.length}`);
  }

  // Determine crypto type (default to sr25519 for Polkadot standard)
  const cryptoType = metadata?.cryptoType || 'sr25519';
  console.log(`[POLKADOT-EXPORT] Using crypto type: ${cryptoType}`);

  // Create keyring with specified crypto type and Polkadot prefix
  // Using ss58Format: 0 (Polkadot mainnet) to match LoginStandard UI display
  // This ensures exported address matches what users see in the interface
  const keyring = new Keyring({ 
    type: cryptoType,
    ss58Format: 0  // Polkadot mainnet prefix (addresses start with '1')
  });

  // Convert hex private key to Uint8Array (treating as seed)
  const privateKeyBytes = hexToU8a(`0x${cleanPrivateKey}`);

  // Add keypair from seed (this is the standard approach)
  const pair = keyring.addFromSeed(privateKeyBytes);

  console.log(`[POLKADOT-EXPORT] Generated address: ${pair.address}`);
  console.log(`[POLKADOT-EXPORT] Public key: ${Buffer.from(pair.publicKey).toString('hex')}`);

  // Validate address if provided
  if (metadata?.address && metadata.address !== pair.address) {
    console.warn(`⚠️ [POLKADOT-EXPORT] Address mismatch:`);
    console.warn(`  Expected: ${metadata.address}`);
    console.warn(`  Generated: ${pair.address}`);
    console.warn(`  This may indicate a crypto type mismatch (sr25519 vs ed25519)`);
  }

  // Build metadata object with proper typing for genesisHash
  const keystoreMeta: Record<string, unknown> = {
    name: metadata?.name || 'LoginStandard Export',
    whenCreated: Date.now()
  };

  // Export to JSON using Polkadot.js standard method
  // This automatically handles:
  // - PKCS#8 encoding
  // - scrypt key derivation
  // - xsalsa20-poly1305 encryption
  const keystoreJson = pair.toJson(password);

  // Update metadata (toJson includes basic meta, we enhance it)
  keystoreJson.meta = {
    ...keystoreJson.meta,
    ...keystoreMeta
  };

  console.log('✅ [POLKADOT-EXPORT] Keystore generated successfully');
  const contentArray = Array.isArray(keystoreJson.encoding.content) ? keystoreJson.encoding.content : [keystoreJson.encoding.content];
  const typeArray = Array.isArray(keystoreJson.encoding.type) ? keystoreJson.encoding.type : [keystoreJson.encoding.type];
  console.log(`[POLKADOT-EXPORT] Format: ${contentArray.join(', ')}`);
  console.log(`[POLKADOT-EXPORT] Encryption: ${typeArray.join(', ')}`);
  console.log(`[POLKADOT-EXPORT] Version: ${keystoreJson.encoding.version}`);

  return keystoreJson as PolkadotKeystoreJson;
}

/**
 * Exports multiple accounts as a batch keystore
 * This format is used by SubWallet and other advanced wallets
 * 
 * @param accounts - Array of accounts to export
 * @param password - Password to encrypt the batch keystore
 * @returns Promise<object> - Batch keystore object
 * 
 * Note: This is an advanced feature for future implementation
 */
export async function exportPolkadotBatchKeystore(
  accounts: Array<{
    privateKey: string;
    name: string;
    metadata?: Record<string, unknown>;
  }>,
  password: string
): Promise<object> {
  console.log('🔧 [POLKADOT-EXPORT] Generating batch keystore...');
  
  await cryptoWaitReady();

  // For batch export, we need to use a different approach
  // This requires encoding multiple PKCS#8 keys into a single encrypted payload
  // For now, we'll throw an error as this is a complex feature
  throw new Error('Batch keystore export is not yet implemented. Use single account export instead.');
}

/**
 * Validates a generated keystore by attempting to decrypt it
 * Useful for testing and verification
 * 
 * @param keystore - Generated keystore object
 * @param password - Password used to encrypt
 * @returns Promise<boolean> - True if valid, false otherwise
 */
export async function validatePolkadotKeystore(
  keystore: PolkadotKeystoreJson,
  password: string
): Promise<boolean> {
  try {
    await cryptoWaitReady();

    const cryptoType = Array.isArray(keystore.encoding.content) 
      ? keystore.encoding.content[1] 
      : 'sr25519';

    // Type assertion for Keyring type parameter
    type KeyringType = 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';
    const keyring = new Keyring({ type: cryptoType as KeyringType });
    const pair = keyring.addFromJson(keystore as unknown as Parameters<typeof keyring.addFromJson>[0]);
    
    // Attempt to decrypt
    pair.decodePkcs8(password);

    // Check if successfully unlocked
    return !pair.isLocked;
  } catch (error) {
    console.error('[POLKADOT-EXPORT] Validation failed:', error);
    return false;
  }
}

