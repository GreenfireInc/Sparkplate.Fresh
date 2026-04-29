/**
 * Wallet Addresses Text Export Structure (JSON/CSV/TXT)
 * 
 * This module provides text-based exports for all wallet addresses across all
 * supported cryptocurrencies. It creates properly formatted JSON, CSV, and TXT files
 * for programmatic and human-readable backups of all addresses at once.
 * 
 * ============================================================================
 * MAIN FEATURES
 * ============================================================================
 * 
 * 1. FILENAME GENERATION
 *    - Format: %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).walletAddresses.%firstAndLastWordsOfMnemonicSeedPhrase%.{extension}
 *    - Example: keyForge.local.20250118.143022.walletAddresses.abandonAbout.json
 *    - Note: First and last words are combined in camelCase (no periods between words)
 *    - Supported extensions: json, csv, txt, png, pdf
 *    - Includes machine identifier, timestamp, and mnemonic words for unique file tracking
 *    - Function: generateWalletAddressesFilename(extension, mnemonicSeedPhrase, customDate?)
 * 
 * 2. CONTENT GENERATION FUNCTIONS
 *    These functions create properly formatted content for different file types:
 *    
 *    - generateWalletAddressesJSONContent(): 
 *      * Creates structured JSON with all addresses
 *      * Includes timestamp and array of address objects
 *      * Suitable for programmatic import/export
 *    
 *    - generateWalletAddressesCSVContent():
 *      * Creates CSV format with proper value escaping
 *      * Field,Value format for spreadsheet compatibility
 *      * Handles quotes, commas, and newlines correctly
 *      * Includes all address fields: Currency, Address, Public Key, Private Key, etc.
 *    
 *    - generateWalletAddressesTXTContent():
 *      * Creates human-readable plain text format
 *      * Line-by-line format with labels and separators
 *      * Easy to read and manually verify
 *      * Includes security warnings
 *    
 *    All content formats include:
 *      * Timestamp of generation
 *      * All wallet addresses with:
 *        - Currency identifier
 *        - Wallet address
 *        - Public key (crypto)
 *        - Private key
 *        - Key fingerprint
 *        - GPG public key (armored)
 *        - GPG private key (armored)
 * 
 * 3. EXPORT FUNCTIONS
 *    - exportWalletAddressesAsJSON(): Exports as JSON file
 *    - exportWalletAddressesAsCSV(): Exports as CSV file
 *    - exportWalletAddressesAsTXT(): Exports as TXT file
 *    - All functions automatically download with proper filename
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * This module is primarily used by the AddressDisplay component for:
 * - Downloading all wallet addresses in text formats (JSON, CSV, TXT)
 * - Creating text-based backups of all cryptocurrency addresses
 * - Enabling programmatic import/export of all address data
 * 
 * Import example:
 *   import { 
 *     exportWalletAddressesAsJSON,
 *     exportWalletAddressesAsCSV,
 *     exportWalletAddressesAsTXT,
 *     GeneralAddress
 *   } from "@/lib/exportStandard/currencies/filenameStructureAndContent.walletAddresses.text";
 * 
 *   const addresses: GeneralAddress[] = [
 *     {
 *       currency: "BTC",
 *       address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
 *       derivationPath: "m/44'/0'/0'/0/0",
 *       keyFingerprint: "ABCD 1234 EFGH 5678",
 *       cryptoPublicKey: "...",
 *       privateKey: "...",
 *       gpgPublicKey: "...",
 *       gpgPrivateKey: "..."
 *     }
 *   ];
 * 
 *   await exportWalletAddressesAsJSON(addresses);
 *   await exportWalletAddressesAsCSV(addresses);
 *   await exportWalletAddressesAsTXT(addresses);
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

import packageJson from "../../../../package.json";

const PACKAGE_NAME = packageJson.name;

/**
 * Get machine name identifier
 */
function getMachineName(): string {
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "local";
    }
    return hostname.replace(/[^a-zA-Z0-9-]/g, "-");
  }
  return "unknown";
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

export interface GeneralAddress {
  currency: string;
  address: string;
  derivationPath: string;
  keyFingerprint: string;
  cryptoPublicKey?: string;
  privateKey?: string;
  gpgPublicKey?: string;
  gpgPrivateKey?: string;
}

/**
 * Generate filename for wallet addresses export
 * Format: %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).walletAddresses.%firstAndLastWordsOfMnemonicSeedPhrase%.{extension}
 * 
 * @param extension - File extension (e.g., "json", "csv", "txt", "png", "pdf")
 * @param mnemonicSeedPhrase - The mnemonic seed phrase to extract first and last words from
 * @param customDate - Optional custom date (defaults to current date/time)
 * @returns Formatted filename string
 */
export function generateWalletAddressesFilename(
  extension: "json" | "csv" | "txt" | "png" | "pdf",
  mnemonicSeedPhrase: string,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const name = PACKAGE_NAME;
  const machineName = getMachineName();
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);

  // Extract first and last words from mnemonic seed phrase and combine in camelCase
  const words = mnemonicSeedPhrase.trim().split(/\s+/).filter(word => word.length > 0);
  const firstWord = words.length > 0 ? words[0].toLowerCase() : "unknown";
  const lastWord = words.length > 1 ? words[words.length - 1] : firstWord;
  
  // Convert last word to camelCase (capitalize first letter, lowercase rest)
  const lastWordCamelCase = lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
  
  // Combine first and last words in camelCase format (no periods)
  const mnemonicWords = `${firstWord}${lastWordCamelCase}`;

  return `${name}.${machineName}.${dateStr}.${timeStr}.walletAddresses.${mnemonicWords}.${extension}`;
}

/**
 * Generate JSON content for wallet addresses export
 */
export function generateWalletAddressesJSONContent(
  addresses: GeneralAddress[],
  customDate?: Date
): string {
  const date = customDate || new Date();
  
  const data = {
    timestamp: date.toISOString(),
    addresses: addresses.map(addr => ({
      currency: addr.currency,
      address: addr.address,
      derivationPath: addr.derivationPath,
      keyFingerprint: addr.keyFingerprint,
      ...(addr.cryptoPublicKey && { cryptoPublicKey: addr.cryptoPublicKey }),
      ...(addr.privateKey && { privateKey: addr.privateKey }),
      ...(addr.gpgPublicKey && { gpgPublicKey: addr.gpgPublicKey }),
      ...(addr.gpgPrivateKey && { gpgPrivateKey: addr.gpgPrivateKey }),
    })),
  };

  return JSON.stringify(data, null, 2);
}

/**
 * Generate CSV content for wallet addresses export
 */
export function generateWalletAddressesCSVContent(
  addresses: GeneralAddress[]
): string {
  // Escape CSV values (handle quotes and commas)
  const escapeCSV = (value: string): string => {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  let content = "Currency,Address,Public Key,Private Key,Key Fingerprint,GPG Public Key,GPG Private Key\n";
  
  for (const addr of addresses) {
    const row = [
      escapeCSV(addr.currency),
      escapeCSV(addr.address),
      escapeCSV(addr.cryptoPublicKey || ""),
      escapeCSV(addr.privateKey || ""),
      escapeCSV(addr.keyFingerprint),
      escapeCSV((addr.gpgPublicKey || "").replace(/\n/g, " ")),
      escapeCSV((addr.gpgPrivateKey || "").replace(/\n/g, " "))
    ].join(",");
    content += row + "\n";
  }

  return content;
}

/**
 * Generate TXT content for wallet addresses export
 */
export function generateWalletAddressesTXTContent(
  addresses: GeneralAddress[],
  customDate?: Date
): string {
  const date = customDate || new Date();
  const dateStr = date.toLocaleString();
  
  let content = `CRYPTOCURRENCY ADDRESSES & KEYS\n\n`;
  content += `Generated: ${dateStr}\n\n`;
  
  for (const addr of addresses) {
    content += `${addr.currency}\n`;
    content += `${"=".repeat(50)}\n`;
    content += `Address: ${addr.address}\n`;
    if (addr.cryptoPublicKey) {
      content += `Public Key: ${addr.cryptoPublicKey}\n`;
    }
    if (addr.privateKey) {
      content += `Private Key: ${addr.privateKey}\n`;
    }
    content += `Key Fingerprint: ${addr.keyFingerprint}\n`;
    if (addr.gpgPublicKey) {
      content += `\nGPG Public Key:\n${addr.gpgPublicKey}\n`;
    }
    if (addr.gpgPrivateKey) {
      content += `\nGPG Private Key (Armored):\n${addr.gpgPrivateKey}\n`;
    }
    content += `\n`;
  }
  
  content += `⚠️ WARNING: Keep this backup secure and private!\n`;
  content += `Never share your private keys with anyone.`;

  return content;
}

/**
 * Export wallet addresses as JSON
 */
export function exportWalletAddressesAsJSON(
  addresses: GeneralAddress[],
  mnemonicSeedPhrase: string
): void {
  const content = generateWalletAddressesJSONContent(addresses);
  const filename = generateWalletAddressesFilename("json", mnemonicSeedPhrase);
  
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export wallet addresses as CSV
 */
export function exportWalletAddressesAsCSV(
  addresses: GeneralAddress[],
  mnemonicSeedPhrase: string
): void {
  const content = generateWalletAddressesCSVContent(addresses);
  const filename = generateWalletAddressesFilename("csv", mnemonicSeedPhrase);
  
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Export wallet addresses as TXT
 */
export function exportWalletAddressesAsTXT(
  addresses: GeneralAddress[],
  mnemonicSeedPhrase: string
): void {
  const content = generateWalletAddressesTXTContent(addresses);
  const filename = generateWalletAddressesFilename("txt", mnemonicSeedPhrase);
  
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

