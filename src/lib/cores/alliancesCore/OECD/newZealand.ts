import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const newZealand: OecdCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    '1907 Dominion to fully independent evolution; OECD member since May 1973 — informational',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Michael Savage / Peter Fraser social compact reference — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'FMCA/DIA licensing context — informational'],
  stablecoin: 'NZD-referenced issuance (thin); RB NZ supervisory evolution — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['NZ'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['NZ'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['NZ'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['NZ'],
  newsOutlets: OECD_NEWS_OUTLETS['NZ'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: OECD_RARE_EARTHS['NZ'],
  stockExchange: 'NZX Limited',
  bondMarkets: OECD_BOND_MARKETS['NZ'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['NZ'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['NZ'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['NZ'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['NZ'],
}
