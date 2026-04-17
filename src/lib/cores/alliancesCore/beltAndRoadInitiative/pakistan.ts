import type { BeltAndRoadInitiativeCountry } from './types'

export const pakistan: BeltAndRoadInitiativeCountry = {
  name: 'Pakistan',
  iso3166Alpha2: 'PK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Islamabad',
  coordinates: { latitude: 30, longitude: 70 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Islamabad', 'Pakistan — city 2 (verify)', 'Pakistan — city 3 (verify)', 'Pakistan — city 4 (verify)', 'Pakistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 241499431,
  mainLanguages: [ 'English', 'Urdu', 'Regional languages' ],
  currency: 'Pakistani rupee (PKR)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
