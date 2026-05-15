import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const democraticRepublicOfTheCongo: EacCountry = {
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
  domesticCourierServices: EAC_DOMESTIC_COURIERS['CD'],
  stockExchange: 'Domestic equities thin — informal OTC and regional linkage',
}
