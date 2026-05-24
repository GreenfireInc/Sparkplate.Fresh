import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const eswatini: AfricanUnionCountry = {
  name: 'Eswatini',
  iso3166Alpha2: 'SZ',
  africanUnionStatus: 'member',
  capital: 'Mbabane (administrative); Lobamba (royal and legislative)',
  coordinates: { latitude: -26.3054, longitude: 31.1367 },
  independence: '1968-09-06',
  topMajorCities: ['Manzini', 'Mbabane', 'Big Bend', 'Malkerns', 'Siteki'],
  population: 1200000,
  mainLanguages: ['siSwati', 'English', 'Zulu (minority)'],
  currency: 'Swazi lilangeni (SZL); South African rand (ZAR) accepted',
  timezone: 'Africa/Mbabane',
  foundingLeader: 'Sobhuza II (King)',
  currentLeader: 'Mswati III (King); Russell Dlamini (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT / USDC via South African rails',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SZ'],
  newsOutlets: AU_NEWS_OUTLETS['SZ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SZ'],
  stockExchange: 'Eswatini Stock Exchange',
}
