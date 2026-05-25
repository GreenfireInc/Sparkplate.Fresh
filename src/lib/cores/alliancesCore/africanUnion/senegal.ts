import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const senegal: AfricanUnionCountry = {
  name: 'Senegal',
  iso3166Alpha2: 'SN',
  africanUnionStatus: 'member',
  capital: 'Dakar',
  coordinates: { latitude: 14.7167, longitude: -17.4677 },
  independence: '1960-04-04',
  topMajorCities: ['Dakar', 'Touba', 'Thiès', 'Rufisque', 'Kaolack'],
  population: 18000000,
  mainLanguages: ['French', 'Wolof', 'Pulaar'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Dakar',
  foundingLeader: 'Léopold Sédar Senghor',
  currentLeader: 'Bassirou Diomaye Faye (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Wave-linked fintech'],
  stablecoin: 'USDT / USDC; XOF peg via CFA',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SN'],
  newsOutlets: AU_NEWS_OUTLETS['SN'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SN'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['SN'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['SN'],
  rareEarths: AU_RARE_EARTHS['SN'],
  stockExchange: 'BRVM (regional; Dakar listings)',
  bondMarkets: AU_BOND_MARKETS['SN'],
}
