import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const eswatini: ComesaCountry = {
  name: 'Eswatini',
  iso3166Alpha2: 'SZ',
  capital: 'Mbabane (administrative); Lobamba (royal and legislative)',
  coordinates: { latitude: -26.3054, longitude: 31.1367 },
  independence: '1968-09-06',
  topMajorCities: ['Manzini', 'Mbabane', 'Big Bend', 'Malkerns', 'Siteki'],
  population: 1200000,
  mainLanguages: ['siSwati', 'English', 'Zulu (minority communities)'],
  currency: 'Swazi lilangeni (SZL); South African rand (ZAR) accepted',
  timezone: 'Africa/Mbabane',
  foundingLeader: 'Sobhuza II (King at independence)',
  currentLeader: 'King Mswati III; Prime Minister Russell Dlamini — verify',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT / USDC via southern African corridors',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['SZ'],
  newsOutlets: COMESA_NEWS_OUTLETS['SZ'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['SZ'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['SZ'],
  stockExchange: 'Eswatini Stock Exchange',
}
