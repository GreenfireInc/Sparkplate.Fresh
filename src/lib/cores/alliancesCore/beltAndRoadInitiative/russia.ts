import type { BeltAndRoadInitiativeCountry } from './types'

export const russia: BeltAndRoadInitiativeCountry = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Moscow',
  coordinates: { latitude: 60, longitude: 100 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Moscow', 'Russia — city 2 (verify)', 'Russia — city 3 (verify)', 'Russia — city 4 (verify)', 'Russia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 146028325,
  mainLanguages: [ 'Russian', 'English', 'Regional languages' ],
  currency: 'Russian ruble (RUB)',
  timezone: 'UTC+03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
