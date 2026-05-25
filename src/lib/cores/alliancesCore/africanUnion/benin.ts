import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const benin: AfricanUnionCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  africanUnionStatus: 'member',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6283 },
  independence: '1960-08-01',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'],
  population: 14000000,
  mainLanguages: ['French', 'Fon', 'Yoruba'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Porto-Novo',
  foundingLeader: 'Hubert Maga',
  currentLeader: 'Patrice Talon (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local brokers'],
  stablecoin: 'USDT common in informal trade; XOF pegged to euro via CFA',
  domesticCourierServices: AU_DOMESTIC_COURIERS['BJ'],
  newsOutlets: AU_NEWS_OUTLETS['BJ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['BJ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['BJ'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['BJ'],
  rareEarths: AU_RARE_EARTHS['BJ'],
  stockExchange: 'Regional Securities Exchange (BRVM) — Abidjan (Benin listed)',
  bondMarkets: AU_BOND_MARKETS['BJ'],
}
