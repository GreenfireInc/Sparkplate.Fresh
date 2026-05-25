export type {
  BondMarketVenue,
  DomesticCourierService,
  IoraCountry,
  IoraOrganizationInfo,
  MainExportCommodities,
  MainExportedElements,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
} from './types'

import type { IoraCountry, IoraOrganizationInfo } from './types'
import { IORA_MEMBER_ISO_CODES } from './ioraMemberIsoCodes'
import { australia } from './australia'
import { bangladesh } from './bangladesh'
import { comoros } from './comoros'
import { france } from './france'
import { india } from './india'
import { indonesia } from './indonesia'
import { iran } from './iran'
import { kenya } from './kenya'
import { madagascar } from './madagascar'
import { malaysia } from './malaysia'
import { maldives } from './maldives'
import { mauritius } from './mauritius'
import { mozambique } from './mozambique'
import { oman } from './oman'
import { seychelles } from './seychelles'
import { singapore } from './singapore'
import { somalia } from './somalia'
import { southAfrica } from './southAfrica'
import { sriLanka } from './sriLanka'
import { tanzania } from './tanzania'
import { thailand } from './thailand'
import { unitedArabEmirates } from './unitedArabEmirates'
import { yemen } from './yemen'

export {
  australia,
  bangladesh,
  comoros,
  france,
  india,
  indonesia,
  iran,
  kenya,
  madagascar,
  malaysia,
  maldives,
  mauritius,
  mozambique,
  oman,
  seychelles,
  singapore,
  somalia,
  southAfrica,
  sriLanka,
  tanzania,
  thailand,
  unitedArabEmirates,
  yemen,
}

/** IORA members in module order matching user roster (23). */
export const ioraMembers: readonly IoraCountry[] = [
  australia,
  bangladesh,
  comoros,
  france,
  india,
  indonesia,
  iran,
  kenya,
  madagascar,
  malaysia,
  maldives,
  mauritius,
  mozambique,
  oman,
  seychelles,
  singapore,
  somalia,
  southAfrica,
  sriLanka,
  tanzania,
  thailand,
  unitedArabEmirates,
  yemen,
] as const

/**
 * Indian Ocean Rim Association — reference metadata per iora.int (Secretariat Ebene Mauritius; Charter 1997 inception).
 */
export const iora: IoraOrganizationInfo = {
  officialName: 'Indian Ocean Rim Association',
  abbreviation: 'IORA',
  established:
    '1997 Charter era institutionalised (later instrument updates; tripartite government-business-academic engagement model — informational)',
  headquartersCity: 'Ebene',
  headquartersCountry: 'Mauritius',
  memberStatesIso2: IORA_MEMBER_ISO_CODES,
  memberRecordsInModule: 23,
}
