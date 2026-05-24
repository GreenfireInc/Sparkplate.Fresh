import type { AllianceOfSahelStatesCountry } from './types'
import { AES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AES_NEWS_OUTLETS } from './newsOutletsByIso'
import { AES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const niger: AllianceOfSahelStatesCountry = {
  name: 'Niger',
  iso3166Alpha2: 'NE',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Niamey',
  coordinates: { latitude: 13.5127, longitude: 2.1254 },
  independence: '1960-08-03',
  topMajorCities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua'],
  population: 27000000,
  mainLanguages: ['French', 'Hausa', 'Zarma'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Niamey',
  foundingLeader: 'Hamani Diori',
  currentLeader: 'Abdourahamane Tchiani (General; National Council for the Safeguard of the Homeland)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['NE'],
  newsOutlets: AES_NEWS_OUTLETS['NE'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['NE'],
  mainExportCommodities: AES_MAIN_EXPORT_COMMODITIES['NE'],
  stockExchange: 'No liquid national bourse; BRVM regional',
}
