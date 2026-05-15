import type { AllianceOfSahelStatesCountry } from './types'
import { AES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const mali: AllianceOfSahelStatesCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'],
  population: 23000000,
  mainLanguages: ['French', 'Bambara', 'Fula'],
  currency: 'West African CFA franc (XOF) — ECOWAS transition context',
  timezone: 'Africa/Bamako',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['ML'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['ML'],
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
}
