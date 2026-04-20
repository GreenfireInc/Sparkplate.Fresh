/**
 * AddressBook Individual Contact QR Export (PNG/PDF)
 *
 * Target export dimensions: 1600 x 2326
 *
 * Layout:
 * - Main: vCard as QR code
 * - Line 1: "First, Last (Relationship)"
 * - Line 2: "Phone, Email"
 * - Line 3: first 2 wallet addresses as QR codes (with crypto logo overlay)
 * - Line 4: next 2 wallet addresses as QR codes (with crypto logo overlay)
 * - End: first 2 GPG public keys as QR codes (with crypto logo overlay)
 */

import type { Contact } from '@/services/addressBook/contactService'
import type { Wallet } from '@/services/addressBook/walletService'

const PROJECT_NAME = 'sparkplate'

const EXPORT_WIDTH_PX = 1600;
const EXPORT_HEIGHT_PX = 2326;

const PADDING = 60;

const MAIN_QR_SIZE_PX = 720;
const GRID_QR_SIZE_PX = 280;
const GRID_GAP_X = 140;
const GRID_GAP_Y = 120;

export interface QRCodeFilenameParams {
  extension: string;
  contactName: string;
  projectName?: string;
}

export interface ContactQRCodeExportData {
  contact: Contact;
  wallets?: Wallet[];
  vcardText: string;
  qrCodeDataUrl: string;
}

/**
 * Generates a filename for Contact QR Code exports
 * @param params - Filename parameters
 * @returns Formatted filename string
 */
export function generateContactQRCodeFilename(params: QRCodeFilenameParams): string {
  const {
    extension,
    contactName,
    projectName = PROJECT_NAME
  } = params;

  const now = new Date();
  
  // Format date as YYYYMMDD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const date = `${year}${month}${day}`;
  
  // Format time as HHMMSS (24-hour format)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const time = `${hours}${minutes}${seconds}`;
  
  // Sanitize contact name for filename
  const sanitizedContactName = contactName.replace(/[^a-zA-Z0-9_]/g, '_');
  
  // Format: %projectName%.%date%.%time%.contact.%contactName%.%extension%
  return `${projectName}.${date}.${time}.contact.${sanitizedContactName}.${extension}`;
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
  return new Promise((resolve) => {
    const logoImage = new Image();
    logoImage.onerror = () => resolve();
    logoImage.src = "/assets/icons/greenfire/proper/greenfire.svg";
    logoImage.onload = () => {
      try {
        ctx.drawImage(logoImage, x, y, width, height);
      } finally {
        resolve();
      }
    };
  });
}

/**
 * Draw an existing QR code data URL onto the canvas.
 */
async function drawQRCodeImage(
  ctx: CanvasRenderingContext2D,
  qrCodeDataUrl: string,
  x: number,
  y: number,
  size: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const qrImage = new Image();
    qrImage.onerror = () => reject(new Error("Unable to load QR code image"));
    qrImage.src = qrCodeDataUrl;
    qrImage.onload = () => {
      ctx.drawImage(qrImage, x, y, size, size);
      resolve();
    };
  });
}

async function drawQRCode(
  ctx: CanvasRenderingContext2D,
  data: string,
  x: number,
  y: number,
  size: number
): Promise<void> {
  const QRCode = (await import('qrcode')).default;

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(data, { width: size, margin: 1 }, (err: Error | null | undefined, url: string) => {
      if (err) {
        reject(err);
        return;
      }
      const qrImage = new Image();
      qrImage.onerror = () => reject(new Error('Unable to load QR code image'));
      qrImage.src = url;
      qrImage.onload = () => {
        ctx.drawImage(qrImage, x, y, size, size);
        resolve();
      };
    });
  });
}

function getCryptoIconPath(currency: string): string {
  const normalized = currency.toLowerCase().trim();
  return `/assets/icons/crypto/${normalized}.svg`;
}

async function drawCryptoIconInQR(
  ctx: CanvasRenderingContext2D,
  currency: string,
  qrX: number,
  qrY: number,
  qrSize: number,
  iconSize: number
): Promise<void> {
  return new Promise((resolve) => {
    const iconImage = new Image();
    iconImage.onerror = () => resolve(); // silent fallback
    iconImage.src = getCryptoIconPath(currency);
    iconImage.onload = () => {
      const iconX = qrX + (qrSize - iconSize) / 2;
      const iconY = qrY + (qrSize - iconSize) / 2;

      // white rounded background behind icon (visibility)
      const pad = 6;
      const bgSize = iconSize + pad * 2;
      const bgX = qrX + (qrSize - bgSize) / 2;
      const bgY = qrY + (qrSize - bgSize) / 2;
      const r = 10;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(bgX + r, bgY);
      ctx.lineTo(bgX + bgSize - r, bgY);
      ctx.quadraticCurveTo(bgX + bgSize, bgY, bgX + bgSize, bgY + r);
      ctx.lineTo(bgX + bgSize, bgY + bgSize - r);
      ctx.quadraticCurveTo(bgX + bgSize, bgY + bgSize, bgX + bgSize - r, bgY + bgSize);
      ctx.lineTo(bgX + r, bgY + bgSize);
      ctx.quadraticCurveTo(bgX, bgY + bgSize, bgX, bgY + bgSize - r);
      ctx.lineTo(bgX, bgY + r);
      ctx.quadraticCurveTo(bgX, bgY, bgX + r, bgY);
      ctx.closePath();
      ctx.fill();

      ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
      resolve();
    };
  });
}

function formatLine1(contact: Contact): string {
  const first = (contact.firstname || '').trim();
  const last = (contact.lastname || '').trim();
  const rel = (contact.relationship || '').trim();

  const name = [first, last].filter(Boolean).join(', ');
  if (rel) return `${name} (${rel})`;
  return name;
}

function formatLine2(contact: Contact): string {
  const phone = (contact.phone || '').trim();
  const email = (contact.email || '').trim();
  return [phone, email].filter(Boolean).join(', ');
}

function walletAddressPayload(wallet: Wallet): string {
  const ticker = (wallet.coinTicker || '').toLowerCase().trim();
  if (!ticker) return wallet.address || '';
  return `${ticker}://${wallet.address}`;
}

/**
 * Create export canvas with fixed dimensions 1600 x 2326
 */
export async function captureContactQRCodeCanvas(
  data: ContactQRCodeExportData,
  opts?: { scale?: number }
): Promise<HTMLCanvasElement> {
  const scale = opts?.scale ?? 1; // keep final output at exactly 1600 x 2326 by default

  const canvas = document.createElement('canvas');
  canvas.width = EXPORT_WIDTH_PX * scale;
  canvas.height = EXPORT_HEIGHT_PX * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.scale(scale, scale);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, EXPORT_WIDTH_PX, EXPORT_HEIGHT_PX);

  // Branding (small, like keyForge exports)
  const logoBaseHeight = 70;
  const logoWidth = logoBaseHeight * (139.69 / 191.94);
  await drawGreenfireLogo(ctx, PADDING, PADDING, logoWidth, logoBaseHeight);

  ctx.font = '14px monospace';
  ctx.fillStyle = '#666666';
  ctx.textAlign = 'left';
  ctx.fillText('https://greenfire.io', PADDING, PADDING + 26);

  ctx.save();
  ctx.font = '14px monospace';
  ctx.fillStyle = '#666666';
  ctx.textAlign = 'left';
  ctx.translate(EXPORT_WIDTH_PX - PADDING, PADDING + 26);
  ctx.rotate(Math.PI / 2);
  ctx.fillText(`Generated: ${new Date().toLocaleString()}`, 0, 0);
  ctx.restore();

  const contact = data.contact;
  const wallets = data.wallets ?? [];

  // Main vCard QR
  const mainQrX = (EXPORT_WIDTH_PX - MAIN_QR_SIZE_PX) / 2;
  const mainQrY = 140;
  ctx.strokeStyle = '#dddddd';
  ctx.lineWidth = 2;
  ctx.strokeRect(mainQrX - 14, mainQrY - 14, MAIN_QR_SIZE_PX + 28, MAIN_QR_SIZE_PX + 28);
  await drawQRCodeImage(ctx, data.qrCodeDataUrl, mainQrX, mainQrY, MAIN_QR_SIZE_PX);

  // Line 1 / Line 2
  const line1Y = mainQrY + MAIN_QR_SIZE_PX + 90;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 46px monospace';
  ctx.fillText(formatLine1(contact), EXPORT_WIDTH_PX / 2, line1Y);

  ctx.font = '26px monospace';
  ctx.fillStyle = '#374151';
  ctx.fillText(formatLine2(contact), EXPORT_WIDTH_PX / 2, line1Y + 54);

  // Wallet address QR grid (first 4)
  const walletItems = wallets.slice(0, 4);
  const gridTotalWidth = GRID_QR_SIZE_PX * 2 + GRID_GAP_X;
  const gridLeftX = (EXPORT_WIDTH_PX - gridTotalWidth) / 2;

  const walletsGridStartY = line1Y + 120;
  for (const [idx, w] of walletItems.entries()) {
    const row = Math.floor(idx / 2);
    const col = idx % 2;

    const x = gridLeftX + col * (GRID_QR_SIZE_PX + GRID_GAP_X);
    const y = walletsGridStartY + row * (GRID_QR_SIZE_PX + GRID_GAP_Y);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 12, y - 12, GRID_QR_SIZE_PX + 24, GRID_QR_SIZE_PX + 24);

    await drawQRCode(ctx, walletAddressPayload(w), x, y, GRID_QR_SIZE_PX);
    await drawCryptoIconInQR(ctx, w.coinTicker, x, y, GRID_QR_SIZE_PX, 54);

    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.fillText((w.coinTicker || '').toUpperCase(), x + GRID_QR_SIZE_PX / 2, y + GRID_QR_SIZE_PX + 38);
  }

  // GPG public key QR (first 2 that exist)
  const gpgWallets = wallets.filter(w => !!w.gpgPublicKey).slice(0, 2);
  const gpgRowY = EXPORT_HEIGHT_PX - PADDING - GRID_QR_SIZE_PX - 70; // anchored near bottom

  for (const [idx, w] of gpgWallets.entries()) {
    const x = gridLeftX + idx * (GRID_QR_SIZE_PX + GRID_GAP_X);
    const y = gpgRowY;

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 12, y - 12, GRID_QR_SIZE_PX + 24, GRID_QR_SIZE_PX + 24);

    await drawQRCode(ctx, w.gpgPublicKey || '', x, y, GRID_QR_SIZE_PX);
    await drawCryptoIconInQR(ctx, w.coinTicker, x, y, GRID_QR_SIZE_PX, 54);

    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = '#111827';
    ctx.textAlign = 'center';
    ctx.fillText(`${(w.coinTicker || '').toUpperCase()} GPG PUBLIC KEY`, x + GRID_QR_SIZE_PX / 2, y - 26);
  }

  return canvas;
}

/**
 * Export contact QR code as PNG
 */
export async function exportContactQRCodeAsPNG(data: ContactQRCodeExportData) {
  const canvas = await captureContactQRCodeCanvas(data, { scale: 1 });
  const contactName = `${data.contact.firstname}_${data.contact.lastname}`;
  const link = document.createElement("a");
  link.download = generateContactQRCodeFilename({
    extension: "png",
    contactName
  });
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Export contact QR code as PDF
 * Uses browser's print dialog with A4 page size
 */
export async function exportContactQRCodeAsPDF(data: ContactQRCodeExportData) {
  const canvas = await captureContactQRCodeCanvas(data, { scale: 1 });
  const imgData = canvas.toDataURL("image/png");
  
  // Create a new window with the image and trigger print (user can save as PDF)
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download PDF');
    return;
  }

  // Use document.createElement to build HTML to avoid Vue template parser issues
  const doc = printWindow.document;
  doc.open();
  
  const htmlEl = doc.createElement('html');
  const headEl = doc.createElement('head');
  const titleEl = doc.createElement('title');
  const contactName = `${data.contact.firstname} ${data.contact.lastname}`;
  titleEl.textContent = contactName + ' - Contact QR Code';
  headEl.appendChild(titleEl);
  
  // A4 page size: 210mm x 297mm
  const styleEl = doc.createElement('style');
  // Force the image to fit *within a single page* (prevents a blank second page due to slight aspect ratio mismatch)
  styleEl.textContent = '@page { size: A4; margin: 0; } html, body { margin: 0; padding: 0; width: 210mm; height: 297mm; overflow: hidden; } body { display: flex; align-items: center; justify-content: center; } img { display: block; width: 210mm; height: 297mm; object-fit: contain; }';
  headEl.appendChild(styleEl);
  htmlEl.appendChild(headEl);
  
  const bodyEl = doc.createElement('body');
  const imgEl = doc.createElement('img');
  imgEl.src = imgData;
  imgEl.alt = 'Contact QR Code';
  bodyEl.appendChild(imgEl);
  
  const scriptEl = doc.createElement('script');
  scriptEl.textContent = 'window.onload = function() { window.print(); };';
  bodyEl.appendChild(scriptEl);
  
  htmlEl.appendChild(bodyEl);
  doc.appendChild(htmlEl);
  doc.close();
}
