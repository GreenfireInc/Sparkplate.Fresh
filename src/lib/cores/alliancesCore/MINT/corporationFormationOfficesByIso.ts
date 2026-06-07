import type { CorporationFormationOffice } from './types'
import type { MintMemberIsoCode } from './mintMemberIsoCodes'

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
 * National corporation / company formation office per MINT member state.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const MINT_CORPORATION_FORMATION_OFFICES: Record<MintMemberIsoCode, CorporationFormationOffice> = {
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
  NG:   office(
    'Corporate Affairs Commission (CAC Nigeria)',
    '+234 700 022 2255',
    'Plot 420, Tigris Crescent, Maitama, Abuja, Nigeria',
    'https://www.cac.gov.ng',
    'enquiries@cac.gov.ng',
    'https://x.com/cacnigeria1',
    'https://www.instagram.com/cacnigeria/',
    'https://www.linkedin.com/company/corporate-affairs-commission-nigeria/',
    'https://pre.cac.gov.ng/register',
    'https://www.cac.gov.ng/resources',
    'Registration Number (RC Number)',
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
}
