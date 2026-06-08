import type { EacMemberIsoCode } from './eacMemberIsoCodes'
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
 * Main international seaport per EAC partner state (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const EAC_MAIN_INTERNATIONAL_SEAPORTS: Record<EacMemberIsoCode, MainInternationalSeaport> = {
  BI: seaport(
    'Port of Bujumbura (Lake Tanganyika)',
    'https://www.obr.bi/',
    'info@obr.bi',
    'https://x.com/OBR_Burundi',
    'https://www.instagram.com/obr_burundi/',
    'https://www.linkedin.com/company/office-burundais-des-recettes/',
    'douanes@obr.bi',
    'https://www.obr.bi',
    'Bureau des Douanes — Port de Bujumbura, Bujumbura, Burundi',
  ),
  CD: seaport(
    'Port of Matadi',
    'https://www.opdrdc.cd/',
    'contact@opdrdc.cd',
    'https://x.com/OPDRDC',
    'https://www.instagram.com/opdrdc/',
    'https://www.linkedin.com/company/office-des-ports-et-voies-fluviales-rdc/',
    'douanes@dgda.cd',
    'https://www.douanesrdc.cd',
    'Direction Générale des Douanes et Accises — Port de Matadi, Matadi, DRC',
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
  RW: seaport(
    'Port of Mombasa (primary maritime gateway; landlocked)',
    'https://www.kpa.co.ke/',
    'info@kpa.co.ke',
    'https://x.com/Kenya_Ports',
    'https://www.instagram.com/kenya_ports/',
    'https://www.linkedin.com/company/kenya-ports-authority/',
    'info@rra.gov.rw',
    'https://www.rra.gov.rw',
    'Rwanda Revenue Authority — Customs Services, Kigali, Rwanda',
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
  TZ: seaport(
    'Port of Dar es Salaam',
    'https://www.tanzaniaports.com/',
    'info@tanzaniaports.com',
    'https://x.com/TanzaniaPorts',
    'https://www.instagram.com/tanzaniaports/',
    'https://www.linkedin.com/company/tanzania-ports-authority/',
    'customs@tra.go.tz',
    'https://www.tra.go.tz',
    'Tanzania Revenue Authority — Customs, Port of Dar es Salaam, Dar es Salaam, Tanzania',
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
