export type { EccasCountry, EccasOrganizationInfo } from './types'

import type { EccasCountry, EccasOrganizationInfo } from './types'
import { angola } from './angola'
import { burundi } from './burundi'
import { cameroon } from './cameroon'
import { centralAfricanRepublic } from './centralAfricanRepublic'
import { chad } from './chad'
import { democraticRepublicOfTheCongo } from './democraticRepublicOfTheCongo'
import { equatorialGuinea } from './equatorialGuinea'
import { gabon } from './gabon'
import { republicOfTheCongo } from './republicOfTheCongo'
import { saoTomeAndPrincipe } from './saoTomeAndPrincipe'

export {
  angola,
  burundi,
  cameroon,
  centralAfricanRepublic,
  chad,
  democraticRepublicOfTheCongo,
  equatorialGuinea,
  gabon,
  republicOfTheCongo,
  saoTomeAndPrincipe,
}

/** All ECCAS partner states represented in this module (10). */
export const eccasMembers: readonly EccasCountry[] = [
  angola,
  burundi,
  cameroon,
  centralAfricanRepublic,
  chad,
  democraticRepublicOfTheCongo,
  equatorialGuinea,
  gabon,
  republicOfTheCongo,
  saoTomeAndPrincipe,
] as const

/**
 * Economic Community of Central African States — bloc metadata (verify against ceeac-eccas.org).
 */
export const eccas: EccasOrganizationInfo = {
  officialName: 'Economic Community of Central African States',
  abbreviation: 'ECCAS',
  established:
    '1983-10-18 (Libreville founding treaty); revived / reinforced post-1990s — informational — verify current instruments',
  headquartersCity: 'Libreville',
  headquartersCountry: 'Gabon',
  memberStatesIso2: ['AO', 'BI', 'CM', 'CF', 'TD', 'CD', 'GQ', 'GA', 'CG', 'ST'],
  memberRecordsInModule: 10,
}
