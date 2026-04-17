import type { BeltAndRoadInitiativeCountry } from './types'

export const vietnam: BeltAndRoadInitiativeCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Hanoi',
  coordinates: { latitude: 16.16666666, longitude: 107.83333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Hanoi', 'Vietnam — city 2 (verify)', 'Vietnam — city 3 (verify)', 'Vietnam — city 4 (verify)', 'Vietnam — city 5 (verify)' ] as [string, string, string, string, string],
  population: 101343800,
  mainLanguages: [ 'Vietnamese', 'English', 'Regional languages' ],
  currency: 'Vietnamese đồng (VND)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
