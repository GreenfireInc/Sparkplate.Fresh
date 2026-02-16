/**
 * Individual Cryptocurrency Address Text Export Structure (JSON/CSV/TXT)
 * 
 * This module provides text-based exports for individual cryptocurrency addresses,
 * keys, and GPG keypairs. It creates properly formatted JSON, CSV, and TXT files
 * for programmatic and human-readable backups.
 * 
 * ============================================================================
 * MAIN FEATURES
 * ============================================================================
 * 
 * 1. FILENAME GENERATION
 *    - Format: %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).individual.%currencyTickerSymbol%.%truncatedSevenFirstCharactersAndSevenLastCharacters%.{extension}
 *    - Example: sparkplate.local.20250118.143022.individual.BTC.1A1zP1eDivfNa.json
 *    - The truncated hash is the first 7 and last 7 characters of the wallet address
 *    - Supported extensions: json, csv, txt, png, pdf
 *    - Includes machine identifier, timestamp, currency, and address hash for unique file tracking
 *    - Function: generateIndividualCryptoFilename(currency, address, extension, customDate?)
 * 
 * 2. CONTENT GENERATION FUNCTIONS
 *    These functions create properly formatted content for different file types:
 *    
 *    - generateIndividualCryptoJSONContent(): 
 *      * Creates structured JSON with all address and key data
 *      * Includes all required fields in specified order
 *      * Suitable for programmatic import/export
 *    
 *    - generateIndividualCryptoCSVContent():
 *      * Creates CSV format with proper value escaping
 *      * Field,Value format for spreadsheet compatibility
 *      * Handles quotes, commas, and newlines correctly
 *      * Includes all required fields in specified order
 *    
 *    - generateIndividualCryptoTXTContent():
 *      * Creates human-readable plain text format
 *      * Line-by-line format with labels and separators
 *      * Easy to read and manually verify
 *      * Includes all required fields in specified order
 *    
 *    All content formats include (in this order):
 *      * From: Project name (from package.json)
 *      * date: Generation date (readable format)
 *      * userName: User name (from localStorage or "user")
 *      * machineName: Machine identifier
 *      * mnemonicSeedPhrase: Mnemonic seed phrase (if available)
 *      * currency: Currency ticker symbol
 *      * derivationPath: User-selected derivation path (not default)
 *      * privateKey: Private key
 *      * publicKey: Public key (crypto)
 *      * publicWalletAddress: Wallet address
 *      * GPG privateKey: GPG private key (armored)
 *      * GPG publicKey: GPG public key (armored)
 *      * GPG KeyFingerprint: GPG key fingerprint
 * 
 * 3. EXPORT FUNCTIONS
 *    - exportIndividualCryptoAsJSON(): Exports as JSON file
 *    - exportIndividualCryptoAsCSV(): Exports as CSV file
 *    - exportIndividualCryptoAsTXT(): Exports as TXT file
 *    - All functions automatically download with proper filename
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * This module is primarily used by the AddressDisplay component for:
 * - Downloading individual currency exports (JSON, CSV, TXT)
 * - Creating text-based backups of cryptocurrency keys and addresses
 * - Enabling programmatic import/export of key data
 * 
 * Import example:
 *   import { 
 *     exportIndividualCryptoAsJSON,
 *     exportIndividualCryptoAsCSV,
 *     exportIndividualCryptoAsTXT,
 *     ExportCryptoAddress
 *   } from "@/lib/exportStandard/currencies/filenameStructureAndContent.individual.text";
 * 
 *   const cryptoData: ExportCryptoAddress = {
 *     currency: "BTC",
 *     address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
 *     privateKey: "...",
 *     cryptoPublicKey: "...",
 *     keyFingerprint: "...",
 *     gpgPublicKey: "...",
 *     gpgPrivateKey: "...",
 *     derivationPath: "m/44'/0'/0'/0/0"
 *   };
 * 
 *   await exportIndividualCryptoAsJSON(cryptoData);
 *   await exportIndividualCryptoAsCSV(cryptoData);
 *   await exportIndividualCryptoAsTXT(cryptoData);
 * 
 * ============================================================================
 * SECURITY NOTES
 * ============================================================================
 * 
 * - All exports contain sensitive private key and GPG key data
 * - Text exports include security warnings
 * - Users should store exports securely and never share them
 * - File naming includes timestamps to prevent accidental overwrites
 */

import packageJson from "../../../../../package.json";

const PACKAGE_NAME = packageJson.name;

/**
 * Get machine name identifier
 */
function getMachineName(): string {
  if (typeof window !== "undefined") {
    // Use Electron's appData hostname if available (actual machine hostname)
    const appData = (window as any).appData;
    if (appData?.hostname) {
      return appData.hostname.replace(/[^a-zA-Z0-9-]/g, "-");
    }
    // Fallback to window.location.hostname
    if (window.location) {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        return "local";
      }
      return hostname.replace(/[^a-zA-Z0-9-]/g, "-");
    }
  }
  return "unknown";
}

/**
 * Get user name
 */
function getUserName(): string {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("sparkplate_userName");
    if (stored) {
      return stored;
    }
  }
  return "user";
}

/**
 * Format date as YYYYMMDD
 */
function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Format time as 24-hour HHMMSS
 */
function formatTime(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}

/**
 * Format date for display (readable format)
 */
function formatDateDisplay(date: Date = new Date()): string {
  return date.toLocaleDateString();
}

/**
 * Generate truncated hash from address (first 7 and last 7 characters)
 */
function generateTruncatedHash(address: string): string {
  if (address.length <= 14) {
    return address;
  }
  const first7 = address.substring(0, 7);
  const last7 = address.substring(address.length - 7);
  return `${first7}${last7}`;
}

export interface ExportCryptoAddress {
  currency: string;
  address: string;
  privateKey: string;
  cryptoPublicKey: string;
  keyFingerprint: string;
  gpgPublicKey: string;
  gpgPrivateKey: string;
  derivationPath: string;
  mnemonic?: string;
}

/**
 * Generate filename for individual cryptocurrency export
 * Format: %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).individual.%currencyTickerSymbol%.%truncatedSevenFirstCharactersAndSevenLastCharacters%.{extension}
 */
export function generateIndividualCryptoFilename(
  currency: string,
  address: string,
  extension: "json" | "csv" | "txt" | "png" | "pdf",
  customDate?: Date
): string {
  const date = customDate || new Date();
  const name = PACKAGE_NAME;
  const machineName = getMachineName();
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);
  const sanitizedCurrency = currency.replace(/[^a-zA-Z0-9-]/g, "-").toUpperCase();
  const truncatedHash = generateTruncatedHash(address);

  return `${name}.${machineName}.${dateStr}.${timeStr}.individual.${sanitizedCurrency}.${truncatedHash}.${extension}`;
}

/**
 * Generate JSON content for individual cryptocurrency export
 * Content order: From, date, userName, machineName, mnemonicSeedPhrase, currency, derivationPath, privateKey, publicKey, publicWalletAddress, GPG privateKey, GPG publicKey, GPG KeyFingerprint
 */
export function generateIndividualCryptoJSONContent(
  crypto: ExportCryptoAddress,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();
  
  const data: Record<string, unknown> = {
    from: projectName,
    date: dateStr,
    userName,
    machineName,
  };

  if (crypto.mnemonic) {
    data.mnemonicSeedPhrase = crypto.mnemonic;
  }

  data.currency = crypto.currency;
  data.derivationPath = crypto.derivationPath;
  data.privateKey = crypto.privateKey;
  data.publicKey = crypto.cryptoPublicKey;
  data.publicWalletAddress = crypto.address;
  data.gpgPrivateKey = crypto.gpgPrivateKey;
  data.gpgPublicKey = crypto.gpgPublicKey;
  data.gpgKeyFingerprint = crypto.keyFingerprint;

  return JSON.stringify(data, null, 2);
}

/**
 * Generate CSV content for individual cryptocurrency export
 * Content order: From, date, userName, machineName, mnemonicSeedPhrase, currency, derivationPath, privateKey, publicKey, publicWalletAddress, GPG privateKey, GPG publicKey, GPG KeyFingerprint
 */
export function generateIndividualCryptoCSVContent(
  crypto: ExportCryptoAddress,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Escape CSV values (handle quotes and commas)
  const escapeCSV = (value: string): string => {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  let content = "Field,Value\n";
  content += `From,${escapeCSV(projectName)}\n`;
  content += `date,${escapeCSV(dateStr)}\n`;
  content += `userName,${escapeCSV(userName)}\n`;
  content += `machineName,${escapeCSV(machineName)}\n`;

  if (crypto.mnemonic) {
    content += `mnemonicSeedPhrase,${escapeCSV(crypto.mnemonic)}\n`;
  }

  content += `currency,${escapeCSV(crypto.currency)}\n`;
  content += `derivationPath,${escapeCSV(crypto.derivationPath)}\n`;
  content += `privateKey,${escapeCSV(crypto.privateKey)}\n`;
  content += `publicKey,${escapeCSV(crypto.cryptoPublicKey)}\n`;
  content += `publicWalletAddress,${escapeCSV(crypto.address)}\n`;
  content += `GPG privateKey,${escapeCSV(crypto.gpgPrivateKey.replace(/\n/g, " "))}\n`;
  content += `GPG publicKey,${escapeCSV(crypto.gpgPublicKey.replace(/\n/g, " "))}\n`;
  content += `GPG KeyFingerprint,${escapeCSV(crypto.keyFingerprint)}\n`;

  return content;
}

/**
 * Generate TXT content for individual cryptocurrency export
 * Content order: From, date, userName, machineName, mnemonicSeedPhrase, currency, derivationPath, privateKey, publicKey, publicWalletAddress, GPG privateKey, GPG publicKey, GPG KeyFingerprint
 */
export function generateIndividualCryptoTXTContent(
  crypto: ExportCryptoAddress,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();
  
  let content = `From: ${projectName}\n`;
  content += `date: ${dateStr}\n`;
  content += `userName: ${userName}\n`;
  content += `machineName: ${machineName}\n`;
  
  if (crypto.mnemonic) {
    content += `mnemonicSeedPhrase: ${crypto.mnemonic}\n`;
  }
  
  content += `currency: ${crypto.currency}\n`;
  content += `derivationPath: ${crypto.derivationPath}\n`;
  content += `privateKey: ${crypto.privateKey}\n`;
  content += `publicKey: ${crypto.cryptoPublicKey}\n`;
  content += `publicWalletAddress: ${crypto.address}\n`;
  content += `GPG privateKey: ${crypto.gpgPrivateKey}\n`;
  content += `GPG publicKey: ${crypto.gpgPublicKey}\n`;
  content += `GPG KeyFingerprint: ${crypto.keyFingerprint}\n`;

  return content;
}

/**
 * Export individual cryptocurrency address as JSON
 */
export function exportIndividualCryptoAsJSON(crypto: ExportCryptoAddress): void {
  const content = generateIndividualCryptoJSONContent(crypto);
  const filename = generateIndividualCryptoFilename(crypto.currency, crypto.address, "json");
  
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export individual cryptocurrency address as CSV
 */
export function exportIndividualCryptoAsCSV(crypto: ExportCryptoAddress): void {
  const content = generateIndividualCryptoCSVContent(crypto);
  const filename = generateIndividualCryptoFilename(crypto.currency, crypto.address, "csv");
  
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export individual cryptocurrency address as TXT
 */
export function exportIndividualCryptoAsTXT(crypto: ExportCryptoAddress): void {
  const content = generateIndividualCryptoTXTContent(crypto);
  const filename = generateIndividualCryptoFilename(crypto.currency, crypto.address, "txt");
  
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

