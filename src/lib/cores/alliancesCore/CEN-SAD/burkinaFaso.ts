import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const burkinaFaso: CensadCountry = {
  name: 'Burkina Faso',
  iso3166Alpha2: 'BF',
  capital: 'Ouagadougou',
  coordinates: { latitude: 12.3714, longitude: -1.5197 },
  independence:
    '1960-08-05 as Upper Volta; Burkina Faso from 1984 (constitutional disruptions since — verify)',
  topMajorCities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Banfora', 'Ouahigouya'],
  population: 23100000,
  mainLanguages: ['French', 'Mooré', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Ouagadougou',
  foundingLeader: 'Daniel Ouezzin Coulibaly / Maurice Yaméogo era (early republic — informational)',
  currentLeader: 'Ibrahim Traoré (Captain, transitional authorities) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Informal USDT peer markets'],
  stablecoin: 'USDT/USDC informal',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['BF'],
  newsOutlets: CENSAD_NEWS_OUTLETS['BF'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['BF'],
  stockExchange: 'BRVM (WAEMU listings)',
}
