import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const comoros: CensadCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  capital: 'Moroni',
  coordinates: { latitude: -11.6945, longitude: 43.2551 },
  independence: '1975-07-06 (from France)',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Ouani'],
  population: 867000,
  mainLanguages: ['Comorian (Shikomori)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah (first president post-independence)',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Informal P2P'],
  stablecoin: 'Euro peg via KMF',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['KM'],
  newsOutlets: CENSAD_NEWS_OUTLETS['KM'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['KM'],
  stockExchange: 'No national stock exchange',
}
