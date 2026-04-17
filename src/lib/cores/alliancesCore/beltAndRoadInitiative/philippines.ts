import type { BeltAndRoadInitiativeCountry } from './types'

export const philippines: BeltAndRoadInitiativeCountry = {
  name: 'Philippines',
  iso3166Alpha2: 'PH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Manila',
  coordinates: { latitude: 13, longitude: 122 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Manila', 'Philippines — city 2 (verify)', 'Philippines — city 3 (verify)', 'Philippines — city 4 (verify)', 'Philippines — city 5 (verify)' ] as [string, string, string, string, string],
  population: 114123600,
  mainLanguages: [ 'English', 'Filipino', 'Regional languages' ],
  currency: 'Philippine peso (PHP)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
