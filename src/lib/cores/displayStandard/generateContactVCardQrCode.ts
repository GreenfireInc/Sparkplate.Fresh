import QRCode from 'qrcode'
import type { Contact } from '@/services/addressBook/contactService'
import type { Wallet } from '@/services/addressBook/walletService'

/**
 * Generates a vCard (vcf) string from a contact
 */
export function generateVCard(contact: Contact, wallets: Wallet[] = []): string {
  const vcard: string[] = []

  vcard.push('BEGIN:VCARD')
  vcard.push('VERSION:3.0')

  vcard.push(`FN:${escapeVCardValue(contact.firstname)} ${escapeVCardValue(contact.lastname)}`)
  vcard.push(`N:${escapeVCardValue(contact.lastname)};${escapeVCardValue(contact.firstname)};;;`)

  if (contact.company) {
    vcard.push(`ORG:${escapeVCardValue(contact.company)}`)
  }

  if (contact.email) {
    vcard.push(`EMAIL;TYPE=INTERNET:${escapeVCardValue(contact.email)}`)
  }

  if (contact.phone) {
    const phoneNumbers = contact.phone.split(',').map((p) => p.trim())
    phoneNumbers.forEach((phone) => {
      vcard.push(`TEL;TYPE=CELL:${escapeVCardValue(phone)}`)
    })
  }

  if (contact.website) {
    vcard.push(`URL:${escapeVCardValue(contact.website)}`)
  }

  if (contact.twitter) {
    const twitterUrl = contact.twitter.startsWith('http')
      ? contact.twitter
      : `https://twitter.com/${contact.twitter.replace('@', '')}`
    vcard.push(`X-SOCIALPROFILE;TYPE=twitter:${escapeVCardValue(twitterUrl)}`)
  }

  if (contact.linkedin) {
    const linkedinUrl = contact.linkedin.startsWith('http')
      ? contact.linkedin
      : `https://linkedin.com/in/${contact.linkedin}`
    vcard.push(`X-SOCIALPROFILE;TYPE=linkedin:${escapeVCardValue(linkedinUrl)}`)
  }

  if (contact.instagram) {
    const instagramUrl = contact.instagram.startsWith('http')
      ? contact.instagram
      : `https://instagram.com/${contact.instagram.replace('@', '')}`
    vcard.push(`X-SOCIALPROFILE;TYPE=instagram:${escapeVCardValue(instagramUrl)}`)
  }

  if (contact.facebook) {
    const facebookUrl = contact.facebook.startsWith('http')
      ? contact.facebook
      : `https://facebook.com/${contact.facebook}`
    vcard.push(`X-SOCIALPROFILE;TYPE=facebook:${escapeVCardValue(facebookUrl)}`)
  }

  if (contact.notes) {
    vcard.push(`NOTE:${escapeVCardValue(contact.notes)}`)
  }

  if (wallets.length > 0) {
    wallets.forEach((wallet, index) => {
      const walletUri = `${wallet.coinTicker.toLowerCase()}://${wallet.address}`
      vcard.push(`X-CRYPTOCURRENCY-${index + 1};TYPE=${wallet.coinTicker}:${escapeVCardValue(walletUri)}`)

      if (wallet.keyFingerprint) {
        vcard.push(`X-CRYPTO-FINGERPRINT-${index + 1};TYPE=${wallet.coinTicker}:${escapeVCardValue(wallet.keyFingerprint)}`)
      }
    })
  }

  vcard.push('END:VCARD')

  return vcard.join('\r\n')
}

function escapeVCardValue(value: string): string {
  if (!value) return ''

  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
}

export async function generateQRCodeDataUrl(vcard: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(vcard, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
    return dataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

export async function generateContactQRCode(
  contact: Contact,
  wallets: Wallet[] = [],
): Promise<string> {
  const vcard = generateVCard(contact, wallets)
  return generateQRCodeDataUrl(vcard)
}
