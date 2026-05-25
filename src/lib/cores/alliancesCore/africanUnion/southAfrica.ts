import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const southAfrica: AfricanUnionCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  africanUnionStatus: 'member',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence: '1910-05-31 (Union); 1994-04-27 (first democratic election reference)',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth (Gqeberha)'],
  population: 62000000,
  mainLanguages: ['Zulu', 'Xhosa', 'Afrikaans'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Louis Botha (first Prime Minister, Union of South Africa)',
  currentLeader: 'Cyril Ramaphosa (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)', 'ICE3 (historical)'],
  stablecoin: 'USDT / USDC; ZARP (rand-referenced stable token, private)',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ZA'],
  newsOutlets: AU_NEWS_OUTLETS['ZA'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ZA'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['ZA'],
  rareEarths: AU_RARE_EARTHS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
  bondMarkets: AU_BOND_MARKETS['ZA'],
}
