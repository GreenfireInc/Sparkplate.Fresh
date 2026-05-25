import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'

export const bahamas: CaricomCountry = {
  name: 'Bahamas',
  iso3166Alpha2: 'BS',
  caricomStatus: 'full_member',
  capital: 'Nassau',
  coordinates: { latitude: 25.0343, longitude: -77.3963 },
  independence: '1973-07-10',
  topMajorCities: ['Nassau', 'Freeport', 'West End', 'Marsh Harbour', 'Coopers Town'],
  population: 400000,
  mainLanguages: ['English', 'Bahamian Creole', 'Haitian Creole'],
  currency: 'Bahamian dollar (BSD); USD widely used',
  timezone: 'America/Nassau',
  foundingLeader: 'Lynden Pindling (first Prime Minister)',
  currentLeader: 'Philip Davis (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'Sand dollar (CBDC context); USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['BS'],
  newsOutlets: CARICOM_NEWS_OUTLETS['BS'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['BS'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['BS'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['BS'],
  rareEarths: CARICOM_RARE_EARTHS['BS'],
  stockExchange: 'Bahamas International Securities Exchange (BISX)',
  bondMarkets: CARICOM_BOND_MARKETS['BS'],
}
