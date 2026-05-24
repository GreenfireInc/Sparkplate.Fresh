import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const china: BeltAndRoadInitiativeCountry = {
  name: 'China',
  iso3166Alpha2: 'CN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Beijing',
  coordinates: { latitude: 35, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Beijing', 'China — city 2 (verify)', 'China — city 3 (verify)', 'China — city 4 (verify)', 'China — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1408280000,
  mainLanguages: [ 'Chinese', 'English', 'Regional languages' ],
  currency: 'Chinese yuan (CNY)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CN'],
  newsOutlets: BRI_NEWS_OUTLETS['CN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CN'],
  stockExchange: 'National or regional exchange (verify)',
}
