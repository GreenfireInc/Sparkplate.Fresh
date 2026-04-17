import type { BeltAndRoadInitiativeCountry } from './types'

export const zambia: BeltAndRoadInitiativeCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'] as [string, string, string, string, string],
  population: 19693423,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Kenneth Kaunda',
  currentLeader: 'Hakainde Hichilema (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno'],
  stablecoin: 'USDT / USDC informal',
  stockExchange: 'Lusaka Securities Exchange (LuSE)',
}
