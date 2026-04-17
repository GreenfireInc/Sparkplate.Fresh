import type { BeltAndRoadInitiativeCountry } from './types'

export const bangladesh: BeltAndRoadInitiativeCountry = {
  name: 'Bangladesh',
  iso3166Alpha2: 'BD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dhaka',
  coordinates: { latitude: 24, longitude: 90 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Dhaka', 'Bangladesh — city 2 (verify)', 'Bangladesh — city 3 (verify)', 'Bangladesh — city 4 (verify)', 'Bangladesh — city 5 (verify)' ] as [string, string, string, string, string],
  population: 169828911,
  mainLanguages: [ 'Bengali', 'English', 'Regional languages' ],
  currency: 'Bangladeshi taka (BDT)',
  timezone: 'UTC+06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
