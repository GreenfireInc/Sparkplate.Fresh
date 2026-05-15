import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const mali: CensadCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22 (transitional military administrations recurring — verify)',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'],
  population: 23700000,
  mainLanguages: ['French', 'Bambara', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bamako',
  foundingLeader: 'Modibo Keïta (first President)',
  currentLeader: 'Assimi Goïta (transitional military administration) — verify',
  cryptocurrencyExchanges: ['Informal OTC'],
  stablecoin: 'Informal USDT/USDC',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['ML'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['ML'],
  stockExchange: 'BRVM listing context (WAEMU)',
}
