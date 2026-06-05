import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const saintKittsAndNevis: CommonwealthCountry = {
  name: 'Saint Kitts and Nevis',
  iso3166Alpha2: 'KN',
  commonwealthStatus: 'member',
  capital: 'Basseterre',
  coordinates: { latitude: 17.3026, longitude: -62.7177 },
  independence: '1983-09-19',
  topMajorCities: ['Basseterre', 'Charlestown', 'Sandy Point', 'Cayon', 'Dieppe Bay'],
  population: 48000,
  mainLanguages: ['English', 'Saint Kitts Creole', 'French patois (historical)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Kitts',
  foundingLeader: 'Kennedy Simmonds (first Prime Minister)',
  currentLeader: 'Terrance Drew (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['KN'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['KN'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['KN'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['KN'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['KN'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['KN'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['KN'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['KN'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['KN'],
}
