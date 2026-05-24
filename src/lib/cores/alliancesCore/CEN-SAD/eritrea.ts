import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const eritrea: CensadCountry = {
  name: 'Eritrea',
  iso3166Alpha2: 'ER',
  capital: 'Asmara',
  coordinates: { latitude: 15.3229, longitude: 38.9251 },
  independence: '1993-05-24 (referendum from Ethiopia)',
  topMajorCities: ['Asmara', 'Keren', 'Massawa', 'Assab', 'Mendefera'],
  population: 3740000,
  mainLanguages: ['Tigrinya', 'Arabic', 'English'],
  currency: 'Nakfa (ERN)',
  timezone: 'Africa/Asmara',
  foundingLeader: 'Isaias Afwerki (EPLF leadership to presidency)',
  currentLeader: 'President Isaias Afwerki — verify',
  cryptocurrencyExchanges: ['Very limited formal footprint; diaspora OTC'],
  stablecoin: 'Informal USD economy alongside ERN',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['ER'],
  newsOutlets: CENSAD_NEWS_OUTLETS['ER'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['ER'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['ER'],
  stockExchange: 'No national stock exchange',
}
