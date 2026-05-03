export type { GccCountry, GccOrganizationInfo } from './types'

import type { GccCountry, GccOrganizationInfo } from './types'
import { bahrain } from './bahrain'
import { kuwait } from './kuwait'
import { oman } from './oman'
import { qatar } from './qatar'
import { saudiArabia } from './saudiArabia'
import { unitedArabEmirates } from './unitedArabEmirates'

export { bahrain, kuwait, oman, qatar, saudiArabia, unitedArabEmirates }

/** GCC member state records shipped in this module (6). */
export const gccMembers: readonly GccCountry[] = [
  bahrain,
  kuwait,
  oman,
  qatar,
  saudiArabia,
  unitedArabEmirates,
] as const

/**
 * Cooperation Council for the Arab States of the Gulf (GCC) — reference metadata (Secretariat General cited in
 * Riyadh Saudi Arabia subject to Secretariat communiqués — informational; verify for production).
 */
export const gcc: GccOrganizationInfo = {
  officialName: 'Cooperation Council for the Arab States of the Gulf',
  abbreviation: 'GCC',
  established:
    '1981-05-25 treaty signed Abu Dhabi UAE (Council charter; supplementary institutions Customs Union/Common Market evolution — informational)',
  headquartersCity: 'Riyadh',
  headquartersCountry: 'Saudi Arabia',
  memberStatesIso2: ['BH', 'KW', 'OM', 'QA', 'SA', 'AE'],
  memberRecordsInModule: 6,
}
