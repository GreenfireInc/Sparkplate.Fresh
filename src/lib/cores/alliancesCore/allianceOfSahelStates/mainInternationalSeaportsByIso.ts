import type { AesMemberIsoCode } from './aesMemberIsoCodes'
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
 * Main international seaport per AES founding member (coastal gateway or principal maritime access point).
 * Informational; verify URLs, handles, customs contacts, and API bases before production.
 * Self-contained — no imports from other alliance modules.
 */
export const AES_MAIN_INTERNATIONAL_SEAPORTS: Record<AesMemberIsoCode, MainInternationalSeaport> = {
  ML: seaport(
    'Port of Dakar (primary maritime gateway; landlocked)',
    'https://www.portdedakar.sn/',
    'contact@portdedakar.sn',
    'https://x.com/PortDakar',
    'https://www.instagram.com/portdedakar/',
    'https://www.linkedin.com/company/port-autonome-de-dakar/',
    'douanes@finances.ml',
    'https://www.douanes.ml',
    'Direction Générale des Douanes — Bamako, Mali',
  ),
  NE: seaport(
    'Port of Cotonou (primary maritime gateway; landlocked)',
    'https://www.portdecotonou.com/',
    'contact@portdecotonou.com',
    'https://x.com/PortCotonou',
    'https://www.instagram.com/portcotonou/',
    'https://www.linkedin.com/company/port-autonome-de-cotonou/',
    'douanes@finances.ne',
    'https://www.douanes.ne',
    'Direction Générale des Douanes — Niamey, Niger',
  ),
  BF: seaport(
    'Port of Lomé (primary maritime gateway; landlocked)',
    'https://www.portdelome.tg/',
    'contact@portdelome.tg',
    'https://x.com/PortLome',
    'https://www.instagram.com/portdelome/',
    'https://www.linkedin.com/company/port-autonome-de-lome/',
    'douanes@finances.gov.bf',
    'https://www.douanes.gov.bf',
    'Direction Générale des Douanes, Ouagadougou, Burkina Faso',
  ),
}
