import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
export const zimbabwe: AfricanUnionCountry = {
  name: 'Zimbabwe',
  iso3166Alpha2: 'ZW',
  africanUnionStatus: 'member',
  capital: 'Harare',
  coordinates: { latitude: -17.8252, longitude: 31.0335 },
  independence: '1980-04-18',
  topMajorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru'],
  population: 16000000,
  mainLanguages: ['English', 'Shona', 'Ndebele'],
  currency: 'Zimbabwean dollar (ZWL); United States dollar widely used',
  timezone: 'Africa/Harare',
  foundingLeader: 'Robert Mugabe (first Prime Minister)',
  currentLeader: 'Emmerson Mnangagwa (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Golix (historical)', 'Local P2P'],
  stablecoin: 'USDT / USDC; USD cash economy',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ZW'],
  newsOutlets: AU_NEWS_OUTLETS['ZW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ZW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ZW'],
  stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
}
