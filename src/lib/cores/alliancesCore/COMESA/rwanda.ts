import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'

export const rwanda: ComesaCountry = {
  name: 'Rwanda',
  iso3166Alpha2: 'RW',
  capital: 'Kigali',
  coordinates: { latitude: -1.9441, longitude: 30.0619 },
  independence: '1962-07-01',
  topMajorCities: ['Kigali', 'Huye (Butare)', 'Muhanga (Gitarama)', 'Musanze', 'Rusizi'],
  population: 14000000,
  mainLanguages: ['Kinyarwanda', 'French', 'English'],
  currency: 'Rwandan franc (RWF)',
  timezone: 'Africa/Kigali',
  foundingLeader: 'Grégoire Kayibanda (first President)',
  currentLeader: 'President Paul Kagame — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Kigali fintech hubs'],
  stablecoin: 'USDT / USDC; CBDC explorations — verify',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['RW'],
  newsOutlets: COMESA_NEWS_OUTLETS['RW'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['RW'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['RW'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['RW'],
  rareEarths: COMESA_RARE_EARTHS['RW'],
  stockExchange: 'Rwanda Stock Exchange',
  bondMarkets: COMESA_BOND_MARKETS['RW'],
}
