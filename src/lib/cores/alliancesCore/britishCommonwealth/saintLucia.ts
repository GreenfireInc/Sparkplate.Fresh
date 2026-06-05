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

export const saintLucia: CommonwealthCountry = {
  name: 'Saint Lucia',
  iso3166Alpha2: 'LC',
  commonwealthStatus: 'member',
  capital: 'Castries',
  coordinates: { latitude: 14.0101, longitude: -60.9877 },
  independence: '1979-02-22',
  topMajorCities: ['Castries', 'Vieux Fort', 'Micoud', 'Soufrière', 'Dennery'],
  population: 180000,
  mainLanguages: ['English', 'Saint Lucian Creole French', 'French'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/St_Lucia',
  foundingLeader: 'John Compton (first Prime Minister)',
  currentLeader: 'Philip J. Pierre (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['LC'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['LC'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['LC'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['LC'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['LC'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['LC'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['LC'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['LC'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['LC'],
}
