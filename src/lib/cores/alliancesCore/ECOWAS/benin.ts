import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const benin: EcowasCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6283 },
  independence: '1960-08-01',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'],
  population: 14000000,
  mainLanguages: ['French', 'Fon', 'Yoruba'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Porto-Novo',
  foundingLeader: 'Hubert Maga (first Prime Minister transitional)',
  currentLeader: 'President Patrice Talon — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local brokers'],
  stablecoin: 'USDT common informal; XOF CFA euro peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['BJ'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['BJ'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['BJ'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['BJ'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['BJ'],
  rareEarths: ECOWAS_RARE_EARTHS['BJ'],
  stockExchange: 'Regional BRVM — Abidjan listings (WAEMU securities)',
  bondMarkets: ECOWAS_BOND_MARKETS['BJ'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['BJ'],
}
