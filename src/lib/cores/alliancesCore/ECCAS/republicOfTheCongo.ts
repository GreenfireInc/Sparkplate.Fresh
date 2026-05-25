import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'

export const republicOfTheCongo: EccasCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence: '1960-08-15',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando'],
  population: 6100000,
  mainLanguages: ['French', 'Lingala', 'Kituba'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Brazzaville',
  foundingLeader: 'Fulbert Youlou (first President)',
  currentLeader: 'President Denis Sassou Nguesso — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT P2P; XAF peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['CG'],
  newsOutlets: ECCAS_NEWS_OUTLETS['CG'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['CG'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['CG'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['CG'],
  rareEarths: ECCAS_RARE_EARTHS['CG'],
  stockExchange: 'Bourse des Valeurs du Congo (BVC)',
  bondMarkets: ECCAS_BOND_MARKETS['CG'],
}
