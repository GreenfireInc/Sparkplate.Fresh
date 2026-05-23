export type {
  DomesticCourierService,
  EacCountry,
  EacOrganizationInfo,
  NotableUniversity,
  NewsOutlet,
  NewsOutletsRoster,
} from './types'

import type { EacCountry, EacOrganizationInfo } from './types'
import { EAC_MEMBER_ISO_CODES } from './eacMemberIsoCodes'
import { burundi } from './burundi'
import { democraticRepublicOfTheCongo } from './democraticRepublicOfTheCongo'
import { kenya } from './kenya'
import { rwanda } from './rwanda'
import { somalia } from './somalia'
import { southSudan } from './southSudan'
import { tanzania } from './tanzania'
import { uganda } from './uganda'

export {
  burundi,
  democraticRepublicOfTheCongo,
  kenya,
  rwanda,
  somalia,
  southSudan,
  tanzania,
  uganda,
}

/** All EAC partner states represented in this module (8). */
export const eacMembers: readonly EacCountry[] = [
  burundi,
  democraticRepublicOfTheCongo,
  kenya,
  rwanda,
  somalia,
  southSudan,
  tanzania,
  uganda,
] as const

/**
 * East African Community — bloc metadata (verify against eac.int / treaty depositary notes).
 */
export const eac: EacOrganizationInfo = {
  officialName: 'East African Community',
  abbreviation: 'EAC',
  established:
    '1967-12-01 (original EAC, dissolved 1977); revived 1999-11-30 / Treaty 2000-07-07 Arusha; DRC ascension timelines — informational — verify',
  headquartersCity: 'Arusha',
  headquartersCountry: 'Tanzania',
  memberStatesIso2: EAC_MEMBER_ISO_CODES,
  memberRecordsInModule: 8,
}
