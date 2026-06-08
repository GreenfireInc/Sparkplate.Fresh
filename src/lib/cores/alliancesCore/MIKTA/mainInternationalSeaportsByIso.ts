import type { MiktaMemberIsoCode } from './miktaMemberIsoCodes'
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
 * Main international seaport per MIKTA member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const MIKTA_MAIN_INTERNATIONAL_SEAPORTS: Record<MiktaMemberIsoCode, MainInternationalSeaport> = {
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
  KR: seaport(
    'Port of Busan',
    'https://www.busanpa.com/',
    'info@busanpa.com',
    'https://x.com/BusanPort',
    'https://www.instagram.com/busanport/',
    'https://www.linkedin.com/company/busan-port-authority/',
    'customs@customs.go.kr',
    'https://www.customs.go.kr',
    'Korea Customs Service — Port of Busan, Busan, South Korea',
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
  AU: seaport(
    'Port of Melbourne',
    'https://www.portofmelbourne.com/',
    'info@portofmelbourne.com',
    'https://x.com/PortOfMelbourne',
    'https://www.instagram.com/portofmelbourne/',
    'https://www.linkedin.com/company/port-of-melbourne/',
    'customs@abf.gov.au',
    'https://www.abf.gov.au',
    'Australian Border Force — Port of Melbourne, Melbourne, Australia',
  ),
}
