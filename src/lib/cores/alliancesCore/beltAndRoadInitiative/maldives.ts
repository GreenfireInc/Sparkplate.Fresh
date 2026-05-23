import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const maldives: BeltAndRoadInitiativeCountry = {
  name: 'Maldives',
  iso3166Alpha2: 'MV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Malé',
  coordinates: { latitude: 3.25, longitude: 73 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Malé', 'Maldives — city 2 (verify)', 'Maldives — city 3 (verify)', 'Maldives — city 4 (verify)', 'Maldives — city 5 (verify)' ] as [string, string, string, string, string],
  population: 515132,
  mainLanguages: [ 'Maldivian', 'English', 'Regional languages' ],
  currency: 'Maldivian rufiyaa (MVR)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MV'],
  newsOutlets: BRI_NEWS_OUTLETS['MV'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MV'],
  stockExchange: 'National or regional exchange (verify)',
}
