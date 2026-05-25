import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const algeria: AfricanUnionCountry = {
  name: 'Algeria',
  iso3166Alpha2: 'DZ',
  africanUnionStatus: 'member',
  capital: 'Algiers',
  coordinates: { latitude: 36.7539, longitude: 3.0588 },
  independence: '1962-07-05',
  topMajorCities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida'],
  population: 46200000,
  mainLanguages: ['Arabic', 'Tamazight (Berber)', 'French'],
  currency: 'Algerian dinar (DZD)',
  timezone: 'Africa/Algiers',
  foundingLeader: 'Ahmed Ben Bella',
  currentLeader: 'Abdelmadjid Tebboune (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'KuCoin', 'Regional OTC brokers'],
  stablecoin: 'USDT / USDC common in informal crypto markets; no official DZD stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['DZ'],
  newsOutlets: AU_NEWS_OUTLETS['DZ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['DZ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['DZ'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['DZ'],
  rareEarths: AU_RARE_EARTHS['DZ'],
  stockExchange: 'Algiers Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['DZ'],
}
