import type { BeltAndRoadInitiativeCountry } from './types'

export const barbados: BeltAndRoadInitiativeCountry = {
  name: 'Barbados',
  iso3166Alpha2: 'BB',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bridgetown',
  coordinates: { latitude: 13.16666666, longitude: -59.53333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bridgetown', 'Barbados — city 2 (verify)', 'Barbados — city 3 (verify)', 'Barbados — city 4 (verify)', 'Barbados — city 5 (verify)' ] as [string, string, string, string, string],
  population: 267800,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Barbadian dollar (BBD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
