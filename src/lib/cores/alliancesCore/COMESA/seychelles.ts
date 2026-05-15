import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const seychelles: ComesaCountry = {
  name: 'Seychelles',
  iso3166Alpha2: 'SC',
  capital: 'Victoria (Mahé)',
  coordinates: { latitude: -4.6232, longitude: 55.4524 },
  independence: '1976-06-29',
  topMajorCities: ['Victoria', 'Anse Boileau', 'Beau Vallon', 'Cascade', 'Takamaka'],
  population: 100000,
  mainLanguages: ['Seychellois Creole', 'English', 'French'],
  currency: 'Seychellois rupee (SCR)',
  timezone: 'Indian/Mahe',
  foundingLeader: 'James Mancham (early republic)',
  currentLeader: 'President Wavel Ramkalawan — verify',
  cryptocurrencyExchanges: ['International brokers; offshore finance sector registrations'],
  stablecoin: 'USDT / USDC; offshore financial services sector',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['SC'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['SC'],
  stockExchange: 'MERJ Exchange (securities niche — verify branding)',
}
