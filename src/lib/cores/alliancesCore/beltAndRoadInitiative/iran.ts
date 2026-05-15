import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const iran: BeltAndRoadInitiativeCountry = {
  name: 'Iran',
  iso3166Alpha2: 'IR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tehran',
  coordinates: { latitude: 32, longitude: 53 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tehran', 'Iran — city 2 (verify)', 'Iran — city 3 (verify)', 'Iran — city 4 (verify)', 'Iran — city 5 (verify)' ] as [string, string, string, string, string],
  population: 85961000,
  mainLanguages: [ 'Persian (Farsi)', 'English', 'Regional languages' ],
  currency: 'Iranian rial (IRR)',
  timezone: 'UTC+03:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['IR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['IR'],
  stockExchange: 'National or regional exchange (verify)',
}
