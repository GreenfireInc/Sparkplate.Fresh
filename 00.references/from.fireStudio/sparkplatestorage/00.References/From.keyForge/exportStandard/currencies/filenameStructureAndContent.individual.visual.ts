/**
 * Individual Cryptocurrency Address Visual Export Structure (PNG/PDF)
 * 
 * This module handles visual canvas-based exports for individual cryptocurrency addresses,
 * keys, and GPG keypairs. It creates professional-looking visual backups for a single
 * currency at a time, suitable for printing and secure storage.
 * 
 * ============================================================================
 * MAIN FEATURES
 * ============================================================================
 * 
 * 1. INDIVIDUAL CURRENCY EXPORTS
 *    - Exports one cryptocurrency's complete information per document
 *    - Includes wallet address, private key, public key, and GPG keypair
 *    - Shows derivation path used for key generation
 *    - Displays mnemonic seed phrase if available
 * 
 * 2. VISUAL ELEMENTS
 *    - Wallet Address QR Code (120x120px) with currency logo in center
 *    - GPG Public Key QR Code (350x350px) with OpenPGP logo in center
 *    - Private Key QR Code (120x120px) with currency logo in center
 *    - All QR codes include ticker symbol prefixes (e.g., btc://address)
 *    - Card-style panels for GPG keys (side-by-side layout)
 *    - Prominent security warnings
 * 
 * 3. EXPORT FORMATS
 *    - PNG: High-resolution image export (2x scale for crisp printing)
 *    - PDF: A4 format document with proper scaling
 *    - Both formats maintain consistent layout and branding
 * 
 * 4. BRANDING & METADATA
 *    - Greenfire logo in upper left corner
 *    - Website URL (https://greenfire.io) in upper left
 *    - Generation date/time (vertically oriented on right side)
 *    - Title: "keyForge: {CURRENCY}" (e.g., "keyForge: BTC")
 * 
 * 5. SECURITY FEATURES
 *    - Private keys and mnemonic phrases displayed with red borders/warnings
 *    - Prominent security warning box at bottom
 *    - Clear visual distinction between public and private information
 * 
 * ============================================================================
 * KEY FUNCTIONS
 * ============================================================================
 * 
 * - captureExportCanvas(): Core function that generates the canvas with all visual elements
 * - exportCryptoAsPNG(): Exports canvas as PNG image file (high-resolution, 2x scale)
 * - exportCryptoAsPDF(): Exports canvas as PDF document (A4 format)
 * 
 * Helper Functions:
 * - drawQRCode(): Draws QR codes directly onto canvas
 * - drawCryptoIconInQR(): Overlays currency icons in QR code centers
 * - drawOpenPGPLogoInQR(): Overlays OpenPGP logo in GPG QR code center
 * - drawCard(): Creates card-style panels for GPG keys
 * - drawSection(): Creates labeled sections with backgrounds
 * - drawWrappedText(): Handles text wrapping for long addresses/keys
 * 
 * ============================================================================
 * USAGE
 * ============================================================================
 * 
 * This module is primarily used by the AddressDisplay component for:
 * - Downloading individual currency exports (PNG/PDF)
 * - Creating secure backups of cryptocurrency keys and addresses
 * - Generating printable documents for physical storage
 * 
 * Import example:
 *   import { 
 *     exportCryptoAsPNG,
 *     exportCryptoAsPDF,
 *     ExportCryptoAddress
 *   } from "@/lib/exportStandard/currencies/filenameStructureAndContent.individual.visual";
 * 
 *   const cryptoData: ExportCryptoAddress = {
 *     currency: "BTC",
 *     address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
 *     privateKey: "...",
 *     cryptoPublicKey: "...",
 *     keyFingerprint: "...",
 *     gpgPublicKey: "...",
 *     gpgPrivateKey: "...",
 *     derivationPath: "m/44'/0'/0'/0/0",
 *     mnemonic: "abandon abandon ..." // optional
 *   };
 * 
 *   await exportCryptoAsPNG(cryptoData);
 *   await exportCryptoAsPDF(cryptoData);
 * 
 * ============================================================================
 * LAYOUT STRUCTURE
 * ============================================================================
 * 
 * 1. Header Section:
 *    - Greenfire logo (upper left)
 *    - Website URL (upper left, below logo)
 *    - Generation date/time (upper right, vertical)
 *    - Title: "keyForge: {CURRENCY}"
 * 
 * 2. QR Codes Section:
 *    - Wallet Address QR (left, 120x120px) with currency icon
 *    - GPG Public Key QR (right, 350x350px) with OpenPGP logo
 *    - Private Key QR (below wallet address, 120x120px) with currency icon
 *    - All QR codes include ticker prefixes and labels
 * 
 * 3. Key Information Section:
 *    - Public Key (with ticker prefix)
 *    - Private Key (with derivation path and ticker prefix)
 *    - Mnemonic Seed Phrase (if available, with red border)
 * 
 * 4. GPG Keys Section:
 *    - Side-by-side card panels
 *    - GPG Public Key (left card)
 *    - GPG Private Key (right card, red border)
 *    - Key fingerprint displayed below GPG Public Key QR
 * 
 * 5. Security Warning:
 *    - Yellow warning box at bottom
 *    - Prominent security message
 * 
 * ============================================================================
 * SECURITY NOTES
 * ============================================================================
 * 
 * - All exports contain sensitive private key and mnemonic data
 * - Visual exports include prominent security warnings
 * - Private keys and mnemonics are visually distinguished with red borders
 * - Users should store exports securely and never share them
 * - QR codes enable easy scanning but also easy copying - handle with care
 */

import { generateIndividualCryptoFilename, type ExportCryptoAddress } from "./filenameStructureAndContent.individual.text";

// ExportCryptoAddress interface is imported from filenameStructureAndContent.individual.text.ts
export type { ExportCryptoAddress };

const EXPORT_WIDTH_PX = 800;
const QR_SIZE_PX = 120;
const GPG_QR_SIZE_PX = 350; // Larger QR code for GPG Public Key for better scannability
const PADDING = 40;
const LINE_HEIGHT = 18;

/**
 * Draw a QR code directly onto a canvas context
 * Following Greenery's reliable pattern from drawQr.js
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
 * Get the crypto icon path for a given currency name
 * Maps currency names to their corresponding SVG files in /assets/icons/crypto/
 */
function getCryptoIconPath(currency: string): string {
  // Normalize currency name to lowercase for matching
  const normalized = currency.toLowerCase();
  
  // Map common currency variations to their icon filenames
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

  // Try to find a match in the icon map
  const iconName = iconMap[normalized];
  
  if (iconName) {
    return `/assets/icons/crypto/${iconName}.svg`;
  }
  
  // Fallback: try using the normalized currency name directly
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
  return new Promise((resolve, reject) => {
    const iconImage = new Image();
    iconImage.onerror = () => {
      // Silently fail if icon doesn't exist - don't block the export
      resolve();
    };
    iconImage.src = getCryptoIconPath(currency);
    iconImage.onload = () => {
      // Center the icon in the QR code area
      const iconX = qrX + (qrSize - iconSize) / 2;
      const iconY = qrY + (qrSize - iconSize) / 2;
      ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
      resolve();
    };
  });
}

/**
 * Draw the OpenPGP logo in the center of a QR code area
 */
async function drawOpenPGPLogoInQR(
  ctx: CanvasRenderingContext2D,
  qrX: number,
  qrY: number,
  qrSize: number,
  logoSize: number = 48
): Promise<void> {
  return new Promise((resolve, reject) => {
    const logoImage = new Image();
    logoImage.onerror = () => {
      // Silently fail if logo doesn't exist - don't block the export
      resolve();
    };
    logoImage.src = "/assets/icons/other/openPGP.green.svg";
    logoImage.onload = () => {
      // Center the logo in the QR code area
      const logoX = qrX + (qrSize - logoSize) / 2;
      const logoY = qrY + (qrSize - logoSize) / 2;
      
      // Draw white rounded background behind the logo
      const padding = 4; // Padding around the logo
      const bgSize = logoSize + padding * 2;
      const bgX = qrX + (qrSize - bgSize) / 2;
      const bgY = qrY + (qrSize - bgSize) / 2;
      const borderRadius = 6;
      
      // Draw rounded rectangle background (manual path for compatibility)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(bgX + borderRadius, bgY);
      ctx.lineTo(bgX + bgSize - borderRadius, bgY);
      ctx.quadraticCurveTo(bgX + bgSize, bgY, bgX + bgSize, bgY + borderRadius);
      ctx.lineTo(bgX + bgSize, bgY + bgSize - borderRadius);
      ctx.quadraticCurveTo(bgX + bgSize, bgY + bgSize, bgX + bgSize - borderRadius, bgY + bgSize);
      ctx.lineTo(bgX + borderRadius, bgY + bgSize);
      ctx.quadraticCurveTo(bgX, bgY + bgSize, bgX, bgY + bgSize - borderRadius);
      ctx.lineTo(bgX, bgY + borderRadius);
      ctx.quadraticCurveTo(bgX, bgY, bgX + borderRadius, bgY);
      ctx.closePath();
      ctx.fill();
      
      // Draw the logo on top
      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
      resolve();
    };
  });
}

/**
 * Draw wrapped text on canvas, returns the y position after drawing
 * Handles both word wrapping and newlines
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
  
  // Split by newlines first to handle multi-line text (like GPG keys)
  const lines = text.split("\n");
  
  for (const line of lines) {
    // For each line, split by spaces to get words
    const words = line.split(" ");
    let currentLine = "";
    
    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? " " : "") + words[i];
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        // Current line is too wide, draw what we have and start new line
        ctx.fillText(currentLine, x, currentY);
        currentLine = words[i];
        currentY += lineHeight;
      } else {
        currentLine = testLine;
      }
    }
    
    // Draw the remaining line
    if (currentLine) {
      ctx.fillText(currentLine, x, currentY);
      currentY += lineHeight;
    }
  }
  
  return currentY;
}

/**
 * Draw a labeled section with background
 * Returns the y position after the section AND the actual box height
 */
function drawSection(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number,
  isPrivate: boolean = false
): number {
  const padding = 8;
  const labelHeight = 16;
  const fontSize = 11;

  // Draw label
  ctx.font = `bold 12px monospace`;
  ctx.fillStyle = isPrivate ? "#cc0000" : "#333333";
  ctx.fillText(label, x, y);

  // Calculate text height needed
  ctx.font = `${fontSize}px monospace`;
  const lines = Math.ceil(ctx.measureText(value).width / (width - padding * 2));
  const textHeight = Math.max(lines * LINE_HEIGHT, LINE_HEIGHT);
  const boxHeight = textHeight + padding * 2;

  // Draw background box
  ctx.fillStyle = isPrivate ? "#fff0f0" : "#f5f5f5";
  ctx.fillRect(x, y + 5, width, boxHeight);

  if (isPrivate) {
    ctx.strokeStyle = "#ffcccc";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y + 5, width, boxHeight);
  }

  // Draw value text
  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px monospace`;
  const textY = y + 5 + padding + fontSize;
  drawWrappedText(ctx, value, x + padding, textY, width - padding * 2, LINE_HEIGHT);

  return y + labelHeight + boxHeight + 15;
}

/**
 * Calculate the height needed for wrapped text
 */
function calculateTextHeight(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = text.split("\n");
  let totalHeight = 0;
  
  for (const line of lines) {
    const words = line.split(" ");
    let currentLine = "";
    let lineCount = 0;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? " " : "") + words[i];
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lineCount++;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lineCount++;
    }
    
    totalHeight += lineCount * lineHeight;
  }
  
  return Math.max(totalHeight, lineHeight);
}

/**
 * Draw a card-style panel for GPG keys
 * Features: prominent border, extra padding, header section
 */
function drawCard(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  x: number,
  y: number,
  width: number,
  isPrivate: boolean = false
): number {
  const cardPadding = 15;
  const innerPadding = 10;
  const headerHeight = 32;
  const fontSize = 9;

  // Calculate text height for the content
  ctx.font = `${fontSize}px monospace`;
  const textHeight = calculateTextHeight(
    ctx,
    value,
    width - cardPadding * 2,
    LINE_HEIGHT
  );
  
  const contentHeight = textHeight + innerPadding * 2;
  const totalCardHeight = headerHeight + contentHeight;

  // 1. Draw shadow first (offset darker rectangle)
  ctx.fillStyle = "#cccccc";
  ctx.fillRect(x + 4, y + 4, width, totalCardHeight);

  // 2. Draw main card background (white)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, width, totalCardHeight);

  // 3. Draw header background
  ctx.fillStyle = isPrivate ? "#ffeeee" : "#e8e8e8";
  ctx.fillRect(x + 1, y + 1, width - 2, headerHeight - 1);

  // 4. Draw header text with icon
  ctx.font = "bold 13px monospace";
  ctx.fillStyle = isPrivate ? "#cc0000" : "#333333";
  ctx.textAlign = "left";
  const iconText = isPrivate ? "🔑 [PRIVATE]" : "🔒 [PUBLIC]";
  ctx.fillText(`${iconText} ${label}`, x + cardPadding, y + headerHeight / 2 + 5);

  // 5. Draw header bottom line
  ctx.strokeStyle = isPrivate ? "#ffcccc" : "#cccccc";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y + headerHeight);
  ctx.lineTo(x + width, y + headerHeight);
  ctx.stroke();

  // 6. Draw content background
  ctx.fillStyle = isPrivate ? "#fff8f8" : "#fafafa";
  ctx.fillRect(x + 1, y + headerHeight, width - 2, contentHeight - 1);

  // 7. Draw content text
  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "left";
  const textY = y + headerHeight + innerPadding + fontSize;
  drawWrappedText(
    ctx,
    value,
    x + cardPadding,
    textY,
    width - cardPadding * 2,
    LINE_HEIGHT
  );

  // 8. Draw card border LAST (so it's on top)
  ctx.strokeStyle = isPrivate ? "#ff6666" : "#888888";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, totalCardHeight);

  return y + totalCardHeight + 15; // Spacing after card
}

/**
 * Draw two card-style panels side by side for GPG keys
 * Returns the y position after both cards (uses the taller one)
 */
function drawSideBySideCards(
  ctx: CanvasRenderingContext2D,
  leftLabel: string,
  leftValue: string,
  leftIsPrivate: boolean,
  rightLabel: string,
  rightValue: string,
  rightIsPrivate: boolean,
  x: number,
  y: number,
  totalWidth: number,
  gap: number = 15
): number {
  const columnWidth = (totalWidth - gap) / 2;
  const cardPadding = 10;
  const innerPadding = 8;
  const headerHeight = 28;
  const fontSize = 7; // Smaller font for side-by-side cards

  // Set font for measurements
  ctx.font = `${fontSize}px monospace`;

  // Calculate actual text heights for both columns
  const leftTextHeight = calculateTextHeight(
    ctx,
    leftValue,
    columnWidth - cardPadding * 2,
    LINE_HEIGHT - 4 // Tighter line height
  );
  const rightTextHeight = calculateTextHeight(
    ctx,
    rightValue,
    columnWidth - cardPadding * 2,
    LINE_HEIGHT - 4
  );

  // Use the taller content height for both cards (so they align)
  const maxTextHeight = Math.max(leftTextHeight, rightTextHeight);
  const contentHeight = maxTextHeight + innerPadding * 2;
  const totalCardHeight = headerHeight + contentHeight;

  // === LEFT CARD (Public Key) ===
  const leftX = x;

  // Shadow
  ctx.fillStyle = "#cccccc";
  ctx.fillRect(leftX + 3, y + 3, columnWidth, totalCardHeight);

  // Main background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(leftX, y, columnWidth, totalCardHeight);

  // Header background
  ctx.fillStyle = leftIsPrivate ? "#ffeeee" : "#e8e8e8";
  ctx.fillRect(leftX + 1, y + 1, columnWidth - 2, headerHeight - 1);

  // Header text
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = leftIsPrivate ? "#cc0000" : "#333333";
  ctx.textAlign = "left";
  const leftIcon = leftIsPrivate ? "🔑 [PRIVATE]" : "🔒 [PUBLIC]";
  ctx.fillText(`${leftIcon} ${leftLabel}`, leftX + cardPadding, y + headerHeight / 2 + 4);

  // Header line
  ctx.strokeStyle = leftIsPrivate ? "#ffcccc" : "#cccccc";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(leftX, y + headerHeight);
  ctx.lineTo(leftX + columnWidth, y + headerHeight);
  ctx.stroke();

  // Content background
  ctx.fillStyle = leftIsPrivate ? "#fff8f8" : "#fafafa";
  ctx.fillRect(leftX + 1, y + headerHeight, columnWidth - 2, contentHeight - 1);

  // Content text
  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "left";
  drawWrappedText(
    ctx,
    leftValue,
    leftX + cardPadding,
    y + headerHeight + innerPadding + fontSize,
    columnWidth - cardPadding * 2,
    LINE_HEIGHT - 4
  );

  // Border
  ctx.strokeStyle = leftIsPrivate ? "#ff6666" : "#888888";
  ctx.lineWidth = 2;
  ctx.strokeRect(leftX, y, columnWidth, totalCardHeight);

  // === RIGHT CARD (Private Key) ===
  const rightX = x + columnWidth + gap;

  // Shadow
  ctx.fillStyle = "#cccccc";
  ctx.fillRect(rightX + 3, y + 3, columnWidth, totalCardHeight);

  // Main background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(rightX, y, columnWidth, totalCardHeight);

  // Header background
  ctx.fillStyle = rightIsPrivate ? "#ffeeee" : "#e8e8e8";
  ctx.fillRect(rightX + 1, y + 1, columnWidth - 2, headerHeight - 1);

  // Header text
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = rightIsPrivate ? "#cc0000" : "#333333";
  ctx.textAlign = "left";
  const rightIcon = rightIsPrivate ? "🔑 [PRIVATE]" : "🔒 [PUBLIC]";
  ctx.fillText(`${rightIcon} ${rightLabel}`, rightX + cardPadding, y + headerHeight / 2 + 4);

  // Header line
  ctx.strokeStyle = rightIsPrivate ? "#ffcccc" : "#cccccc";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(rightX, y + headerHeight);
  ctx.lineTo(rightX + columnWidth, y + headerHeight);
  ctx.stroke();

  // Content background
  ctx.fillStyle = rightIsPrivate ? "#fff8f8" : "#fafafa";
  ctx.fillRect(rightX + 1, y + headerHeight, columnWidth - 2, contentHeight - 1);

  // Content text
  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "left";
  drawWrappedText(
    ctx,
    rightValue,
    rightX + cardPadding,
    y + headerHeight + innerPadding + fontSize,
    columnWidth - cardPadding * 2,
    LINE_HEIGHT - 4
  );

  // Border
  ctx.strokeStyle = rightIsPrivate ? "#ff6666" : "#888888";
  ctx.lineWidth = 2;
  ctx.strokeRect(rightX, y, columnWidth, totalCardHeight);

  return y + totalCardHeight + 15;
}

/**
 * Draw two sections side by side
 * Returns the y position after both sections (uses the taller one)
 */
function drawSideBySideSections(
  ctx: CanvasRenderingContext2D,
  leftLabel: string,
  leftValue: string,
  leftIsPrivate: boolean,
  rightLabel: string,
  rightValue: string,
  rightIsPrivate: boolean,
  x: number,
  y: number,
  totalWidth: number,
  gap: number = 20
): number {
  const columnWidth = (totalWidth - gap) / 2;
  const padding = 8;
  const labelHeight = 16;
  const fontSize = 9; // Smaller font for side-by-side

  // Set font for measurements
  ctx.font = `${fontSize}px monospace`;
  
  // Calculate actual text heights for both columns
  const leftTextHeight = calculateTextHeight(
    ctx,
    leftValue,
    columnWidth - padding * 2,
    LINE_HEIGHT
  );
  const rightTextHeight = calculateTextHeight(
    ctx,
    rightValue,
    columnWidth - padding * 2,
    LINE_HEIGHT
  );
  
  // Use the taller box height for both columns (so they align)
  const maxTextHeight = Math.max(leftTextHeight, rightTextHeight);
  const boxHeight = maxTextHeight + padding * 2;

  // Left column
  const leftX = x;
  ctx.font = `bold 12px monospace`;
  ctx.fillStyle = leftIsPrivate ? "#cc0000" : "#333333";
  ctx.fillText(leftLabel, leftX, y);

  ctx.fillStyle = leftIsPrivate ? "#fff0f0" : "#f5f5f5";
  ctx.fillRect(leftX, y + 5, columnWidth, boxHeight);

  if (leftIsPrivate) {
    ctx.strokeStyle = "#ffcccc";
    ctx.lineWidth = 1;
    ctx.strokeRect(leftX, y + 5, columnWidth, boxHeight);
  }

  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px monospace`;
  const leftTextY = y + 5 + padding + fontSize;
  drawWrappedText(ctx, leftValue, leftX + padding, leftTextY, columnWidth - padding * 2, LINE_HEIGHT);

  // Right column - positioned next to left column
  const rightX = x + columnWidth + gap;
  ctx.font = `bold 12px monospace`;
  ctx.fillStyle = rightIsPrivate ? "#cc0000" : "#333333";
  ctx.fillText(rightLabel, rightX, y);

  ctx.fillStyle = rightIsPrivate ? "#fff0f0" : "#f5f5f5";
  ctx.fillRect(rightX, y + 5, columnWidth, boxHeight);

  if (rightIsPrivate) {
    ctx.strokeStyle = "#ffcccc";
    ctx.lineWidth = 1;
    ctx.strokeRect(rightX, y + 5, columnWidth, boxHeight);
  }

  ctx.fillStyle = "#000000";
  ctx.font = `${fontSize}px monospace`;
  const rightTextY = y + 5 + padding + fontSize;
  drawWrappedText(ctx, rightValue, rightX + padding, rightTextY, columnWidth - padding * 2, LINE_HEIGHT);

  return y + labelHeight + boxHeight + 15;
}

/**
 * Create export canvas with all crypto data and QR codes
 * Using direct Canvas API like Greenery does
 */
export async function captureExportCanvas(
  crypto: ExportCryptoAddress,
  opts?: { scale?: number }
): Promise<HTMLCanvasElement> {
  const scale = opts?.scale ?? 2;

  // Calculate canvas height based on content
  // GPG keys are side-by-side cards, so use the taller one for height estimation
  const gpgPublicLines = Math.ceil(crypto.gpgPublicKey.length / 35); // narrower column
  const gpgPrivateLines = Math.ceil(crypto.gpgPrivateKey.length / 35);
  const gpgLinesNeeded = Math.max(gpgPublicLines, gpgPrivateLines);
  // Add extra height for card headers, padding, and spacing
  const estimatedHeight = 700 + gpgLinesNeeded * LINE_HEIGHT + 200;

  const canvas = document.createElement("canvas");
  canvas.width = EXPORT_WIDTH_PX * scale;
  canvas.height = estimatedHeight * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Scale for high-res output
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
  ctx.fillText(`keyForge: ${crypto.currency}`, EXPORT_WIDTH_PX / 2, y + 20);

  y += 80;

  // QR Codes section
  const qrY = y;
  // Center both QR codes: wallet address (smaller) on left, GPG Public Key (larger) on right
  // Total width needed: QR_SIZE_PX + spacing + GPG_QR_SIZE_PX
  const totalQrWidth = QR_SIZE_PX + GPG_QR_SIZE_PX + 80; // 80px spacing
  const qrStartX = (EXPORT_WIDTH_PX - totalQrWidth) / 2;
  const qr1X = qrStartX; // Wallet Address (left)
  const qr2X = qrStartX + QR_SIZE_PX + 80; // GPG Public Key (right)

  // Draw QR code backgrounds (white boxes with border)
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;

  // QR 1 background (Wallet Address - smaller)
  ctx.fillRect(qr1X - 10, qrY - 10, QR_SIZE_PX + 20, QR_SIZE_PX + 20);
  ctx.strokeRect(qr1X - 10, qrY - 10, QR_SIZE_PX + 20, QR_SIZE_PX + 20);

  // QR 2 background (GPG Public Key - larger)
  ctx.fillRect(qr2X - 10, qrY - 10, GPG_QR_SIZE_PX + 20, GPG_QR_SIZE_PX + 20);
  ctx.strokeRect(qr2X - 10, qrY - 10, GPG_QR_SIZE_PX + 20, GPG_QR_SIZE_PX + 20);

  // Draw QR codes directly onto canvas (Greenery's approach)
  // Get currency ticker for wallet address QR code
  const currencyTickerForQR = crypto.currency.toLowerCase();
  const walletAddressWithPrefix = `${currencyTickerForQR}://${crypto.address}`;
  
  await Promise.all([
    drawQRCode(ctx, walletAddressWithPrefix, qr1X, qrY, QR_SIZE_PX),
    drawQRCode(ctx, crypto.gpgPublicKey, qr2X, qrY, GPG_QR_SIZE_PX),
  ]);

  // Draw currency icon in the center of the wallet address QR code
  await drawCryptoIconInQR(ctx, crypto.currency, qr1X, qrY, QR_SIZE_PX, 32);

  // Draw OpenPGP logo in the center of the GPG public key QR code
  await drawOpenPGPLogoInQR(ctx, qr2X, qrY, GPG_QR_SIZE_PX, 48);

  // QR Labels
  ctx.font = "bold 14px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("Wallet Address", qr1X + QR_SIZE_PX / 2, qrY - 20);
  ctx.fillText("GPG Public Key", qr2X + GPG_QR_SIZE_PX / 2, qrY - 20);

  // QR values below
  ctx.font = "10px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  
  // Display full wallet address with proper centered wrapping (with ticker prefix)
  const addr = walletAddressWithPrefix;
  const addrY = qrY + QR_SIZE_PX + 25;
  const addrMaxWidth = QR_SIZE_PX + 60;
  const addrCenterX = qr1X + QR_SIZE_PX / 2;
  const lineHeight = 12;
  
  // Split wallet address into chunks that fit (addresses don't have spaces, so we'll break by character groups)
  // For better readability, try to break at reasonable points (every ~20 chars or so)
  const addrLines: string[] = [];
  let currentLine = "";
  const charsPerLine = 20; // Approximate characters per line
  
  for (let i = 0; i < addr.length; i += charsPerLine) {
    const chunk = addr.slice(i, i + charsPerLine);
    const testLine = currentLine + chunk;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > addrMaxWidth && currentLine) {
      // Current line is too wide, save it and start new line
      addrLines.push(currentLine);
      currentLine = chunk;
    } else {
      currentLine = testLine;
    }
  }
  
  // Add remaining line
  if (currentLine) {
    addrLines.push(currentLine);
  }
  
  // Draw wallet address lines centered
  let addrLineY = addrY;
  for (const line of addrLines) {
    ctx.fillText(line, addrCenterX, addrLineY, addrMaxWidth);
    addrLineY += lineHeight;
  }
  
  // Private Key QR Code below Wallet Address
  const privateKeyQrY = addrLineY + 50; // Increased spacing after address text
  const privateKeyQrX = qr1X; // Same x position as wallet address
  
  // Draw private key QR code background
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;
  ctx.fillRect(privateKeyQrX - 10, privateKeyQrY - 10, QR_SIZE_PX + 20, QR_SIZE_PX + 20);
  ctx.strokeRect(privateKeyQrX - 10, privateKeyQrY - 10, QR_SIZE_PX + 20, QR_SIZE_PX + 20);
  
  // Draw private key QR code
  await drawQRCode(ctx, crypto.privateKey, privateKeyQrX, privateKeyQrY, QR_SIZE_PX);
  
  // Draw currency icon in the center of the private key QR code
  await drawCryptoIconInQR(ctx, crypto.currency, privateKeyQrX, privateKeyQrY, QR_SIZE_PX, 32);
  
  // Private Key QR Code label
  ctx.font = "bold 14px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("Private Key", privateKeyQrX + QR_SIZE_PX / 2, privateKeyQrY - 20);
  
  // "source" text below private key QR code
  ctx.font = "10px monospace";
  ctx.fillStyle = "#666666";
  ctx.textAlign = "center";
  ctx.fillText("source", privateKeyQrX + QR_SIZE_PX / 2, privateKeyQrY + QR_SIZE_PX + 20);
  
  // Display full fingerprint with proper centered wrapping
  const fingerprint = crypto.keyFingerprint;
  const fingerprintY = qrY + GPG_QR_SIZE_PX + 25;
  const fingerprintMaxWidth = GPG_QR_SIZE_PX + 60;
  const fingerprintCenterX = qr2X + GPG_QR_SIZE_PX / 2;
  
  // Set smaller font for fingerprint
  ctx.font = "9px monospace";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  
  // Split fingerprint by spaces and build lines that fit
  const fingerprintWords = fingerprint.split(" ");
  const fingerprintLines: string[] = [];
  let currentFingerprintLine = "";
  
  for (let i = 0; i < fingerprintWords.length; i++) {
    const testLine = currentFingerprintLine + (currentFingerprintLine ? " " : "") + fingerprintWords[i];
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > fingerprintMaxWidth && currentFingerprintLine) {
      // Current line is too wide, save it and start new line
      fingerprintLines.push(currentFingerprintLine);
      currentFingerprintLine = fingerprintWords[i];
    } else {
      currentFingerprintLine = testLine;
    }
  }
  
  // Add remaining line
  if (currentFingerprintLine) {
    fingerprintLines.push(currentFingerprintLine);
  }
  
  // Draw each fingerprint line centered (with smaller line height for smaller font)
  const fingerprintLineHeight = 11; // Line height for 9px font
  let fingerprintLineY = fingerprintY;
  for (const line of fingerprintLines) {
    ctx.fillText(line, fingerprintCenterX, fingerprintLineY, fingerprintMaxWidth);
    fingerprintLineY += fingerprintLineHeight;
  }

  // Calculate the bottom position of all sections and use the lowest one
  // Wallet address ends at: qrY + QR_SIZE_PX + 25 + (number of lines * lineHeight)
  // Private key QR code ends at: privateKeyQrY + QR_SIZE_PX + 20 (for "source" text) + 15 (spacing)
  // Fingerprint ends at: qrY + GPG_QR_SIZE_PX + 25 + (number of lines * fingerprintLineHeight) + spacing
  const addrBottom = qrY + QR_SIZE_PX + 25 + (addrLines.length > 0 ? addrLines.length * lineHeight : lineHeight);
  const privateKeyQrBottom = privateKeyQrY + QR_SIZE_PX + 20 + 15; // QR code + "source" text + spacing
  const fingerprintBottom = qrY + GPG_QR_SIZE_PX + 25 + (fingerprintLines.length > 0 ? fingerprintLines.length * fingerprintLineHeight : fingerprintLineHeight) + 15;
  y = Math.max(addrBottom, privateKeyQrBottom, fingerprintBottom);

  // Horizontal line
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(EXPORT_WIDTH_PX - PADDING, y);
  ctx.stroke();

  y += 30;
  ctx.textAlign = "left";

  const contentWidth = EXPORT_WIDTH_PX - PADDING * 2;

  // Get currency ticker symbol (lowercase)
  const currencyTicker = crypto.currency.toLowerCase();

  // Draw Public Key with currency ticker prefix (replacing Address line)
  y = drawSection(ctx, "Public Key:", `${currencyTicker}://${crypto.cryptoPublicKey}`, PADDING, y, contentWidth);
  y = drawSection(ctx, `Private Key (${crypto.derivationPath}):`, `${currencyTicker}://${crypto.privateKey}`, PADDING, y, contentWidth, true);
  
  // Display mnemonic seed phrase if available
  if (crypto.mnemonic) {
    y = drawSection(ctx, "Mnemonic Seed Phrase:", crypto.mnemonic, PADDING, y, contentWidth, true);
  }
  
  // Add separator before GPG cards
  y += 10;
  
  // GPG keys as side-by-side card-style panels
  y = drawSideBySideCards(
    ctx,
    "GPG Public Key",
    crypto.gpgPublicKey,
    false,
    "GPG Private Key",
    crypto.gpgPrivateKey,
    true,
    PADDING,
    y,
    contentWidth
  );

  // Warning box
  y += 10;
  const warningHeight = 60;
  ctx.fillStyle = "#fff3cd";
  ctx.fillRect(PADDING, y, contentWidth, warningHeight);
  ctx.strokeStyle = "#ffc107";
  ctx.lineWidth = 1;
  ctx.strokeRect(PADDING, y, contentWidth, warningHeight);

  ctx.font = "bold 12px monospace";
  ctx.fillStyle = "#856404";
  ctx.textAlign = "center";
  ctx.fillText("!! WARNING !!", EXPORT_WIDTH_PX / 2, y + 22);

  ctx.font = "11px monospace";
  ctx.fillText(
    "Keep this backup secure and private! Never share your private keys with anyone.",
    EXPORT_WIDTH_PX / 2,
    y + 42
  );

  // Website URL in upper left corner, oriented regularly
  ctx.font = "10px monospace";
  ctx.fillStyle = "#666666";
  ctx.textAlign = "left";
  const websiteText = "https://greenfire.io";
  const websiteX = PADDING;
  const websiteY = PADDING + 20; // Upper left, same height as date
  ctx.fillText(websiteText, websiteX, websiteY);

  // Resize canvas to actual content height
  const finalHeight = y + warningHeight + PADDING;
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = EXPORT_WIDTH_PX * scale;
  finalCanvas.height = finalHeight * scale;

  const finalCtx = finalCanvas.getContext("2d");
  if (!finalCtx) throw new Error("Could not get final canvas context");

  finalCtx.drawImage(
    canvas,
    0, 0, EXPORT_WIDTH_PX * scale, finalHeight * scale,
    0, 0, EXPORT_WIDTH_PX * scale, finalHeight * scale
  );

  return finalCanvas;
}

export async function exportCryptoAsPNG(crypto: ExportCryptoAddress) {
  const canvas = await captureExportCanvas(crypto, { scale: 2 });
  const link = document.createElement("a");
  link.download = generateIndividualCryptoFilename(crypto.currency, crypto.address, "png");
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function exportCryptoAsPDF(crypto: ExportCryptoAddress) {
  const canvas = await captureExportCanvas(crypto, { scale: 2 });

  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 width in mm
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

  // Add selectable text overlay
  const scale = 2; // Same scale used in canvas
  const canvasLogicalHeight = canvas.height / scale;
  
  // Convert canvas pixel coordinates to PDF mm coordinates
  const pxToMmX = (px: number) => (px / EXPORT_WIDTH_PX) * pageWidth;
  const pxToMmY = (py: number) => (py / canvasLogicalHeight) * imgHeight;
  
  // Set text color to match background (white) so it's invisible but still selectable
  pdf.setTextColor(255, 255, 255);
  
  // Helper to add text at canvas positions
  const addText = (text: string, x: number, y: number, fontSize: number, align: 'left' | 'center' | 'right' = 'left') => {
    pdf.setFontSize(fontSize * 0.3528); // Convert px to pt
    const mmX = pxToMmX(x);
    const mmY = pxToMmY(y);
    pdf.text(text, mmX, mmY, { align, baseline: 'alphabetic' });
  };

  // Get currency ticker
  const currencyTicker = crypto.currency.toLowerCase();

  // Add wallet address (below first QR code)
  const totalQrWidth = QR_SIZE_PX + GPG_QR_SIZE_PX + 80;
  const qrStartX = (EXPORT_WIDTH_PX - totalQrWidth) / 2;
  const qr1X = qrStartX;
  const qrY = PADDING + 80;
  const addrY = qrY + QR_SIZE_PX + 25;
  const walletAddressWithPrefix = `${currencyTicker}://${crypto.address}`;
  addText(walletAddressWithPrefix, qr1X + QR_SIZE_PX / 2, addrY, 10, 'center');

  // Add key fingerprint (below GPG QR code)
  const qr2X = qr1X + QR_SIZE_PX + 80;
  const fingerprintY = qrY + GPG_QR_SIZE_PX + 25;
  addText(crypto.keyFingerprint, qr2X + GPG_QR_SIZE_PX / 2, fingerprintY, 9, 'center');

  // Calculate y position after QR codes section
  const addrLines = Math.ceil(walletAddressWithPrefix.length / 20);
  const fingerprintLines = Math.ceil(crypto.keyFingerprint.split(" ").length / 4);
  const addrBottom = qrY + QR_SIZE_PX + 25 + addrLines * 12;
  
  // Private Key QR Code section
  const privateKeyQrY = addrBottom + 50;
  
  // Add sections text
  let y = Math.max(fingerprintY + fingerprintLines * 11, privateKeyQrY + QR_SIZE_PX + 20) + 30;
  
  // Public Key
  addText(`Public Key:`, PADDING, y, 12, 'left');
  y += 16;
  addText(`${currencyTicker}://${crypto.cryptoPublicKey}`, PADDING + 8, y + 11, 11, 'left');
  y += 50;
  
  // Private Key
  addText(`Private Key (${crypto.derivationPath}):`, PADDING, y, 12, 'left');
  y += 16;
  addText(`${currencyTicker}://${crypto.privateKey}`, PADDING + 8, y + 11, 11, 'left');
  y += 50;
  
  // Mnemonic Seed Phrase if available
  if (crypto.mnemonic) {
    addText("Mnemonic Seed Phrase:", PADDING, y, 12, 'left');
    y += 16;
    addText(crypto.mnemonic, PADDING + 8, y + 11, 11, 'left');
    y += 50;
  }
  
  // GPG Public Key
  y += 10;
  addText("GPG Public Key", PADDING + 15, y + 20, 11, 'left');
  y += 40;
  addText(crypto.gpgPublicKey, PADDING + 15, y, 7, 'left');
  
  // GPG Private Key (right side)
  const rightX = PADDING + (EXPORT_WIDTH_PX - PADDING * 2) / 2 + 15;
  addText("GPG Private Key", rightX, y - 40 + 20, 11, 'left');
  addText(crypto.gpgPrivateKey, rightX, y, 7, 'left');

  pdf.save(generateIndividualCryptoFilename(crypto.currency, crypto.address, "pdf"));
}


