import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const tonga: CommonwealthCountry = {
  name: 'Tonga',
  iso3166Alpha2: 'TO',
  commonwealthStatus: 'member',
  capital: 'Nuku\'alofa',
  coordinates: { latitude: -21.1393, longitude: -175.2049 },
  independence: '1970-06-04',
  topMajorCities: ['Nuku\'alofa', 'Neiafu', 'Haveluloto', 'Vaini', 'Pangai'],
  population: 105000,
  mainLanguages: ['Tongan', 'English', 'Niuean (community)'],
  currency: 'Tongan paʻanga (TOP)',
  timezone: 'Pacific/Tongatapu',
  foundingLeader: 'Taufaʻahau Tupou IV (King; independence era)',
  currentLeader: 'Tupou VI (King); PM — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['TO'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['TO'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['TO'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['TO'],
  stockExchange: 'Tonga Stock Exchange',
}
