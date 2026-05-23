import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const cameroon: BeltAndRoadInitiativeCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence: '1960-01-01',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam'] as [string, string, string, string, string],
  population: 29442327,
  mainLanguages: [ 'English', 'French', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Ahmadou Ahidjo',
  currentLeader: 'Paul Biya (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; XAF CFA peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CM'],
  newsOutlets: BRI_NEWS_OUTLETS['CM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CM'],
  stockExchange: 'Douala Stock Exchange (DSX)',
}
