import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const chile: BeltAndRoadInitiativeCountry = {
  name: 'Chile',
  iso3166Alpha2: 'CL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Santiago',
  coordinates: { latitude: -30, longitude: -71 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Santiago', 'Chile — city 2 (verify)', 'Chile — city 3 (verify)', 'Chile — city 4 (verify)', 'Chile — city 5 (verify)' ] as [string, string, string, string, string],
  population: 20206953,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Chilean peso (CLP)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CL'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CL'],
  stockExchange: 'National or regional exchange (verify)',
}
