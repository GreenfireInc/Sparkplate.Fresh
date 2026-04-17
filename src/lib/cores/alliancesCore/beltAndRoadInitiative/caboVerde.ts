import type { BeltAndRoadInitiativeCountry } from './types'

export const caboVerde: BeltAndRoadInitiativeCountry = {
  name: 'Cabo Verde',
  iso3166Alpha2: 'CV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Praia',
  coordinates: { latitude: 14.9311, longitude: -23.5087 },
  independence: '1975-07-05',
  topMajorCities: ['Praia', 'Mindelo', 'Santa Maria', 'Assomada', 'Pedra Badejo'] as [string, string, string, string, string],
  population: 491233,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'Cape Verdean escudo (CVE)',
  timezone: 'UTC-01:00',
  foundingLeader: 'Aristides Pereira',
  currentLeader: 'José Maria Neves (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'European-facing brokers'],
  stablecoin: 'EUR-linked usage; USDT via international apps',
  stockExchange: 'Bolsa de Valores de Cabo Verde (limited listings)',
}
