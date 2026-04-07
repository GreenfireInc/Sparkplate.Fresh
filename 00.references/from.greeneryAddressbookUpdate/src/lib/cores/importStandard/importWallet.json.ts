/**
 * Import Standard - Wallet JSON Import Service
 * 
 * Handles parsing of JSON files containing wallet address data
 * with support for currency, address, keyFingerprint, cryptoPublicKey, and gpgPublicKey
 */

export interface ImportedWallet {
  coinTicker: string;
  address: string;
  keyFingerprint?: string;
  cryptoPublicKey?: string;
  gpgPublicKey?: string;
}

export interface WalletImportResult {
  wallets: ImportedWallet[];
  file: File;
}

/**
 * Parse a JSON file containing wallet addresses
 * Expected format:
 * {
 *   "addresses": [
 *     {
 *       "currency": "BTC",
 *       "address": "...",
 *       "keyFingerprint": "...",
 *       "cryptoPublicKey": "...",
 *       "gpgPublicKey": "..."
 *     }
 *   ]
 * }
 */
export async function parseWalletJsonFile(file: File): Promise<WalletImportResult> {
  try {
    const text = await file.text();
    const jsonData = JSON.parse(text);
    
    if (!jsonData.addresses || !Array.isArray(jsonData.addresses)) {
      throw new Error('Invalid JSON format: expected "addresses" array');
    }
    
    const wallets: ImportedWallet[] = jsonData.addresses.map((addr: any) => ({
      coinTicker: addr.currency || '',
      address: addr.address || '',
      keyFingerprint: addr.keyFingerprint || undefined,
      cryptoPublicKey: addr.cryptoPublicKey || undefined,
      gpgPublicKey: addr.gpgPublicKey || addr.publicKey || undefined,
    }));
    
    // Filter out wallets with missing required fields
    const validWallets = wallets.filter(w => w.coinTicker && w.address);
    
    if (validWallets.length === 0) {
      throw new Error('No valid wallet addresses found in file');
    }
    
    return {
      wallets: validWallets,
      file,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error parsing wallet JSON file: ${error.message}`);
    }
    throw new Error('Unknown error occurred while parsing wallet JSON file');
  }
}
