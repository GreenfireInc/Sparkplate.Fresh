import type { BeltAndRoadInitiativeCountry } from './types'

export const mongolia: BeltAndRoadInitiativeCountry = {
  name: 'Mongolia',
  iso3166Alpha2: 'MN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ulan Bator',
  coordinates: { latitude: 46, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ulan Bator', 'Mongolia — city 2 (verify)', 'Mongolia — city 3 (verify)', 'Mongolia — city 4 (verify)', 'Mongolia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3544835,
  mainLanguages: [ 'Mongolian', 'English', 'Regional languages' ],
  currency: 'Mongolian tögrög (MNT)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
