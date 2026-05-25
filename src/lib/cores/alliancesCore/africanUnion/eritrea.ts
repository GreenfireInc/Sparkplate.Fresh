import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
export const eritrea: AfricanUnionCountry = {
  name: 'Eritrea',
  iso3166Alpha2: 'ER',
  africanUnionStatus: 'member',
  capital: 'Asmara',
  coordinates: { latitude: 15.3229, longitude: 38.9251 },
  independence: '1993-05-24',
  topMajorCities: ['Asmara', 'Keren', 'Massawa', 'Assab', 'Mendefera'],
  population: 3600000,
  mainLanguages: ['Tigrinya', 'Arabic', 'English'],
  currency: 'Eritrean nakfa (ERN)',
  timezone: 'Africa/Asmara',
  foundingLeader: 'Isaias Afwerki',
  currentLeader: 'Isaias Afwerki (President)',
  cryptocurrencyExchanges: ['Limited formal venues; diaspora P2P', 'Binance (P2P, informal)'],
  stablecoin: 'USDT minimal formal access; cash economy strong',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ER'],
  newsOutlets: AU_NEWS_OUTLETS['ER'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ER'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ER'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['ER'],
  rareEarths: AU_RARE_EARTHS['ER'],
  stockExchange: 'No public stock exchange',
  bondMarkets: AU_BOND_MARKETS['ER'],
}
