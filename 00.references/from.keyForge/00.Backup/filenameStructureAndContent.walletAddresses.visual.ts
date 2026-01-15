/**
 * Wallet Addresses Visual Export Structure (PNG/PDF)
 * 
 * This module handles visual canvas-based exports for public wallet addresses of all
 * supported cryptocurrencies in a unified format. It creates PNG and PDF exports that
 * display wallet addresses in a grid layout, suitable for printing or digital backup.
 * 
 * ============================================================================
 * MAIN FEATURES
 * ============================================================================
 * 
 * 1. UNIFIED WALLET ADDRESS EXPORTS
 *    - Exports all wallet addresses in a single document (PNG or PDF)
 *    - Displays each address with:
 *      - Derivation path (e.g., m/44'/0'/0'/0/0)
 *      - QR code containing the address with ticker prefix (e.g., btc://address)
 *      - Currency icon overlaid on the QR code
 *      - Full address text with ticker prefix
 *      - GPG key fingerprint
 * 
 * 2. VISUAL ELEMENTS
 *    - Grid layout (2 columns) for efficient space usage
 *    - QR codes (150x150px) with currency icons in center
 *    - Greenfire branding (logo, website URL, generation date)
 *    - Professional layout suitable for printing
 * 
 * 3. EXPORT FORMATS
 *    - PNG: High-resolution image export (2x scale for crisp printing)
 *    - PDF: A4 format document with automatic scaling to fit on single page
 *    - Both formats maintain consistent layout and branding
 * 
 * ============================================================================
 * KEY FUNCTIONS
 * ============================================================================
 * 
 * - captureGeneralExportCanvas(): Core function that generates the canvas with all visual elements
 * - exportGeneralAddressesAsPNG(): Exports canvas as PNG image file (high-resolution, 2x scale)
 * - exportGeneralAddressesAsPDF(): Exports canvas as PDF document (A4 format, auto-scales to fit)
 * 
 * Helper Functions:
 * - drawQRCode(): Draws QR codes directly onto canvas
 * - drawCryptoIconInQR(): Overlays currency icons in QR code centers
 * - drawGreenfireLogo(): Draws Greenfire logo maintaining aspect ratio
 * - drawWrappedText(): Handles text wrapping for long addresses
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * This module is primarily used by the AddressDisplay component for:
 * - Downloading all wallet addresses in a single export (PNG/PDF)
 * - Creating unified backups of all cryptocurrency addresses
 * - Generating printable documents for physical storage
 * 
 * Import example:
 *   import { 
 *     exportGeneralAddressesAsPNG,
 *     exportGeneralAddressesAsPDF
 *   } from "@/exportStandard/filenameStructureAndContent.walletAddresses.visual";
 * 
 *   import { GeneralAddress } from "@/exportStandard/filenameStructureAndContent.walletAddresses.text";
 * 
 *   const addresses: GeneralAddress[] = [
 *     {
 *       currency: "BTC",
 *       address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
 *       derivationPath: "m/44'/0'/0'/0/0",
 *       keyFingerprint: "ABCD 1234 EFGH 5678"
 *     }
 *   ];
 * 
 *   const mnemonicSeedPhrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
 * 
 *   await exportGeneralAddressesAsPNG(addresses, mnemonicSeedPhrase);
 *   await exportGeneralAddressesAsPDF(addresses, mnemonicSeedPhrase);
 * 
 * ============================================================================
 * LAYOUT STRUCTURE
 * ============================================================================
 * 
 * 1. Header Section:
 *    - Greenfire logo (upper left)
 *    - Website URL (upper left, below logo)
 *    - Generation date/time (upper right, vertical)
 *    - Title: "keyForge - Wallet Addresses"
 * 
 * 2. Address Grid Section:
 *    - 2-column grid layout
 *    - Each address card contains:
 *      - Derivation path (above QR code)
 *      - QR code (150x150px) with currency icon in center
 *      - Full address with ticker prefix (below QR code)
 *      - GPG key fingerprint (below address)
 * 
 * ============================================================================
 * FILENAME FORMAT
 * ============================================================================
 * 
 * Uses generateWalletAddressesFilename() from filenameStructureAndContent.walletAddresses.text.ts
 * Format: %name%.%machineName%.%date% (YYYYMMDD).%time% (24hr HHMMSS).seed.%firstAndLastWordsOfMnemonicSeedPhrase%.{extension}
 * Example: keyForge.local.20250118.143022.seed.abandonAbout.png
 * 
 * ============================================================================
 * SECURITY NOTES
 * ============================================================================
 * 
 * - Exports contain public wallet addresses (not private keys)
 * - GPG key fingerprints are included for verification
 * - Users should store exports securely
 * - QR codes enable easy scanning for address verification
 */

import { generateWalletAddressesFilename } from "./filenameStructureAndContent.walletAddresses.text";
import { GeneralAddress } from "./filenameStructureAndContent.walletAddresses.text";

const EXPORT_WIDTH_PX = 800;
const QR_SIZE_PX = 150;
const PADDING = 40;
const CARD_SPACING = 10;
const CARDS_PER_ROW = 2;

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
    ada: "ada",
    cardano: "ada",
    dot: "dot",
    polkadot: "dot",
    link: "link",
    chainlink: "link",
    matic: "matic",
    polygon: "matic",
    avax: "avax",
    avalanche: "avax",
    bnb: "bnb",
    binance: "bnb",
    xrp: "xrp",
    ripple: "xrp",
    doge: "doge",
    dogecoin: "doge",
    shib: "shib",
    shiba: "shib",
    atom: "atom",
    cosmos: "atom",
    algo: "algo",
    algorand: "algo",
    near: "near",
    etc: "etc",
    ethereumclassic: "etc",
    bch: "bch",
    bitcoincash: "bch",
    xlm: "xlm",
    stellar: "xlm",
    zec: "zec",
    zcash: "zec",
    eos: "eos",
    icp: "icp",
    internetcomputer: "icp",
    fil: "fil",
    filecoin: "fil",
    aave: "aave",
    uni: "uni",
    uniswap: "uni",
    dai: "dai",
    usdc: "usdc",
    usdt: "usdt",
    tether: "usdt",
    busd: "busd",
    wbtc: "wbtc",
    wrappedbitcoin: "wbtc",
  };

  const iconName = iconMap[normalized];
  
  if (iconName) {
    return `/assets/icons/crypto/${iconName}.svg`;
  }
  
  return `/assets/icons/crypto/${normalized}.svg`;
}

/**
 * Draw the greenfire logo maintaining original aspect ratio
 * Original SVG dimensions: 139.69 x 191.94 (width x height)
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

/**
 * Draw wrapped text on canvas (centered)
 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  let currentY = y;
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  
  // First, break text into lines
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
  
  // Draw each line centered
  for (const line of lines) {
    ctx.fillText(line, centerX, currentY, maxWidth);
    currentY += lineHeight;
  }
  
  return currentY;
}

/**
 * Create export canvas with all wallet addresses
 */
export async function captureGeneralExportCanvas(
  addresses: GeneralAddress[],
  opts?: { scale?: number }
): Promise<HTMLCanvasElement> {
  const scale = opts?.scale ?? 2;

  // Calculate canvas dimensions
  const cardWidth = (EXPORT_WIDTH_PX - PADDING * 2 - CARD_SPACING) / CARDS_PER_ROW;
  const cardHeight = QR_SIZE_PX + 115; // QR code + space for derivation path, address, and GPG fingerprint
  const rows = Math.ceil(addresses.length / CARDS_PER_ROW);
  const estimatedHeight = PADDING * 2 + rows * cardHeight + (rows - 1) * CARD_SPACING;

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
  // Original SVG dimensions: 139.69 x 191.94 (width x height)
  // Aspect ratio: 139.69 / 191.94 ≈ 0.728
  const logoBaseHeight = 60; // Scale down to 60px height
  const logoWidth = logoBaseHeight * (139.69 / 191.94); // Maintain aspect ratio
  const logoHeight = logoBaseHeight;
  const logoX = PADDING;
  const logoY = PADDING;
  await drawGreenfireLogo(ctx, logoX, logoY, logoWidth, logoHeight);

  // Website URL in upper left corner, oriented regularly
  ctx.font = "10px monospace";
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  const websiteText = "https://greenfire.io";
  const websiteX = PADDING;
  const websiteY = PADDING + 20; // Upper left, same height as date
  ctx.fillText(websiteText, websiteX, websiteY);

  // Date on right side, oriented vertically
  ctx.save();
  ctx.font = "10px monospace";
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  // Rotate 90 degrees clockwise and position at right edge
  const dateText = `Generated: ${new Date().toLocaleString()}`;
  const dateX = EXPORT_WIDTH_PX - PADDING;
  const dateY = PADDING + 20;
  ctx.translate(dateX, dateY);
  ctx.rotate(Math.PI / 2); // 90 degrees clockwise
  ctx.fillText(dateText, 0, 0);
  ctx.restore();

  let y = PADDING;

  // Title
  ctx.font = "bold 24px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("keyForge - Wallet Addresses", EXPORT_WIDTH_PX / 2, y + 20);

  y += 80;

  // Draw addresses in a grid
  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    const row = Math.floor(i / CARDS_PER_ROW);
    const col = i % CARDS_PER_ROW;
    
    const cardX = PADDING + col * (cardWidth + CARD_SPACING);
    const cardY = y + row * (cardHeight + CARD_SPACING);

    // Get currency ticker
    const currencyTicker = address.currency.toLowerCase();
    const addressWithPrefix = `${currencyTicker}://${address.address}`;

    // Draw derivation path above QR code
    ctx.font = "10px monospace";
    ctx.fillStyle = "#666666";
    ctx.textAlign = "center";
    ctx.fillText(address.derivationPath, cardX + cardWidth / 2, cardY);

    // Draw QR code background
    const qrX = cardX + (cardWidth - QR_SIZE_PX) / 2;
    const qrY = cardY + 20;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#dddddd";
    ctx.lineWidth = 1;
    ctx.fillRect(qrX - 10, qrY - 10, QR_SIZE_PX + 20, QR_SIZE_PX + 20);
    ctx.strokeRect(qrX - 10, qrY - 10, QR_SIZE_PX + 20, QR_SIZE_PX + 20);

    // Draw QR code
    await drawQRCode(ctx, addressWithPrefix, qrX, qrY, QR_SIZE_PX);

    // Draw currency icon in center of QR code
    await drawCryptoIconInQR(ctx, address.currency, qrX, qrY, QR_SIZE_PX, 32);

    // Draw address below QR code with ticker prefix
    // QR code has 10px border, so add more spacing (25px from QR code bottom = 15px from border bottom)
    let currentY = qrY + QR_SIZE_PX + 25;
    ctx.font = "9px monospace";
    ctx.fillStyle = "#333333";
    ctx.textAlign = "center";
    const addressMaxWidth = cardWidth - 20;
    currentY = drawWrappedText(ctx, addressWithPrefix, cardX + cardWidth / 2, currentY, addressMaxWidth, 12);

    // Draw GPG Key fingerprint below address
    currentY += 5; // Small spacing
    ctx.font = "8px monospace";
    ctx.fillStyle = "#666666";
    ctx.textAlign = "center";
    ctx.fillText(`GPG: ${address.keyFingerprint}`, cardX + cardWidth / 2, currentY);
  }

  // Resize canvas to actual content height
  // Cards start at y, rows are spaced by (cardHeight + CARD_SPACING)
  // Last row is at: y + (rows - 1) * (cardHeight + CARD_SPACING)
  // Bottom of last row: lastRowY + cardHeight
  const contentHeight = y + rows * cardHeight + (rows - 1) * CARD_SPACING + PADDING;
  
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = EXPORT_WIDTH_PX * scale;
  finalCanvas.height = contentHeight * scale;

  const finalCtx = finalCanvas.getContext("2d");
  if (!finalCtx) throw new Error("Could not get final canvas context");

  // Draw white background on final canvas
  finalCtx.fillStyle = "#ffffff";
  finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

  // Copy content from original canvas
  finalCtx.drawImage(
    canvas,
    0, 0, EXPORT_WIDTH_PX * scale, contentHeight * scale,
    0, 0, EXPORT_WIDTH_PX * scale, contentHeight * scale
  );

  return finalCanvas;
}

export async function exportGeneralAddressesAsPNG(
  addresses: GeneralAddress[],
  mnemonicSeedPhrase: string
) {
  const canvas = await captureGeneralExportCanvas(addresses, { scale: 2 });
  const link = document.createElement("a");
  link.download = generateWalletAddressesFilename("png", mnemonicSeedPhrase);
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function exportGeneralAddressesAsPDF(
  addresses: GeneralAddress[],
  mnemonicSeedPhrase: string
) {
  const canvas = await captureGeneralExportCanvas(addresses, { scale: 2 });

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

  // Always try to fit on one page, scaling if necessary
  if (imgHeight > pageHeight) {
    // Scale down to fit on one page
    const scaleFactor = pageHeight / imgHeight;
    const scaledWidth = imgWidth * scaleFactor;
    const scaledHeight = pageHeight;
    const xOffset = (pageWidth - scaledWidth) / 2;
    pdf.addImage(imgData, "PNG", xOffset, 0, scaledWidth, scaledHeight);
  } else {
    // Content fits on one page
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  }

  pdf.save(generateWalletAddressesFilename("pdf", mnemonicSeedPhrase));
}

