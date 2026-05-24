import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const gambia: BeltAndRoadInitiativeCountry = {
  name: 'The Gambia',
  iso3166Alpha2: 'GM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.5791 },
  independence: '1965-02-18',
  topMajorCities: ['Serekunda', 'Brikama', 'Bakau', 'Banjul', 'Farafenni'] as [string, string, string, string, string],
  population: 2422712,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'dalasi (GMD)',
  timezone: 'UTC+00:00',
  foundingLeader: 'Dawda Jawara',
  currentLeader: 'Adama Barrow (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex (diaspora)'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GM'],
  newsOutlets: BRI_NEWS_OUTLETS['GM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GM'],
  stockExchange: 'Gambia Stock Exchange (limited)',
}
