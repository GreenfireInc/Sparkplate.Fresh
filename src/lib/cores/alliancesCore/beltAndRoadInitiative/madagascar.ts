import type { BeltAndRoadInitiativeCountry } from './types'

export const madagascar: BeltAndRoadInitiativeCountry = {
  name: 'Madagascar',
  iso3166Alpha2: 'MG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Antananarivo',
  coordinates: { latitude: -18.8792, longitude: 47.5079 },
  independence: '1960-06-26',
  topMajorCities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'] as [string, string, string, string, string],
  population: 31727042,
  mainLanguages: [ 'French', 'Malagasy', 'Regional languages' ],
  currency: 'Malagasy ariary (MGA)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Philibert Tsiranana',
  currentLeader: 'Andry Rajoelina (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P', 'International brokers'],
  stablecoin: 'USDT informal; no MGA stablecoin',
  stockExchange: 'Madagascar Stock Exchange (SEM)',
}
