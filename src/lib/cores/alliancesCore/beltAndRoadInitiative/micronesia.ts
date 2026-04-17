import type { BeltAndRoadInitiativeCountry } from './types'

export const micronesia: BeltAndRoadInitiativeCountry = {
  name: 'Micronesia',
  iso3166Alpha2: 'FM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Palikir',
  coordinates: { latitude: 6.91666666, longitude: 158.25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Palikir', 'Micronesia — city 2 (verify)', 'Micronesia — city 3 (verify)', 'Micronesia — city 4 (verify)', 'Micronesia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 105564,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'United States dollar (USD)',
  timezone: 'UTC+10:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
