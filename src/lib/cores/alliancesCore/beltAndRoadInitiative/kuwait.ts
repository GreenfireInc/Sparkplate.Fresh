import type { BeltAndRoadInitiativeCountry } from './types'

export const kuwait: BeltAndRoadInitiativeCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence: '1961-06-19',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Al Farwaniyah', 'Al Jahra'] as [string, string, string, string, string],
  population: 4881254,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Kuwaiti dinar (KWD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Abdullah Al-Salim Al-Sabah (Emir)',
  currentLeader: 'Mishal Al-Ahmad Al-Jaber Al-Sabah (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; no major local spot exchange'],
  stablecoin: 'USDT / USDC informal; oil-economy USD links',
  stockExchange: 'Boursa Kuwait',
}
