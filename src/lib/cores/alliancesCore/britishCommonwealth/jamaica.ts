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

export const jamaica: CommonwealthCountry = {
  name: 'Jamaica',
  iso3166Alpha2: 'JM',
  commonwealthStatus: 'member',
  capital: 'Kingston',
  coordinates: { latitude: 17.9712, longitude: -76.7928 },
  independence: '1962-08-06',
  topMajorCities: ['Kingston', 'Montego Bay', 'Spanish Town', 'Portmore', 'Mandeville'],
  population: 2800000,
  mainLanguages: ['English', 'Jamaican Patois', 'Jamaican Sign Language'],
  currency: 'Jamaican dollar (JMD)',
  timezone: 'America/Jamaica',
  foundingLeader: 'Alexander Bustamante (first Prime Minister)',
  currentLeader: 'Andrew Holness (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['JM'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['JM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['JM'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['JM'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['JM'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['JM'],
  stockExchange: 'Jamaica Stock Exchange',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['JM'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['JM'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['JM'],
}
