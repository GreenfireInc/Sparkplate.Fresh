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

export const mozambique: CommonwealthCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  commonwealthStatus: 'member',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence: '1975-06-25',
  topMajorCities: ['Maputo', 'Matola', 'Nampula', 'Beira', 'Chimoio'],
  population: 33000000,
  mainLanguages: ['Portuguese', 'Makhuwa', 'Tsonga'],
  currency: 'Mozambican metical (MZN)',
  timezone: 'Africa/Maputo',
  foundingLeader: 'Samora Machel (first President)',
  currentLeader: 'Daniel Chapo (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MZ'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['MZ'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['MZ'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['MZ'],
  stockExchange: 'Bolsa de Valores de Moçambique',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['MZ'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['MZ'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['MZ'],
}
