export type {
  BondMarketVenue,
  DomesticCourierService,
  EuCountry,
  EuOrganizationInfo,
  MainExportCommodities,
  MainExportedElements,
  NotableUniversity,
  NewsOutlet,
  NewsOutletsRoster,
  RareEarths,
} from './types'

import type { EuCountry, EuOrganizationInfo } from './types'
import { EU_MEMBER_ISO_CODES } from './euMemberIsoCodes'
import { austria } from './austria'
import { belgium } from './belgium'
import { bulgaria } from './bulgaria'
import { croatia } from './croatia'
import { cyprus } from './cyprus'
import { czechRepublic } from './czechRepublic'
import { denmark } from './denmark'
import { estonia } from './estonia'
import { finland } from './finland'
import { france } from './france'
import { germany } from './germany'
import { greece } from './greece'
import { hungary } from './hungary'
import { ireland } from './ireland'
import { italy } from './italy'
import { latvia } from './latvia'
import { lithuania } from './lithuania'
import { luxembourg } from './luxembourg'
import { malta } from './malta'
import { netherlands } from './netherlands'
import { poland } from './poland'
import { portugal } from './portugal'
import { romania } from './romania'
import { slovakia } from './slovakia'
import { slovenia } from './slovenia'
import { spain } from './spain'
import { sweden } from './sweden'

export {
  austria,
  belgium,
  bulgaria,
  croatia,
  cyprus,
  czechRepublic,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  hungary,
  ireland,
  italy,
  latvia,
  lithuania,
  luxembourg,
  malta,
  netherlands,
  poland,
  portugal,
  romania,
  slovakia,
  slovenia,
  spain,
  sweden,
}

/** All EU member states represented in this module (27 — post-UK withdrawal subset). */
export const euMembers: readonly EuCountry[] = [
  austria,
  belgium,
  bulgaria,
  croatia,
  cyprus,
  czechRepublic,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  hungary,
  ireland,
  italy,
  latvia,
  lithuania,
  luxembourg,
  malta,
  netherlands,
  poland,
  portugal,
  romania,
  slovakia,
  slovenia,
  spain,
  sweden,
] as const

/**
 * European Union — reference metadata (verify against europa.eu and Official Journal).
 */
export const eu: EuOrganizationInfo = {
  officialName: 'European Union',
  abbreviation: 'EU',
  established:
    '1993-11-01 Maastricht Treaty (EU legal personality); Lisbon Treaty 2009; continuous acquis evolution — informational',
  headquartersCity: 'Brussels',
  headquartersCountry: 'Belgium',
  memberStatesIso2: EU_MEMBER_ISO_CODES,
  memberRecordsInModule: 27,
}
