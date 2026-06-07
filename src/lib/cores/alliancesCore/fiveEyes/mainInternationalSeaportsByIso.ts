import type { FiveEyesMemberIsoCode } from './fiveEyesMemberIsoCodes'
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
 * Main international seaport per Five Eyes member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const FIVE_EYES_MAIN_INTERNATIONAL_SEAPORTS: Record<FiveEyesMemberIsoCode, MainInternationalSeaport> = {
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
  NZ: seaport(
    'Port of Tauranga',
    'https://www.port-tauranga.co.nz/',
    'info@port-tauranga.co.nz',
    'https://x.com/PortofTauranga',
    'https://www.instagram.com/portoftauranga/',
    'https://www.linkedin.com/company/port-of-tauranga/',
    'customs@customs.govt.nz',
    'https://www.customs.govt.nz',
    'New Zealand Customs Service — Port of Tauranga, Tauranga, New Zealand',
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
