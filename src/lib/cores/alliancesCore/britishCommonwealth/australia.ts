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

export const australia: CommonwealthCountry = {
  name: 'Australia',
  iso3166Alpha2: 'AU',
  commonwealthStatus: 'member',
  capital: 'Canberra',
  coordinates: { latitude: -35.2809, longitude: 149.13 },
  independence: '1901-01-01 (Federation); 1986 Australia Act',
  topMajorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  population: 26500000,
  mainLanguages: ['English', 'Auslan', 'Italian (community)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Australia/Sydney',
  foundingLeader: 'Edmund Barton (first Prime Minister)',
  currentLeader: 'Anthony Albanese (Prime Minister)',
  cryptocurrencyExchanges: ['Independent Reserve', 'BTC Markets', 'Binance AU'],
  stablecoin: 'AUD stablecoins limited; USDC/USDT common',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['AU'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['AU'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['AU'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['AU'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['AU'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['AU'],
  stockExchange: 'Australian Securities Exchange (ASX)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['AU'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['AU'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['AU'],
}
