import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const comoros: SadcCountry = {
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
  foundingLeader: 'Ahmed Abdallah (first President post-independence)',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Informal P2P'],
  stablecoin: 'Euro peg via KMF framework',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['KM'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['KM'],
  stockExchange: 'No national stock exchange',
}
