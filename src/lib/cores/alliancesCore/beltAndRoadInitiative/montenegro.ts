import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const montenegro: BeltAndRoadInitiativeCountry = {
  name: 'Montenegro',
  iso3166Alpha2: 'ME',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Podgorica',
  coordinates: { latitude: 42.5, longitude: 19.3 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Podgorica', 'Montenegro — city 2 (verify)', 'Montenegro — city 3 (verify)', 'Montenegro — city 4 (verify)', 'Montenegro — city 5 (verify)' ] as [string, string, string, string, string],
  population: 623327,
  mainLanguages: [ 'Montenegrin', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ME'],
  stockExchange: 'National or regional exchange (verify)',
}
