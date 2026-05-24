import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const myanmar: BeltAndRoadInitiativeCountry = {
  name: 'Myanmar',
  iso3166Alpha2: 'MM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Naypyidaw',
  coordinates: { latitude: 22, longitude: 98 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Naypyidaw', 'Myanmar — city 2 (verify)', 'Myanmar — city 3 (verify)', 'Myanmar — city 4 (verify)', 'Myanmar — city 5 (verify)' ] as [string, string, string, string, string],
  population: 51316756,
  mainLanguages: [ 'Burmese', 'English', 'Regional languages' ],
  currency: 'Burmese kyat (MMK)',
  timezone: 'UTC+06:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MM'],
  newsOutlets: BRI_NEWS_OUTLETS['MM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MM'],
  stockExchange: 'National or regional exchange (verify)',
}
