import type { BeltAndRoadInitiativeCountry } from './types'

export const hungary: BeltAndRoadInitiativeCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Budapest',
  coordinates: { latitude: 47, longitude: 20 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Budapest', 'Hungary — city 2 (verify)', 'Hungary — city 3 (verify)', 'Hungary — city 4 (verify)', 'Hungary — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9539502,
  mainLanguages: [ 'Hungarian', 'English', 'Regional languages' ],
  currency: 'Hungarian forint (HUF)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
