import type { BeltAndRoadInitiativeCountry } from './types'

export const iran: BeltAndRoadInitiativeCountry = {
  name: 'Iran',
  iso3166Alpha2: 'IR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tehran',
  coordinates: { latitude: 32, longitude: 53 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tehran', 'Iran — city 2 (verify)', 'Iran — city 3 (verify)', 'Iran — city 4 (verify)', 'Iran — city 5 (verify)' ] as [string, string, string, string, string],
  population: 85961000,
  mainLanguages: [ 'Persian (Farsi)', 'English', 'Regional languages' ],
  currency: 'Iranian rial (IRR)',
  timezone: 'UTC+03:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
