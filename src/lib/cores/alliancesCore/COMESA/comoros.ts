import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'

export const comoros: ComesaCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  capital: 'Moroni',
  coordinates: { latitude: -11.7172, longitude: 43.2473 },
  independence: '1975-07-06 (from France)',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'],
  population: 900000,
  mainLanguages: ['Comorian (Shikomor)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah (first President post-independence)',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional mobile money bridges'],
  stablecoin: 'USDT / USDC limited official access; KMF peg context',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['KM'],
  newsOutlets: COMESA_NEWS_OUTLETS['KM'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['KM'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['KM'],
  rareEarths: COMESA_RARE_EARTHS['KM'],
  stockExchange: 'No major national stock exchange',
  bondMarkets: COMESA_BOND_MARKETS['KM'],
}
