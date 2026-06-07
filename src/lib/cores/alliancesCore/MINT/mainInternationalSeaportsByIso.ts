import type { MintMemberIsoCode } from './mintMemberIsoCodes'
import type { MainInternationalSeaport } from './types'

function seaport(
  name: string,
  website: string,
  email: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  customsEmail: string,
  customsWebsite: string,
  customsAddress: string,
  apiEndpoint = '',
): MainInternationalSeaport {
  return {
    name,
    website,
    email,
    twitter,
    instagram,
    linkedin,
    apiEndpoint,
    customsOffice: {
      email: customsEmail,
      website: customsWebsite,
      address: customsAddress,
    },
  }
}

/**
 * Main international seaport per MINT member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const MINT_MAIN_INTERNATIONAL_SEAPORTS: Record<MintMemberIsoCode, MainInternationalSeaport> = {
  MX: seaport(
    'Port of Manzanillo',
    'https://www.puertomanzanillo.com.mx/',
    'contacto@puertomanzanillo.com.mx',
    'https://x.com/PuertoManzanillo',
    'https://www.instagram.com/puertomanzanillo/',
    'https://www.linkedin.com/company/puerto-manzanillo/',
    'atencion@sat.gob.mx',
    'https://www.sat.gob.mx',
    'SAT Aduanas — Puerto de Manzanillo, Manzanillo, Mexico',
  ),
  ID: seaport(
    'Port of Tanjung Priok (Jakarta)',
    'https://www.pelindo.co.id/',
    'info@pelindo.co.id',
    'https://x.com/Pelindo',
    'https://www.instagram.com/pelindo/',
    'https://www.linkedin.com/company/pelindo/',
    'contact.center@beacukai.go.id',
    'https://www.beacukai.go.id',
    'Direktorat Jenderal Bea dan Cukai — Pelabuhan Tanjung Priok, Jakarta, Indonesia',
  ),
  NG: seaport(
    'Port of Lagos (Apapa)',
    'https://www.npa.gov.ng/',
    'info@npa.gov.ng',
    'https://x.com/NPA_Nigeria',
    'https://www.instagram.com/npa_nigeria/',
    'https://www.linkedin.com/company/nigerian-ports-authority/',
    'customs@customs.gov.ng',
    'https://www.customs.gov.ng',
    'Nigeria Customs Service — Apapa Port, Lagos, Nigeria',
  ),
  TR: seaport(
    'Port of Mersin',
    'https://www.mersinport.com.tr/',
    'info@mersinport.com.tr',
    'https://x.com/MersinPort',
    'https://www.instagram.com/mersinport/',
    'https://www.linkedin.com/company/mersin-international-port/',
    'gumruk@gumruk.gov.tr',
    'https://www.gumruk.gov.tr',
    'Turkish Customs — Port of Mersin, Mersin, Turkey',
  ),
}
