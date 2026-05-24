export type {
  OecsCountry,
  OecsOrganizationInfo,
  DomesticCourierService,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
} from './types'

import type { OecsCountry, OecsOrganizationInfo } from './types'
import { OECS_MEMBER_ISO_CODES } from './oecsMemberIsoCodes'
import { antiguaAndBarbuda } from './antiguaAndBarbuda'
import { anguilla } from './anguilla'
import { dominica } from './dominica'
import { grenada } from './grenada'
import { montserrat } from './montserrat'
import { saintKittsAndNevis } from './saintKittsAndNevis'
import { saintLucia } from './saintLucia'
import { saintVincentAndTheGrenadines } from './saintVincentAndTheGrenadines'

export {
  antiguaAndBarbuda,
  anguilla,
  dominica,
  grenada,
  montserrat,
  saintKittsAndNevis,
  saintLucia,
  saintVincentAndTheGrenadines,
}

/** OECS entries in this module in user list order (8). */
export const oecsMembers: readonly OecsCountry[] = [
  antiguaAndBarbuda,
  dominica,
  grenada,
  montserrat,
  saintKittsAndNevis,
  saintLucia,
  saintVincentAndTheGrenadines,
  anguilla,
] as const

/**
 * Organisation of Eastern Caribbean States — reference bloc metadata (Eastern Caribbean Economic Union under
 * Revised Treaty of Basseterre 2010 — informational).
 */
export const oecs: OecsOrganizationInfo = {
  officialName: 'Organisation of Eastern Caribbean States',
  abbreviation: 'OECS',
  established:
    '1981-06-18 Treaty of Basseterre; Revised Treaty of Basseterre 2010 (ECEU / single market evolution — informational)',
  headquartersCity: 'Castries',
  headquartersCountry: 'Saint Lucia',
  memberStatesIso2: OECS_MEMBER_ISO_CODES,
  memberRecordsInModule: 8,
}
