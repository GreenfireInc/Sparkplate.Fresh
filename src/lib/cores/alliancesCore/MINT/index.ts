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
  MintCountry,
  MintOrganizationInfo,
  NewsOutlet,
  NewsOutletsRoster,
  NotableUniversity,
  RareEarths,
  SecuritiesExchangeCommission,
} from './types'
export { MINT_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { MINT_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export { MINT_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export { MINT_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
export { MINT_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
export { MINT_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'

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
