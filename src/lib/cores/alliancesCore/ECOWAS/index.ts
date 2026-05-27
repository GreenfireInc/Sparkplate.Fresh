export type {
  BondMarketVenue,
  DomesticCourierService,
  EcowasCountry,
  EcowasOrganizationInfo,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  NotableUniversity,
  NewsOutlet,
  NewsOutletsRoster,
  RareEarths,
} from './types'

import type { EcowasCountry, EcowasOrganizationInfo } from './types'
import { ECOWAS_MEMBER_ISO_CODES } from './ecowasMemberIsoCodes'
import { benin } from './benin'
import { capeVerde } from './capeVerde'
import { gambia } from './gambia'
import { ghana } from './ghana'
import { guinea } from './guinea'
import { guineaBissau } from './guineaBissau'
import { ivoryCoast } from './ivoryCoast'
import { liberia } from './liberia'
import { nigeria } from './nigeria'
import { senegal } from './senegal'
import { sierraLeone } from './sierraLeone'
import { togo } from './togo'

export {
  benin,
  capeVerde,
  gambia,
  ghana,
  guinea,
  guineaBissau,
  ivoryCoast,
  liberia,
  nigeria,
  senegal,
  sierraLeone,
  togo,
}

/** All ECOWAS member states represented in this module (12). */
export const ecowasMembers: readonly EcowasCountry[] = [
  benin,
  capeVerde,
  gambia,
  ghana,
  guinea,
  guineaBissau,
  ivoryCoast,
  liberia,
  nigeria,
  senegal,
  sierraLeone,
  togo,
] as const

/**
 * Economic Community of West African States — bloc metadata (verify against ecowas.int).
 */
export const ecowas: EcowasOrganizationInfo = {
  officialName: 'Economic Community of West African States',
  abbreviation: 'ECOWAS',
  established:
    '1975-05-28 (Treaty of Lagos); revisions and institutions evolution — informational; ECO single-currency programme narrative — verify status',
  headquartersCity: 'Abuja',
  headquartersCountry: 'Nigeria',
  memberStatesIso2: ECOWAS_MEMBER_ISO_CODES,
  memberRecordsInModule: 12,
}
