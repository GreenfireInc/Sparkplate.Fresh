import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CPTPP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CPTPP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CPTPP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const newZealand: CptppCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2865, longitude: 174.776 },
  independence: '1907-09-26 (Dominion status; full legislative independence phased — informational)',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Richard Seddon (long-serving colonial PM reference); Dominion transition — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'Independent Reserve AU/NZ corridor', 'Global brokers'],
  stablecoin: 'NZD-pegged limited; USDC adoption in fintech — verify',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['NZ'],
  domesticPostService: CPTPP_DOMESTIC_POST_SERVICES['NZ'],
  nationalBankingInstitutions: CPTPP_NATIONAL_BANKING_INSTITUTIONS['NZ'],
  corporationFormationOffice: CPTPP_CORPORATION_FORMATION_OFFICES['NZ'],
  newsOutlets: CPTPP_NEWS_OUTLETS['NZ'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: CPTPP_RARE_EARTHS['NZ'],
  stockExchange: 'NZX Limited',
  bondMarkets: CPTPP_BOND_MARKETS['NZ'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['NZ'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['NZ'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['NZ'],
  mainInternationalSeaport: CPTPP_MAIN_INTERNATIONAL_SEAPORTS['NZ'],
}
