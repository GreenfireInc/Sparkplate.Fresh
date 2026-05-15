import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const singapore: CommonwealthCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  commonwealthStatus: 'member',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence: '1965-08-09',
  topMajorCities: ['Singapore', 'Jurong East', 'Tampines', 'Woodlands', 'Bedok'],
  population: 6000000,
  mainLanguages: ['English', 'Mandarin', 'Malay'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew (first Prime Minister)',
  currentLeader: 'Lawrence Wong (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Crypto.com', 'Independent Reserve'],
  stablecoin: 'XSGD and USDC (regulated venues); USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
}
