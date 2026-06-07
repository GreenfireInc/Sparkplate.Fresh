import type { AmuMemberIsoCode } from './amuMemberIsoCodes'
import type { DomesticPostService } from './types'

function post(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  apiEndpoint: string,
  format: string,
  pattern: string,
  example: string,
  notes: string,
): DomesticPostService {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    postalCodeSchema: { format, pattern, example, notes },
  }
}

/**
 * National designated postal operator and postal code schema per AMU founding member.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AMU_DOMESTIC_POST_SERVICES: Record<AmuMemberIsoCode, DomesticPostService> = {
  DZ: post(
    'Algérie Poste',
    'https://www.poste.dz/',
    'contact@poste.dz',
    'https://x.com/AlgPoste',
    'https://www.instagram.com/postealgerie/',
    'https://www.linkedin.com/company/algerie-poste/',
    '',
    'NNNNN',
    '^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\d{5}$',
    '16000',
    'Five-digit postcode (wilaya + delivery area)',
  ),
  LY: post(
    'Libyan Post Company',
    'http://nlpc.ly/',
    'info@nlpc.ly',
    '',
    '',
    'https://www.linkedin.com/company/libyan-post/',
    '',
    'none',
    '',
    '',
    'No consistent national postcode published; verify locally',
  ),
  MR: post(
    'Mauripost (Société mauritanienne des postes)',
    'https://www.mauripost.mr/',
    'contact@mauripost.mr',
    '',
    '',
    '',
    '',
    'none',
    '',
    '',
    'No national postcode system',
  ),
  MA: post(
    'Barid Al-Maghrib',
    'https://www.barid.ma/',
    'webmaster@barid.ma',
    'https://x.com/PosteMaroc',
    'https://www.instagram.com/baridalma_',
    'https://www.linkedin.com/company/barid-al-maghrib/',
    '',
    'NNNNN',
    '^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\d{5}$',
    '20000',
    'Five-digit postcode',
  ),
  TN: post(
    'Rapid-Poste (La Poste Tunisia)',
    'https://www.pos.tn/',
    'contact@rapidpost.com.tn',
    'https://x.com/RapidposteTN',
    'https://www.instagram.com/rapidpostenetunisienne/',
    'https://www.linkedin.com/company/la-poste-tunisienne/',
    '',
    'NNNN',
    '^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\d{4}$',
    '1000',
    'Four-digit postcode',
  ),
}
