import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const dominica: CaricomCountry = {
  name: 'Dominica',
  iso3166Alpha2: 'DM',
  caricomStatus: 'full_member',
  capital: 'Roseau',
  coordinates: { latitude: 15.3092, longitude: -61.3794 },
  independence: '1978-11-03',
  topMajorCities: ['Roseau', 'Portsmouth', 'Marigot', 'Mahaut', 'Saint Joseph'],
  population: 72000,
  mainLanguages: ['English', 'Dominican Creole', 'Kokoy'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Dominica',
  foundingLeader: 'Patrick John (first Prime Minister)',
  currentLeader: 'Roosevelt Skerrit (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['DM'],
  newsOutlets: CARICOM_NEWS_OUTLETS['DM'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['DM'],
  stockExchange: 'Eastern Caribbean Securities Exchange (ECSE)',
}
