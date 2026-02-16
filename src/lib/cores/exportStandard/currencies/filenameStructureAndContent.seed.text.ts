/**
 * Seed Phrase Filename and Content Export Structure
 * 
 * This module provides seed phrase (mnemonic) filename generation and content formatting for
 * multiple file formats (JSON, TXT, CSV). For visual exports (PNG/PDF), see
 * filenameStructureAndContent.seed.visual.ts
 * 
 * ============================================================================
 * MAIN FEATURES
 * ============================================================================
 * 
 * 1. FILENAME GENERATION
 *    - Format: %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).seed.%firstAndLastWordsOfMnemonicSeedPhrase%.{extension}
 *    - Example: sparkplate.local.20250118.143022.seed.abandonAbout.json
 *    - Note: First and last words are combined in camelCase (no periods between words)
 *    - Supported extensions: json, txt, csv, png, pdf
 *    - Includes machine identifier, timestamp, and mnemonic words for unique file tracking
 *    - Function: generateSeedFilename(extension, mnemonicSeedPhrase, customDate?)
 * 
 * 2. CONTENT GENERATION FUNCTIONS
 *    These functions create properly formatted content for different file types:
 *    
 *    - generateSeedJSONContent(): 
 *      * Creates structured JSON with all metadata
 *      * Includes nested object with derivation paths
 *      * Suitable for programmatic import/export
 *      * ASYNC: Generates GPG fingerprint from root extended private key
 *    
 *    - generateSeedTXTContent():
 *      * Creates human-readable plain text format
 *      * Line-by-line format with labels
 *      * Easy to read and manually verify
 *      * ASYNC: Generates GPG fingerprint from root extended private key
 *    
 *    - generateSeedCSVContent():
 *      * Creates CSV format with proper value escaping
 *      * Field,Value format for spreadsheet compatibility
 *      * Handles quotes, commas, and newlines correctly
 *      * ASYNC: Generates GPG fingerprint from root extended private key
 *    
 *    All content formats include:
 *      * Project name (from package.json)
 *      * Date and time of generation (readable format)
 *      * User name (retrieved from localStorage or defaults to "user")
 *      * Machine name (hostname or defaults to "local"/"unknown")
 *      * Mnemonic seed phrase (the actual backup data)
 *      * BIP32 Root GPG Key Fingerprint (derived from root extended private key)
 *      * Default derivation paths for all supported currencies
 * 
 * 3. DEFAULT DERIVATION PATHS REGISTRY
 *    - Maintains a complete registry of default BIP44 derivation paths
 *    - Supports: BTC, LTC, DOGE, ETH, TRX, SOL, XTZ, LUNC
 *    - Used in all exports to inform users of standard paths
 *    - Helps users understand which derivation path to use for each currency
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * This module is primarily used by the SeedPhraseGenerator component for:
 * - Downloading seed phrases in various formats (JSON, TXT, CSV, PNG, PDF)
 * - Ensuring consistent naming conventions across all exports
 * - Providing comprehensive backup documentation
 * 
 * Import example:
 *   import { 
 *     generateSeedFilename,
 *     generateSeedJSONContent,
 *     generateSeedTXTContent,
 *     generateSeedCSVContent
 *   } from "@/lib/exportStandard/currencies/filenameStructureAndContent.seed.text";
 * 
 *   // For visual exports (PNG/PDF), import from:
 *   import { 
 *     exportSeedPhraseAsPNG,
 *     exportSeedPhraseAsPDF
 *   } from "@/lib/exportStandard/currencies/filenameStructureAndContent.seed.visual";
 * 
 * ============================================================================
 * SECURITY NOTES
 * ============================================================================
 * 
 * - All exports contain sensitive mnemonic seed phrase data
 * - Visual exports include prominent security warnings
 * - Users should store exports securely and never share them
 * - File naming includes timestamps to prevent accidental overwrites
 */

import packageJson from "../../../../../package.json";
import { generateGPGFromRootExtendedPrivateKey } from "@/lib/cores/cryptographyCore/deterministicGPG/deterministicGPG.seed";

const PACKAGE_NAME = packageJson.name;

/**
 * Default derivation paths for each supported currency
 */
const DEFAULT_DERIVATION_PATHS: Record<string, string> = {
  BTC: "m/44'/0'/0'/0/0",
  LTC: "m/44'/2'/0'/0/0",
  DOGE: "m/44'/3'/0'/0/0",
  ETH: "m/44'/60'/0'/0/0",
  TRX: "m/44'/195'/0'/0/0",
  SOL: "m/44'/501'/0'/0'",
  XTZ: "m/44'/1729'/0'/0'",
  LUNC: "m/44'/330'/0'/0/0",
};

/**
 * Get machine name identifier
 * In browser environment, we use a fallback since hostname isn't directly accessible
 * for security reasons. This could be enhanced with user configuration or other identifiers.
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
 * In browser environment, we use a fallback since we can't access system username
 */
function getUserName(): string {
  // Try to get from localStorage if previously set
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("sparkplate_userName");
    if (stored) {
      return stored;
    }
  }
  // Fallback
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
 * Format time for display (readable format)
 */
function formatTimeDisplay(date: Date = new Date()): string {
  return date.toLocaleTimeString();
}

/**
 * Generate a seed phrase filename with the structure:
 * %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).seed.%firstAndLastWordsOfMnemonicSeedPhrase%.{extension}
 * 
 * @param extension - File extension (e.g., "json", "txt", "csv", "png", "pdf")
 * @param mnemonicSeedPhrase - The mnemonic seed phrase to extract first and last words from
 * @param customDate - Optional custom date (defaults to current date/time)
 * @returns Formatted filename string
 */
export function generateSeedFilename(
  extension: "json" | "txt" | "csv" | "png" | "pdf",
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

  return `${name}.${machineName}.${dateStr}.${timeStr}.seed.${mnemonicWords}.${extension}`;
}

/**
 * Generate JSON content for seed phrase export
 */
export async function generateSeedJSONContent(
  mnemonicSeedPhrase: string,
  customDate?: Date,
  precomputedGPGFingerprint?: string
): Promise<string> {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Use precomputed fingerprint if available, otherwise generate
  let gpgFingerprint = "";
  if (precomputedGPGFingerprint) {
    gpgFingerprint = precomputedGPGFingerprint;
  } else {
    try {
      const gpgResult = await generateGPGFromRootExtendedPrivateKey(mnemonicSeedPhrase);
      gpgFingerprint = gpgResult.gpgFingerprint;
    } catch (error) {
      console.error("Error generating GPG fingerprint:", error);
      gpgFingerprint = "Error generating fingerprint";
    }
  }

  const data = {
    from: projectName,
    date: dateStr,
    time: timeStr,
    userName,
    machineName,
    mnemonicSeedPhrase,
    bip32RootGPGKeyFingerprint: gpgFingerprint,
    defaultDerivationPath: DEFAULT_DERIVATION_PATHS,
  };

  return JSON.stringify(data, null, 2);
}

/**
 * Generate TXT content for seed phrase export
 */
export async function generateSeedTXTContent(
  mnemonicSeedPhrase: string,
  customDate?: Date,
  precomputedGPGFingerprint?: string
): Promise<string> {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Use precomputed fingerprint if available, otherwise generate
  let gpgFingerprint = "";
  if (precomputedGPGFingerprint) {
    gpgFingerprint = precomputedGPGFingerprint;
  } else {
    try {
      const gpgResult = await generateGPGFromRootExtendedPrivateKey(mnemonicSeedPhrase);
      gpgFingerprint = gpgResult.gpgFingerprint;
    } catch (error) {
      console.error("Error generating GPG fingerprint:", error);
      gpgFingerprint = "Error generating fingerprint";
    }
  }

  let content = `From: ${projectName}\n`;
  content += `Date: ${dateStr}\n`;
  content += `Time: ${timeStr}\n`;
  content += `User Name: ${userName}\n`;
  content += `Machine Name: ${machineName}\n`;
  content += `\nMnemonic Seed Phrase:\n${mnemonicSeedPhrase}\n`;
  content += `\nBIP32 Root GPG Key Fingerprint:\n${gpgFingerprint}\n`;
  content += `\nDefault Derivation Paths:\n`;

  for (const [currency, path] of Object.entries(DEFAULT_DERIVATION_PATHS)) {
    content += `  ${currency}: ${path}\n`;
  }

  return content;
}

/**
 * Generate CSV content for seed phrase export
 */
export async function generateSeedCSVContent(
  mnemonicSeedPhrase: string,
  customDate?: Date,
  precomputedGPGFingerprint?: string
): Promise<string> {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Use precomputed fingerprint if available, otherwise generate
  let gpgFingerprint = "";
  if (precomputedGPGFingerprint) {
    gpgFingerprint = precomputedGPGFingerprint;
  } else {
    try {
      const gpgResult = await generateGPGFromRootExtendedPrivateKey(mnemonicSeedPhrase);
      gpgFingerprint = gpgResult.gpgFingerprint;
    } catch (error) {
      console.error("Error generating GPG fingerprint:", error);
      gpgFingerprint = "Error generating fingerprint";
    }
  }

  // Escape CSV values (handle quotes and commas)
  const escapeCSV = (value: string): string => {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  let content = "Field,Value\n";
  content += `From,${escapeCSV(projectName)}\n`;
  content += `Date,${escapeCSV(dateStr)}\n`;
  content += `Time,${escapeCSV(timeStr)}\n`;
  content += `User Name,${escapeCSV(userName)}\n`;
  content += `Machine Name,${escapeCSV(machineName)}\n`;
  content += `Mnemonic Seed Phrase,${escapeCSV(mnemonicSeedPhrase)}\n`;
  content += `BIP32 Root GPG Key Fingerprint,${escapeCSV(gpgFingerprint)}\n`;

  // Add derivation paths
  for (const [currency, path] of Object.entries(DEFAULT_DERIVATION_PATHS)) {
    content += `Default Derivation Path (${currency}),${escapeCSV(path)}\n`;
  }

  return content;
}

