import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const haiti: CaricomCountry = {
  name: 'Haiti',
  iso3166Alpha2: 'HT',
  caricomStatus: 'full_member',
  capital: 'Port-au-Prince',
  coordinates: { latitude: 18.5944, longitude: -72.3074 },
  independence: '1804-01-01',
  topMajorCities: ['Port-au-Prince', 'Cap-Haïtien', 'Les Cayes', 'Jacmel', 'Gonaïves'],
  population: 11500000,
  mainLanguages: ['French', 'Haitian Creole', 'English (limited)'],
  currency: 'Haitian gourde (HTG)',
  timezone: 'America/Port-au-Prince',
  foundingLeader: 'Jean-Jacques Dessalines (independence era)',
  currentLeader: 'Transitional context — verify official Head of State',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal; HTG volatility — verify',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['HT'],
  newsOutlets: CARICOM_NEWS_OUTLETS['HT'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['HT'],
  stockExchange: 'No major national exchange — informational',
}
