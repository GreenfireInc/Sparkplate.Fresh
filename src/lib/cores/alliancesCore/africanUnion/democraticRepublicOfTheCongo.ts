import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const democraticRepublicOfTheCongo: AfricanUnionCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  africanUnionStatus: 'member',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'],
  population: 105000000,
  mainLanguages: ['French', 'Lingala', 'Swahili'],
  currency: 'Congolese franc (CDF)',
  timezone: 'Africa/Kinshasa',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'Félix Tshisekedi (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC widespread P2P; no official CDF stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CD'],
  newsOutlets: AU_NEWS_OUTLETS['CD'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: AU_RARE_EARTHS['CD'],
  stockExchange: 'No liquid national exchange; informal OTC and regional listings',
  bondMarkets: AU_BOND_MARKETS['CD'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CD'],
}
