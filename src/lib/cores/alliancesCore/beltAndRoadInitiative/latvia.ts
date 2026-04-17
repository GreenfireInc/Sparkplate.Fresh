import type { BeltAndRoadInitiativeCountry } from './types'

export const latvia: BeltAndRoadInitiativeCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Riga',
  coordinates: { latitude: 57, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Riga', 'Latvia — city 2 (verify)', 'Latvia — city 3 (verify)', 'Latvia — city 4 (verify)', 'Latvia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1829000,
  mainLanguages: [ 'Latvian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
