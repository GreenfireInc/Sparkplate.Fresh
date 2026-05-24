import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_NEWS_OUTLETS } from './newsOutletsByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EAC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const uganda: EacCountry = {
  name: 'Uganda',
  iso3166Alpha2: 'UG',
  capital: 'Kampala',
  coordinates: { latitude: 0.3476, longitude: 32.5825 },
  independence: '1962-10-09',
  topMajorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Mukono'],
  population: 49000000,
  mainLanguages: ['English', 'Swahili', 'Luganda'],
  currency: 'Ugandan shilling (UGX)',
  timezone: 'Africa/Kampala',
  foundingLeader: 'Milton Obote (early Prime Minister era)',
  currentLeader: 'President Yoweri Museveni — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['UG'],
  newsOutlets: EAC_NEWS_OUTLETS['UG'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['UG'],
  stockExchange: 'Uganda Securities Exchange',
}
