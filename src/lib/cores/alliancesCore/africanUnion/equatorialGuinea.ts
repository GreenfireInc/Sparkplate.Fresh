import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
export const equatorialGuinea: AfricanUnionCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  africanUnionStatus: 'member',
  capital: 'Malabo',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence: '1968-10-12',
  topMajorCities: ['Bata', 'Malabo', 'Ebebiyín', 'Aconibe', 'Añisoc'],
  population: 1800000,
  mainLanguages: ['Spanish', 'French', 'Portuguese (Annobonese)'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Malabo',
  foundingLeader: 'Francisco Macías Nguema',
  currentLeader: 'Teodoro Obiang Nguema Mbasogo (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'International brokers'],
  stablecoin: 'USDT informal; XAF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GQ'],
  newsOutlets: AU_NEWS_OUTLETS['GQ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GQ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GQ'],
  stockExchange: 'CEMAC regional market (limited local listings)',
}
