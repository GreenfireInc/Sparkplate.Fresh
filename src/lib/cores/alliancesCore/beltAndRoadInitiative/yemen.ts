import type { BeltAndRoadInitiativeCountry } from './types'

export const yemen: BeltAndRoadInitiativeCountry = {
  name: 'Yemen',
  iso3166Alpha2: 'YE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sana\'a',
  coordinates: { latitude: 15.3694, longitude: 44.191 },
  independence: '1967-11-30 (South); 1990-05-22 (unification)',
  topMajorCities: ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Ibb'] as [string, string, string, string, string],
  population: 32684503,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Yemeni rial (YER)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Yahya Muhammad Hamid ed-Din (Kingdom era); Ali Abdullah Saleh (unified republic era)',
  currentLeader: 'Rashad Muhammad al-Alimi (Chair, Presidential Leadership Council — informational)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Hawala-dominated economy'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  stockExchange: 'No functioning unified national exchange',
}
