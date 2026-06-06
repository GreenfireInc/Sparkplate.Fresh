export type {
  BondMarketVenue,
  DomesticCourierService,
  IntellectualPropertyDepartment,
  IntellectualPropertyDepartmentKind,
  IntellectualPropertyDepartmentsRoster,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
  SadcCountry,
  SadcOrganizationInfo,
} from './types'
export { SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { SADC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

import type { SadcCountry, SadcOrganizationInfo } from './types'
import { SADC_MEMBER_ISO_CODES } from './sadcMemberIsoCodes'
import { angola } from './angola'
import { botswana } from './botswana'
import { comoros } from './comoros'
import { democraticRepublicOfTheCongo } from './democraticRepublicOfTheCongo'
import { eswatini } from './eswatini'
import { lesotho } from './lesotho'
import { madagascar } from './madagascar'
import { malawi } from './malawi'
import { mauritius } from './mauritius'
import { mozambique } from './mozambique'
import { namibia } from './namibia'
import { seychelles } from './seychelles'
import { southAfrica } from './southAfrica'
import { tanzania } from './tanzania'
import { zambia } from './zambia'
import { zimbabwe } from './zimbabwe'

export {
  angola,
  botswana,
  comoros,
  democraticRepublicOfTheCongo,
  eswatini,
  lesotho,
  madagascar,
  malawi,
  mauritius,
  mozambique,
  namibia,
  seychelles,
  southAfrica,
  tanzania,
  zambia,
  zimbabwe,
}

/** All SADC member country records shipped in this module (16). */
export const sadcMembers: readonly SadcCountry[] = [
  angola,
  botswana,
  comoros,
  democraticRepublicOfTheCongo,
  eswatini,
  lesotho,
  madagascar,
  malawi,
  mauritius,
  mozambique,
  namibia,
  seychelles,
  southAfrica,
  tanzania,
  zambia,
  zimbabwe,
] as const

/**
 * Southern African Development Community — reference bloc metadata (verify membership and Secretariat details against sadc.int).
 */
export const sadc: SadcOrganizationInfo = {
  officialName: 'Southern African Development Community',
  abbreviation: 'SADC',
  established:
    '1980 precursor Southern African Development Coordination Conference (SADCC); SADC Treaty 1992 — informational',
  headquartersCity: 'Gaborone',
  headquartersCountry: 'Botswana',
  memberStatesIso2: SADC_MEMBER_ISO_CODES,
  memberRecordsInModule: 16,
}
