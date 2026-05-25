import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'

export const trinidadAndTobago: CaricomCountry = {
  name: 'Trinidad and Tobago',
  iso3166Alpha2: 'TT',
  caricomStatus: 'full_member',
  capital: 'Port of Spain',
  coordinates: { latitude: 10.6918, longitude: -61.2225 },
  independence: '1962-08-31',
  topMajorCities: ['Chaguanas', 'San Fernando', 'Port of Spain', 'Arima', 'Point Fortin'],
  population: 1500000,
  mainLanguages: ['English', 'Trinidadian Creole', 'Hindi'],
  currency: 'Trinidad and Tobago dollar (TTD)',
  timezone: 'America/Port_of_Spain',
  foundingLeader: 'Eric Williams (first Prime Minister)',
  currentLeader: 'Kamla Persad-Bissessar (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['TT'],
  newsOutlets: CARICOM_NEWS_OUTLETS['TT'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['TT'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['TT'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['TT'],
  rareEarths: CARICOM_RARE_EARTHS['TT'],
  stockExchange: 'Trinidad and Tobago Stock Exchange',
  bondMarkets: CARICOM_BOND_MARKETS['TT'],
}
