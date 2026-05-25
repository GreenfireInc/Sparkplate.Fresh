import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const republicOfTheCongo: BeltAndRoadInitiativeCountry = {
  name: 'Republic of the Congo',
  iso3166Alpha2: 'CG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Brazzaville',
  coordinates: { latitude: -4.2634, longitude: 15.2429 },
  independence: '1960-08-15',
  topMajorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Owando'] as [string, string, string, string, string],
  population: 6142180,
  mainLanguages: [ 'French', 'Kikongo', 'Lingala' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Fulbert Youlou',
  currentLeader: 'Denis Sassou Nguesso (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC'],
  stablecoin: 'USDT P2P; XAF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CG'],
  newsOutlets: BRI_NEWS_OUTLETS['CG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CG'],
  rareEarths: BRI_RARE_EARTHS['CG'],
  stockExchange: 'Bourse des Valeurs du Congo (BVC)',
  bondMarkets: BRI_BOND_MARKETS['CG'],
}
