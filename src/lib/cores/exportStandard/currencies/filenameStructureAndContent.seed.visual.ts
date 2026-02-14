/**
 * Seed Phrase Visual Export Structure (PNG/PDF)
 * 
 * This module handles visual canvas-based exports for seed phrase backups in PNG and PDF formats.
 * It creates professional-looking visual backups suitable for printing.
 * 
 * Features:
 * - captureSeedPhraseCanvas(): Core function that generates the canvas with all visual elements
 * - exportSeedPhraseAsPNG(): Exports canvas as PNG image file (high-resolution, 2x scale)
 * - exportSeedPhraseAsPDF(): Exports canvas as PDF document (A4 format, auto-scales to fit)
 * 
 * Visual exports include:
 * - Greenfire branding (logo in upper left, website URL)
 * - Generation date/time (vertically oriented on right side)
 * - Title: "keyForge - Seed Phrase Backup"
 * - All metadata fields (From, Date, Time, User Name, Machine Name)
 * - Seed phrase in prominent red-bordered box for emphasis
 * - Large QR code (200x200px) containing the seed phrase for easy scanning
 * - Mnemonic seed phrase text below QR code
 * - BIP32 Root GPG Key Fingerprint (derived from root extended private key)
 * - Wallet addresses with QR codes for all supported currencies
 * - Default derivation paths listed for all supported currencies
 * - Security warning box with prominent warning message
 * 
 * Usage:
 *   import { 
 *     exportSeedPhraseAsPNG,
 *     exportSeedPhraseAsPDF
 *   } from "@/lib/exportStandard/currencies/filenameStructureAndContent.seed.visual";
 */

import { generateSeedFilename } from "./filenameStructureAndContent.seed.text";
import packageJson from "../../../../package.json";
import { generateAddressesFromMnemonic } from "@/utils/cryptoGenerator";
import { generateGPGFromRootExtendedPrivateKey } from "@/lib/cryptographyCore/deterministicGPG/deterministicGPG.seed";

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
 * Get user name
 */
function getUserName(): string {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("keyForge_userName");
    if (stored) {
      return stored;
    }
  }
  return "user";
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
 * Draw the greenfire black logo maintaining original aspect ratio
 */
async function drawGreenfireBlackLogo(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const logoImage = new Image();
    logoImage.onerror = () => reject(new Error("Unable to load greenfire black logo"));
    logoImage.src = "/assets/icons/greenfire/proper/greenfire.redBlackHeart.svg";
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
    QRCode.toDataURL(data, { width: size, margin: 1 }, (err: Error | null | undefined, url: string) => {
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

/**
 * Get the crypto icon path for a given currency name
 */
function getCryptoIconPath(currency: string): string {
  const normalized = currency.toLowerCase();
  
  const iconMap: Record<string, string> = {
    btc: "btc",
    bitcoin: "btc",
    eth: "eth",
    ethereum: "eth",
    ltc: "ltc",
    litecoin: "ltc",
    sol: "sol",
    solana: "sol",
    trx: "trx",
    tron: "trx",
    xtz: "xtz",
    tezos: "xtz",
    lunc: "lunc",
    terra: "lunc",
    doge: "doge",
    dogecoin: "doge",
  };

  const iconName = iconMap[normalized];
  
  if (iconName) {
    return `/assets/icons/crypto/${iconName}.svg`;
  }
  
  return `/assets/icons/crypto/${normalized}.svg`;
}

/**
 * Draw the crypto currency icon in the center of a QR code area
 */
async function drawCryptoIconInQR(
  ctx: CanvasRenderingContext2D,
  currency: string,
  qrX: number,
  qrY: number,
  qrSize: number,
  iconSize: number = 32
): Promise<void> {
  return new Promise((resolve) => {
    const iconImage = new Image();
    iconImage.onerror = () => {
      resolve();
    };
    iconImage.src = getCryptoIconPath(currency);
    iconImage.onload = () => {
      const iconX = qrX + (qrSize - iconSize) / 2;
      const iconY = qrY + (qrSize - iconSize) / 2;
      ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
      resolve();
    };
  });
}

const EXPORT_WIDTH_PX = 800;
const PADDING = 40;

/**
 * Create export canvas for seed phrase
 */
export async function captureSeedPhraseCanvas(
  mnemonicSeedPhrase: string,
  opts?: { scale?: number; forPDF?: boolean }
): Promise<HTMLCanvasElement> {
  const scale = opts?.scale ?? 2;
  const forPDF = opts?.forPDF ?? false;
  const date = new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Scaling factors for PDF to fit A4 page
  // A4 dimensions: 210mm x 297mm, aspect ratio = 297/210 = 1.414
  const a4HeightInPixels = EXPORT_WIDTH_PX * (297 / 210);
  const pdfScale = forPDF ? 0.75 : 1.0; // Scale down by 25% for PDF
  
  // Estimate canvas height - large enough to accommodate all content
  // Header (~80) + Title (~80) + Metadata (~75) + Mnemonic QR (~280) + Derivation Paths (~180) + Warning (~100) + Padding
  // Using a generous estimate to ensure nothing is cut off, including space for warning box at bottom
  let estimatedHeight = 2000;
  
  // For PDF exports, use A4 height as target
  if (forPDF) {
    estimatedHeight = a4HeightInPixels;
  }
  
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
  const logoBaseHeight = 60 * pdfScale;
  const logoWidth = logoBaseHeight * (139.69 / 191.94);
  const logoHeight = logoBaseHeight;
  const logoX = PADDING * pdfScale;
  const logoY = PADDING * pdfScale;
  await drawGreenfireLogo(ctx, logoX, logoY, logoWidth, logoHeight);

  // Website URL in upper left corner
  ctx.font = `${10 * pdfScale}px monospace`;
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  const websiteText = "https://greenfire.io";
  const websiteX = PADDING * pdfScale;
  const websiteY = PADDING * pdfScale + 20 * pdfScale;
  ctx.fillText(websiteText, websiteX, websiteY);

  // Date on right side, oriented vertically
  ctx.save();
  ctx.font = `${10 * pdfScale}px monospace`;
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  const dateText = `Generated: ${dateStr} ${timeStr}`;
  const dateX = EXPORT_WIDTH_PX - PADDING * pdfScale;
  const dateY = PADDING * pdfScale + 20 * pdfScale;
  ctx.translate(dateX, dateY);
  ctx.rotate(Math.PI / 2);
  ctx.fillText(dateText, 0, 0);
  ctx.restore();

  let y = PADDING * pdfScale;

  // Title
  ctx.font = `bold ${24 * pdfScale}px monospace`;
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("keyForge - Seed Phrase Backup", EXPORT_WIDTH_PX / 2, y + 20 * pdfScale);

  y += 80 * pdfScale;

  // From
  ctx.font = `${12 * pdfScale}px monospace`;
  ctx.fillStyle = "#333333";
  ctx.textAlign = "left";
  ctx.fillText(`From: ${projectName}`, PADDING * pdfScale, y);
  y += 25 * pdfScale;

//   // Date
//   ctx.fillText(`Date: ${dateStr}`, PADDING * pdfScale, y);
//   y += 25 * pdfScale;

//   // Time
//   ctx.fillText(`Time: ${timeStr}`, PADDING * pdfScale, y);
//   y += 25 * pdfScale;

  // User Name
  ctx.fillText(`User Name: ${userName}`, PADDING * pdfScale, y);
  y += 25 * pdfScale;

  // Machine Name
  ctx.fillText(`Machine Name: ${machineName}`, PADDING * pdfScale, y);
  y += 35 * pdfScale;

  // Mnemonic Seed Phrase label
  ctx.font = `bold ${14 * pdfScale}px monospace`;
  ctx.fillText("Mnemonic Seed Phrase:", PADDING * pdfScale, y);
  y += 25 * pdfScale;

  // Mnemonic Seed Phrase QR Code (with red border box)
  const mnemonicQrSize = 200 * pdfScale;
  const mnemonicQrX = (EXPORT_WIDTH_PX - mnemonicQrSize) / 2;
  const mnemonicQrY = y;
  const mnemonicBoxPadding = 10 * pdfScale;
  const mnemonicBoxX = mnemonicQrX - mnemonicBoxPadding;
  const mnemonicBoxY = mnemonicQrY - mnemonicBoxPadding;
  const mnemonicBoxWidth = mnemonicQrSize + mnemonicBoxPadding * 2;
  
  // Draw red border box
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(mnemonicBoxX, mnemonicBoxY, mnemonicBoxWidth, mnemonicQrSize + mnemonicBoxPadding * 2);
  ctx.strokeStyle = "#dc2626";
  ctx.lineWidth = 2;
  ctx.strokeRect(mnemonicBoxX, mnemonicBoxY, mnemonicBoxWidth, mnemonicQrSize + mnemonicBoxPadding * 2);

  // Draw QR code background
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;
  ctx.fillRect(mnemonicQrX - 5, mnemonicQrY - 5, mnemonicQrSize + 10, mnemonicQrSize + 10);
  ctx.strokeRect(mnemonicQrX - 5, mnemonicQrY - 5, mnemonicQrSize + 10, mnemonicQrSize + 10);

  // Draw QR code
  await drawQRCode(ctx, mnemonicSeedPhrase, mnemonicQrX, mnemonicQrY, mnemonicQrSize);

  // Draw greenfire black logo in center of QR code
  // Maintain same aspect ratio as original: 139.69 / 191.94
  const mnemonicLogoBaseHeight = 48 * pdfScale;
  const mnemonicLogoWidth = mnemonicLogoBaseHeight * (139.69 / 191.94);
  const mnemonicLogoHeight = mnemonicLogoBaseHeight;
  const mnemonicLogoX = mnemonicQrX + (mnemonicQrSize - mnemonicLogoWidth) / 2;
  const mnemonicLogoY = mnemonicQrY + (mnemonicQrSize - mnemonicLogoHeight) / 2;
  await drawGreenfireBlackLogo(ctx, mnemonicLogoX, mnemonicLogoY, mnemonicLogoWidth, mnemonicLogoHeight);

  // Draw mnemonic seed phrase text below QR code
  y += mnemonicQrSize + mnemonicBoxPadding + 15 * pdfScale;
  ctx.font = `${12 * pdfScale}px monospace`;
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  const mnemonicTextMaxWidth = EXPORT_WIDTH_PX - PADDING * pdfScale * 2;
  y = drawWrappedText(ctx, mnemonicSeedPhrase, EXPORT_WIDTH_PX / 2, y, mnemonicTextMaxWidth, 18 * pdfScale);

  y += 20 * pdfScale;

  // Generate and draw BIP32 Root GPG Key Fingerprint
  let gpgFingerprint = "";
  try {
    const gpgResult = await generateGPGFromRootExtendedPrivateKey(mnemonicSeedPhrase);
    gpgFingerprint = gpgResult.gpgFingerprint;
  } catch (error) {
    console.error("Error generating GPG fingerprint:", error);
    gpgFingerprint = "Error generating fingerprint";
  }

  // Draw fingerprint label
  ctx.font = `bold ${10 * pdfScale}px monospace`;
  ctx.fillStyle = "#666666";
  ctx.textAlign = "center";
  ctx.fillText("BIP32 Root GPG Key Fingerprint:", EXPORT_WIDTH_PX / 2, y);
  y += 18 * pdfScale;

  // Draw fingerprint value
  ctx.font = `${10 * pdfScale}px monospace`;
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  y = drawWrappedText(ctx, gpgFingerprint, EXPORT_WIDTH_PX / 2, y, mnemonicTextMaxWidth, 14 * pdfScale);

  y += 30 * pdfScale;

  // Generate addresses for all supported currencies
  const addresses = await generateAddressesFromMnemonic(mnemonicSeedPhrase, {});
  
  // Currency QR Codes section
  ctx.font = `bold ${14 * pdfScale}px monospace`;
  ctx.fillStyle = "#333333";
  ctx.textAlign = "left";
  ctx.fillText("Wallet Addresses:", PADDING * pdfScale, y);
  y += 30 * pdfScale;

  // Layout: 2 columns, 4 rows for 8 currencies
  const QR_SIZE = 120 * pdfScale;
  const QR_SPACING = 20 * pdfScale;
  const CARDS_PER_ROW = 2;
  const cardWidth = (EXPORT_WIDTH_PX - PADDING * pdfScale * 2 - QR_SPACING) / CARDS_PER_ROW;
  const baseCardHeight = QR_SIZE + 120 * pdfScale; // QR code + space for derivation path, address, and fingerprint

  // Sort addresses to match DEFAULT_DERIVATION_PATHS order
  const currencyOrder = Object.keys(DEFAULT_DERIVATION_PATHS);
  const sortedAddresses = currencyOrder
    .map(currency => addresses.find(addr => addr.currency === currency))
    .filter((addr): addr is typeof addresses[0] => addr !== undefined);

  // Track maximum card height for each row
  const rowHeights: number[] = [];

  for (let i = 0; i < sortedAddresses.length; i++) {
    const address = sortedAddresses[i];
    const row = Math.floor(i / CARDS_PER_ROW);
    const col = i % CARDS_PER_ROW;
    
    const cardX = PADDING * pdfScale + col * (cardWidth + QR_SPACING);
    let cardY = y;
    
    // Add height from previous rows
    for (let r = 0; r < row; r++) {
      cardY += (rowHeights[r] || baseCardHeight) + QR_SPACING;
    }
    
    // Derivation path above QR code
    ctx.font = `${10 * pdfScale}px monospace`;
    ctx.fillStyle = "#333333";
    ctx.textAlign = "left";
    ctx.fillText(address.derivationPath, cardX, cardY);
    
    // QR code
    const qrX = cardX;
    const qrY = cardY + 20 * pdfScale;
    const currencyTicker = address.currency.toLowerCase();
    const addressWithPrefix = `${currencyTicker}://${address.address}`;
    await drawQRCode(ctx, addressWithPrefix, qrX, qrY, QR_SIZE);
    
    // Draw currency icon in center of QR code
    await drawCryptoIconInQR(ctx, address.currency, qrX, qrY, QR_SIZE, 28 * pdfScale);
    
    // Address below QR code
    const addressY = qrY + QR_SIZE + 10 * pdfScale;
    ctx.font = `${9 * pdfScale}px monospace`;
    ctx.fillStyle = "#333333";
    ctx.textAlign = "left";
    const addressText = addressWithPrefix;
    const addressMaxWidth = cardWidth - 10 * pdfScale;
    const addressEndY = drawWrappedText(ctx, addressText, cardX, addressY, addressMaxWidth, 12 * pdfScale);
    
    // GPG Key Fingerprint below address
    const fingerprintY = addressEndY + 8 * pdfScale;
    ctx.font = `${8 * pdfScale}px monospace`;
    ctx.fillStyle = "#666666";
    ctx.textAlign = "left";
    const fingerprintText = `GPG: ${address.keyFingerprint}`;
    const fingerprintMaxWidth = cardWidth - 10 * pdfScale;
    const fingerprintEndY = drawWrappedText(ctx, fingerprintText, cardX, fingerprintY, fingerprintMaxWidth, 10 * pdfScale);
    
    // Track card height for this row
    const cardHeight = fingerprintEndY - cardY + 10 * pdfScale;
    if (!rowHeights[row] || cardHeight > rowHeights[row]) {
      rowHeights[row] = cardHeight;
    }
  }

  // Update y position after all currency cards
  const totalHeight = rowHeights.reduce((sum, height) => sum + height + QR_SPACING, 0) - QR_SPACING;
  y += totalHeight;

  // Calculate page height to ensure warning box is anchored at bottom
  // Content height so far + spacing + warning box + padding
  const warningHeight = 60 * pdfScale;
  const spacingAfterContent = 20 * pdfScale;
  const minPageHeight = y + spacingAfterContent + warningHeight + PADDING * pdfScale;
  
  // For PDF exports, use A4 page height to anchor warning box at bottom of A4 page
  // A4 dimensions: 210mm x 297mm, aspect ratio = 297/210 = 1.414
  const pageHeight = forPDF ? Math.max(minPageHeight, a4HeightInPixels) : minPageHeight;
  
  // Warning box - anchored to bottom of page
  const warningY = pageHeight - warningHeight - PADDING * pdfScale;
  
  ctx.fillStyle = "#fff3cd";
  ctx.fillRect(PADDING * pdfScale, warningY, EXPORT_WIDTH_PX - PADDING * pdfScale * 2, warningHeight);
  ctx.strokeStyle = "#ffc107";
  ctx.lineWidth = 1;
  ctx.strokeRect(PADDING * pdfScale, warningY, EXPORT_WIDTH_PX - PADDING * pdfScale * 2, warningHeight);

  ctx.font = `bold ${12 * pdfScale}px monospace`;
  ctx.fillStyle = "#856404";
  ctx.textAlign = "center";
  ctx.fillText("!! WARNING !!", EXPORT_WIDTH_PX / 2, warningY + 22 * pdfScale);

  ctx.font = `${11 * pdfScale}px monospace`;
  ctx.fillText(
    "Keep this backup secure and private! Never share your seed phrase with anyone.",
    EXPORT_WIDTH_PX / 2,
    warningY + 42 * pdfScale
  );

  // Final height is the page height
  y = pageHeight;

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
  // Use same A4-optimized layout as PDF for consistency
  const canvas = await captureSeedPhraseCanvas(mnemonicSeedPhrase, { scale: 2, forPDF: true });
  const link = document.createElement("a");
  link.download = generateSeedFilename("png", mnemonicSeedPhrase);
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Export seed phrase as PDF with selectable text overlay
 */
export async function exportSeedPhraseAsPDF(mnemonicSeedPhrase: string) {
  const canvas = await captureSeedPhraseCanvas(mnemonicSeedPhrase, { scale: 2, forPDF: true });

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
  let scaleFactor = 1;
  let xOffset = 0;
  if (imgHeight > pageHeight) {
    scaleFactor = pageHeight / imgHeight;
    const scaledWidth = imgWidth * scaleFactor;
    const scaledHeight = pageHeight;
    xOffset = (pageWidth - scaledWidth) / 2;
    pdf.addImage(imgData, "PNG", xOffset, 0, scaledWidth, scaledHeight);
  } else {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  // Add selectable text overlay
  // The canvas uses scale=2 for high resolution, but logical coordinates are in EXPORT_WIDTH_PX
  // PDF coordinates need to map from logical canvas pixels to PDF mm
  const canvasScale = 2; // Same as used in captureSeedPhraseCanvas
  const canvasLogicalHeight = canvas.height / canvasScale;
  
  // Convert canvas pixel coordinates to PDF mm coordinates
  const pxToMmX = (px: number) => {
    const normalizedX = px / EXPORT_WIDTH_PX; // 0 to 1
    if (imgHeight > pageHeight) {
      // Scaled down
      return xOffset + (normalizedX * imgWidth * scaleFactor);
    }
    return normalizedX * imgWidth;
  };
  
  const pxToMmY = (py: number) => {
    const normalizedY = py / canvasLogicalHeight; // 0 to 1
    if (imgHeight > pageHeight) {
      // Scaled down
      return normalizedY * pageHeight;
    }
    return normalizedY * imgHeight;
  };
  
  // Set text color to match background (white) so it's invisible but still selectable
  pdf.setTextColor(255, 255, 255);
  
  const pdfScale = 0.75; // Same as used in canvas
  const date = new Date();
  const projectName = PACKAGE_NAME;
  const dateStr = formatDateDisplay(date);
  const timeStr = formatTimeDisplay(date);
  const userName = getUserName();
  const machineName = getMachineName();

  // Helper to add text at canvas positions
  const addText = (text: string, x: number, y: number, fontSize: number, align: 'left' | 'center' | 'right' = 'left') => {
    pdf.setFontSize(fontSize * 0.3528); // Convert px to pt (1px = 0.75pt, then scale)
    const mmX = pxToMmX(x);
    const mmY = pxToMmY(y);
    pdf.text(text, mmX, mmY, { align, baseline: 'alphabetic' });
  };

  // Metadata section
  let y = PADDING * pdfScale + 80 * pdfScale;
  addText(`From: ${projectName}`, PADDING * pdfScale, y, 12 * pdfScale, 'left');
  y += 25 * pdfScale;
  addText(`User Name: ${userName}`, PADDING * pdfScale, y, 12 * pdfScale, 'left');
  y += 25 * pdfScale;
  addText(`Machine Name: ${machineName}`, PADDING * pdfScale, y, 12 * pdfScale, 'left');
  y += 35 * pdfScale;
  
  // Skip "Mnemonic Seed Phrase:" label
  y += 25 * pdfScale;
  
  // Mnemonic Seed Phrase (below QR code)
  const mnemonicQrSize = 200 * pdfScale;
  y += mnemonicQrSize + 10 * pdfScale + 15 * pdfScale;
  addText(mnemonicSeedPhrase, EXPORT_WIDTH_PX / 2, y, 12 * pdfScale, 'center');
  
  // BIP32 Root GPG Key Fingerprint
  let gpgFingerprint = "";
  try {
    const gpgResult = await generateGPGFromRootExtendedPrivateKey(mnemonicSeedPhrase);
    gpgFingerprint = gpgResult.gpgFingerprint;
  } catch (error) {
    console.error("Error generating GPG fingerprint:", error);
    gpgFingerprint = "Error generating fingerprint";
  }
  y += 20 * pdfScale + 18 * pdfScale;
  addText(gpgFingerprint, EXPORT_WIDTH_PX / 2, y + 14 * pdfScale, 10 * pdfScale, 'center');

  // Generate addresses for wallet addresses section
  const addresses = await generateAddressesFromMnemonic(mnemonicSeedPhrase, {});
  const currencyOrder = Object.keys(DEFAULT_DERIVATION_PATHS);
  const sortedAddresses = currencyOrder
    .map(currency => addresses.find(addr => addr.currency === currency))
    .filter((addr): addr is typeof addresses[0] => addr !== undefined);

  // Add wallet addresses text
  y += 30 * pdfScale + 30 * pdfScale;
  const QR_SIZE = 120 * pdfScale;
  const QR_SPACING = 20 * pdfScale;
  const CARDS_PER_ROW = 2;
  const cardWidth = (EXPORT_WIDTH_PX - PADDING * pdfScale * 2 - QR_SPACING) / CARDS_PER_ROW;
  const baseCardHeight = QR_SIZE + 120 * pdfScale;
  const rowHeights: number[] = [];

  for (let i = 0; i < sortedAddresses.length; i++) {
    const address = sortedAddresses[i];
    const row = Math.floor(i / CARDS_PER_ROW);
    const col = i % CARDS_PER_ROW;
    
    const cardX = PADDING * pdfScale + col * (cardWidth + QR_SPACING);
    let cardY = y;
    
    for (let r = 0; r < row; r++) {
      cardY += (rowHeights[r] || baseCardHeight) + QR_SPACING;
    }
    
    // Derivation path
    addText(address.derivationPath, cardX, cardY, 10 * pdfScale, 'left');
    
    // Address below QR code
    const qrY = cardY + 20 * pdfScale;
    const addressY = qrY + QR_SIZE + 10 * pdfScale;
    const currencyTicker = address.currency.toLowerCase();
    const addressWithPrefix = `${currencyTicker}://${address.address}`;
    addText(addressWithPrefix, cardX, addressY, 9 * pdfScale, 'left');
    
    // GPG fingerprint
    const fingerprintY = addressY + 20 * pdfScale;
    addText(`GPG: ${address.keyFingerprint}`, cardX, fingerprintY, 8 * pdfScale, 'left');
    
    const cardHeight = fingerprintY - cardY + 20 * pdfScale;
    if (!rowHeights[row] || cardHeight > rowHeights[row]) {
      rowHeights[row] = cardHeight;
    }
  }

  pdf.save(generateSeedFilename("pdf", mnemonicSeedPhrase));
}

