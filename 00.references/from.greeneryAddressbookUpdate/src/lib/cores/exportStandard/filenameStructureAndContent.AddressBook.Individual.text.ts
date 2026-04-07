/**
 * AddressBook Individual Contact Text Exports (VCF/JSON/CSV/TXT/ODS/MD)
 *
 * This module centralizes the "individual contact" export formats (non-visual).
 * It pairs well with `filenameStructureAndContent.AddressBook.Individual.qrCode.ts`.
 */

import * as XLSX from 'xlsx';
import Papa from 'papaparse';

import { generateVCard } from '../displayStandard/generateContactVCardQrCode';
import type { Contact } from '../../../services/contactService';
import type { Wallet } from '../../../services/walletService';

// Project name from package.json: "greenery.addressbook" -> "greeneryaddressbook"
const PROJECT_NAME = 'greeneryaddressbook';

export interface IndividualContactFilenameParams {
  extension: 'vcf' | 'json' | 'csv' | 'txt' | 'ods' | 'md';
  contactName: string;
  projectName?: string;
}

export interface IndividualContactExportData {
  contact: Contact;
  wallets?: Wallet[];
}

export function generateIndividualContactFilename(params: IndividualContactFilenameParams): string {
  const { extension, contactName, projectName = PROJECT_NAME } = params;

  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const date = `${yyyy}${mm}${dd}`;

  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const time = `${hh}${mi}${ss}`;

  const sanitized = contactName.replace(/[^a-zA-Z0-9_]/g, '_');
  return `${projectName}.${date}.${time}.contact.${sanitized}.${extension}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Delay revoke to avoid Safari issues
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function walletAddressPayload(wallet: Wallet): string {
  const ticker = (wallet.coinTicker || '').toLowerCase().trim();
  if (!ticker) return wallet.address || '';
  return `${ticker}://${wallet.address}`;
}

function getContactDisplayName(contact: Contact): string {
  const first = (contact.firstname || '').trim();
  const last = (contact.lastname || '').trim();
  return [first, last].filter(Boolean).join('_') || 'contact';
}

function flattenContactForRow(data: IndividualContactExportData) {
  const c = data.contact;
  const wallets = data.wallets ?? [];

  return {
    firstname: c.firstname ?? '',
    lastname: c.lastname ?? '',
    relationship: c.relationship ?? '',
    phone: c.phone ?? '',
    email: c.email ?? '',
    company: c.company ?? '',
    notes: c.notes ?? '',
    website: (c as any).website ?? '',
    twitter: (c as any).twitter ?? '',
    linkedin: (c as any).linkedin ?? '',
    instagram: (c as any).instagram ?? '',
    bluesky: (c as any).bluesky ?? '',
    telegram: (c as any).telegram ?? '',
    walletAddresses: wallets.map(walletAddressPayload).join(', '),
    cryptoPublicKeys: wallets.map(w => w.cryptoPublicKey || '').filter(Boolean).join(', '),
    gpgFingerprints: wallets.map(w => w.keyFingerprint || '').filter(Boolean).join(', '),
    gpgPublicKeys: wallets.map(w => w.gpgPublicKey || '').filter(Boolean).join(', ')
  };
}

export async function exportIndividualContactAsVCF(data: IndividualContactExportData) {
  const wallets = data.wallets ?? [];
  const vcf = generateVCard(data.contact, wallets);
  const filename = generateIndividualContactFilename({
    extension: 'vcf',
    contactName: getContactDisplayName(data.contact),
  });
  downloadBlob(new Blob([vcf], { type: 'text/vcard;charset=utf-8' }), filename);
}

export async function exportIndividualContactAsJSON(data: IndividualContactExportData) {
  const payload = {
    contact: data.contact,
    wallets: data.wallets ?? []
  };
  const json = JSON.stringify(payload, null, 2);
  const filename = generateIndividualContactFilename({
    extension: 'json',
    contactName: getContactDisplayName(data.contact),
  });
  downloadBlob(new Blob([json], { type: 'application/json;charset=utf-8' }), filename);
}

export async function exportIndividualContactAsCSV(data: IndividualContactExportData) {
  const row = flattenContactForRow(data);
  const csv = Papa.unparse([row]);
  const filename = generateIndividualContactFilename({
    extension: 'csv',
    contactName: getContactDisplayName(data.contact),
  });
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), filename);
}

export async function exportIndividualContactAsTXT(data: IndividualContactExportData) {
  const c = data.contact;
  const wallets = data.wallets ?? [];

  const lines: string[] = [];
  lines.push(`Name: ${(c.firstname || '').trim()} ${(c.lastname || '').trim()}`.trim());
  if (c.relationship) lines.push(`Relationship: ${c.relationship}`);
  if (c.phone) lines.push(`Phone: ${c.phone}`);
  if (c.email) lines.push(`Email: ${c.email}`);
  if (c.company) lines.push(`Company: ${c.company}`);
  if ((c as any).website) lines.push(`Website: ${(c as any).website}`);
  if ((c as any).bluesky) lines.push(`Bluesky: ${(c as any).bluesky}`);
  if ((c as any).telegram) lines.push(`Telegram: ${(c as any).telegram}`);
  if (c.notes) lines.push(`Notes: ${c.notes}`);

  if (wallets.length) {
    lines.push('');
    lines.push('Wallets:');
    for (const w of wallets) {
      lines.push(`- ${walletAddressPayload(w)}`);
      if (w.cryptoPublicKey) lines.push(`  cryptoPublicKey: ${w.cryptoPublicKey}`);
      if (w.keyFingerprint) lines.push(`  keyFingerprint: ${w.keyFingerprint}`);
      if (w.gpgPublicKey) lines.push(`  gpgPublicKey: ${w.gpgPublicKey.replace(/\n/g, '\\n')}`);
    }
  }

  const txt = lines.join('\n');
  const filename = generateIndividualContactFilename({
    extension: 'txt',
    contactName: getContactDisplayName(data.contact),
  });
  downloadBlob(new Blob([txt], { type: 'text/plain;charset=utf-8' }), filename);
}

export async function exportIndividualContactAsMD(data: IndividualContactExportData) {
  const c = data.contact;
  const wallets = data.wallets ?? [];

  const title = `${(c.firstname || '').trim()} ${(c.lastname || '').trim()}`.trim() || 'Contact';
  const rel = c.relationship ? ` (${c.relationship})` : '';

  const md: string[] = [];
  md.push(`# ${title}${rel}`);
  md.push('');
  md.push(`- **Phone**: ${c.phone || '—'}`);
  md.push(`- **Email**: ${c.email || '—'}`);
  md.push(`- **Company**: ${c.company || '—'}`);
  md.push(`- **Website**: ${(c as any).website || '—'}`);
  md.push(`- **Bluesky**: ${(c as any).bluesky || '—'}`);
  md.push(`- **Telegram**: ${(c as any).telegram || '—'}`);
  md.push('');

  if (c.notes) {
    md.push('## Notes');
    md.push('');
    md.push(c.notes);
    md.push('');
  }

  md.push('## Wallets');
  md.push('');
  if (!wallets.length) {
    md.push('_None_');
  } else {
    md.push('| Ticker | Address | cryptoPublicKey | keyFingerprint | gpgPublicKey |');
    md.push('|---|---|---|---|---|');
    for (const w of wallets) {
      md.push(
        `| ${(w.coinTicker || '').toUpperCase()} | ${walletAddressPayload(w)} | ${w.cryptoPublicKey || '—'} | ${w.keyFingerprint || '—'} | ${w.gpgPublicKey ? 'YES' : '—'} |`
      );
    }
  }
  md.push('');

  const filename = generateIndividualContactFilename({
    extension: 'md',
    contactName: getContactDisplayName(data.contact),
  });
  downloadBlob(new Blob([md.join('\n')], { type: 'text/markdown;charset=utf-8' }), filename);
}

export async function exportIndividualContactAsODS(data: IndividualContactExportData) {
  const c = data.contact;
  const wallets = data.wallets ?? [];

  const wb = XLSX.utils.book_new();

  const contactSheet = XLSX.utils.json_to_sheet([flattenContactForRow({ contact: c, wallets })]);
  XLSX.utils.book_append_sheet(wb, contactSheet, 'Contact');

  const walletsSheet = XLSX.utils.json_to_sheet(
    wallets.map(w => ({
      coinTicker: w.coinTicker || '',
      address: w.address || '',
      addressWithPrefix: walletAddressPayload(w),
      cryptoPublicKey: w.cryptoPublicKey || '',
      keyFingerprint: w.keyFingerprint || '',
      gpgPublicKey: w.gpgPublicKey || '',
    }))
  );
  XLSX.utils.book_append_sheet(wb, walletsSheet, 'Wallets');

  const filename = generateIndividualContactFilename({
    extension: 'ods',
    contactName: getContactDisplayName(data.contact),
  });

  // `writeFile` triggers a browser download
  XLSX.writeFile(wb, filename, { bookType: 'ods' });
}


