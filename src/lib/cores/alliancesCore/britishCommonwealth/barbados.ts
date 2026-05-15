import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const barbados: CommonwealthCountry = {
  name: 'Barbados',
  iso3166Alpha2: 'BB',
  commonwealthStatus: 'member',
  capital: 'Bridgetown',
  coordinates: { latitude: 13.1, longitude: -59.6167 },
  independence: '1966-11-30',
  topMajorCities: ['Bridgetown', 'Speightstown', 'Oistins', 'Bathsheba', 'Holetown'],
  population: 282000,
  mainLanguages: ['English', 'Bajan Creole', 'Portuguese (small community)'],
  currency: 'Barbadian dollar (BBD)',
  timezone: 'America/Barbados',
  foundingLeader: 'Errol Barrow (first Prime Minister)',
  currentLeader: 'Mia Mottley (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'BBD pegged to USD; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BB'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['BB'],
  stockExchange: 'Barbados Stock Exchange',
}
