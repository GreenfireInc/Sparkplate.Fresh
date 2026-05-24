export type {
  MintCountry,
  MintOrganizationInfo,
  DomesticCourierService,
  MainExportCommodities,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
} from './types'

import type { MintCountry, MintOrganizationInfo } from './types'
import { MINT_MEMBER_ISO_CODES } from './mintMemberIsoCodes'
import { mexico } from './mexico'
import { indonesia } from './indonesia'
import { nigeria } from './nigeria'
import { turkey } from './turkey'

export { mexico, indonesia, nigeria, turkey }

/** MINT country records shipped in this module (4 — Mexico, Indonesia, Nigeria, Türkiye). */
export const mintMembers: readonly MintCountry[] = [mexico, indonesia, nigeria, turkey] as const

/**
 * MINT — reference bloc metadata (analyst/acronym grouping; Jim O'Neill-era emerging-market shorthand;
 * no charter secretariat — informational).
 */
export const mint: MintOrganizationInfo = {
  officialName: 'MINT (Mexico · Indonesia · Nigeria · Türkiye emerging-market shorthand)',
  abbreviation: 'MINT',
  established:
    'Circa early 2010s financial-media / economist acronym (distinct from chartered regional blocs; membership informal — informational)',
  headquartersCity: '—',
  headquartersCountry:
    'No intergovernmental secretariat; juxtaposed only in investment narratives — informational',
  memberStatesIso2: MINT_MEMBER_ISO_CODES,
  memberRecordsInModule: 4,
}
