/**
 * Seed Phrase Filename and Content Export Structure
 * 
 * This module provides comprehensive seed phrase (mnemonic) export functionality for the keyForge
 * application. It handles filename generation, content formatting for multiple file formats, and
 * visual canvas-based exports for PNG and PDF formats.
 * 
 * ============================================================================
 * MAIN FEATURES
 * ============================================================================
 * 
 * 1. FILENAME GENERATION
 *    - Format: keyForge.machineName.YYYYMMDD.HHMMSS.seed.{extension}
 *    - Example: keyForge.local.20250118.143022.seed.json
 *    - Supported extensions: json, txt, csv, png, pdf
 *    - Includes machine identifier and timestamp for unique file tracking
 *    - Function: generateSeedFilename(extension, customDate?)
 * 
 * 2. CONTENT GENERATION FUNCTIONS
 *    These functions create properly formatted content for different file types:
 *    
 *    - generateSeedJSONContent(): 
 *      * Creates structured JSON with all metadata
 *      * Includes nested object with derivation paths
 *      * Suitable for programmatic import/export
 *    
 *    - generateSeedTXTContent():
 *      * Creates human-readable plain text format
 *      * Line-by-line format with labels
 *      * Easy to read and manually verify
 *    
 *    - generateSeedCSVContent():
 *      * Creates CSV format with proper value escaping
 *      * Field,Value format for spreadsheet compatibility
 *      * Handles quotes, commas, and newlines correctly
 *    
 *    All content formats include:
 *      * Project name (from package.json)
 *      * Date and time of generation (readable format)
 *      * User name (retrieved from localStorage or defaults to "user")
 *      * Machine name (hostname or defaults to "local"/"unknown")
 *      * Mnemonic seed phrase (the actual backup data)
 *      * Default derivation paths for all supported currencies
 * 
 * 3. VISUAL EXPORT FUNCTIONS (PNG/PDF)
 *    Creates professional-looking visual backups suitable for printing:
 *    
 *    - captureSeedPhraseCanvas():
 *      * Core function that generates the canvas with all visual elements
 *      * Returns HTMLCanvasElement ready for export
 *      * Supports custom scaling for high-resolution output
 *    
 *    - exportSeedPhraseAsPNG():
 *      * Exports canvas as PNG image file
 *      * High-resolution (2x scale) for clarity
 *      * Automatically downloads with proper filename
 *    
 *    - exportSeedPhraseAsPDF():
 *      * Exports canvas as PDF document (A4 format)
 *      * Automatically scales to fit on single page
 *      * Ready for printing or digital storage
 *    
 *    Visual exports include:
 *      * Greenfire branding (logo in upper left, website URL)
 *      * Generation date/time (vertically oriented on right side)
 *      * Title: "keyForge - Seed Phrase Backup"
 *      * All metadata fields (From, Date, Time, User Name, Machine Name)
 *      * Seed phrase in prominent red-bordered box for emphasis
 *      * Default derivation paths listed for all supported currencies
 *      * Large QR code (200x200px) containing the seed phrase for easy scanning
 *      * Security warning box with prominent warning message
 * 
 * 4. DEFAULT DERIVATION PATHS REGISTRY
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
 *     exportSeedPhraseAsPNG,
 *     exportSeedPhraseAsPDF
 *   } from "@/exportStandard/filenameStructureAndContent.seed.text";
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

import packageJson from "../../package.json";

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
  // Try to get hostname from window.location if available
  if (typeof window !== "undefined" && window.location) {
    const hostname = window.location.hostname;
    // If it's localhost, try to use a more descriptive identifier
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "local";
    }
    // Otherwise use the hostname (sanitized for filename)
    return hostname.replace(/[^a-zA-Z0-9-]/g, "-");
  }
  // Fallback
  return "unknown";
}

/**
 * Get user name
 * In browser environment, we use a fallback since we can't access system username
 */
function getUserName(): string {
  // Try to get from localStorage if previously set
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("keyForge_userName");
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
 * %name%.%machineName%.%date%.%time%.seed
 * 
 * @param extension - File extension (e.g., "json", "txt", "csv", "png", "pdf")
 * @param customDate - Optional custom date (defaults to current date/time)
 * @returns Formatted filename string
 */
export function generateSeedFilename(
  extension: "json" | "txt" | "csv" | "png" | "pdf",
  customDate?: Date
): string {
  const date = customDate || new Date();
  const name = PACKAGE_NAME;
  const machineName = getMachineName();
  const dateStr = formatDate(date);
  const timeStr = formatTime(date);

  return `${name}.${machineName}.${dateStr}.${timeStr}.seed.${extension}`;
}

/**
 * Generate JSON content for seed phrase export
 */
export function generateSeedJSONContent(
  mnemonicSeedPhrase: string,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  const data = {
    from: projectName,
    date: dateStr,
    time: timeStr,
    userName,
    machineName,
    mnemonicSeedPhrase,
    defaultDerivationPath: DEFAULT_DERIVATION_PATHS,
  };

  return JSON.stringify(data, null, 2);
}

/**
 * Generate TXT content for seed phrase export
 */
export function generateSeedTXTContent(
  mnemonicSeedPhrase: string,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  let content = `From: ${projectName}\n`;
  content += `Date: ${dateStr}\n`;
  content += `Time: ${timeStr}\n`;
  content += `User Name: ${userName}\n`;
  content += `Machine Name: ${machineName}\n`;
  content += `\nMnemonic Seed Phrase:\n${mnemonicSeedPhrase}\n`;
  content += `\nDefault Derivation Paths:\n`;

  for (const [currency, path] of Object.entries(DEFAULT_DERIVATION_PATHS)) {
    content += `  ${currency}: ${path}\n`;
  }

  return content;
}

/**
 * Generate CSV content for seed phrase export
 */
export function generateSeedCSVContent(
  mnemonicSeedPhrase: string,
  customDate?: Date
): string {
  const date = customDate || new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
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
  content += `Date,${escapeCSV(dateStr)}\n`;
  content += `Time,${escapeCSV(timeStr)}\n`;
  content += `User Name,${escapeCSV(userName)}\n`;
  content += `Machine Name,${escapeCSV(machineName)}\n`;
  content += `Mnemonic Seed Phrase,${escapeCSV(mnemonicSeedPhrase)}\n`;

  // Add derivation paths
  for (const [currency, path] of Object.entries(DEFAULT_DERIVATION_PATHS)) {
    content += `Default Derivation Path (${currency}),${escapeCSV(path)}\n`;
  }

  return content;
}

/**
 * Draw wrapped text on canvas
 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  let currentY = y;
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  
  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + (currentLine ? " " : "") + words[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  for (const line of lines) {
    ctx.fillText(line, x, currentY, maxWidth);
    currentY += lineHeight;
  }
  
  return currentY;
}

/**
 * Draw the greenfire logo maintaining original aspect ratio
 */
async function drawGreenfireLogo(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const logoImage = new Image();
    logoImage.onerror = () => reject(new Error("Unable to load greenfire logo"));
    logoImage.src = "/assets/icons/greenfire/proper/greenfire.svg";
    logoImage.onload = () => {
      ctx.drawImage(logoImage, x, y, width, height);
      resolve();
    };
  });
}

/**
 * Draw a QR code directly onto a canvas context
 */
async function drawQRCode(
  ctx: CanvasRenderingContext2D,
  data: string,
  x: number,
  y: number,
  size: number
): Promise<void> {
  const QRCode = (await import("qrcode")).default;

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, { width: size, margin: 1 }, (err: Error | null, url: string) => {
      if (err) {
        reject(err);
        return;
      }
      const qrImage = new Image();
      qrImage.onerror = () => reject(new Error("Unable to load QR code image"));
      qrImage.src = url;
      qrImage.onload = () => {
        ctx.drawImage(qrImage, x, y, size, size);
        resolve();
      };
    });
  });
}

const EXPORT_WIDTH_PX = 800;
const PADDING = 40;

/**
 * Create export canvas for seed phrase
 */
export async function captureSeedPhraseCanvas(
  mnemonicSeedPhrase: string,
  opts?: { scale?: number }
): Promise<HTMLCanvasElement> {
  const scale = opts?.scale ?? 2;
  const date = new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Estimate canvas height
  const estimatedHeight = 600;
  
  const canvas = document.createElement("canvas");
  canvas.width = EXPORT_WIDTH_PX * scale;
  canvas.height = estimatedHeight * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.scale(scale, scale);

  // Fill white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, EXPORT_WIDTH_PX, estimatedHeight);

  // Draw greenfire logo in upper left corner
  const logoBaseHeight = 60;
  const logoWidth = logoBaseHeight * (139.69 / 191.94);
  const logoHeight = logoBaseHeight;
  const logoX = PADDING;
  const logoY = PADDING;
  await drawGreenfireLogo(ctx, logoX, logoY, logoWidth, logoHeight);

  // Website URL in upper left corner
  ctx.font = "10px monospace";
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  const websiteText = "https://greenfire.io";
  const websiteX = PADDING;
  const websiteY = PADDING + 20;
  ctx.fillText(websiteText, websiteX, websiteY);

  // Date on right side, oriented vertically
  ctx.save();
  ctx.font = "10px monospace";
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  const dateText = `Generated: ${dateStr} ${timeStr}`;
  const dateX = EXPORT_WIDTH_PX - PADDING;
  const dateY = PADDING + 20;
  ctx.translate(dateX, dateY);
  ctx.rotate(Math.PI / 2);
  ctx.fillText(dateText, 0, 0);
  ctx.restore();

  let y = PADDING;

  // Title
  ctx.font = "bold 24px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("keyForge - Seed Phrase Backup", EXPORT_WIDTH_PX / 2, y + 20);

  y += 80;

  // From
  ctx.font = "12px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "left";
  ctx.fillText(`From: ${projectName}`, PADDING, y);
  y += 25;

  // Date
  ctx.fillText(`Date: ${dateStr}`, PADDING, y);
  y += 25;

  // Time
  ctx.fillText(`Time: ${timeStr}`, PADDING, y);
  y += 25;

  // User Name
  ctx.fillText(`User Name: ${userName}`, PADDING, y);
  y += 25;

  // Machine Name
  ctx.fillText(`Machine Name: ${machineName}`, PADDING, y);
  y += 35;

  // Mnemonic Seed Phrase label
  ctx.font = "bold 14px monospace";
  ctx.fillText("Mnemonic Seed Phrase:", PADDING, y);
  y += 25;

  // Mnemonic Seed Phrase (with red border box)
  const mnemonicX = PADDING;
  const mnemonicY = y;
  const mnemonicWidth = EXPORT_WIDTH_PX - PADDING * 2;
  const mnemonicHeight = 100;
  
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(mnemonicX, mnemonicY, mnemonicWidth, mnemonicHeight);
  ctx.strokeStyle = "#dc2626";
  ctx.lineWidth = 2;
  ctx.strokeRect(mnemonicX, mnemonicY, mnemonicWidth, mnemonicHeight);

  ctx.font = "12px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "left";
  const mnemonicMaxWidth = mnemonicWidth - 20;
  drawWrappedText(ctx, mnemonicSeedPhrase, mnemonicX + 10, mnemonicY + 20, mnemonicMaxWidth, 18);

  y += mnemonicHeight + 30;

  // Default Derivation Paths label
  ctx.font = "bold 14px monospace";
  ctx.fillText("Default Derivation Paths:", PADDING, y);
  y += 25;

  // Derivation paths
  ctx.font = "11px monospace";
  ctx.fillStyle = "#333333";
  for (const [currency, path] of Object.entries(DEFAULT_DERIVATION_PATHS)) {
    ctx.fillText(`${currency}: ${path}`, PADDING, y);
    y += 20;
  }

  // QR Code for seed phrase
  y += 20;
  const qrSize = 200;
  const qrX = (EXPORT_WIDTH_PX - qrSize) / 2;
  const qrY = y;

  // Draw QR code background
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;
  ctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);
  ctx.strokeRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

  // Draw QR code
  await drawQRCode(ctx, mnemonicSeedPhrase, qrX, qrY, qrSize);

  y += qrSize + 40;

  // Warning box
  const warningHeight = 60;
  ctx.fillStyle = "#fff3cd";
  ctx.fillRect(PADDING, y, EXPORT_WIDTH_PX - PADDING * 2, warningHeight);
  ctx.strokeStyle = "#ffc107";
  ctx.lineWidth = 1;
  ctx.strokeRect(PADDING, y, EXPORT_WIDTH_PX - PADDING * 2, warningHeight);

  ctx.font = "bold 12px monospace";
  ctx.fillStyle = "#856404";
  ctx.textAlign = "center";
  ctx.fillText("!! WARNING !!", EXPORT_WIDTH_PX / 2, y + 22);

  ctx.font = "11px monospace";
  ctx.fillText(
    "Keep this backup secure and private! Never share your seed phrase with anyone.",
    EXPORT_WIDTH_PX / 2,
    y + 42
  );

  y += warningHeight + PADDING;

  // Resize canvas to actual content height
  const finalHeight = y;
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = EXPORT_WIDTH_PX * scale;
  finalCanvas.height = finalHeight * scale;

  const finalCtx = finalCanvas.getContext("2d");
  if (!finalCtx) throw new Error("Could not get final canvas context");

  // Draw white background on final canvas
  finalCtx.fillStyle = "#ffffff";
  finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

  // Copy content from original canvas
  finalCtx.drawImage(
    canvas,
    0, 0, EXPORT_WIDTH_PX * scale, finalHeight * scale,
    0, 0, EXPORT_WIDTH_PX * scale, finalHeight * scale
  );

  return finalCanvas;
}

/**
 * Export seed phrase as PNG
 */
export async function exportSeedPhraseAsPNG(mnemonicSeedPhrase: string) {
  const canvas = await captureSeedPhraseCanvas(mnemonicSeedPhrase, { scale: 2 });
  const link = document.createElement("a");
  link.download = generateSeedFilename("png");
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Export seed phrase as PDF
 */
export async function exportSeedPhraseAsPDF(mnemonicSeedPhrase: string) {
  const canvas = await captureSeedPhraseCanvas(mnemonicSeedPhrase, { scale: 2 });

  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Scale down if necessary to fit on one page
  if (imgHeight > pageHeight) {
    const scaleFactor = pageHeight / imgHeight;
    const scaledWidth = imgWidth * scaleFactor;
    const scaledHeight = pageHeight;
    const xOffset = (pageWidth - scaledWidth) / 2;
    pdf.addImage(imgData, "PNG", xOffset, 0, scaledWidth, scaledHeight);
  } else {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  pdf.save(generateSeedFilename("pdf"));
}


