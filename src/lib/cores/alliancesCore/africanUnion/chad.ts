import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const chad: AfricanUnionCountry = {
  name: 'Chad',
  iso3166Alpha2: 'TD',
  africanUnionStatus: 'member',
  capital: "N'Djamena",
  coordinates: { latitude: 12.1348, longitude: 15.0557 },
  independence: '1960-08-11',
  topMajorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Kélo'],
  population: 19500000,
  mainLanguages: ['French', 'Arabic', 'Chadian Arabic'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Ndjamena',
  foundingLeader: 'François Tombalbaye',
  currentLeader: 'Mahamat Idriss Déby Itno (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal; XAF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['TD'],
  newsOutlets: AU_NEWS_OUTLETS['TD'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['TD'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['TD'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['TD'],
  rareEarths: AU_RARE_EARTHS['TD'],
  stockExchange: 'Financial Market of Central Africa (CEMAC hub; thin Chad listings)',
  bondMarkets: AU_BOND_MARKETS['TD'],
}
