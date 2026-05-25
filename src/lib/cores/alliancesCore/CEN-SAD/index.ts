export type {
  BondMarketVenue,
  CensadCountry,
  CensadOrganizationInfo,
  DomesticCourierService,
  MainExportCommodities,
  MainExportedElements,
  NotableUniversity,
  NewsOutlet,
  NewsOutletsRoster,
  RareEarths,
} from './types'

import type { CensadCountry, CensadOrganizationInfo } from './types'
import { CENSAD_MEMBER_ISO_CODES } from './censadMemberIsoCodes'
import { benin } from './benin'
import { burkinaFaso } from './burkinaFaso'
import { centralAfricanRepublic } from './centralAfricanRepublic'
import { chad } from './chad'
import { comoros } from './comoros'
import { djibouti } from './djibouti'
import { egypt } from './egypt'
import { eritrea } from './eritrea'
import { gambia } from './gambia'
import { ghana } from './ghana'
import { guinea } from './guinea'
import { guineaBissau } from './guineaBissau'
import { ivoryCoast } from './ivoryCoast'
import { libya } from './libya'
import { mali } from './mali'
import { mauritania } from './mauritania'
import { morocco } from './morocco'
import { niger } from './niger'
import { nigeria } from './nigeria'
import { senegal } from './senegal'
import { sierraLeone } from './sierraLeone'
import { somalia } from './somalia'
import { sudan } from './sudan'
import { togo } from './togo'
import { tunisia } from './tunisia'

export {
  benin,
  burkinaFaso,
  centralAfricanRepublic,
  chad,
  comoros,
  djibouti,
  egypt,
  eritrea,
  gambia,
  ghana,
  guinea,
  guineaBissau,
  ivoryCoast,
  libya,
  mali,
  mauritania,
  morocco,
  niger,
  nigeria,
  senegal,
  sierraLeone,
  somalia,
  sudan,
  togo,
  tunisia,
}

/** All CEN-SAD member country records shipped in this module (25). */
export const censadMembers: readonly CensadCountry[] = [
  benin,
  burkinaFaso,
  centralAfricanRepublic,
  chad,
  comoros,
  djibouti,
  egypt,
  eritrea,
  gambia,
  ghana,
  guinea,
  guineaBissau,
  ivoryCoast,
  libya,
  mali,
  mauritania,
  morocco,
  niger,
  nigeria,
  senegal,
  sierraLeone,
  somalia,
  sudan,
  togo,
  tunisia,
] as const

/**
 * Community of Sahel-Saharan States — reference bloc metadata (verify Secretariat and membership against official communiqués).
 */
export const censad: CensadOrganizationInfo = {
  officialName: 'Community of Sahel-Saharan States',
  abbreviation: 'CEN-SAD',
  established:
    '1998-02 (founding treaty; Ndjamena; subsequent institutional evolution — informational)',
  headquartersCity: 'Tripoli',
  headquartersCountry: 'Libya',
  memberStatesIso2: CENSAD_MEMBER_ISO_CODES,
  memberRecordsInModule: 25,
}
