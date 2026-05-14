// ==========================================
// DOT.Polkadot.sr25519.Batch - Batch PKCS#8 Keystore Decryption
// ==========================================
// This module handles batch-pkcs8 multi-account keystore decryption
// Based on Talisman and SubWallet batch export implementations
// Focus: Two-layer batch-pkcs8 keystore decryption

import {
  u8aToString
} from '@polkadot/util';
import {
  cryptoWaitReady,
  jsonDecrypt
} from '@polkadot/util-crypto';
import { 
  decryptStandardKeystore,
  type StandardKeystoreJson
} from './DOT.Polkadot.sr25519.Standard.ts';

/**
 * Interface for batch-pkcs8 keystore structure
 * Based on SubWallet and Talisman batch export formats
 */
interface BatchKeystoreJson {
  encoded: string; // Base64-encoded encrypted JSON string containing multiple keystores
  encoding: {
    content: string[]; // ["batch-pkcs8"]
    type: string[]; // ["scrypt", "xsalsa20-poly1305"]
    version: string; // "3"
  };
  accounts: Array<{
    address: string;
    meta: {
      genesisHash?: string;
      name: string;
      isMasterAccount?: boolean;
      whenCreated?: number;
      isMasterPassword?: boolean;
      isSubWallet?: boolean;
      [key: string]: unknown;
    };
  }>;
}

/**
 * Interface for the inner keystore structure found within batch exports
 * This is the structure of individual keystores after decrypting the outer layer
 */
interface BatchInnerKeystoreJson extends StandardKeystoreJson {
  // Inherits all standard keystore properties
  // May have additional batch-specific metadata
}

/**
 * Decrypts a batch-pkcs8 keystore using the two-step process
 * 
 * Implementation based on:
 * - Talisman's batch export/import logic
 * - SubWallet's batch keystore handling
 * - Polkadot.js UI restoreAccounts method
 * 
 * Two-step decryption process:
 * 1. Decrypt outer layer (encrypted JSON string) using jsonDecrypt
 * 2. Parse inner JSON to get array of individual standard keystores
 * 3. Decrypt each individual keystore using standard PKCS#8 method
 * 
 * @param batchKeystoreObj - Batch keystore object
 * @param password - Keystore password (same for outer and inner layers)
 * @param accountIndex - Index of account to decrypt (default: 0)
 * @returns Promise<string> - Hex-encoded public key (without 0x prefix)
 */
export async function decryptBatchKeystore(
  batchKeystoreObj: BatchKeystoreJson, 
  password: string,
  accountIndex: number = 0
): Promise<string> {
  console.log('🔧 [SR25519-Batch] Decrypting batch-pkcs8 keystore using two-step process...');
  console.log(`[SR25519-Batch] Batch contains ${batchKeystoreObj.accounts?.length || 0} account(s)`);
  console.log(`[SR25519-Batch] Decrypting account at index: ${accountIndex}`);

  await cryptoWaitReady();

  try {
    // Step 1: Decrypt the outer layer to reveal the inner JSON string
    // This uses the same jsonDecrypt function as standard keystores
    // but the result is a JSON string, not raw PKCS#8 data
    console.log('[SR25519-Batch] Step 1: Decrypting outer batch layer...');
    const innerJsonString = u8aToString(jsonDecrypt(batchKeystoreObj, password));
    
    console.log(`✅ [SR25519-Batch] Outer layer decrypted, JSON length: ${innerJsonString.length}`);

    // Step 2: Parse the inner JSON string to get array of individual keystores
    console.log('[SR25519-Batch] Step 2: Parsing inner JSON array...');
    let innerKeystores: BatchInnerKeystoreJson[];
    
    try {
      innerKeystores = JSON.parse(innerJsonString) as BatchInnerKeystoreJson[];
    } catch (parseError) {
      throw new Error(`Failed to parse inner JSON: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
    }

    if (!Array.isArray(innerKeystores) || innerKeystores.length === 0) {
      throw new Error('Batch file did not contain any valid inner keystores');
    }

    console.log(`✅ [SR25519-Batch] Found ${innerKeystores.length} inner keystore(s)`);

    // Validate account index
    if (accountIndex < 0 || accountIndex >= innerKeystores.length) {
      throw new Error(`Invalid account index ${accountIndex}. Batch contains ${innerKeystores.length} account(s)`);
    }

    // Step 3: Extract the specified account keystore
    const targetKeystore = innerKeystores[accountIndex];
    console.log(`✅ [SR25519-Batch] Extracted inner keystore for account: ${targetKeystore.address}`);
    
    // Log keystore details for debugging
    console.log(`[SR25519-Batch] Inner keystore crypto type: ${targetKeystore.encoding?.content?.[1] || 'unknown'}`);
    console.log(`[SR25519-Batch] Inner keystore name: ${targetKeystore.meta?.name || 'unnamed'}`);

    // Validate that the extracted keystore matches the batch metadata
    const expectedAccount = batchKeystoreObj.accounts?.[accountIndex];
    if (expectedAccount && expectedAccount.address !== targetKeystore.address) {
      console.warn(`⚠️ [SR25519-Batch] Address mismatch between batch metadata and inner keystore:`);
      console.warn(`  Batch metadata: ${expectedAccount.address}`);
      console.warn(`  Inner keystore: ${targetKeystore.address}`);
    }

    // Step 4: Decrypt the individual keystore using standard PKCS#8 method
    // Important: Use the SAME password for the inner keystore decryption
    console.log('[SR25519-Batch] Step 3: Decrypting individual keystore...');
    const publicKeyHex = await decryptStandardKeystore(targetKeystore, password);

    console.log('✅ [SR25519-Batch] Batch keystore decryption completed successfully');
    
    return publicKeyHex;

  } catch (error) {
    console.error('[SR25519-Batch] Batch keystore decryption failed:', error);
    
    // Provide helpful error context
    if (error instanceof Error) {
      if (error.message.includes('Unable to decode using the supplied passphrase')) {
        throw new Error('Invalid password for batch keystore');
      } else if (error.message.includes('Scrypt parameters exceed safe limits')) {
        throw new Error('Batch keystore uses unsupported scrypt parameters');
      } else if (error.message.includes('parse')) {
        throw new Error('Corrupted batch keystore: invalid inner JSON structure');
      }
    }
    
    throw new Error(`Batch keystore decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates if a keystore object is a batch-pkcs8 format
 * 
 * @param keystoreObj - Potential keystore object
 * @returns boolean - True if batch-pkcs8, false otherwise
 */
export function isBatchKeystore(keystoreObj: unknown): keystoreObj is BatchKeystoreJson {
  if (!keystoreObj || typeof keystoreObj !== 'object') {
    return false;
  }

  const keystore = keystoreObj as any;
  
  // Check for required batch-specific fields
  if (!keystore.encoded || !keystore.encoding || !keystore.accounts) {
    return false;
  }

  // Verify accounts is an array
  if (!Array.isArray(keystore.accounts)) {
    return false;
  }

  // Check encoding structure
  if (!Array.isArray(keystore.encoding.content) || !Array.isArray(keystore.encoding.type)) {
    return false;
  }

  // The key identifier: must contain 'batch-pkcs8' in content
  if (!keystore.encoding.content.includes('batch-pkcs8')) {
    return false;
  }

  // Verify standard encryption types
  const hasScrypt = keystore.encoding.type.includes('scrypt');
  const hasXSalsa = keystore.encoding.type.includes('xsalsa20-poly1305');
  
  return hasScrypt && hasXSalsa;
}

/**
 * Gets batch keystore metadata and account information
 * 
 * @param batchKeystoreObj - Batch keystore object
 * @returns object - Batch metadata including account list
 */
export function getBatchKeystoreMetadata(batchKeystoreObj: BatchKeystoreJson) {
  return {
    totalAccounts: batchKeystoreObj.accounts.length,
    version: batchKeystoreObj.encoding.version,
    encryptionTypes: batchKeystoreObj.encoding.type,
    accounts: batchKeystoreObj.accounts.map((account, index) => ({
      index,
      address: account.address,
      name: account.meta.name,
      isMasterAccount: account.meta.isMasterAccount || false,
      whenCreated: account.meta.whenCreated,
      isSubWallet: account.meta.isSubWallet || false
    }))
  };
}

/**
 * Decrypts all accounts in a batch keystore
 * 
 * @param batchKeystoreObj - Batch keystore object
 * @param password - Keystore password
 * @returns Promise<Array> - Array of decrypted account data
 */
export async function decryptAllBatchAccounts(
  batchKeystoreObj: BatchKeystoreJson, 
  password: string
): Promise<Array<{
  index: number;
  address: string;
  name: string;
  publicKey: string;
}>> {
  console.log(`🔧 [SR25519-Batch] Decrypting all ${batchKeystoreObj.accounts.length} accounts in batch...`);

  const results = [];
  
  for (let i = 0; i < batchKeystoreObj.accounts.length; i++) {
    try {
      const publicKey = await decryptBatchKeystore(batchKeystoreObj, password, i);
      const account = batchKeystoreObj.accounts[i];
      
      results.push({
        index: i,
        address: account.address,
        name: account.meta.name,
        publicKey
      });
      
      console.log(`✅ [SR25519-Batch] Account ${i + 1}/${batchKeystoreObj.accounts.length} decrypted: ${account.address}`);
    } catch (error) {
      console.error(`❌ [SR25519-Batch] Failed to decrypt account ${i}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  console.log(`✅ [SR25519-Batch] All ${results.length} accounts decrypted successfully`);
  return results;
}
