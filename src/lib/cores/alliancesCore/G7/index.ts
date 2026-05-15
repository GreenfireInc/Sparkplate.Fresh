export type { G7Country, G7OrganizationInfo, DomesticCourierService } from './types'

import type { G7Country, G7OrganizationInfo } from './types'
import { G7_MEMBER_ISO_CODES } from './g7MemberIsoCodes'
import { canada } from './canada'
import { france } from './france'
import { germany } from './germany'
import { italy } from './italy'
import { japan } from './japan'
import { unitedKingdom } from './unitedKingdom'
import { unitedStates } from './unitedStates'

export { canada, france, germany, italy, japan, unitedKingdom, unitedStates }

/** G7 advanced-economy members represented in this module (7). */
export const g7Members: readonly G7Country[] = [
  canada,
  france,
  germany,
  italy,
  japan,
  unitedKingdom,
  unitedStates,
] as const

/**
 * Group of Seven — reference bloc metadata (rotating presidency; no standing secretariat like an IGO HQ —
 * informational; verify agendas against each host communiqué).
 */
export const g7: G7OrganizationInfo = {
  officialName: 'Group of Seven',
  abbreviation: 'G7',
  established:
    '1975-11 Rambouillet summit (annual economic/finance coordination among major advanced economies; Russia G8-era accession reversed to G7 posture from 2014 — informational)',
  headquartersCity: 'Rotating presidency',
  headquartersCountry: 'Host member changes annually (ministerial sherpa process — informational)',
  memberStatesIso2: G7_MEMBER_ISO_CODES,
  memberRecordsInModule: 7,
}
