import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const southSudan: BeltAndRoadInitiativeCountry = {
  name: 'South Sudan',
  iso3166Alpha2: 'SS',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Juba',
  coordinates: { latitude: 4.8594, longitude: 31.5713 },
  independence: '2011-07-09',
  topMajorCities: ['Juba', 'Wau', 'Malakal', 'Yei', 'Aweil'] as [string, string, string, string, string],
  population: 15786898,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'South Sudanese pound (SSP)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Salva Kiir Mayardit',
  currentLeader: 'Salva Kiir Mayardit (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Informal P2P', 'Diaspora OTC'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SS'],
  newsOutlets: BRI_NEWS_OUTLETS['SS'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SS'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SS'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SS'],
  rareEarths: BRI_RARE_EARTHS['SS'],
  stockExchange: 'Juba Stock Exchange (nascent / limited)',
  bondMarkets: BRI_BOND_MARKETS['SS'],
}
