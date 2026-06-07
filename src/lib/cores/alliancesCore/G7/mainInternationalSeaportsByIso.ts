import type { G7MemberIsoCode } from './g7MemberIsoCodes'
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
 * Main international seaport per G7 member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const G7_MAIN_INTERNATIONAL_SEAPORTS: Record<G7MemberIsoCode, MainInternationalSeaport> = {
  CA: seaport(
    'Port of Vancouver',
    'https://www.portvancouver.com/',
    'info@portvancouver.com',
    'https://x.com/portvancouver',
    'https://www.instagram.com/portvancouver/',
    'https://www.linkedin.com/company/port-of-vancouver/',
    'cbcsa-client-services@cbsa-asfc.gc.ca',
    'https://www.cbsa-asfc.gc.ca',
    'Canada Border Services Agency — Port of Vancouver, Vancouver, Canada',
  ),
  FR: seaport(
    'Port of Le Havre',
    'https://www.havre-port.fr/',
    'info@havre-port.fr',
    'https://x.com/HavrePort',
    'https://www.instagram.com/havreport/',
    'https://www.linkedin.com/company/grand-port-maritime-du-havre/',
    'douane@douane.gouv.fr',
    'https://www.douane.gouv.fr',
    'French Customs — Port of Le Havre, Le Havre, France',
  ),
  DE: seaport(
    'Port of Hamburg',
    'https://www.hafen-hamburg.de/',
    'info@hafen-hamburg.de',
    'https://x.com/hafenhamburg',
    'https://www.instagram.com/hafenhamburg/',
    'https://www.linkedin.com/company/hamburg-port-authority/',
    'info@zoll.de',
    'https://www.zoll.de',
    'German Customs — Port of Hamburg, Hamburg, Germany',
  ),
  IT: seaport(
    'Port of Genoa',
    'https://www.portsofgenoa.com/',
    'info@portsofgenoa.com',
    'https://x.com/PortofGenoa',
    'https://www.instagram.com/portofgenoa/',
    'https://www.linkedin.com/company/western-ligurian-sea-port-authority/',
    'dogane@dogane.gov.it',
    'https://www.adm.gov.it',
    'Agenzia delle Dogane — Porto di Genova, Genoa, Italy',
  ),
  JP: seaport(
    'Port of Yokohama',
    'https://www.portof_yokohama.jp/',
    'info@portof_yokohama.jp',
    'https://x.com/PortOfYokohama',
    'https://www.instagram.com/portofyokohama/',
    'https://www.linkedin.com/company/port-and-harbor-bureau-city-of-yokohama/',
    'zeimu@customs.go.jp',
    'https://www.customs.go.jp',
    'Yokohama Customs — Port of Yokohama, Yokohama, Japan',
  ),
  GB: seaport(
    'Port of Felixstowe',
    'https://www.portoffelixstowe.co.uk/',
    'info@portoffelixstowe.co.uk',
    'https://x.com/PortofFelixstowe',
    'https://www.instagram.com/portoffelixstowe/',
    'https://www.linkedin.com/company/port-of-felixstowe/',
    'national.advice@hmrc.gov.uk',
    'https://www.gov.uk/government/organisations/hm-revenue-customs',
    'HMRC Border Force — Port of Felixstowe, Felixstowe, United Kingdom',
  ),
  US: seaport(
    'Port of Los Angeles',
    'https://www.portoflosangeles.org/',
    'info@portoflosangeles.org',
    'https://x.com/portofla',
    'https://www.instagram.com/portofla/',
    'https://www.linkedin.com/company/port-of-los-angeles/',
    'losangeles.cbp@cbp.dhs.gov',
    'https://www.cbp.gov',
    'U.S. Customs and Border Protection — Port of Los Angeles, San Pedro, United States',
  ),
}
