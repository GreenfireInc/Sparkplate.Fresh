import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'

export const uganda: ComesaCountry = {
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
  foundingLeader: 'Milton Obote (first Prime Minister era)',
  currentLeader: 'President Yoweri Museveni — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Chipper Cash'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['UG'],
  newsOutlets: COMESA_NEWS_OUTLETS['UG'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['UG'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['UG'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['UG'],
  rareEarths: COMESA_RARE_EARTHS['UG'],
  stockExchange: 'Uganda Securities Exchange',
  bondMarkets: COMESA_BOND_MARKETS['UG'],
}
