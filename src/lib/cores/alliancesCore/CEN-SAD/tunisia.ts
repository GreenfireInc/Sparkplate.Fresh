import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const tunisia: CensadCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20 (France)',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  population: 12200000,
  mainLanguages: ['Arabic (Tunisian)', 'French', 'Berber (small communities)'],
  currency: 'Tunisian dinar (TND)',
  timezone: 'Africa/Tunis',
  foundingLeader: 'Habib Bourguiba (first President republic era)',
  currentLeader:
    'President Kais Saied (institutional contested period post-2021 — verify PM/cabinet roster)',
  cryptocurrencyExchanges: ['Startup licensing experiments; OTC informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['TN'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['TN'],
  stockExchange: 'Bourse de Tunis',
}
