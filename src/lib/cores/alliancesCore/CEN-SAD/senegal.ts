import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const senegal: CensadCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  capital: 'Dakar',
  coordinates: { latitude: 14.6928, longitude: -17.4467 },
  independence: '1960-08-20 (France; Mali Federation context brief — verify)',
  topMajorCities: ['Dakar', 'Thiès', 'Rufisque', 'Kaolack', 'Ziguinchor'],
  population: 18500000,
  mainLanguages: ['French', 'Wolof', 'Pulaar'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Dakar',
  foundingLeader: 'Léopold Sédar Senghor (first President cohort)',
  currentLeader: 'President Bassirou Diomaye Faye — verify',
  cryptocurrencyExchanges: ['Regional P2P', 'Partnership/licensing evolution'],
  stablecoin: 'USDT informal; CFA peg',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['SN'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['SN'],
  stockExchange: 'BRVM (multiple Senegalese listings)',
}
