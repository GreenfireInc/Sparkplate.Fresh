import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const gabon: CommonwealthCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  commonwealthStatus: 'member',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2400000,
  mainLanguages: ['French', 'Fang', 'Myene'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: 'Léon M\'ba (first President)',
  currentLeader: 'Brice Clotaire Oligui Nguema (Transitional) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XAF peg; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GA'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GA'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GA'],
  stockExchange: 'Bourse des Valeurs Mobilières de l\'Afrique Centrale (regional)',
}
