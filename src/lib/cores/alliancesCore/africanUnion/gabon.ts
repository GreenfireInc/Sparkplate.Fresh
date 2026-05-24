import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
export const gabon: AfricanUnionCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  africanUnionStatus: 'member',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2500000,
  mainLanguages: ['French', 'Fang', 'Myene'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: "Léon M'ba",
  currentLeader: 'Brice Clotaire Oligui Nguema (Transitional President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'CFA-region OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GA'],
  newsOutlets: AU_NEWS_OUTLETS['GA'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GA'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM) — regional',
}
