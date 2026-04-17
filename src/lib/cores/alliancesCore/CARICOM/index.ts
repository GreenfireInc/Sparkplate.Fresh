export type { CaricomCountry, CaricomMembership, CaricomOrganizationInfo } from './types'

import type { CaricomCountry, CaricomOrganizationInfo } from './types'
import { antiguaAndBarbuda } from './antiguaAndBarbuda'
import { bahamas } from './bahamas'
import { barbados } from './barbados'
import { belize } from './belize'
import { dominica } from './dominica'
import { grenada } from './grenada'
import { guyana } from './guyana'
import { haiti } from './haiti'
import { jamaica } from './jamaica'
import { montserrat } from './montserrat'
import { saintKittsAndNevis } from './saintKittsAndNevis'
import { saintLucia } from './saintLucia'
import { saintVincentAndTheGrenadines } from './saintVincentAndTheGrenadines'
import { suriname } from './suriname'
import { trinidadAndTobago } from './trinidadAndTobago'
import { anguilla } from './anguilla'
import { bermuda } from './bermuda'
import { britishVirginIslands } from './britishVirginIslands'
import { caymanIslands } from './caymanIslands'
import { turksAndCaicosIslands } from './turksAndCaicosIslands'

export { antiguaAndBarbuda, bahamas, barbados, belize, dominica, grenada, guyana, haiti, jamaica, montserrat, saintKittsAndNevis, saintLucia, saintVincentAndTheGrenadines, suriname, trinidadAndTobago, anguilla, bermuda, britishVirginIslands, caymanIslands, turksAndCaicosIslands }

/** CARICOM full members represented in this module (15). */
export const caricomFullMembers: readonly CaricomCountry[] = [antiguaAndBarbuda, bahamas, barbados, belize, dominica, grenada, guyana, haiti, jamaica, montserrat, saintKittsAndNevis, saintLucia, saintVincentAndTheGrenadines, suriname, trinidadAndTobago] as const

/** CARICOM associate members represented in this module (5). */
export const caricomAssociateMembers: readonly CaricomCountry[] = [anguilla, bermuda, britishVirginIslands, caymanIslands, turksAndCaicosIslands] as const

/** All CARICOM entries in this module (20). */
export const caricomMembers: readonly CaricomCountry[] = [antiguaAndBarbuda, bahamas, barbados, belize, dominica, grenada, guyana, haiti, jamaica, montserrat, saintKittsAndNevis, saintLucia, saintVincentAndTheGrenadines, suriname, trinidadAndTobago, anguilla, bermuda, britishVirginIslands, caymanIslands, turksAndCaicosIslands] as const

/**
 * The Caribbean Community (CARICOM) is a regional bloc of Caribbean states and territories.
 * Reference data — verify against the CARICOM Secretariat and official instruments.
 */
export const caricom: CaricomOrganizationInfo = {
  officialName: 'Caribbean Community',
  abbreviation: 'CARICOM',
  predecessorContext:
    'Established by the Treaty of Chaguaramas (1973); revised treaty deepened the Single Market and economy. Full members are independent states (and Montserrat as a British Overseas Territory with membership); associate members are non-independent territories — informational.',
  established: {
    treatyOfChaguaramas: '1973-07-04 (Treaty of Chaguaramas — founding; Barbados, Guyana, Jamaica, Trinidad and Tobago, etc.)',
    revisedTreatyContext: '2001 Revised Treaty of Chaguaramas (CSME framework — verify current texts)',
  },
  headquarters: {
    city: 'Georgetown',
    country: 'Guyana',
    coordinates: { latitude: 6.8013, longitude: -58.1551 },
    arrangementNotes:
      'CARICOM Secretariat is located in Georgetown, Guyana (Secretary-General leads; sub-agencies and institutions are spread across member states — informational).',
  },
  principalOrgans: [
    'Conference of Heads of Government',
    'Council of Ministers / Ministerial Councils',
    'CARICOM Secretariat (Georgetown)',
    'Community Council',
    'Specialized institutions (e.g. CROSQ, CMO, IMPACS context — informational)',
  ],
  objectivesSummary: [
    'Economic integration, coordination of foreign policy, and functional cooperation',
    'Caribbean Single Market and Economy (CSME) where applicable among participating states',
    'Human and social development, security, and disaster risk reduction cooperation',
    'Representation in international forums as a coordinated region where agreed',
  ],
  fullMemberStatesIso2: ['AG', 'BS', 'BB', 'BZ', 'DM', 'GD', 'GY', 'HT', 'JM', 'MS', 'KN', 'LC', 'VC', 'SR', 'TT'],
  associateMemberStatesIso2: ['AI', 'BM', 'VG', 'KY', 'TC'],
  memberRecordsInModule: 20,
}
