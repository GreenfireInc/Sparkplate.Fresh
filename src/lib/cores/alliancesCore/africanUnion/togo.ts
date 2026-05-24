import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
export const togo: AfricanUnionCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  africanUnionStatus: 'member',
  capital: 'Lomé',
  coordinates: { latitude: 6.1256, longitude: 1.2254 },
  independence: '1960-04-27',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Kpalimé', 'Atakpamé'],
  population: 9000000,
  mainLanguages: ['French', 'Ewe', 'Mina'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Lome',
  foundingLeader: 'Sylvanus Olympio',
  currentLeader: 'Faure Gnassingbé (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Regional OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['TG'],
  newsOutlets: AU_NEWS_OUTLETS['TG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['TG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['TG'],
  stockExchange: 'BRVM regional listings; Lomé financial center activity',
}
