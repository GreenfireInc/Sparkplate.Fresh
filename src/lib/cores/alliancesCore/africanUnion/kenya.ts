import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const kenya: AfricanUnionCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  africanUnionStatus: 'member',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2864, longitude: 36.8172 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta',
  currentLeader: 'William Ruto (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local blockchain startups'],
  stablecoin: 'USDT / USDC; regulatory environment evolving',
  domesticCourierServices: AU_DOMESTIC_COURIERS['KE'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
}
