import type { BeltAndRoadInitiativeCountry } from './types'

export const seychelles: BeltAndRoadInitiativeCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Victoria',
  coordinates: { latitude: -4.6232, longitude: 55.4524 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'] as [string, string, string, string, string],
  population: 122729,
  mainLanguages: [ 'Seychellois Creole', 'English', 'French' ],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'UTC+04:00',
  foundingLeader: 'James Mancham',
  currentLeader: 'Wavel Ramkalawan (President)',
  cryptocurrencyExchanges: ['Binance (offshore registrations historically)', 'International brokers'],
  stablecoin: 'USDT / USDC; offshore financial services sector',
  stockExchange: 'Merjep (Seychelles Securities Exchange) — niche',
}
