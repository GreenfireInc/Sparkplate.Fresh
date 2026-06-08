export type {
  BondMarketVenue,
  CensadCountry,
  CensadOrganizationInfo,
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
export { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
export { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export { CENSAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export { CENSAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
export { CENSAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
export { CENSAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'

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
