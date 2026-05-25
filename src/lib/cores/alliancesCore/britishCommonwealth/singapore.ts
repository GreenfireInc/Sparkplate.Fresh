import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const singapore: CommonwealthCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  commonwealthStatus: 'member',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence: '1965-08-09',
  topMajorCities: ['Singapore', 'Jurong East', 'Tampines', 'Woodlands', 'Bedok'],
  population: 6000000,
  mainLanguages: ['English', 'Mandarin', 'Malay'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew (first Prime Minister)',
  currentLeader: 'Lawrence Wong (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Coinbase', 'Crypto.com', 'Independent Reserve'],
  stablecoin: 'XSGD and USDC (regulated venues); USDT',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['SG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['SG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
}
