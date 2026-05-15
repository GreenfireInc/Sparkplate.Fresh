import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SC'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SC'],
  stockExchange: 'Merjep (Seychelles Securities Exchange) — niche',
}
