import type { BeltAndRoadInitiativeCountry } from './types'

export const niue: BeltAndRoadInitiativeCountry = {
  name: 'Niue',
  iso3166Alpha2: 'NU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Alofi',
  coordinates: { latitude: -19.03333333, longitude: -169.86666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Alofi', 'Niue — city 2 (verify)', 'Niue — city 3 (verify)', 'Niue — city 4 (verify)', 'Niue — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1681,
  mainLanguages: [ 'English', 'Niuean', 'Regional languages' ],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'UTC-11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
