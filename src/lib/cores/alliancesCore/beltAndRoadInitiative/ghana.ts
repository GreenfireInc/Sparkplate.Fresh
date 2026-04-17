import type { BeltAndRoadInitiativeCountry } from './types'

export const ghana: BeltAndRoadInitiativeCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'] as [string, string, string, string, string],
  population: 33742380,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'UTC',
  foundingLeader: 'Kwame Nkrumah',
  currentLeader: 'John Mahama (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Busha', 'Quidax'],
  stablecoin: 'USDT / USDC; Bank of Ghana piloting eCedi CBDC',
  stockExchange: 'Ghana Stock Exchange (GSE)',
}
