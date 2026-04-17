import type { BeltAndRoadInitiativeCountry } from './types'

export const ethiopia: BeltAndRoadInitiativeCountry = {
  name: 'Ethiopia',
  iso3166Alpha2: 'ET',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Addis Ababa',
  coordinates: { latitude: 9.032, longitude: 38.7469 },
  independence: 'Never fully colonized; modern state continuity (AU HQ host)',
  topMajorCities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Hawassa', 'Bahir Dar'] as [string, string, string, string, string],
  population: 111652998,
  mainLanguages: [ 'Amharic', 'English', 'Regional languages' ],
  currency: 'Ethiopian birr (ETB)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Haile Selassie (Emperor; modernizing era reference)',
  currentLeader: 'Abiy Ahmed (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; National Bank cautious on crypto',
  stockExchange: 'Ethiopian Securities Exchange (launch context varies)',
}
