import type { BeltAndRoadInitiativeCountry } from './types'

export const jamaica: BeltAndRoadInitiativeCountry = {
  name: 'Jamaica',
  iso3166Alpha2: 'JM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kingston',
  coordinates: { latitude: 18.25, longitude: -77.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kingston', 'Jamaica — city 2 (verify)', 'Jamaica — city 3 (verify)', 'Jamaica — city 4 (verify)', 'Jamaica — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2825544,
  mainLanguages: [ 'English', 'Jamaican Patois', 'Regional languages' ],
  currency: 'Jamaican dollar (JMD)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
