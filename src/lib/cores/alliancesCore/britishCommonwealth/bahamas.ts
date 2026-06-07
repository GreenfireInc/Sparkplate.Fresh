import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMMONWEALTH_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const bahamas: CommonwealthCountry = {
  name: 'Bahamas',
  iso3166Alpha2: 'BS',
  commonwealthStatus: 'member',
  capital: 'Nassau',
  coordinates: { latitude: 25.0343, longitude: -77.3963 },
  independence: '1973-07-10',
  topMajorCities: ['Nassau', 'Freeport', 'West End', 'Coopers Town', 'Marsh Harbour'],
  population: 400000,
  mainLanguages: ['English', 'Bahamian Creole', 'Haitian Creole (community)'],
  currency: 'Bahamian dollar (BSD); USD widely used',
  timezone: 'America/Nassau',
  foundingLeader: 'Lynden Pindling (first Prime Minister)',
  currentLeader: 'Philip Davis (Prime Minister)',
  cryptocurrencyExchanges: ['FTX legacy context; regional OTC', 'Binance (P2P)'],
  stablecoin: 'Sand dollar (CBDC pilot context); USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BS'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['BS'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['BS'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['BS'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['BS'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['BS'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['BS'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['BS'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['BS'],
  stockExchange: 'Bahamas International Securities Exchange (BISX)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['BS'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['BS'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['BS'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['BS'],
}
