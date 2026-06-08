import type { OecsMemberIsoCode } from './oecsMemberIsoCodes'
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
 * Main international seaport per OECS member state (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const OECS_MAIN_INTERNATIONAL_SEAPORTS: Record<OecsMemberIsoCode, MainInternationalSeaport> = {
  AG: seaport(
    'Port of St. John\'s',
    'https://www.antiguaport.com/',
    'info@antiguaport.com',
    'https://x.com/AntiguaPort',
    'https://www.instagram.com/antiguaport/',
    'https://www.linkedin.com/company/antigua-port-authority/',
    'customs@antigua.gov.ag',
    'https://www.customs.gov.ag',
    'Antigua and Barbuda Customs — Port of St. John\'s, St. John\'s, Antigua and Barbuda',
  ),
  DM: seaport(
    'Port of Roseau',
    'https://www.dominicaports.dm/',
    'info@dominicaports.dm',
    'https://x.com/DominicaPorts',
    'https://www.instagram.com/dominicaport/',
    'https://www.linkedin.com/company/dominica-ports-authority/',
    'customs@customs.gov.dm',
    'https://www.customs.gov.dm',
    'Dominica Customs — Port of Roseau, Roseau, Dominica',
  ),
  GD: seaport(
    'Port of St. George\'s',
    'https://www.grenadaports.com/',
    'info@grenadaports.com',
    'https://x.com/GrenadaPorts',
    'https://www.instagram.com/grenadaports/',
    'https://www.linkedin.com/company/grenada-ports-authority/',
    'customs@customs.gov.gd',
    'https://www.customs.gov.gd',
    'Grenada Customs — Port of St. George\'s, St. George\'s, Grenada',
  ),
  MS: seaport(
    'Port of Little Bay',
    'https://www.gov.ms/port/',
    'info@gov.ms',
    '',
    '',
    'https://www.linkedin.com/company/montserrat-ports/',
    'customs@gov.ms',
    'https://www.gov.ms/customs',
    'Montserrat Customs — Port of Little Bay, Little Bay, Montserrat',
  ),
  KN: seaport(
    'Port of Basseterre',
    'https://www.stkittsnevisports.com/',
    'info@stkittsnevisports.com',
    'https://x.com/StKittsPorts',
    'https://www.instagram.com/stkittsports/',
    'https://www.linkedin.com/company/st-kitts-nevis-ports/',
    'customs@customs.gov.kn',
    'https://www.customs.gov.kn',
    'St. Kitts and Nevis Customs — Port of Basseterre, Basseterre, Saint Kitts and Nevis',
  ),
  LC: seaport(
    'Port of Castries',
    'https://www.sluciaports.com/',
    'info@sluciaports.com',
    'https://x.com/StLuciaPorts',
    'https://www.instagram.com/stluciaports/',
    'https://www.linkedin.com/company/saint-lucia-ports-authority/',
    'customs@customs.gov.lc',
    'https://www.customs.gov.lc',
    'Saint Lucia Customs — Port of Castries, Castries, Saint Lucia',
  ),
  VC: seaport(
    'Port of Kingstown',
    'https://www.svgports.com/',
    'info@svgports.com',
    'https://x.com/SVGPorts',
    'https://www.instagram.com/svgports/',
    'https://www.linkedin.com/company/saint-vincent-ports/',
    'customs@customs.gov.vc',
    'https://www.customs.gov.vc',
    'Saint Vincent and the Grenadines Customs — Port of Kingstown, Kingstown, Saint Vincent and the Grenadines',
  ),
  AI: seaport(
    'Port of Road Bay',
    'https://www.gov.ai/ports/',
    'info@gov.ai',
    '',
    '',
    'https://www.linkedin.com/company/anguilla-ports/',
    'customs@gov.ai',
    'https://www.gov.ai/customs',
    'Anguilla Customs — Road Bay, The Valley, Anguilla',
  ),
}
