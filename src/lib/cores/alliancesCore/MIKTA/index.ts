export type {
  MiktaCountry,
  MiktaOrganizationInfo,
  DomesticCourierService,
  MainExportCommodities,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
} from './types'

import type { MiktaCountry, MiktaOrganizationInfo } from './types'
import { MIKTA_MEMBER_ISO_CODES } from './miktaMemberIsoCodes'
import { mexico } from './mexico'
import { indonesia } from './indonesia'
import { southKorea } from './southKorea'
import { turkey } from './turkey'
import { australia } from './australia'

export { mexico, indonesia, southKorea, turkey, australia }

/** MIKTA country records shipped in this module (5 — Mexico, Indonesia, South Korea, Türkiye, Australia). */
export const miktaMembers: readonly MiktaCountry[] = [
  mexico,
  indonesia,
  southKorea,
  turkey,
  australia,
] as const

/**
 * MIKTA — cross-regional informal partnership of middle powers est. September 2013 on the
 * sidelines of the UN General Assembly; rotating chairmanship; no permanent secretariat;
 * coordinates on global governance, peace, sustainable development and democracy — informational.
 */
export const mikta: MiktaOrganizationInfo = {
  officialName: 'MIKTA (Mexico · Indonesia · Republic of Korea · Türkiye · Australia)',
  abbreviation: 'MIKTA',
  established:
    '2013-09 UN General Assembly sidelines, New York — informal cross-regional middle-power consultative partnership; rotating annual chair; no permanent secretariat — informational',
  headquartersCity: '— (rotating chair; no permanent secretariat)',
  headquartersCountry:
    'Cross-regional grouping; chairmanship rotates among members annually — informational',
  memberStatesIso2: MIKTA_MEMBER_ISO_CODES,
  memberRecordsInModule: 5,
}
