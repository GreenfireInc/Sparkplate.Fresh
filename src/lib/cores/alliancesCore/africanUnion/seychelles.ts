import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const seychelles: AfricanUnionCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  africanUnionStatus: 'member',
  capital: 'Victoria (Mahé)',
  coordinates: { latitude: -4.6232, longitude: 55.4524 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'],
  population: 100000,
  mainLanguages: ['Seychellois Creole', 'English', 'French'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James Mancham',
  currentLeader: 'Wavel Ramkalawan (President)',
  cryptocurrencyExchanges: ['Binance (offshore registrations historically)', 'International brokers'],
  stablecoin: 'USDT / USDC; offshore financial services sector',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SC'],
  newsOutlets: AU_NEWS_OUTLETS['SC'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SC'],
  stockExchange: 'Merjep (Seychelles Securities Exchange) — niche',
}
