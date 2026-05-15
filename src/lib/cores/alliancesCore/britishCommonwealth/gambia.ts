import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const gambia: CommonwealthCountry = {
  name: 'Gambia',
  iso3166Alpha2: 'GM',
  commonwealthStatus: 'member',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.579 },
  independence: '1965-02-18',
  topMajorCities: ['Serekunda', 'Brikama', 'Banjul', 'Bakau', 'Farafenni'],
  population: 2700000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara (first Prime Minister)',
  currentLeader: 'Adama Barrow (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal; no major GMD stablecoin',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GM'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GM'],
  stockExchange: 'Gambia Stock Exchange',
}
