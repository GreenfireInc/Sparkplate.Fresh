import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const southAfrica: BeltAndRoadInitiativeCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Pretoria',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence: '1910-05-31 (Union); 1994-04-27 (first democratic election reference)',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth (Gqeberha)'] as [string, string, string, string, string],
  population: 63100945,
  mainLanguages: [ 'Afrikaans', 'English', 'Southern Ndebele' ],
  currency: 'South African rand (ZAR)',
  timezone: 'UTC+02:00',
  foundingLeader: 'Louis Botha (first Prime Minister, Union of South Africa)',
  currentLeader: 'Cyril Ramaphosa (President)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)', 'ICE3 (historical)'],
  stablecoin: 'USDT / USDC; ZARP (rand-referenced stable token, private)',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ZA'],
  newsOutlets: BRI_NEWS_OUTLETS['ZA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
}
