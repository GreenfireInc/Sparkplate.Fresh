import type { CorporationFormationOffice } from './types'
import type { AesMemberIsoCode } from './aesMemberIsoCodes'

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
 * National corporation / company formation office per Alliance of Sahel States member.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const AES_CORPORATION_FORMATION_OFFICES: Record<AesMemberIsoCode, CorporationFormationOffice> = {
  ML:   office(
    'API Mali - Guichet Unique de Creation d\'Entreprise',
    '+223 20 22 18 12',
    'Avenue du Mali, Hamdallaye ACI 2000, Bamako, Mali',
    'https://www.apimali.gov.ml',
    'contact@apimali.gov.ml',
    '',
    '',
    '',
    'https://www.apimali.gov.ml/guichet-unique',
    'https://www.apimali.gov.ml/repertoire-des-formalites',
    'Numero RCCM',
  ),
  NE:   office(
    'Maison de l\'Entreprise du Niger - CFE',
    '+227 20 75 23 47',
    'Boulevard Mali Bero, Niamey, Niger',
    'https://www.me.ne',
    'infos@me.ne',
    '',
    '',
    '',
    'https://www.me.ne/creation-dentreprise',
    'https://www.me.ne/guide-des-formalites',
    'Numero RCCM',
  ),
  BF:   office(
    'CEFORE Burkina Faso (Maison de l\'Entreprise)',
    '+226 25 39 80 60',
    '17 BP 502 Ouagadougou 17, Avenue de Lyon, Ouagadougou, Burkina Faso',
    'https://www.me.bf',
    'formalites@me.bf',
    '',
    '',
    '',
    'https://www.me.bf/creation-d-entreprise',
    'https://www.me.bf/guide-createur',
    'Numero RCCM (Registre du Commerce et du Credit Mobilier)',
  ),
}
