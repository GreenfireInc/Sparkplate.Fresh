import type { BeltAndRoadInitiativeCountry } from './types'

export const suriname: BeltAndRoadInitiativeCountry = {
  name: 'Suriname',
  iso3166Alpha2: 'SR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Paramaribo',
  coordinates: { latitude: 4, longitude: -56 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Paramaribo', 'Suriname — city 2 (verify)', 'Suriname — city 3 (verify)', 'Suriname — city 4 (verify)', 'Suriname — city 5 (verify)' ] as [string, string, string, string, string],
  population: 616500,
  mainLanguages: [ 'Dutch', 'English', 'Regional languages' ],
  currency: 'Surinamese dollar (SRD)',
  timezone: 'UTC-03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
