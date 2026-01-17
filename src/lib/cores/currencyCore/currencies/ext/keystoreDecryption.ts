// Keystore Decryption Utilities
// Centralized functions for decrypting various cryptocurrency keystore formats

/**
 * Decrypt Ethereum keystore (Web3 Secret Storage format)
 */
export const decryptEthereumKeystore = async (keystore: unknown, password: string): Promise<string> => {
  // Use the Ethereum-specific decryption function from ETH.Ethereum.ts
  const { ethereumData } = await import('@/lib/cores/currencyCore/currencies/ETH.Ethereum');

  if (ethereumData.decryptKeystore) {
    return await ethereumData.decryptKeystore(keystore, password);
  } else {
    throw new Error('Ethereum keystore decryption not available');
  }
};

/**
 * Decrypt Tezos keystore
 */
export const decryptTezosKeystore = async (keystore: unknown, password: string): Promise<string> => {
  // Use the Tezos-specific decryption function from XTZ.Tezos.ts
  const { tezosData } = await import('@/lib/cores/currencyCore/currencies/XTZ.Tezos');

  if (tezosData.decryptKeystore) {
    return await tezosData.decryptKeystore(keystore, password);
  } else {
    throw new Error('Tezos keystore decryption not available');
  }
};

/**
 * Decrypt Polkadot keystore
 */
export const decryptPolkadotKeystore = async (keystore: unknown, password: string): Promise<string> => {
  // Use the Polkadot-specific decryption function from DOT.Polkadot.ts
  const { polkadotData } = await import('@/lib/cores/currencyCore/currencies/DOT.Polkadot');

  if (polkadotData.decryptKeystore) {
    return await polkadotData.decryptKeystore(keystore, password);
  } else {
    throw new Error('Polkadot keystore decryption not available');
  }
};

/**
 * Decrypt SubWallet batch export
 * SubWallet exports multiple accounts in a single encrypted batch file
 */
export const decryptSubWalletBatchExport = async (data: unknown, password: string): Promise<string> => {
  try {
    console.log('🔧 Decrypting SubWallet batch export...');

    // Import required Polkadot crypto functions
    const { jsonDecrypt } = await import('@polkadot/util-crypto');
    const { u8aToString } = await import('@polkadot/util');
    type EncryptedJson = unknown; // Use unknown for compatibility since the batch format may vary

    const batchData = data as {
      encoded: string;
      encoding: {
        content: string[];
        type: string[];
        version: string;
      };
      accounts: Array<{
        address: string;
        meta: {
          name?: string;
          [key: string]: unknown;
        };
      }>;
    };

    console.log(`📝 Batch export contains ${batchData.accounts.length} accounts`);

    // Decrypt the batch using Polkadot's jsonDecrypt with type assertion
    const decoded = u8aToString(jsonDecrypt(batchData as Parameters<typeof jsonDecrypt>[0], password));
    const keystores = JSON.parse(decoded);

    console.log(`✅ Batch decrypted, found ${keystores.length} keystore(s)`);

    // For now, extract the first account (we can enhance this later for multi-account selection)
    if (keystores.length === 0) {
      throw new Error('No keystores found in batch export');
    }

    const firstKeystore = keystores[0];
    console.log('📝 Using first keystore from batch:', Object.keys(firstKeystore));

    // Decrypt the individual keystore using our existing Polkadot logic
    console.log('🔧 Decrypting individual keystore from batch...');
    console.log('📝 Original keystore address from batch:', firstKeystore.address);
    const privateKey = await decryptPolkadotKeystore(firstKeystore, password);
    console.log('🔑 Decrypted private key length:', privateKey.length);
    console.log('🔑 Private key preview:', privateKey.substring(0, 10) + '...');

    return privateKey;

  } catch (error) {
    console.error('SubWallet batch decryption error:', error);
    throw new Error(`Failed to decrypt SubWallet batch export: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Decrypt Dash wallet backup (OpenSSL encrypted)
 */
export const decryptDashKeystore = async (content: string, password: string): Promise<string> => {
  try {
    const cryptoJs = await import('crypto-js');

    // Dash wallet backups are typically OpenSSL encrypted
    const decrypted = cryptoJs.AES.decrypt(content, password);
    return decrypted.toString(cryptoJs.enc.Utf8);
  } catch (error) {
    throw new Error(`Failed to decrypt wallet backup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Detect keystore format and decrypt accordingly
 * This function attempts to identify the keystore format and use the appropriate decryption method
 */
export const detectAndDecryptKeystore = async (keystore: unknown, password: string): Promise<{
  privateKey: string;
  format: string;
}> => {
  try {
    // Try to parse as JSON if it's a string
    let keystoreObj = keystore;
    if (typeof keystore === 'string') {
      try {
        keystoreObj = JSON.parse(keystore);
      } catch {
        // If parsing fails, it might be a raw encrypted format
        // Try Dash format (OpenSSL encrypted string)
        const privateKey = await decryptDashKeystore(keystore, password);
        return { privateKey, format: 'dash-openssl' };
      }
    }

    // Check for Ethereum/Web3 Secret Storage format
    if (
      keystoreObj && 
      typeof keystoreObj === 'object' && 
      ('crypto' in keystoreObj || 'Crypto' in keystoreObj)
    ) {
      const privateKey = await decryptEthereumKeystore(keystoreObj, password);
      return { privateKey, format: 'ethereum-web3' };
    }

    // Check for Tezos keystore format
    if (
      keystoreObj &&
      typeof keystoreObj === 'object' &&
      ('mnemonic' in keystoreObj || 'secret' in keystoreObj)
    ) {
      const privateKey = await decryptTezosKeystore(keystoreObj, password);
      return { privateKey, format: 'tezos' };
    }

    // Check for Polkadot/Substrate keystore format
    if (
      keystoreObj &&
      typeof keystoreObj === 'object' &&
      ('encoded' in keystoreObj || 'encoding' in keystoreObj)
    ) {
      // Check if it's a SubWallet batch export
      if ('accounts' in keystoreObj && Array.isArray((keystoreObj as { accounts: unknown }).accounts)) {
        const privateKey = await decryptSubWalletBatchExport(keystoreObj, password);
        return { privateKey, format: 'subwallet-batch' };
      }
      
      // Regular Polkadot keystore
      const privateKey = await decryptPolkadotKeystore(keystoreObj, password);
      return { privateKey, format: 'polkadot-substrate' };
    }

    throw new Error('Unknown keystore format. Supported formats: Ethereum (Web3), Tezos, Polkadot/Substrate, SubWallet batch, Dash (OpenSSL)');

  } catch (error) {
    console.error('Keystore detection/decryption error:', error);
    throw error;
  }
};

/**
 * Get supported keystore formats
 */
export const getSupportedKeystoreFormats = (): string[] => {
  return [
    'Ethereum (Web3 Secret Storage)',
    'Tezos',
    'Polkadot/Substrate',
    'SubWallet Batch Export',
    'Dash (OpenSSL encrypted)'
  ];
};

