import type { BeltAndRoadInitiativeCountry } from './types'

export const poland: BeltAndRoadInitiativeCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Warsaw',
  coordinates: { latitude: 52, longitude: 20 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Warsaw', 'Poland — city 2 (verify)', 'Poland — city 3 (verify)', 'Poland — city 4 (verify)', 'Poland — city 5 (verify)' ] as [string, string, string, string, string],
  population: 37392000,
  mainLanguages: [ 'Polish', 'English', 'Regional languages' ],
  currency: 'Polish złoty (PLN)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
