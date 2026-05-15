import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const sriLanka: BeltAndRoadInitiativeCountry = {
  name: 'Sri Lanka',
  iso3166Alpha2: 'LK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sri Jayawardenepura Kotte',
  coordinates: { latitude: 7, longitude: 81 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sri Jayawardenepura Kotte', 'Sri Lanka — city 2 (verify)', 'Sri Lanka — city 3 (verify)', 'Sri Lanka — city 4 (verify)', 'Sri Lanka — city 5 (verify)' ] as [string, string, string, string, string],
  population: 21763170,
  mainLanguages: [ 'Sinhala', 'Tamil', 'Regional languages' ],
  currency: 'Sri Lankan rupee (LKR)',
  timezone: 'UTC+05:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LK'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LK'],
  stockExchange: 'National or regional exchange (verify)',
}
