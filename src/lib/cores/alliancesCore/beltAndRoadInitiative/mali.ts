import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const mali: BeltAndRoadInitiativeCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'] as [string, string, string, string, string],
  population: 22395489,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ML'],
  newsOutlets: BRI_NEWS_OUTLETS['ML'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ML'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ML'],
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
}
