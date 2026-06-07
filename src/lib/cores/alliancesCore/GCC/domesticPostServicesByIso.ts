import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
 * National designated postal operator and postal code schema per GCC member state.
 * Informational; verify URLs, handles, schemas, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const GCC_DOMESTIC_POST_SERVICES: Record<GccMemberIsoCode, DomesticPostService> = {
  BH: post(
    'Bahrain Post',
    'https://www.bahrainpost.gov.bh/',
    'info@bahrainpost.gov.bh',
    'https://x.com/BahrainPost',
    'https://www.instagram.com/bahrainpost/',
    'https://www.linkedin.com/company/bahrain-post/',
    '',
    'NNNN',
    '^\\d{4}$',
    '317',
    'Three- or four-digit postcode',
  ),
  KW: post(
    'Kuwait Post',
    'https://www.kuwaitpost.com/',
    'info@kuwaitpost.com',
    'https://x.com/KuwaitPost',
    'https://www.instagram.com/kuwaitpost/',
    'https://www.linkedin.com/company/kuwait-post/',
    '',
    'NNNNN',
    '^\\d{5}$',
    '13001',
    'Five-digit postcode',
  ),
  OM: post(
    'Oman Post',
    'https://www.omanpost.om/',
    'info@omanpost.om',
    'https://x.com/OmanPost',
    'https://www.instagram.com/omanpost/',
    'https://www.linkedin.com/company/oman-post/',
    '',
    'NNN',
    '^\\d{3}$',
    '100',
    'Three-digit postcode',
  ),
  QA: post(
    'Qatar Post (Q-Post)',
    'https://www.qpost.com.qa/',
    'info@qpost.com.qa',
    'https://x.com/QatarPost',
    'https://www.instagram.com/qatarpost/',
    'https://www.linkedin.com/company/qatar-post/',
    '',
    'none',
    '',
    '',
    'No national street postcode; zone and building addressing',
  ),
  SA: post(
    'Saudi Post (SPL)',
    'https://splonline.com.sa/',
    'customercare@splonline.com.sa',
    'https://x.com/SPLCare',
    'https://www.instagram.com/splcare/',
    'https://www.linkedin.com/company/saudi-post/',
    '',
    'NNNNN',
    '^\\d{5}$',
    '11564',
    'Five-digit postcode (national addressing system)',
  ),
  AE: post(
    'Emirates Post Group',
    'https://www.epg.ae/',
    'info@epg.ae',
    'https://x.com/EmiratesPost',
    'https://www.instagram.com/emiratespost/',
    'https://www.linkedin.com/company/emirates-post-group/',
    '',
    'none',
    '',
    '',
    'No national postcode; Makani / building addressing in UAE',
  ),
}
