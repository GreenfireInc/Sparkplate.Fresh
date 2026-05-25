import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const cameroon: BeltAndRoadInitiativeCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence: '1960-01-01',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam'] as [string, string, string, string, string],
  population: 29442327,
  mainLanguages: [ 'English', 'French', 'Regional languages' ],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Ahmadou Ahidjo',
  currentLeader: 'Paul Biya (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; XAF CFA peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CM'],
  newsOutlets: BRI_NEWS_OUTLETS['CM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CM'],
  rareEarths: BRI_RARE_EARTHS['CM'],
  stockExchange: 'Douala Stock Exchange (DSX)',
  bondMarkets: BRI_BOND_MARKETS['CM'],
}
