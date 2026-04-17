import type { BeltAndRoadInitiativeCountry } from './types'

export const cambodia: BeltAndRoadInitiativeCountry = {
  name: 'Cambodia',
  iso3166Alpha2: 'KH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Phnom Penh',
  coordinates: { latitude: 13, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Phnom Penh', 'Cambodia — city 2 (verify)', 'Cambodia — city 3 (verify)', 'Cambodia — city 4 (verify)', 'Cambodia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 17577760,
  mainLanguages: [ 'Khmer', 'English', 'Regional languages' ],
  currency: 'Cambodian riel (KHR)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  stockExchange: 'National or regional exchange (verify)',
}
