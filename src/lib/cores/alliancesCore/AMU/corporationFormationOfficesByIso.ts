import type { CorporationFormationOffice } from './types'
import type { AmuMemberIsoCode } from './amuMemberIsoCodes'

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
 * National corporation / company formation office per AMU founding member.
 * Informational; verify phone numbers, addresses, filing portals, checklists, social handles,
 * and registration-number taxonomy before production. Self-contained — no imports from other alliance modules.
 */
export const AMU_CORPORATION_FORMATION_OFFICES: Record<AmuMemberIsoCode, CorporationFormationOffice> = {
  DZ:   office(
    'Centre National du Registre du Commerce (CNRC)',
    '+213 23 50 34 34',
    'Route nationale no 24, Lido, Mohammadia, Algiers, Algeria',
    'https://sidjilcom.cnrc.dz',
    'contact@cnrc.dz',
    '',
    '',
    'https://www.linkedin.com/company/cnrc-algerie/',
    'https://sidjilcom.cnrc.dz/inscription',
    'https://sidjilcom.cnrc.dz/faq',
    'Numero du Registre du Commerce (NRC)',
  ),
  LY:   office(
    'Ministry of Economy and Trade Libya - Commercial Registry Department',
    '+218 21 335 0380',
    'Al-Sikka Road, Tripoli, Libya',
    'https://www.economy.gov.ly',
    'info@economy.gov.ly',
    '',
    '',
    '',
    'https://www.economy.gov.ly/services/commercial-register',
    '',
    'Commercial Registration Number',
  ),
  MR:   office(
    'Agence de Promotion des Investissements en Mauritanie (APIM) - Guichet Unique',
    '+222 45 25 33 77',
    'Ilot C, Tevragh Zeina, Nouakchott, Mauritania',
    'https://apim.gov.mr',
    'contact@apim.gov.mr',
    '',
    '',
    '',
    'https://apim.gov.mr/creation-dentreprise',
    'https://apim.gov.mr/guide-createur',
    'Numero RCCM',
  ),
  MA:   office(
    'OMPIC Morocco - DirectEntreprise',
    '+212 5 22 58 64 00',
    'Route de Nouasseur, Km 9.5, Casablanca, Morocco',
    'https://www.directentreprise.ma',
    'contact@ompic.ma',
    'https://x.com/OMPICMaroc',
    '',
    'https://www.linkedin.com/company/ompic-maroc/',
    'https://www.directentreprise.ma',
    'https://www.ompic.ma/fr/content/guide-de-creation',
    'Numero du Registre de Commerce (RC)',
  ),
  TN:   office(
    'APII Tunisia - Guichet Unique de l\'Industrie',
    '+216 71 792 144',
    '63 Rue de Syrie, 1002 Tunis, Tunisia',
    'https://www.tunisieindustrie.nat.tn',
    'apii@apii.tn',
    '',
    '',
    'https://www.linkedin.com/company/agence-de-promotion-de-l-industrie-et-de-l-innovation/',
    'https://www.tunisieindustrie.nat.tn/fr/home.asp',
    'https://www.tunisieindustrie.nat.tn/fr/doc.asp',
    'Identifiant Unique de l\'Entreprise (RNE)',
  ),
}
