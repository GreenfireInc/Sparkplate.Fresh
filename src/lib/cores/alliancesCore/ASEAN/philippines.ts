import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const philippines: AseanCountry = {
  name: 'Philippines',
  iso3166Alpha2: 'PH',
  capital: 'Manila (capital region Metro Manila)',
  coordinates: { latitude: 14.5995, longitude: 120.9842 },
  independence:
    '1946 independence from US recognised; ASEAN founding member Aug 1967 — informational',
  topMajorCities: ['Manila', 'Quezon City', 'Davao City', 'Cebu City', 'Zamboanga City'],
  population: 115000000,
  mainLanguages: ['Filipino', 'English', 'Cebuano / Ilocano regional'],
  currency: 'Philippine peso (PHP)',
  timezone: 'Asia/Manila',
  foundingLeader: 'Manuel Roxas / Ferdinand Marcos-era reference — informational',
  currentLeader: 'President Ferdinand Marcos Jr. — verify',
  cryptocurrencyExchanges: ['BSP VASP registration regime; Coinbase PH reference — informational'],
  stablecoin: 'PHP stable experiments; USDT remittance rails — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['PH'],
  newsOutlets: ASEAN_NEWS_OUTLETS['PH'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['PH'],
  stockExchange: 'Philippine Stock Exchange (PSE)',
}
