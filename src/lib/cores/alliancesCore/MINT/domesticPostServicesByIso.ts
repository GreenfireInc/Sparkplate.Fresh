import type { MintMemberIsoCode } from './mintMemberIsoCodes'
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
 * National designated postal operator and postal code schema per MINT member state.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const MINT_DOMESTIC_POST_SERVICES: Record<MintMemberIsoCode, DomesticPostService> = {
  MX: post(
    'Correos de México',
    'https://www.correosdemexico.gob.mx/',
    'atencionaclientes@correosdemexico.gob.mx',
    'https://x.com/CorreosdeMexico',
    'https://www.instagram.com/correosdemexico/',
    'https://www.linkedin.com/company/correos-de-mexico/',
    '',
    'NNNNN',
    '^\\d{5}$',
    '06000',
    'Five-digit código postal',
  ),
  ID: post(
    'Pos Indonesia',
    'https://www.posindonesia.co.id/',
    'pusatbantuan@posindonesia.co.id',
    'https://x.com/PosIndonesia',
    'https://www.instagram.com/posindonesia/',
    'https://www.linkedin.com/company/pos-indonesia/',
    '',
    'NNNNN',
    '^\\d{5}$',
    '10110',
    'Five-digit postcode',
  ),
  NG: post(
    'Nigeria Postal Service (NIPOST)',
    'http://nipost.gov.ng/',
    'info@nipost.gov.ng',
    'https://x.com/e_nipost',
    'https://www.instagram.com/e_nipost/',
    'https://www.linkedin.com/company/nipost/',
    '',
    'NNNNNN',
    '^\\\\d{6}$',
    '100001',
    'Six-digit postcode (state + LGA + delivery)',
  ),
  TR: post(
    'PTT (Türkiye Post)',
    'https://www.ptt.gov.tr/',
    'info@ptt.gov.tr',
    'https://x.com/PTT',
    'https://www.instagram.com/ptt/',
    'https://www.linkedin.com/company/ptt/',
    '',
    'NNNNN',
    '^\\d{5}$',
    '06100',
    'Five-digit postcode',
  ),
}
