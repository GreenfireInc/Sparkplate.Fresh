import type { BeltAndRoadInitiativeCountry } from './types'

export const azerbaijan: BeltAndRoadInitiativeCountry = {
  name: 'Azerbaijan',
  iso3166Alpha2: 'AZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Baku',
  coordinates: { latitude: 40.5, longitude: 47.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Baku', 'Azerbaijan — city 2 (verify)', 'Azerbaijan — city 3 (verify)', 'Azerbaijan — city 4 (verify)', 'Azerbaijan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10241722,
  mainLanguages: [ 'Azerbaijani', 'English', 'Regional languages' ],
  currency: 'Azerbaijani manat (AZN)',
  timezone: 'UTC+04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
