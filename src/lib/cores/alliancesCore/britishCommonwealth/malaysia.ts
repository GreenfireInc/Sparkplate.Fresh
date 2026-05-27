import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['MY'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['MY'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['MY'],
  stockExchange: 'Bursa Malaysia',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['MY'],
}
