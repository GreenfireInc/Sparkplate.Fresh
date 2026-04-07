/**
 * vCard / VCF contact import (plain file → parsed rows).
 * Used by the address-book add-entry flow and `useContactParser`.
 */

export interface ParsedVcfContact {
  firstname?: string
  lastname?: string
  email?: string
  company?: string
}

/**
 * Parse a .vcf / .vcard file into contact-shaped objects (same field extraction as legacy inline parser).
 */
export async function parseVcfContacts(file: File): Promise<ParsedVcfContact[]> {
  const text = await file.text()
  const lines = text.split('\n')
  const contacts: ParsedVcfContact[] = []
  let contact: ParsedVcfContact = {}

  for (const line of lines) {
    if (line.startsWith('BEGIN:VCARD')) {
      contact = {}
    } else if (line.startsWith('END:VCARD')) {
      contacts.push(contact)
    } else if (line.startsWith('FN:')) {
      const nameParts = line.substring(3).split(' ')
      contact.firstname = nameParts[0] || ''
      contact.lastname = nameParts.slice(1).join(' ') || ''
    } else if (line.startsWith('EMAIL:')) {
      contact.email = line.substring(6)
    } else if (line.startsWith('ORG:')) {
      contact.company = line.substring(4)
    }
  }

  return contacts
}
