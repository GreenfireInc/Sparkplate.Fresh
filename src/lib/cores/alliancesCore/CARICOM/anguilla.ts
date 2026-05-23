import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const anguilla: CaricomCountry = {
  name: 'Anguilla',
  iso3166Alpha2: 'AI',
  caricomStatus: 'associate_member',
  capital: 'The Valley',
  coordinates: { latitude: 18.2206, longitude: -63.0686 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['The Valley', 'Stoney Ground', 'Island Harbour', 'Blowing Point', 'Sandy Ground'],
  population: 16000,
  mainLanguages: ['English', 'Anguillian Creole', 'Spanish (regional)'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Anguilla',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['AI'],
  newsOutlets: CARICOM_NEWS_OUTLETS['AI'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['AI'],
  stockExchange: 'No national exchange — informational',
}
