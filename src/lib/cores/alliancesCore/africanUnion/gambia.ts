import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
export const gambia: AfricanUnionCountry = {
  name: 'The Gambia',
  iso3166Alpha2: 'GM',
  africanUnionStatus: 'member',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.5791 },
  independence: '1965-02-18',
  topMajorCities: ['Serekunda', 'Brikama', 'Bakau', 'Banjul', 'Farafenni'],
  population: 2700000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara',
  currentLeader: 'Adama Barrow (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex (diaspora)'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GM'],
  newsOutlets: AU_NEWS_OUTLETS['GM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GM'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GM'],
  stockExchange: 'Gambia Stock Exchange (limited)',
}
