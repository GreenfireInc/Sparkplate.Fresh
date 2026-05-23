import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const sierraLeone: AfricanUnionCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  africanUnionStatus: 'member',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'],
  population: 8500000,
  mainLanguages: ['English', 'Krio', 'Mende'],
  currency: 'Sierra Leonean leone (SLE)',
  timezone: 'Africa/Freetown',
  foundingLeader: 'Milton Margai',
  currentLeader: 'Julius Maada Bio (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SL'],
  newsOutlets: AU_NEWS_OUTLETS['SL'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SL'],
  stockExchange: 'Sierra Leone Stock Exchange',
}
