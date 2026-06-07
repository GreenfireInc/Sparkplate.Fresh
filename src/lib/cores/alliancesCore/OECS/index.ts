export type {
  BondMarketVenue,
  DomesticCourierService,
  DomesticPostService,
  PostalCodeSchema,
  IntellectualPropertyDepartment,
  IntellectualPropertyDepartmentKind,
  IntellectualPropertyDepartmentsRoster,
  MainExportCommodities,
  MainExportedElements,
  MainInternationalAirport,
  MainInternationalSeaport,
  NationalBankingInstitution,
  NationalBankingInstitutions,
  CorporationFormationOffice,
  CustomsOffice,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  OecsCountry,
  OecsOrganizationInfo,
  RareEarths,
  SecuritiesExchangeCommission,
} from './types'
export { OECS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { OECS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export { OECS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export { OECS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
export { OECS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
export { OECS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'

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
