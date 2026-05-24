import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const senegal: BeltAndRoadInitiativeCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dakar',
  coordinates: { latitude: 14.7167, longitude: -17.4677 },
  independence: '1960-04-04',
  topMajorCities: ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Kaolack'] as [string, string, string, string, string],
  population: 18593258,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Léopold Sédar Senghor',
  currentLeader: 'Bassirou Diomaye Faye (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Wave-linked fintech'],
  stablecoin: 'USDT / USDC; XOF peg via CFA',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SN'],
  newsOutlets: BRI_NEWS_OUTLETS['SN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SN'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SN'],
  stockExchange: 'BRVM (regional; Dakar listings)',
}
