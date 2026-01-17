// ==========================================
// Exodus Method Import Implementation
// ==========================================

import { Keyring } from '@polkadot/keyring';
import { mnemonicToMiniSecret, cryptoWaitReady } from '@polkadot/util-crypto';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import type {
  PolkadotImportResult,
  PolkadotCryptoType,
  PolkadotKeystoreJson
} from './DOT.Polkadot.Import.Types';

/**
 * Import from private key using Exodus method
 * Note: May differ from Polkadot.js in key interpretation
 */
export async function importPrivateKeyExodus(
  privateKey: string,
  cryptoType: PolkadotCryptoType = 'sr25519'
): Promise<PolkadotImportResult> {
  console.log('🔑 [POLKADOT-IMPORT-EXODUS] Importing private key...');

  try {
    await cryptoWaitReady();

    // Clean private key
    const cleanPrivateKey = privateKey.replace(/^0x/, '');

    if (cleanPrivateKey.length !== 64) {
      throw new Error(`Invalid private key length: expected 64, got ${cleanPrivateKey.length}`);
    }

    // Exodus may use Ed25519 by default (check documentation)
    // For now, we'll try the provided cryptoType
    const keyring = new Keyring({ type: cryptoType });

    // Exodus may interpret the private key differently
    // Test both interpretations if needed
    const privateKeyBytes = hexToU8a(`0x${cleanPrivateKey}`);

    const pair = keyring.addFromSeed(privateKeyBytes);

    console.log(`✅ [POLKADOT-IMPORT-EXODUS] Success: ${pair.address}`);

    return {
      success: true,
      privateKey: cleanPrivateKey,
      publicKey: u8aToHex(pair.publicKey).replace(/^0x/, ''),
      address: pair.address,
      cryptoType: cryptoType,
      method: 'exodus'
    };
  } catch (error) {
    console.error('❌ [POLKADOT-IMPORT-EXODUS] Failed:', error);
    return {
      success: false,
      method: 'exodus',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Import from mnemonic using Exodus method
 * Uses Exodus-specific derivation path
 */
export async function importMnemonicExodus(
  mnemonic: string,
  cryptoType: PolkadotCryptoType = 'sr25519'
): Promise<PolkadotImportResult> {
  console.log('📝 [POLKADOT-IMPORT-EXODUS] Importing mnemonic...');

  try {
    await cryptoWaitReady();

    // Exodus uses specific derivation path: m/44'/354'/0'/0'/0'
    // In Substrate format: //44//354//0//0//0
    const exodusDerivationPath = "//44'//354'//0'//0'//0'";

    const keyring = new Keyring({ type: cryptoType });

    // Add from URI with Exodus derivation
    const pair = keyring.addFromUri(`${mnemonic}${exodusDerivationPath}`);

    // Extract seed from mnemonic
    const seed = mnemonicToMiniSecret(mnemonic);
    const privateKey = u8aToHex(seed).replace(/^0x/, '');

    console.log(`✅ [POLKADOT-IMPORT-EXODUS] Success: ${pair.address}`);
    console.log(`[POLKADOT-IMPORT-EXODUS] Derivation: ${exodusDerivationPath}`);

    return {
      success: true,
      privateKey: privateKey,
      publicKey: u8aToHex(pair.publicKey).replace(/^0x/, ''),
      address: pair.address,
      cryptoType: cryptoType,
      method: 'exodus'
    };
  } catch (error) {
    console.error('❌ [POLKADOT-IMPORT-EXODUS] Failed:', error);
    return {
      success: false,
      method: 'exodus',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Import from keystore using Exodus method
 * Same as Polkadot.js (both use standard PKCS#8)
 */
export async function importKeystoreExodus(
  keystore: PolkadotKeystoreJson,
  password: string
): Promise<PolkadotImportResult> {
  console.log('🔐 [POLKADOT-IMPORT-EXODUS] Importing keystore...');

  // Exodus keystores use same format as Polkadot.js
  // Import using standard method
  const { importKeystorePolkadotJs } = await import('./DOT.Polkadot.Import.PolkadotJs');
  const result = await importKeystorePolkadotJs(keystore, password);

  // Override method to 'exodus'
  return {
    ...result,
    method: 'exodus'
  };
}
