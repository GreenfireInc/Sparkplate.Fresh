import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const kazakhstan: BeltAndRoadInitiativeCountry = {
  name: 'Kazakhstan',
  iso3166Alpha2: 'KZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Astana',
  coordinates: { latitude: 48.0196, longitude: 66.9237 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Astana', 'Kazakhstan — city 2 (verify)', 'Kazakhstan — city 3 (verify)', 'Kazakhstan — city 4 (verify)', 'Kazakhstan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 20426568,
  mainLanguages: [ 'Kazakh', 'Russian', 'Regional languages' ],
  currency: 'Kazakhstani tenge (KZT)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KZ'],
  stockExchange: 'National or regional exchange (verify)',
}
