// ==========================================
// Polkadot.js Method Import Implementation
// ==========================================

import { Keyring } from '@polkadot/keyring';
import { mnemonicToMiniSecret, cryptoWaitReady } from '@polkadot/util-crypto';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import type {
  PolkadotImportResult,
  PolkadotCryptoType,
  PolkadotKeystoreJson,
  LoginStandardPolkadotJson
} from './DOT.Polkadot.Import.Types';

/**
 * Import from private key using Polkadot.js method
 */
export async function importPrivateKeyPolkadotJs(
  privateKey: string,
  cryptoType: PolkadotCryptoType = 'sr25519'
): Promise<PolkadotImportResult> {
  console.log('🔑 [POLKADOT-IMPORT-PJS] Importing private key...');

  try {
    await cryptoWaitReady();

    // Clean private key
    const cleanPrivateKey = privateKey.replace(/^0x/, '');

    if (cleanPrivateKey.length !== 64) {
      throw new Error(`Invalid private key length: expected 64, got ${cleanPrivateKey.length}`);
    }

    // Create keyring
    const keyring = new Keyring({ type: cryptoType });

    // Convert hex to Uint8Array (treat as seed)
    const privateKeyBytes = hexToU8a(`0x${cleanPrivateKey}`);

    // Add from seed
    const pair = keyring.addFromSeed(privateKeyBytes);

    console.log(`✅ [POLKADOT-IMPORT-PJS] Success: ${pair.address}`);

    return {
      success: true,
      privateKey: cleanPrivateKey,
      publicKey: u8aToHex(pair.publicKey).replace(/^0x/, ''),
      address: pair.address,
      cryptoType: cryptoType,
      method: 'polkadotjs'
    };
  } catch (error) {
    console.error('❌ [POLKADOT-IMPORT-PJS] Failed:', error);
    return {
      success: false,
      method: 'polkadotjs',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Import from mnemonic using Polkadot.js method
 */
export async function importMnemonicPolkadotJs(
  mnemonic: string,
  cryptoType: PolkadotCryptoType = 'sr25519',
  derivationPath?: string
): Promise<PolkadotImportResult> {
  console.log('📝 [POLKADOT-IMPORT-PJS] Importing mnemonic...');

  try {
    await cryptoWaitReady();

    // Create keyring
    const keyring = new Keyring({ type: cryptoType });

    // Add from mnemonic with optional derivation path
    const pair = derivationPath
      ? keyring.addFromUri(`${mnemonic}${derivationPath}`)
      : keyring.addFromMnemonic(mnemonic);

    // Extract private key (seed)
    const seed = mnemonicToMiniSecret(mnemonic);
    const privateKey = u8aToHex(seed).replace(/^0x/, '');

    console.log(`✅ [POLKADOT-IMPORT-PJS] Success: ${pair.address}`);

    return {
      success: true,
      privateKey: privateKey,
      publicKey: u8aToHex(pair.publicKey).replace(/^0x/, ''),
      address: pair.address,
      cryptoType: cryptoType,
      method: 'polkadotjs'
    };
  } catch (error) {
    console.error('❌ [POLKADOT-IMPORT-PJS] Failed:', error);
    return {
      success: false,
      method: 'polkadotjs',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Import from encrypted keystore using Polkadot.js method
 */
export async function importKeystorePolkadotJs(
  keystore: PolkadotKeystoreJson,
  password: string
): Promise<PolkadotImportResult> {
  console.log('🔐 [POLKADOT-IMPORT-PJS] Importing keystore...');

  try {
    await cryptoWaitReady();

    // Detect crypto type from encoding
    const cryptoType = (keystore.encoding.content[1] || 'sr25519') as PolkadotCryptoType;

    // Create keyring
    const keyring = new Keyring({ type: cryptoType });

    // Add from JSON
    const pair = keyring.addFromJson(keystore as any);

    // Decrypt with password
    pair.decodePkcs8(password);

    if (pair.isLocked) {
      throw new Error('Failed to decrypt keystore - wrong password');
    }

    // Extract private key (this is tricky as Polkadot.js doesn't expose it directly)
    // We can only verify the address matches
    console.log(`✅ [POLKADOT-IMPORT-PJS] Success: ${pair.address}`);
    console.log(`⚠️ [POLKADOT-IMPORT-PJS] Note: Private key not extracted (use pair object)`);

    return {
      success: true,
      // privateKey: undefined, // Cannot extract easily from decrypted pair
      publicKey: u8aToHex(pair.publicKey).replace(/^0x/, ''),
      address: pair.address,
      cryptoType: cryptoType,
      method: 'polkadotjs',
      warnings: ['Private key not extracted - keystore decrypted successfully']
    };
  } catch (error) {
    console.error('❌ [POLKADOT-IMPORT-PJS] Failed:', error);
    return {
      success: false,
      method: 'polkadotjs',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Import from LoginStandard JSON using Polkadot.js method
 */
export async function importJsonPolkadotJs(
  json: LoginStandardPolkadotJson
): Promise<PolkadotImportResult> {
  console.log('📄 [POLKADOT-IMPORT-PJS] Importing JSON...');

  // JSON contains unencrypted private key, just validate and import
  return importPrivateKeyPolkadotJs(json.privateKey);
}
