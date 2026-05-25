export type {
  BondMarketVenue,
  ComesaCountry,
  ComesaOrganizationInfo,
  DomesticCourierService,
  MainExportCommodities,
  MainExportedElements,
  NotableUniversity,
  NewsOutlet,
  NewsOutletsRoster,
  RareEarths,
} from './types'

import type { ComesaCountry, ComesaOrganizationInfo } from './types'
import { COMESA_MEMBER_ISO_CODES } from './comesaMemberIsoCodes'
import { djibouti } from './djibouti'
import { egypt } from './egypt'
import { eritrea } from './eritrea'
import { ethiopia } from './ethiopia'
import { libya } from './libya'
import { sudan } from './sudan'
import { tunisia } from './tunisia'
import { comoros } from './comoros'
import { madagascar } from './madagascar'
import { mauritius } from './mauritius'
import { seychelles } from './seychelles'
import { burundi } from './burundi'
import { kenya } from './kenya'
import { malawi } from './malawi'
import { rwanda } from './rwanda'
import { uganda } from './uganda'
import { eswatini } from './eswatini'
import { zambia } from './zambia'
import { zimbabwe } from './zimbabwe'
import { democraticRepublicOfTheCongo } from './democraticRepublicOfTheCongo'

export {
  djibouti,
  egypt,
  eritrea,
  ethiopia,
  libya,
  sudan,
  tunisia,
  comoros,
  madagascar,
  mauritius,
  seychelles,
  burundi,
  kenya,
  malawi,
  rwanda,
  uganda,
  eswatini,
  zambia,
  zimbabwe,
  democraticRepublicOfTheCongo,
}

/** All COMESA member country records shipped in this module (20). */
export const comesaMembers: readonly ComesaCountry[] = [
  djibouti,
  egypt,
  eritrea,
  ethiopia,
  libya,
  sudan,
  tunisia,
  comoros,
  madagascar,
  mauritius,
  seychelles,
  burundi,
  kenya,
  malawi,
  rwanda,
  uganda,
  eswatini,
  zambia,
  zimbabwe,
  democraticRepublicOfTheCongo,
] as const

/**
 * Common Market for Eastern and Southern Africa — bloc metadata (verify against comesa.int).
 */
export const comesa: ComesaOrganizationInfo = {
  officialName: 'Common Market for Eastern and Southern Africa',
  abbreviation: 'COMESA',
  established:
    '1993-11-08 (Treaty signed Port Louis, Mauritius); launched 1994-12-08 — informational',
  headquartersCity: 'Lusaka',
  headquartersCountry: 'Zambia',
  memberStatesIso2: COMESA_MEMBER_ISO_CODES,
  memberRecordsInModule: 20,
}
