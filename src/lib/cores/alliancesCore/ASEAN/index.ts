export type {
  AseanCountry,
  AseanOrganizationInfo,
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
  SecuritiesExchangeCommission,
} from './types'
export { ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { ASEAN_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export { ASEAN_MEMBER_ISO_CODES } from './aseanMemberIsoCodes'
export type { AseanMemberIsoCode } from './aseanMemberIsoCodes'

import type { AseanCountry, AseanOrganizationInfo } from './types'
import { ASEAN_MEMBER_ISO_CODES } from './aseanMemberIsoCodes'
import { brunei } from './brunei'
import { cambodia } from './cambodia'
import { indonesia } from './indonesia'
import { laos } from './laos'
import { malaysia } from './malaysia'
import { myanmar } from './myanmar'
import { philippines } from './philippines'
import { singapore } from './singapore'
import { thailand } from './thailand'
import { timorLeste } from './timorLeste'
import { vietnam } from './vietnam'

export {
  brunei,
  cambodia,
  indonesia,
  laos,
  malaysia,
  myanmar,
  philippines,
  singapore,
  thailand,
  timorLeste,
  vietnam,
}

/**
 * ASEAN entries in module order (11 states). Timor-Leste may still be on an accession/observer roadmap — verify roster
 * against latest Summit communiqués if you require de jure full membership only.
 */
export const aseanMembers: readonly AseanCountry[] = [
  brunei,
  cambodia,
  indonesia,
  laos,
  malaysia,
  myanmar,
  philippines,
  singapore,
  thailand,
  timorLeste,
  vietnam,
] as const

/**
 * Association of Southeast Asian Nations — reference metadata (Charter-era institutions; Secretariat premises in
 * Jakarta — informational).
 */
export const asean: AseanOrganizationInfo = {
  officialName: 'Association of Southeast Asian Nations',
  abbreviation: 'ASEAN',
  established:
    '1967-08-08 Bangkok Declaration founding; ASEAN Charter effective 2008-12-15 (Community pillars evolution — informational)',
  headquartersCity: 'Jakarta',
  headquartersCountry: 'Indonesia',
  memberStatesIso2: ASEAN_MEMBER_ISO_CODES,
  memberRecordsInModule: 11,
}
