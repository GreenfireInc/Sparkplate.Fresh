import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const niger: CensadCountry = {
  name: 'Niger',
  iso3166Alpha2: 'NE',
  capital: 'Niamey',
  coordinates: { latitude: 13.5127, longitude: 2.1258 },
  independence: '1960-08-03 (2023 coup and transition — verify)',
  topMajorCities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua'],
  population: 27000000,
  mainLanguages: ['French', 'Hausa', 'Zarma/Songhay'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Niamey',
  foundingLeader: 'Hamani Diori (first president)',
  currentLeader:
    'National Council for the Safeguard of the Homeland transitional leadership — verify nominal President/PM',
  cryptocurrencyExchanges: ['Informal regional P2P'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['NE'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['NE'],
  stockExchange: 'BRVM linkage context',
}
