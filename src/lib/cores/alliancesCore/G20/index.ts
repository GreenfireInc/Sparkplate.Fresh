export type {
  BondMarketVenue,
  DomesticCourierService,
  G20Country,
  G20InstitutionalMember,
  G20OrganizationInfo,
  MainExportCommodities,
  MainExportedElements,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
} from './types'
export { G20_SOVEREIGN_MEMBER_ISO_CODES } from './g20MemberIsoCodes'
export type { G20SovereignMemberIsoCode } from './g20MemberIsoCodes'

import type { G20Country, G20InstitutionalMember, G20OrganizationInfo } from './types'
import { G20_SOVEREIGN_MEMBER_ISO_CODES } from './g20MemberIsoCodes'
import { argentina } from './argentina'
import { australia } from './australia'
import { brazil } from './brazil'
import { canada } from './canada'
import { china } from './china'
import { france } from './france'
import { germany } from './germany'
import { india } from './india'
import { indonesia } from './indonesia'
import { italy } from './italy'
import { japan } from './japan'
import { mexico } from './mexico'
import { russia } from './russia'
import { saudiArabia } from './saudiArabia'
import { southAfrica } from './southAfrica'
import { southKorea } from './southKorea'
import { turkey } from './turkey'
import { unitedKingdom } from './unitedKingdom'
import { unitedStates } from './unitedStates'
import { europeanUnion } from './europeanUnion'
import { africanUnion } from './africanUnion'

export {
  argentina,
  australia,
  brazil,
  canada,
  china,
  france,
  germany,
  india,
  indonesia,
  italy,
  japan,
  mexico,
  russia,
  saudiArabia,
  southAfrica,
  southKorea,
  turkey,
  unitedKingdom,
  unitedStates,
  europeanUnion,
  africanUnion,
}

/** G20 sovereign country members represented in this module (19). */
export const g20Members: readonly G20Country[] = [
  argentina,
  australia,
  brazil,
  canada,
  china,
  france,
  germany,
  india,
  indonesia,
  italy,
  japan,
  mexico,
  russia,
  saudiArabia,
  southAfrica,
  southKorea,
  turkey,
  unitedKingdom,
  unitedStates,
] as const

/** G20 institutional / supranational members represented in this module (2 — EU founding; AU admitted 2023). */
export const g20InstitutionalMembers: readonly G20InstitutionalMember[] = [
  europeanUnion,
  africanUnion,
] as const

/**
 * Group of Twenty — reference bloc metadata (rotating presidency / troika; finance ministers and
 * central bank governors track est. 1999 post-Asian-financial-crisis; leaders summits since 2008
 * Washington crisis convening; 19 sovereign members + 2 institutional seats — European Union since
 * founding and African Union since the 2023 New Delhi summit — informational; verify agendas
 * against each host communiqué).
 */
export const g20: G20OrganizationInfo = {
  officialName: 'Group of Twenty',
  abbreviation: 'G20',
  established:
    '1999-09 finance ministers and central bank governors track (Berlin / Washington origin); 2008-11 inaugural leaders summit Washington, D.C. (global financial crisis convening); annual rotating presidency / troika — informational',
  headquartersCity: 'Rotating presidency',
  headquartersCountry:
    'Host member changes annually (sherpa + finance tracks; institutional EU & African Union seats coordinated via their own secretariats — informational)',
  memberStatesIso2: G20_SOVEREIGN_MEMBER_ISO_CODES,
  institutionalMembersCode: ['EU', 'AU'],
  memberRecordsInModule: 21,
}
