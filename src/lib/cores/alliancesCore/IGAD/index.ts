export type {
  BondMarketVenue,
  DomesticCourierService,
  IgadCountry,
  IgadOrganizationInfo,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
} from './types'

import type { IgadCountry, IgadOrganizationInfo } from './types'
import { IGAD_MEMBER_ISO_CODES } from './igadMemberIsoCodes'
import { djibouti } from './djibouti'
import { ethiopia } from './ethiopia'
import { somalia } from './somalia'
import { southSudan } from './southSudan'
import { sudan } from './sudan'
import { kenya } from './kenya'
import { uganda } from './uganda'

export { djibouti, ethiopia, somalia, southSudan, sudan, kenya, uganda }

/**
 * IGAD entries in module order — Horn → Nile Valley → Great Lakes subgrouping as conveyed in user list
 * (verify suspension / reinstatement against latest Summit communiqués).
 */
export const igadMembers: readonly IgadCountry[] = [
  djibouti,
  ethiopia,
  somalia,
  southSudan,
  sudan,
  kenya,
  uganda,
] as const

/**
 * Intergovernmental Authority on Development — reference bloc metadata (IGADD precursor 1986; IGAD
 * institutional refresh 1996 — informational).
 */
export const igad: IgadOrganizationInfo = {
  officialName: 'Intergovernmental Authority on Development',
  abbreviation: 'IGAD',
  established:
    '1986-01 IGADD Djibouti founding; reorganized IGAD Nairobi Mar 1996 (peace-security-development mandate evolution — informational)',
  headquartersCity: 'Djibouti',
  headquartersCountry: 'Djibouti',
  memberStatesIso2: IGAD_MEMBER_ISO_CODES,
  memberRecordsInModule: 7,
}
