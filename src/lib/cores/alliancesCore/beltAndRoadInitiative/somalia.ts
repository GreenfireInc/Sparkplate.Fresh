import type { BeltAndRoadInitiativeCountry } from './types'

export const somalia: BeltAndRoadInitiativeCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'] as [string, string, string, string, string],
  population: 19655000,
  mainLanguages: [ 'Arabic', 'Somali', 'Regional languages' ],
  currency: 'Somali shilling (SOS)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Aden Abdullah Osman Daar',
  currentLeader: 'Hassan Sheikh Mohamud (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  stockExchange: 'No functioning national exchange',
}
