export type {
  BondMarketVenue,
  DomesticCourierService,
  DomesticPostService,
  PostalCodeSchema,
  GccCountry,
  GccOrganizationInfo,
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
  RareEarths,
  SecuritiesExchangeCommission,
} from './types'
export { GCC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { GCC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export { GCC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export { GCC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
export { GCC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
export { GCC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'

import type { GccCountry, GccOrganizationInfo } from './types'
import { GCC_MEMBER_ISO_CODES } from './gccMemberIsoCodes'
import { bahrain } from './bahrain'
import { kuwait } from './kuwait'
import { oman } from './oman'
import { qatar } from './qatar'
import { saudiArabia } from './saudiArabia'
import { unitedArabEmirates } from './unitedArabEmirates'

export { bahrain, kuwait, oman, qatar, saudiArabia, unitedArabEmirates }

/** GCC member state records shipped in this module (6). */
export const gccMembers: readonly GccCountry[] = [
  bahrain,
  kuwait,
  oman,
  qatar,
  saudiArabia,
  unitedArabEmirates,
] as const

/**
 * Cooperation Council for the Arab States of the Gulf (GCC) — reference metadata (Secretariat General cited in
 * Riyadh Saudi Arabia subject to Secretariat communiqués — informational; verify for production).
 */
export const gcc: GccOrganizationInfo = {
  officialName: 'Cooperation Council for the Arab States of the Gulf',
  abbreviation: 'GCC',
  established:
    '1981-05-25 treaty signed Abu Dhabi UAE (Council charter; supplementary institutions Customs Union/Common Market evolution — informational)',
  headquartersCity: 'Riyadh',
  headquartersCountry: 'Saudi Arabia',
  memberStatesIso2: GCC_MEMBER_ISO_CODES,
  memberRecordsInModule: 6,
}
