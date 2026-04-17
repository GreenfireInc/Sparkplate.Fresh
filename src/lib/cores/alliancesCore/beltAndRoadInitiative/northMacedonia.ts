import type { BeltAndRoadInitiativeCountry } from './types'

export const northMacedonia: BeltAndRoadInitiativeCountry = {
  name: 'North Macedonia',
  iso3166Alpha2: 'MK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Skopje',
  coordinates: { latitude: 41.83333333, longitude: 22 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Skopje', 'North Macedonia — city 2 (verify)', 'North Macedonia — city 3 (verify)', 'North Macedonia — city 4 (verify)', 'North Macedonia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1822612,
  mainLanguages: [ 'Macedonian', 'English', 'Regional languages' ],
  currency: 'denar (MKD)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
