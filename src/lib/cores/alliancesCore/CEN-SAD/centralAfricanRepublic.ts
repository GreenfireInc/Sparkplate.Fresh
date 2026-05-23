import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const centralAfricanRepublic: CensadCountry = {
  name: 'Central African Republic',
  iso3166Alpha2: 'CF',
  capital: 'Bangui',
  coordinates: { latitude: 4.3947, longitude: 18.5582 },
  independence: '1960-08-13',
  topMajorCities: ['Bangui', 'Bimbo', 'Berberati', 'Carnot', 'Bossangoa'],
  population: 5900000,
  mainLanguages: ['French', 'Sango', 'Arabic'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Bangui',
  foundingLeader: 'David Dacko (first president)',
  currentLeader: 'President Faustin-Archange Touadéra — verify',
  cryptocurrencyExchanges: ['Bitcoin Law experimentation narrative — OTC predominant'],
  stablecoin: 'SANGO crypto-project historically debated — CFA dominates domestically',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['CF'],
  newsOutlets: CENSAD_NEWS_OUTLETS['CF'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['CF'],
  stockExchange: 'Douala Stock Exchange (CEMAC linkage informal)',
}
