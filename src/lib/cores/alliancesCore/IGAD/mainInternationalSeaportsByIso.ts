import type { IgadMemberIsoCode } from './igadMemberIsoCodes'
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
 * Main international seaport per IGAD member state (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const IGAD_MAIN_INTERNATIONAL_SEAPORTS: Record<IgadMemberIsoCode, MainInternationalSeaport> = {
  DJ: seaport(
    'Port of Djibouti',
    'https://www.portdedjibouti.com/',
    'contact@portdedjibouti.com',
    'https://x.com/PortDjibouti',
    'https://www.instagram.com/portdedjibouti/',
    'https://www.linkedin.com/company/port-de-djibouti/',
    'douanes@douanes.dj',
    'https://www.douanes.dj',
    'Direction Générale des Douanes — Port de Djibouti, Djibouti City, Djibouti',
  ),
  ET: seaport(
    'Port of Djibouti (primary maritime gateway; landlocked)',
    'https://www.portdedjibouti.com/',
    'contact@portdedjibouti.com',
    'https://x.com/PortDjibouti',
    'https://www.instagram.com/portdedjibouti/',
    'https://www.linkedin.com/company/port-de-djibouti/',
    'info@erca.gov.et',
    'https://www.erca.gov.et',
    'Ethiopian Customs Commission — Modjo Dry Port, Modjo, Ethiopia',
  ),
  SO: seaport(
    'Port of Mogadishu',
    'https://www.mpa.gov.so/',
    'info@mpa.gov.so',
    'https://x.com/MPA_Somalia',
    'https://www.instagram.com/mpa_somalia/',
    'https://www.linkedin.com/company/mogadishu-port-authority/',
    'customs@finance.gov.so',
    'https://www.customs.gov.so',
    'Somalia Customs — Port of Mogadishu, Mogadishu, Somalia',
  ),
  SS: seaport(
    'Port of Mombasa (primary maritime gateway; landlocked)',
    'https://www.kpa.co.ke/',
    'info@kpa.co.ke',
    'https://x.com/Kenya_Ports',
    'https://www.instagram.com/kenya_ports/',
    'https://www.linkedin.com/company/kenya-ports-authority/',
    'info@nra.gov.ss',
    'https://www.nra.gov.ss',
    'National Revenue Authority — Customs, Juba, South Sudan',
  ),
  SD: seaport(
    'Port Sudan',
    'https://www.spc.sd/',
    'info@spc.sd',
    'https://x.com/SPC_Sudan',
    'https://www.instagram.com/spc_sudan/',
    'https://www.linkedin.com/company/sea-ports-corporation-sudan/',
    'customs@customs.gov.sd',
    'https://www.customs.gov.sd',
    'Sudan Customs Authority — Port Sudan, Port Sudan, Sudan',
  ),
  KE: seaport(
    'Port of Mombasa',
    'https://www.kpa.co.ke/',
    'info@kpa.co.ke',
    'https://x.com/Kenya_Ports',
    'https://www.instagram.com/kenya_ports/',
    'https://www.linkedin.com/company/kenya-ports-authority/',
    'info@kra.go.ke',
    'https://www.kra.go.ke',
    'Kenya Revenue Authority — Customs Services, Port of Mombasa, Mombasa, Kenya',
  ),
  UG: seaport(
    'Port of Mombasa (primary maritime gateway; landlocked)',
    'https://www.kpa.co.ke/',
    'info@kpa.co.ke',
    'https://x.com/Kenya_Ports',
    'https://www.instagram.com/kenya_ports/',
    'https://www.linkedin.com/company/kenya-ports-authority/',
    'info@ura.go.ug',
    'https://www.ura.go.ug',
    'Uganda Revenue Authority — Customs, Kampala, Uganda',
  ),
}
