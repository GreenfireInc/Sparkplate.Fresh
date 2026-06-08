export type {
  BondMarketVenue,
  CptppCountry,
  CptppOrganizationInfo,
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
  NotableUniversity,
  NewsOutlet,
  NewsOutletsRoster,  RareEarths,
  SecuritiesExchangeCommission,
} from './types'
export { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export { CPTPP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export { CPTPP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
export { CPTPP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
export { CPTPP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'

import type { CptppCountry, CptppOrganizationInfo } from './types'
import { CPTPP_MEMBER_ISO_CODES } from './cptppMemberIsoCodes'
import { australia } from './australia'
import { brunei } from './brunei'
import { canada } from './canada'
import { chile } from './chile'
import { japan } from './japan'
import { malaysia } from './malaysia'
import { mexico } from './mexico'
import { newZealand } from './newZealand'
import { peru } from './peru'
import { singapore } from './singapore'
import { unitedKingdom } from './unitedKingdom'
import { vietnam } from './vietnam'

export {
  australia,
  brunei,
  canada,
  chile,
  japan,
  malaysia,
  mexico,
  newZealand,
  peru,
  singapore,
  unitedKingdom,
  vietnam,
}

/** All CPTPP parties represented in this module (12). */
export const cptppMembers: readonly CptppCountry[] = [
  australia,
  brunei,
  canada,
  chile,
  japan,
  malaysia,
  mexico,
  newZealand,
  peru,
  singapore,
  unitedKingdom,
  vietnam,
] as const

/**
 * Comprehensive and Progressive Agreement for Trans-Pacific Partnership — reference metadata (verify against depository / National legislation).
 */
export const cptpp: CptppOrganizationInfo = {
  officialName: 'Comprehensive and Progressive Agreement for Trans-Pacific Partnership',
  abbreviation: 'CPTPP',
  established:
    '2018-12-30 (first entrants into force); successive accessions including United Kingdom — informational; verify dates',
  headquartersCity: 'Auckland',
  headquartersCountry: 'New Zealand',
  memberStatesIso2: CPTPP_MEMBER_ISO_CODES,
  memberRecordsInModule: 12,
}
