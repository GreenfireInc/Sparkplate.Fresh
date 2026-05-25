import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const democraticRepublicOfTheCongo: BeltAndRoadInitiativeCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'] as [string, string, string, string, string],
  population: 112832000,
  mainLanguages: [ 'French', 'Kikongo', 'Lingala' ],
  currency: 'Congolese franc (CDF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'Félix Tshisekedi (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC widespread P2P; no official CDF stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CD'],
  newsOutlets: BRI_NEWS_OUTLETS['CD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: BRI_RARE_EARTHS['CD'],
  stockExchange: 'No liquid national exchange; informal OTC and regional listings',
  bondMarkets: BRI_BOND_MARKETS['CD'],
}
