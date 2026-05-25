import type { AmuCountry } from './types'
import { AMU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AMU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AMU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AMU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AMU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AMU_RARE_EARTHS } from './rareEarthsByIso'
import { AMU_BOND_MARKETS } from './bondMarketsByIso'

export const algeria: AmuCountry = {
  name: 'Algeria',
  iso3166Alpha2: 'DZ',
  amuStatus: 'founding_member',
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
  domesticCourierServices: AMU_DOMESTIC_COURIERS['DZ'],
  newsOutlets: AMU_NEWS_OUTLETS['DZ'],
  notableUniversities: AMU_NOTABLE_UNIVERSITIES['DZ'],
  mainExportCommodities: AMU_MAIN_EXPORT_COMMODITIES['DZ'],
  mainExportedElements: AMU_MAIN_EXPORTED_ELEMENTS['DZ'],
  rareEarths: AMU_RARE_EARTHS['DZ'],
  stockExchange: 'Algiers Stock Exchange',
  bondMarkets: AMU_BOND_MARKETS['DZ'],
}
