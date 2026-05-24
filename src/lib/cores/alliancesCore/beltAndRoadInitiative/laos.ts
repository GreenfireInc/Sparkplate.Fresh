import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const laos: BeltAndRoadInitiativeCountry = {
  name: 'Laos',
  iso3166Alpha2: 'LA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Vientiane',
  coordinates: { latitude: 18, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Vientiane', 'Laos — city 2 (verify)', 'Laos — city 3 (verify)', 'Laos — city 4 (verify)', 'Laos — city 5 (verify)' ] as [string, string, string, string, string],
  population: 7647000,
  mainLanguages: [ 'Lao', 'English', 'Regional languages' ],
  currency: 'Lao kip (LAK)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LA'],
  newsOutlets: BRI_NEWS_OUTLETS['LA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LA'],
  stockExchange: 'National or regional exchange (verify)',
}
