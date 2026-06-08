import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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
 * National designated postal operator and postal code schema per MIKTA member state.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const MIKTA_DOMESTIC_POST_SERVICES: Record<MiktaMemberIsoCode, DomesticPostService> = {
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
  KR: post(
    'Korea Post',
    'https://www.koreapost.go.kr/',
    'help@koreapost.go.kr',
    'https://x.com/koreapost',
    'https://www.instagram.com/koreapost/',
    'https://www.linkedin.com/company/korea-post/',
    '',
    'NNNNN',
    '^\\d{5}$',
    '04524',
    'Five-digit postcode (reformed 2015)',
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
  AU: post(
    'Australia Post',
    'https://auspost.com.au/',
    'feedback@auspost.com.au',
    'https://x.com/AusPost',
    'https://www.instagram.com/auspost/',
    'https://www.linkedin.com/company/australia-post/',
    'https://developers.auspost.com.au/',
    'NNNN',
    '^\\d{4}$',
    '2000',
    'Four-digit postcode',
  ),
}
