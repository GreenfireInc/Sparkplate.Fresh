import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const kenya: CommonwealthCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  commonwealthStatus: 'member',
  capital: 'Nairobi',
  coordinates: { latitude: -1.286389, longitude: 36.817223 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 55000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta (first President)',
  currentLeader: 'William Ruto (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local brokers'],
  stablecoin: 'USDT informal; CBDC exploration — verify',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['KE'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['KE'],
  stockExchange: 'Nairobi Securities Exchange',
}
