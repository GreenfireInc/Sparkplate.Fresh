import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const seychelles: CommonwealthCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  commonwealthStatus: 'member',
  capital: 'Victoria',
  coordinates: { latitude: -4.6191, longitude: 55.4513 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'],
  population: 120000,
  mainLanguages: ['Seychellois Creole', 'English', 'French'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James Mancham (first President)',
  currentLeader: 'Wavel Ramkalawan (President)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SC'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SC'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SC'],
  stockExchange: 'Merj Exchange Limited (Seychelles; international listings)',
}
