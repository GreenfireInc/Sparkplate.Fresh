import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const georgia: BeltAndRoadInitiativeCountry = {
  name: 'Georgia',
  iso3166Alpha2: 'GE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tbilisi',
  coordinates: { latitude: 42, longitude: 43.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tbilisi', 'Georgia — city 2 (verify)', 'Georgia — city 3 (verify)', 'Georgia — city 4 (verify)', 'Georgia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 4000921,
  mainLanguages: [ 'Georgian', 'English', 'Regional languages' ],
  currency: 'lari (GEL)',
  timezone: 'UTC+04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GE'],
  newsOutlets: BRI_NEWS_OUTLETS['GE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GE'],
  stockExchange: 'National or regional exchange (verify)',
}
