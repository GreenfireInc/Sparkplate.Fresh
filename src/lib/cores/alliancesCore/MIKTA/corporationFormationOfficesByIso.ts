import type { CorporationFormationOffice } from './types'
import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'

function office(
  name: string,
  phone: string,
  address: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  formsUrl: string,
  checklistsUrl: string,
  registrationNumberLabel: string,
): CorporationFormationOffice {
  return {
    name,
    phone,
    address,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    formsUrl,
    checklistsUrl,
    registrationNumberLabel,
  }
}

/**
 * National corporation / company formation office per MIKTA member state.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const MIKTA_CORPORATION_FORMATION_OFFICES: Record<MiktaMemberIsoCode, CorporationFormationOffice> = {
  MX:   office(
    'Secretaria de Economia - Tu Empresa',
    '+52 55 5729 9100',
    'Av. Insurgentes Sur 1940, Mexico City, Mexico',
    'https://www.gob.mx/se',
    '',
    '',
    '',
    '',
    'https://www.gob.mx/tuempresa',
    'https://www.gob.mx/tramites/ficha/constitucion-de-sociedades/SRE2566',
    'Registro Federal de Contribuyentes (RFC)',
  ),
  ID:   office(
    'OSS Indonesia (Ministry of Investment/BKPM)',
    '+62 21 1500 123',
    'Jl. Jenderal Gatot Subroto No. 44, Jakarta, Indonesia',
    'https://oss.go.id',
    '',
    '',
    '',
    '',
    'https://oss.go.id',
    'https://www.bkpm.go.id/en/public-service',
    'Nomor Induk Berusaha (NIB)',
  ),
  KR:   office(
    'Supreme Court Internet Registry Office',
    '+82 2 3480 1715',
    'Seocho-daero, Seocho-gu, Seoul, Republic of Korea',
    'https://www.iros.go.kr',
    '',
    '',
    '',
    '',
    'https://www.iros.go.kr',
    'https://www.k-startup.go.kr/common/post/detail.do?postSn=95',
    'Business Registration Number',
  ),
  TR:   office(
    'Central Registry System Turkey (MERSIS)',
    '+90 312 417 7777',
    'Ankara, Turkey',
    'https://www.ticaret.gov.tr',
    'bilgi@ticaret.gov.tr',
    '',
    '',
    '',
    'https://mersis.ticaret.gov.tr',
    'https://www.ticaret.gov.tr/sirket-kurulus-islemleri',
    'MERSIS Number',
  ),
  AU:   office(
    'Australian Securities and Investments Commission (ASIC)',
    '+61 1300 300 630',
    'Level 5, 100 Market Street, Sydney NSW 2000, Australia',
    'https://asic.gov.au',
    '',
    'https://twitter.com/asicmedia',
    '',
    'https://www.linkedin.com/company/australian-securities-and-investments-commission/',
    'https://asic.gov.au/for-business/registering-a-company/',
    'https://business.gov.au/planning/new-businesses/register-a-company',
    'Australian Company Number (ACN)',
  ),
}
