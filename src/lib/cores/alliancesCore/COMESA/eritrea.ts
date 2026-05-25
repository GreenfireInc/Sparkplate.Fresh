import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'

export const eritrea: ComesaCountry = {
  name: 'Eritrea',
  iso3166Alpha2: 'ER',
  capital: 'Asmara',
  coordinates: { latitude: 15.3229, longitude: 38.9251 },
  independence: '1993-05-24 (referendum from Ethiopia)',
  topMajorCities: ['Asmara', 'Keren', 'Massawa', 'Assab', 'Mendefera'],
  population: 3600000,
  mainLanguages: ['Tigrinya', 'Arabic', 'English'],
  currency: 'Eritrean nakfa (ERN)',
  timezone: 'Africa/Asmara',
  foundingLeader: 'Isaias Afwerki (EPLF to state leadership)',
  currentLeader: 'President Isaias Afwerki — verify',
  cryptocurrencyExchanges: ['Limited formal venues; diaspora P2P', 'Binance (P2P, informal)'],
  stablecoin: 'USDT minimal formal access; cash economy strong',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ER'],
  newsOutlets: COMESA_NEWS_OUTLETS['ER'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ER'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['ER'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['ER'],
  rareEarths: COMESA_RARE_EARTHS['ER'],
  stockExchange: 'No public stock exchange',
  bondMarkets: COMESA_BOND_MARKETS['ER'],
}
