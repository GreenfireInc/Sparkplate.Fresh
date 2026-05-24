import type { AllianceOfSahelStatesCountry } from './types'
import { AES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AES_NEWS_OUTLETS } from './newsOutletsByIso'
import { AES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const burkinaFaso: AllianceOfSahelStatesCountry = {
  name: 'Burkina Faso',
  iso3166Alpha2: 'BF',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Ouagadougou',
  coordinates: { latitude: 12.3714, longitude: -1.5197 },
  independence: '1960-08-05',
  topMajorCities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora'],
  population: 23000000,
  mainLanguages: ['French', 'Mooré', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Ouagadougou',
  foundingLeader: 'Maurice Yaméogo',
  currentLeader: 'Ibrahim Traoré (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Informal P2P'],
  stablecoin: 'USDT via P2P; XOF CFA peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['BF'],
  newsOutlets: AES_NEWS_OUTLETS['BF'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['BF'],
  mainExportCommodities: AES_MAIN_EXPORT_COMMODITIES['BF'],
  stockExchange: 'Burkina Faso — BRVM listings (limited local activity)',
}
