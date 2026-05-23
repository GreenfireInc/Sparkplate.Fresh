import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const belize: CommonwealthCountry = {
  name: 'Belize',
  iso3166Alpha2: 'BZ',
  commonwealthStatus: 'member',
  capital: 'Belmopan',
  coordinates: { latitude: 17.251, longitude: -88.759 },
  independence: '1981-09-21',
  topMajorCities: ['Belize City', 'San Ignacio', 'Orange Walk', 'Dangriga', 'Corozal'],
  population: 410000,
  mainLanguages: ['English', 'Spanish', 'Kriol'],
  currency: 'Belize dollar (BZD)',
  timezone: 'America/Belize',
  foundingLeader: 'George Cadle Price (first Prime Minister)',
  currentLeader: 'John Briceño (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'BZD pegged to USD; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['BZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['BZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['BZ'],
  stockExchange: 'Belize Stock Exchange',
}
