import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const malaysia: CommonwealthCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  commonwealthStatus: 'member',
  capital: 'Kuala Lumpur',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence: '1957-08-31',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Shah Alam', 'Petaling Jaya'],
  population: 34000000,
  mainLanguages: ['Malay', 'English', 'Chinese'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Tunku Abdul Rahman (first Prime Minister)',
  currentLeader: 'Anwar Ibrahim (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'Tokenize', 'Binance (P2P)'],
  stablecoin: 'MYR stablecoins limited; USDT common',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MY'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MY'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MY'],
  stockExchange: 'Bursa Malaysia',
}
