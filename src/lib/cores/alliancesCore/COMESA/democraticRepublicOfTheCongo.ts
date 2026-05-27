import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const democraticRepublicOfTheCongo: ComesaCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'],
  population: 105000000,
  mainLanguages: ['French', 'Lingala', 'Swahili'],
  currency: 'Congolese franc (CDF)',
  timezone: 'Africa/Kinshasa',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'President Félix Tshisekedi — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC widespread P2P',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['CD'],
  newsOutlets: COMESA_NEWS_OUTLETS['CD'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: COMESA_RARE_EARTHS['CD'],
  stockExchange: 'BRVM / thin domestic equity context — informal OTC predominant',
  bondMarkets: COMESA_BOND_MARKETS['CD'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['CD'],
}
