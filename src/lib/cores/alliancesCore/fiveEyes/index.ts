export type { FiveEyesCountry, FiveEyesOrganizationInfo, DomesticCourierService } from './types'

import type { FiveEyesCountry, FiveEyesOrganizationInfo } from './types'
import { FIVE_EYES_MEMBER_ISO_CODES } from './fiveEyesMemberIsoCodes'
import { australia } from './australia'
import { canada } from './canada'
import { newZealand } from './newZealand'
import { unitedKingdom } from './unitedKingdom'
import { unitedStates } from './unitedStates'

export { australia, canada, newZealand, unitedKingdom, unitedStates }

/** Five Eyes alliance country records in this module (5). */
export const fiveEyesMembers: readonly FiveEyesCountry[] = [
  australia,
  canada,
  newZealand,
  unitedKingdom,
  unitedStates,
] as const

/**
 * Five Eyes — reference bloc metadata (no unified treaty secretariat; signals programmes are national —
 * informational; verify against declassified summaries and parliamentary oversight reports).
 */
export const fiveEyes: FiveEyesOrganizationInfo = {
  officialName: 'Five Eyes (UKUSA-derived signals intelligence sharing arrangement)',
  abbreviation: 'FVEY',
  established:
    '1946 UKUSA Agreement (UK–US signals); later AU/CA/NZ integrations under evolving multilateral compacts — informational',
  headquartersCity: 'Distributed',
  headquartersCountry: 'No unified secretariat; coordination across national signals agencies — informational',
  memberStatesIso2: FIVE_EYES_MEMBER_ISO_CODES,
  memberRecordsInModule: 5,
}
