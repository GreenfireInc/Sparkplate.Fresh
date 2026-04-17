import type { BeltAndRoadInitiativeCountry } from './types'

export const uzbekistan: BeltAndRoadInitiativeCountry = {
  name: 'Uzbekistan',
  iso3166Alpha2: 'UZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tashkent',
  coordinates: { latitude: 41, longitude: 64 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tashkent', 'Uzbekistan — city 2 (verify)', 'Uzbekistan — city 3 (verify)', 'Uzbekistan — city 4 (verify)', 'Uzbekistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 37859698,
  mainLanguages: [ 'Russian', 'Uzbek', 'Regional languages' ],
  currency: 'Uzbekistani soʻm (UZS)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
