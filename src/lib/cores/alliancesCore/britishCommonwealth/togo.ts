import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const togo: CommonwealthCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  commonwealthStatus: 'member',
  capital: 'Lomé',
  coordinates: { latitude: 6.1256, longitude: 1.2254 },
  independence: '1960-04-27',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Atakpamé', 'Palimé'],
  population: 9000000,
  mainLanguages: ['French', 'Ewe', 'Mina'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Lome',
  foundingLeader: 'Sylvanus Olympio (first President)',
  currentLeader: 'Faure Gnassingbé (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XOF peg to EUR; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['TG'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (regional)',
}
