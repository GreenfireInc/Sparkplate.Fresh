export type {
  OpecCountry,
  OpecOrganizationInfo,
  DomesticCourierService,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
} from './types'

import type { OpecCountry, OpecOrganizationInfo } from './types'
import { OPEC_MEMBER_ISO_CODES } from './opecMemberIsoCodes'
import { algeria } from './algeria'
import { republicOfTheCongo } from './republicOfTheCongo'
import { equatorialGuinea } from './equatorialGuinea'
import { gabon } from './gabon'
import { iran } from './iran'
import { iraq } from './iraq'
import { kuwait } from './kuwait'
import { libya } from './libya'
import { nigeria } from './nigeria'
import { saudiArabia } from './saudiArabia'
import { unitedArabEmirates } from './unitedArabEmirates'
import { venezuela } from './venezuela'

export {
  algeria,
  republicOfTheCongo,
  equatorialGuinea,
  gabon,
  iran,
  iraq,
  kuwait,
  libya,
  nigeria,
  saudiArabia,
  unitedArabEmirates,
  venezuela,
}

/** Current OPEC members represented in this module (user-specified roster of 12). */
export const opecMembers: readonly OpecCountry[] = [
  algeria,
  republicOfTheCongo,
  equatorialGuinea,
  gabon,
  iran,
  iraq,
  kuwait,
  libya,
  nigeria,
  saudiArabia,
  unitedArabEmirates,
  venezuela,
] as const

/**
 * Organization of the Petroleum Exporting Countries — reference metadata (headquarters location subject to OPEC resolutions;
 * verify against opec.org).
 */
export const opec: OpecOrganizationInfo = {
  officialName: 'Organization of the Petroleum Exporting Countries',
  abbreviation: 'OPEC',
  established:
    '1960-09-14 Baghdad conference founding (Secretariat subsequently Vienna HQ from 1965 — informational)',
  headquartersCity: 'Vienna',
  headquartersCountry: 'Austria',
  memberStatesIso2: OPEC_MEMBER_ISO_CODES,
  memberRecordsInModule: 12,
}
