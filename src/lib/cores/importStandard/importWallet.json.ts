/**
 * Import Standard - Wallet JSON Import Service
 *
 * Handles parsing of JSON files containing wallet address data
 * with support for currency, address, keyFingerprint, cryptoPublicKey, and gpgPublicKey
 */

export interface ImportedWallet {
  coinTicker: string
  address: string
  keyFingerprint?: string
  cryptoPublicKey?: string
  gpgPublicKey?: string
}

export interface WalletImportResult {
  wallets: ImportedWallet[]
  file: File
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function coinFromEntry(entry: Record<string, unknown>): string {
  const v =
    entry.currency ??
    entry.coinTicker ??
    entry.coin ??
    entry.ticker ??
    entry.network ??
    entry.symbol ??
    entry.chain
  return typeof v === 'string' ? v.trim() : ''
}

function addressFromEntry(entry: Record<string, unknown>): string {
  const v =
    entry.address ??
    entry.walletAddress ??
    entry.wallet_address ??
    entry.terraAddress ??
    entry.terra_address ??
    entry.publicAddress ??
    entry.public_address
  return typeof v === 'string' ? v.trim() : ''
}

function entryToImportedWallet(addr: unknown): ImportedWallet {
  if (!isPlainObject(addr)) {
    return { coinTicker: '', address: '' }
  }
  return {
    coinTicker: coinFromEntry(addr),
    address: addressFromEntry(addr),
    keyFingerprint:
      typeof addr.keyFingerprint === 'string' ? addr.keyFingerprint : undefined,
    cryptoPublicKey:
      typeof addr.cryptoPublicKey === 'string' ? addr.cryptoPublicKey : undefined,
    gpgPublicKey: typeof addr.gpgPublicKey === 'string' ? addr.gpgPublicKey : undefined,
  }
}

function looksLikePrivateKeyExport(obj: Record<string, unknown>): boolean {
  const hasSecret =
    'privateKey' in obj ||
    'private_key' in obj ||
    'secretKey' in obj ||
    'secret_key' in obj ||
    'hexPrivateKey' in obj
  const hasPublicAddress = addressFromEntry(obj).length > 0
  return hasSecret && !hasPublicAddress
}

function looksLikeSeedOrKeyForgeBackup(obj: Record<string, unknown>): boolean {
  if (typeof obj.mnemonicSeedPhrase === 'string' && obj.mnemonicSeedPhrase.trim().length > 0) {
    return true
  }
  if (typeof obj.seedPhrase === 'string' && obj.seedPhrase.trim().length > 0) {
    return true
  }
  if (obj.from === 'keyForge') {
    return true
  }
  return false
}

/**
 * Collect raw list entries from supported top-level shapes.
 */
function extractRawAddressEntries(jsonData: unknown): unknown[] {
  if (Array.isArray(jsonData)) {
    return jsonData
  }

  if (!isPlainObject(jsonData)) {
    throw new Error(
      'Invalid JSON: expected an object or array. Use an "addresses" array, a "wallets" array, or a single { "currency", "address" } object.',
    )
  }

  if (Array.isArray(jsonData.addresses)) {
    return jsonData.addresses
  }

  if (Array.isArray(jsonData.wallets)) {
    return jsonData.wallets
  }

  const single = entryToImportedWallet(jsonData)
  if (single.coinTicker && single.address) {
    return [jsonData]
  }

  if (looksLikeSeedOrKeyForgeBackup(jsonData)) {
    throw new Error(
      'This file is a seed phrase / KeyForge-style backup (mnemonic + metadata), not a list of public addresses. ' +
        'Address book import needs JSON with one or more network + public address entries, for example: ' +
        '{ "addresses": [ { "currency": "LUNC", "address": "terra1..." } ] }. ' +
        'Do not import private keys or seed phrases through the wallet-address import.',
    )
  }

  if (looksLikePrivateKeyExport(jsonData)) {
    throw new Error(
      'This file contains private key material, not public addresses. ' +
        'For safety, private keys are not imported into the address book. ' +
        'Export or build a JSON file with public addresses only, e.g. ' +
        '{ "addresses": [ { "currency": "LUNC", "address": "terra1..." } ] }.',
    )
  }

  throw new Error(
    'Invalid JSON format: expected an "addresses" or "wallets" array, or one object with currency + address fields ' +
      '(aliases: coinTicker, walletAddress, wallet_address, etc.).',
  )
}

/**
 * Parse a JSON file containing wallet addresses
 * Supported formats:
 * - { "addresses": [ { "currency"|"coinTicker", "address"|"wallet_address", ... } ] }
 * - { "wallets": [ ... ] } (same row shape)
 * - [ { ... }, ... ] (root array)
 * - Single object { "currency", "address" } (one wallet)
 */
export async function parseWalletJsonFile(file: File): Promise<WalletImportResult> {
  try {
    const text = await file.text()
    const jsonData = JSON.parse(text) as unknown

    const rawList = extractRawAddressEntries(jsonData)

    const wallets: ImportedWallet[] = rawList.map(entryToImportedWallet)
    const validWallets = wallets.filter((w) => w.coinTicker && w.address)

    if (validWallets.length === 0) {
      throw new Error(
        'No valid wallet rows found (each entry needs a network/currency and a public address).',
      )
    }

    return {
      wallets: validWallets,
      file,
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Error parsing wallet JSON file: invalid JSON (${error.message})`)
    }
    if (error instanceof Error) {
      throw new Error(`Error parsing wallet JSON file: ${error.message}`)
    }
    throw new Error('Unknown error occurred while parsing wallet JSON file')
  }
}
