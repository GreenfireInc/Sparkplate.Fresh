import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const gambia: CensadCountry = {
  name: 'Gambia',
  iso3166Alpha2: 'GM',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.579 },
  independence: '1965-02-18',
  topMajorCities: ['Serrekunda', 'Brikama', 'Bakau', 'Farafenni', 'Banjul'],
  population: 2790000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara (first Prime Minister)',
  currentLeader: 'President Adama Barrow — verify',
  cryptocurrencyExchanges: ['Regional Binance P2P reported', 'Informal'],
  stablecoin: 'USDT informal',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GM'],
  newsOutlets: CENSAD_NEWS_OUTLETS['GM'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['GM'],
  stockExchange: 'Gambia Stock Exchange (small / developing — verify)',
}
