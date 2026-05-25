import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'

export const equatorialGuinea: EccasCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  capital: 'Malabo',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence: '1968-10-12 (from Spain)',
  topMajorCities: ['Bata', 'Malabo', 'Ebebiyín', 'Aconibe', 'Añisoc'],
  population: 1800000,
  mainLanguages: ['Spanish', 'French', 'Portuguese (Annobonese)'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Malabo',
  foundingLeader: 'Francisco Macías Nguema (first President)',
  currentLeader: 'President Teodoro Obiang Nguema Mbasogo — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'International brokers'],
  stablecoin: 'USDT informal; XAF peg',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['GQ'],
  newsOutlets: ECCAS_NEWS_OUTLETS['GQ'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['GQ'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['GQ'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['GQ'],
  rareEarths: ECCAS_RARE_EARTHS['GQ'],
  stockExchange: 'CEMAC regional liquidity; limited local listings',
  bondMarkets: ECCAS_BOND_MARKETS['GQ'],
}
