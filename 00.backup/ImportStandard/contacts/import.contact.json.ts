/**
 * Wallet-address JSON import for the contact add-entry modal (same schema as `importWallet.json`).
 */

import {
  parseWalletJsonFile,
  type ImportedWallet,
  type WalletImportResult,
} from '../importWallet.json'

export type { ImportedWallet, WalletImportResult }

/** Parsed wallet rows from a Sparkplate-style wallet JSON file. */
export async function importWalletJsonForContactForm(file: File): Promise<ImportedWallet[]> {
  const result = await parseWalletJsonFile(file)
  return result.wallets
}
