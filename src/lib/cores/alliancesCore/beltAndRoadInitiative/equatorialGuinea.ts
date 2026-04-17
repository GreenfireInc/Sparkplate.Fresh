import type { BeltAndRoadInitiativeCountry } from './types'

export const equatorialGuinea: BeltAndRoadInitiativeCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ciudad de la Paz',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence: '1968-10-12',
  topMajorCities: ['Bata', 'Malabo', 'Ebebiyín', 'Aconibe', 'Añisoc'] as [string, string, string, string, string],
  population: 1668768,
  mainLanguages: [ 'French', 'Portuguese', 'Spanish' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Francisco Macías Nguema',
  currentLeader: 'Teodoro Obiang Nguema Mbasogo (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'International brokers'],
  stablecoin: 'USDT informal; XAF peg',
  stockExchange: 'CEMAC regional market (limited local listings)',
}
