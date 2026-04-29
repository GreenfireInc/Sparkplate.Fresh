/**
 * Export Standard - Centralized Export Module
 * 
 * This index file provides a centralized export point for all export functionality
 * in the keyForge application. It re-exports all public functions, types, and interfaces
 * from the various export modules.
 * 
 * ============================================================================
 * MODULES
 * ============================================================================
 * 
 * 1. Individual Cryptocurrency Exports
 *    - Text exports (JSON, CSV, TXT) for single currency
 *    - Visual exports (PNG, PDF) for single currency
 * 
 * 2. Wallet Addresses Exports
 *    - Text exports (JSON, CSV, TXT) for all wallet addresses
 *    - Visual exports (PNG, PDF) for all wallet addresses
 * 
 * 3. Seed Phrase Exports
 *    - Text exports (JSON, CSV, TXT) for seed phrases
 *    - Visual exports (PNG, PDF) for seed phrases
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * Instead of importing from individual files:
 *   import { exportCryptoAsPDF } from "@/lib/exportStandard/currencies/filenameStructureAndContent.individual.visual";
 *   import { exportWalletAddressesAsJSON } from "@/lib/exportStandard/currencies/filenameStructureAndContent.walletAddresses.text";
 * 
 * You can now import from the index:
 *   import { exportCryptoAsPDF, exportWalletAddressesAsJSON } from "@/lib/exportStandard/currencies";
 * 
 * ============================================================================
 * EXPORTS
 * ============================================================================
 * 
 * Individual Cryptocurrency Exports:
 *   - ExportCryptoAddress (interface)
 *   - generateIndividualCryptoFilename()
 *   - generateIndividualCryptoJSONContent()
 *   - generateIndividualCryptoCSVContent()
 *   - generateIndividualCryptoTXTContent()
 *   - exportIndividualCryptoAsJSON()
 *   - exportIndividualCryptoAsCSV()
 *   - exportIndividualCryptoAsTXT()
 *   - captureExportCanvas()
 *   - exportCryptoAsPNG()
 *   - exportCryptoAsPDF()
 * 
 * Wallet Addresses Exports:
 *   - GeneralAddress (interface)
 *   - generateWalletAddressesFilename()
 *   - generateWalletAddressesJSONContent()
 *   - generateWalletAddressesCSVContent()
 *   - generateWalletAddressesTXTContent()
 *   - exportWalletAddressesAsJSON()
 *   - exportWalletAddressesAsCSV()
 *   - exportWalletAddressesAsTXT()
 *   - captureGeneralExportCanvas()
 *   - exportGeneralAddressesAsPNG()
 *   - exportGeneralAddressesAsPDF()
 * 
 * Seed Phrase Exports:
 *   - generateSeedFilename()
 *   - generateSeedJSONContent()
 *   - generateSeedTXTContent()
 *   - generateSeedCSVContent()
 *   - captureSeedPhraseCanvas()
 *   - exportSeedPhraseAsPNG()
 *   - exportSeedPhraseAsPDF()
 */

// Individual Cryptocurrency Exports
export type {
  ExportCryptoAddress,
} from "./filenameStructureAndContent.individual.text";

export {
  generateIndividualCryptoFilename,
  generateIndividualCryptoJSONContent,
  generateIndividualCryptoCSVContent,
  generateIndividualCryptoTXTContent,
  exportIndividualCryptoAsJSON,
  exportIndividualCryptoAsCSV,
  exportIndividualCryptoAsTXT,
} from "./filenameStructureAndContent.individual.text";

export {
  captureExportCanvas,
  exportCryptoAsPNG,
  exportCryptoAsPDF,
} from "./filenameStructureAndContent.individual.visual";

// Wallet Addresses Exports
export type {
  GeneralAddress,
} from "./filenameStructureAndContent.walletAddresses.text";

export {
  generateWalletAddressesFilename,
  generateWalletAddressesJSONContent,
  generateWalletAddressesCSVContent,
  generateWalletAddressesTXTContent,
  exportWalletAddressesAsJSON,
  exportWalletAddressesAsCSV,
  exportWalletAddressesAsTXT,
} from "./filenameStructureAndContent.walletAddresses.text";

export {
  captureGeneralExportCanvas,
  exportGeneralAddressesAsPNG,
  exportGeneralAddressesAsPDF,
} from "./filenameStructureAndContent.walletAddresses.visual";

// Seed Phrase Exports
export {
  generateSeedFilename,
  generateSeedJSONContent,
  generateSeedTXTContent,
  generateSeedCSVContent,
} from "./filenameStructureAndContent.seed.text";

export {
  captureSeedPhraseCanvas,
  exportSeedPhraseAsPNG,
  exportSeedPhraseAsPDF,
} from "./filenameStructureAndContent.seed.visual";

