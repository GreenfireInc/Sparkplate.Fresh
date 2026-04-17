import type { BeltAndRoadInitiativeCountry } from './types'

export const jordan: BeltAndRoadInitiativeCountry = {
  name: 'Jordan',
  iso3166Alpha2: 'JO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Amman',
  coordinates: { latitude: 31.9539, longitude: 35.9106 },
  independence: '1946-05-25',
  topMajorCities: ['Amman', 'Zarqa', 'Irbid', 'Russeifa', 'Wadi al-Sir'] as [string, string, string, string, string],
  population: 11734000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Jordanian dinar (JOD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Abdullah I (King)',
  currentLeader: 'Abdullah II (King); Jafar Hassan (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'Rain (regional)'],
  stablecoin: 'USDT / USDC informal; central bank cautious',
  stockExchange: 'Amman Stock Exchange',
}
