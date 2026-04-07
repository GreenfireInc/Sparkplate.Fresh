import QRCode from 'qrcode';
import type { Contact } from '../../../services/contactService';
import type { Wallet } from '../../../services/walletService';

/**
 * Generates a vCard (vcf) string from a contact
 */
export function generateVCard(contact: Contact, wallets: Wallet[] = []): string {
  const vcard: string[] = [];
  
  // Start vCard
  vcard.push('BEGIN:VCARD');
  vcard.push('VERSION:3.0');
  
  // Name
  vcard.push(`FN:${escapeVCardValue(contact.firstname)} ${escapeVCardValue(contact.lastname)}`);
  vcard.push(`N:${escapeVCardValue(contact.lastname)};${escapeVCardValue(contact.firstname)};;;`);
  
  // Organization/Company
  if (contact.company) {
    vcard.push(`ORG:${escapeVCardValue(contact.company)}`);
  }
  
  // Email
  if (contact.email) {
    vcard.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(contact.email)}`);
  }
  
  // Phone
  if (contact.phone) {
    const phoneNumbers = contact.phone.split(',').map(p => p.trim());
    phoneNumbers.forEach(phone => {
      vcard.push(`TEL;TYPE=CELL:${escapeVCardValue(phone)}`);
    });
  }
  
  // Website
  if (contact.website) {
    vcard.push(`URL:${escapeVCardValue(contact.website)}`);
  }
  
  // Social Media URLs
  if (contact.twitter) {
    const twitterUrl = contact.twitter.startsWith('http') 
      ? contact.twitter 
      : `https://twitter.com/${contact.twitter.replace('@', '')}`;
    vcard.push(`X-SOCIALPROFILE;TYPE=twitter:${escapeVCardValue(twitterUrl)}`);
  }
  
  if (contact.linkedin) {
    const linkedinUrl = contact.linkedin.startsWith('http')
      ? contact.linkedin
      : `https://linkedin.com/in/${contact.linkedin}`;
    vcard.push(`X-SOCIALPROFILE;TYPE=linkedin:${escapeVCardValue(linkedinUrl)}`);
  }
  
  if (contact.instagram) {
    const instagramUrl = contact.instagram.startsWith('http')
      ? contact.instagram
      : `https://instagram.com/${contact.instagram.replace('@', '')}`;
    vcard.push(`X-SOCIALPROFILE;TYPE=instagram:${escapeVCardValue(instagramUrl)}`);
  }
  
  if (contact.facebook) {
    const facebookUrl = contact.facebook.startsWith('http')
      ? contact.facebook
      : `https://facebook.com/${contact.facebook}`;
    vcard.push(`X-SOCIALPROFILE;TYPE=facebook:${escapeVCardValue(facebookUrl)}`);
  }
  
  // Notes
  if (contact.notes) {
    vcard.push(`NOTE:${escapeVCardValue(contact.notes)}`);
  }
  
  // Wallet addresses - add as custom fields
  if (wallets.length > 0) {
    wallets.forEach((wallet, index) => {
      const walletUri = `${wallet.coinTicker.toLowerCase()}://${wallet.address}`;
      vcard.push(`X-CRYPTOCURRENCY-${index + 1};TYPE=${wallet.coinTicker}:${escapeVCardValue(walletUri)}`);
      
      if (wallet.keyFingerprint) {
        vcard.push(`X-CRYPTO-FINGERPRINT-${index + 1};TYPE=${wallet.coinTicker}:${escapeVCardValue(wallet.keyFingerprint)}`);
      }
    });
  }
  
  // End vCard
  vcard.push('END:VCARD');
  
  return vcard.join('\r\n');
}

/**
 * Escapes special characters in vCard values
 */
function escapeVCardValue(value: string): string {
  if (!value) return '';
  
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

/**
 * Generates a QR code data URL from vCard string
 */
export async function generateQRCodeDataUrl(vcard: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(vcard, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generates a QR code data URL directly from a contact
 */
export async function generateContactQRCode(
  contact: Contact, 
  wallets: Wallet[] = []
): Promise<string> {
  const vcard = generateVCard(contact, wallets);
  return generateQRCodeDataUrl(vcard);
}




