import type { GccMemberIsoCode } from './gccMemberIsoCodes'
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
 * Main international seaport per GCC member state (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const GCC_MAIN_INTERNATIONAL_SEAPORTS: Record<GccMemberIsoCode, MainInternationalSeaport> = {
  BH: seaport(
    'Khalifa Bin Salman Port (Mina Salman)',
    'https://www.ports.gov.bh/',
    'info@ports.gov.bh',
    'https://x.com/BahrainPorts',
    'https://www.instagram.com/bahrainports/',
    'https://www.linkedin.com/company/ports-maritime-and-aviation-authority/',
    'customs@nca.gov.bh',
    'https://www.nca.gov.bh',
    'National Customs Authority — Mina Salman, Manama, Bahrain',
  ),
  KW: seaport(
    'Shuwaikh Port',
    'https://www.pak.gov.kw/',
    'info@pak.gov.kw',
    'https://x.com/KuwaitPorts',
    'https://www.instagram.com/kuwaitports/',
    'https://www.linkedin.com/company/ports-authority-kuwait/',
    'customs@customs.gov.kw',
    'https://www.customs.gov.kw',
    'Kuwait General Administration of Customs — Shuwaikh Port, Kuwait City, Kuwait',
  ),
  OM: seaport(
    'Port of Salalah',
    'https://www.salalahport.com/',
    'info@salalahport.com',
    'https://x.com/SalalahPort',
    'https://www.instagram.com/salalahport/',
    'https://www.linkedin.com/company/port-of-salalah/',
    'customs@customs.gov.om',
    'https://www.customs.gov.om',
    'Royal Oman Police Customs — Port of Salalah, Salalah, Oman',
  ),
  QA: seaport(
    'Hamad Port',
    'https://www.mwani.com.qa/',
    'info@mwani.com.qa',
    'https://x.com/MwaniQatar',
    'https://www.instagram.com/mwaniqatar/',
    'https://www.linkedin.com/company/mwani-qatar/',
    'customs@gac.gov.qa',
    'https://www.customs.gov.qa',
    'General Authority of Customs — Hamad Port, Doha, Qatar',
  ),
  SA: seaport(
    'King Abdullah Port',
    'https://www.ka-port.com.sa/',
    'info@ka-port.com.sa',
    'https://x.com/KingAbdullahPort',
    'https://www.instagram.com/kingabdullahport/',
    'https://www.linkedin.com/company/king-abdullah-port/',
    'customs@zatca.gov.sa',
    'https://www.zatca.gov.sa',
    'ZATCA Customs — King Abdullah Port, Rabigh, Saudi Arabia',
  ),
  AE: seaport(
    'Jebel Ali Port (Dubai)',
    'https://www.dpworld.com/uae',
    'info@dpworld.com',
    'https://x.com/DP_World',
    'https://www.instagram.com/dpworld/',
    'https://www.linkedin.com/company/dp-world/',
    'customs@customs.ae',
    'https://www.customs.ae',
    'Federal Customs Authority — Jebel Ali Port, Dubai, United Arab Emirates',
  ),
}
