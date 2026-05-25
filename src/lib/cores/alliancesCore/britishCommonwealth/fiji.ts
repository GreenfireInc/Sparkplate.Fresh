import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const fiji: CommonwealthCountry = {
  name: 'Fiji',
  iso3166Alpha2: 'FJ',
  commonwealthStatus: 'member',
  capital: 'Suva',
  coordinates: { latitude: -18.1416, longitude: 178.4419 },
  independence: '1970-10-10',
  topMajorCities: ['Suva', 'Nadi', 'Lautoka', 'Labasa', 'Ba'],
  population: 930000,
  mainLanguages: ['English', 'Fijian (iTaukei)', 'Fiji Hindi'],
  currency: 'Fijian dollar (FJD)',
  timezone: 'Pacific/Fiji',
  foundingLeader: 'Kamisese Mara (first Prime Minister)',
  currentLeader: 'Sitiveni Rabuka (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT/USDC informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['FJ'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['FJ'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['FJ'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['FJ'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['FJ'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['FJ'],
  stockExchange: 'South Pacific Stock Exchange',
}
