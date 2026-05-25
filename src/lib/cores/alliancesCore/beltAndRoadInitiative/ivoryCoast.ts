import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const ivoryCoast: BeltAndRoadInitiativeCountry = {
  name: 'Côte d\'Ivoire',
  iso3166Alpha2: 'CI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'] as [string, string, string, string, string],
  population: 31719275,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Félix Houphouët-Boigny',
  currentLeader: 'Alassane Ouattara (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno (regional)'],
  stablecoin: 'USDT / USDC; XOF pegged via CFA',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CI'],
  newsOutlets: BRI_NEWS_OUTLETS['CI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CI'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CI'],
  rareEarths: BRI_RARE_EARTHS['CI'],
  stockExchange: 'BRVM (Abidjan — regional hub)',
  bondMarkets: BRI_BOND_MARKETS['CI'],
}
