import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const democraticRepublicOfTheCongo: EccasCountry = {
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
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['CD'],
  newsOutlets: ECCAS_NEWS_OUTLETS['CD'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: ECCAS_RARE_EARTHS['CD'],
  stockExchange: 'Domestic equities thin — informal OTC predominant',
  bondMarkets: ECCAS_BOND_MARKETS['CD'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['CD'],
}
