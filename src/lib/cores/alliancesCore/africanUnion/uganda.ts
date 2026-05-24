import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const uganda: AfricanUnionCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  africanUnionStatus: 'member',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence: '1962-10-09',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Mukono'],
  population: 49000000,
  mainLanguages: ['English', 'Swahili', 'Luganda'],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'Africa/Kampala',
  foundingLeader: 'Milton Obote',
  currentLeader: 'Yoweri Museveni (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: AU_DOMESTIC_COURIERS['UG'],
  newsOutlets: AU_NEWS_OUTLETS['UG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['UG'],
  stockExchange: 'Uganda Securities Exchange',
}
