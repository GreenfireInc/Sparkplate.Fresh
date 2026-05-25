import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const southSudan: AfricanUnionCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  africanUnionStatus: 'member',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence: '2011-07-09',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Aweil'],
  population: 11000000,
  mainLanguages: ['English', 'Dinka', 'Nuer'],
  currency: 'South Sudanese pound (SSP)',
  timezone: 'Africa/Juba',
  foundingLeader: 'Salva Kiir Mayardit',
  currentLeader: 'Salva Kiir Mayardit (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Informal P2P', 'Diaspora OTC'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SS'],
  newsOutlets: AU_NEWS_OUTLETS['SS'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SS'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['SS'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['SS'],
  rareEarths: AU_RARE_EARTHS['SS'],
  stockExchange: 'Juba Stock Exchange (nascent / limited)',
  bondMarkets: AU_BOND_MARKETS['SS'],
}
