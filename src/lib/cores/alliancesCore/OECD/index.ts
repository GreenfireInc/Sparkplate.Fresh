export type {
  BondMarketVenue,
  DomesticCourierService,
  IntellectualPropertyDepartment,
  IntellectualPropertyDepartmentKind,
  IntellectualPropertyDepartmentsRoster,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  OecdCountry,
  OecdOrganizationInfo,
  RareEarths,
  SecuritiesExchangeCommission,
} from './types'
export { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

import type { OecdCountry, OecdOrganizationInfo } from './types'
import { OECD_MEMBER_ISO_CODES } from './oecdMemberIsoCodes'
import { australia } from './australia'
import { austria } from './austria'
import { belgium } from './belgium'
import { canada } from './canada'
import { chile } from './chile'
import { colombia } from './colombia'
import { costaRica } from './costaRica'
import { czechRepublic } from './czechRepublic'
import { denmark } from './denmark'
import { estonia } from './estonia'
import { finland } from './finland'
import { france } from './france'
import { germany } from './germany'
import { greece } from './greece'
import { hungary } from './hungary'
import { iceland } from './iceland'
import { ireland } from './ireland'
import { italy } from './italy'
import { japan } from './japan'
import { latvia } from './latvia'
import { lithuania } from './lithuania'
import { luxembourg } from './luxembourg'
import { mexico } from './mexico'
import { netherlands } from './netherlands'
import { newZealand } from './newZealand'
import { norway } from './norway'
import { poland } from './poland'
import { portugal } from './portugal'
import { slovakia } from './slovakia'
import { slovenia } from './slovenia'
import { spain } from './spain'
import { sweden } from './sweden'
import { switzerland } from './switzerland'
import { turkey } from './turkey'
import { unitedKingdom } from './unitedKingdom'
import { unitedStates } from './unitedStates'

export {
  australia,
  austria,
  belgium,
  canada,
  chile,
  colombia,
  costaRica,
  czechRepublic,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  hungary,
  iceland,
  ireland,
  italy,
  japan,
  latvia,
  lithuania,
  luxembourg,
  mexico,
  netherlands,
  newZealand,
  norway,
  poland,
  portugal,
  slovakia,
  slovenia,
  spain,
  sweden,
  switzerland,
  turkey,
  unitedKingdom,
  unitedStates,
}

/** OECD economies represented in this module (36 — user-specified subset excluding non-member invitees). */
export const oecdMembers: readonly OecdCountry[] = [
  australia,
  austria,
  belgium,
  canada,
  chile,
  colombia,
  costaRica,
  czechRepublic,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  hungary,
  iceland,
  ireland,
  italy,
  japan,
  latvia,
  lithuania,
  luxembourg,
  mexico,
  netherlands,
  newZealand,
  norway,
  poland,
  portugal,
  slovakia,
  slovenia,
  spain,
  sweden,
  switzerland,
  turkey,
  unitedKingdom,
  unitedStates,
] as const

/**
 * Organisation for Economic Co-operation and Development — reference metadata (verify against oecd.org legal
 * instruments; membership beyond this module may evolve).
 */
export const oecd: OecdOrganizationInfo = {
  officialName: 'Organisation for Economic Co-operation and Development',
  abbreviation: 'OECD',
  established:
    '1961-09-30 Convention signed superseding Organisation for European Economic Co-operation lineage (institutional successors and enlargements — informational)',
  headquartersCity: 'Paris',
  headquartersCountry: 'France',
  memberStatesIso2: OECD_MEMBER_ISO_CODES,
  memberRecordsInModule: 36,
}
