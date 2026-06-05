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

export const guyana: CommonwealthCountry = {
  name: 'Guyana',
  iso3166Alpha2: 'GY',
  commonwealthStatus: 'member',
  capital: 'Georgetown',
  coordinates: { latitude: 6.8013, longitude: -58.1551 },
  independence: '1966-05-26',
  topMajorCities: ['Georgetown', 'Linden', 'New Amsterdam', 'Bartica', 'Skeldon'],
  population: 800000,
  mainLanguages: ['English', 'Guyanese Creole', 'Hindi'],
  currency: 'Guyanese dollar (GYD)',
  timezone: 'America/Guyana',
  foundingLeader: 'Forbes Burnham (first Executive President era)',
  currentLeader: 'Irfaan Ali (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GY'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GY'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GY'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GY'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GY'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GY'],
  stockExchange: 'Guyana Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['GY'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['GY'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['GY'],
}
