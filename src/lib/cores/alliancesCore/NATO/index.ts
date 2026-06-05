export type {
  BondMarketVenue,
  DomesticCourierService,
  IntellectualPropertyDepartment,
  IntellectualPropertyDepartmentKind,
  IntellectualPropertyDepartmentsRoster,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  NatoCountry,
  NatoOrganizationInfo,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
  SecuritiesExchangeCommission,
} from './types'
export { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

import type { NatoCountry, NatoOrganizationInfo } from './types'
import { NATO_MEMBER_ISO_CODES } from './natoMemberIsoCodes'
import { albania } from './albania'
import { belgium } from './belgium'
import { bulgaria } from './bulgaria'
import { canada } from './canada'
import { croatia } from './croatia'
import { czechRepublic } from './czechRepublic'
import { denmark } from './denmark'
import { estonia } from './estonia'
import { finland } from './finland'
import { france } from './france'
import { germany } from './germany'
import { greece } from './greece'
import { hungary } from './hungary'
import { iceland } from './iceland'
import { italy } from './italy'
import { latvia } from './latvia'
import { lithuania } from './lithuania'
import { luxembourg } from './luxembourg'
import { montenegro } from './montenegro'
import { netherlands } from './netherlands'
import { northMacedonia } from './northMacedonia'
import { norway } from './norway'
import { poland } from './poland'
import { portugal } from './portugal'
import { romania } from './romania'
import { slovakia } from './slovakia'
import { slovenia } from './slovenia'
import { spain } from './spain'
import { sweden } from './sweden'
import { turkey } from './turkey'
import { unitedKingdom } from './unitedKingdom'
import { unitedStates } from './unitedStates'

export {
  albania,
  belgium,
  bulgaria,
  canada,
  croatia,
  czechRepublic,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  hungary,
  iceland,
  italy,
  latvia,
  lithuania,
  luxembourg,
  montenegro,
  netherlands,
  northMacedonia,
  norway,
  poland,
  portugal,
  romania,
  slovakia,
  slovenia,
  spain,
  sweden,
  turkey,
  unitedKingdom,
  unitedStates,
}

/** NATO Allies shipped in this module (32 economies in user list order). */
export const natoMembers: readonly NatoCountry[] = [
  albania,
  belgium,
  bulgaria,
  canada,
  croatia,
  czechRepublic,
  denmark,
  estonia,
  finland,
  france,
  germany,
  greece,
  hungary,
  iceland,
  italy,
  latvia,
  lithuania,
  luxembourg,
  montenegro,
  netherlands,
  northMacedonia,
  norway,
  poland,
  portugal,
  romania,
  slovakia,
  slovenia,
  spain,
  sweden,
  turkey,
  unitedKingdom,
  unitedStates,
] as const

/**
 * North Atlantic Treaty Organization — HQ reference (Belgium hosts civil HQ; Allied Command Transformation and military
 * command nodes are distributed — informational).
 */
export const nato: NatoOrganizationInfo = {
  officialName: 'North Atlantic Treaty Organization',
  abbreviation: 'NATO',
  established:
    '1949-04-04 Washington Treaty signed (collective-defence Article 5 core; successive enlargement waves — informational)',
  headquartersCity: 'Brussels',
  headquartersCountry: 'Belgium',
  memberStatesIso2: NATO_MEMBER_ISO_CODES,
  memberRecordsInModule: 32,
}
