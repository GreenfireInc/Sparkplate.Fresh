import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['GQ'],
  stockExchange: 'CEMAC regional liquidity; limited local listings',
}
