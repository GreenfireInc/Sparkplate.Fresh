import type { BeltAndRoadInitiativeCountry } from './types'

export const serbia: BeltAndRoadInitiativeCountry = {
  name: 'Serbia',
  iso3166Alpha2: 'RS',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Belgrade',
  coordinates: { latitude: 44, longitude: 21 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Belgrade', 'Serbia — city 2 (verify)', 'Serbia — city 3 (verify)', 'Serbia — city 4 (verify)', 'Serbia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 6567783,
  mainLanguages: [ 'Serbian', 'English', 'Regional languages' ],
  currency: 'Serbian dinar (RSD)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
