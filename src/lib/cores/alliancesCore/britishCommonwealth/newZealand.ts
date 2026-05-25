import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const newZealand: CommonwealthCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  commonwealthStatus: 'member',
  capital: 'Wellington',
  coordinates: { latitude: -41.2865, longitude: 174.7762 },
  independence: '1907-09-26 (Dominion); full sovereignty evolution',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5200000,
  mainLanguages: ['English', 'Māori', 'New Zealand Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Richard Seddon (notable Premier era)',
  currentLeader: 'Christopher Luxon (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'Independent Reserve NZ', 'Binance (P2P)'],
  stablecoin: 'NZD stablecoins limited; USDC/USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['NZ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['NZ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['NZ'],
  stockExchange: 'NZX (New Zealand Exchange)',
}
