import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const peru: CptppCountry = {
  name: 'Peru',
  iso3166Alpha2: 'PE',
  capital: 'Lima',
  coordinates: { latitude: -12.0464, longitude: -77.0428 },
  independence: '1821-07-28 (Spain — national day)',
  topMajorCities: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Huancayo'],
  population: 34000000,
  mainLanguages: ['Spanish', 'Quechua', 'Aymara'],
  currency: 'Peruvian sol (PEN)',
  timezone: 'America/Lima',
  foundingLeader: 'José de San Martín / independence cohort — informational',
  currentLeader:
    'President — verify (transitional administrations and 2026 general election cycles — informational)',
  cryptocurrencyExchanges: ['Buda.com (cross-border LATAM)', 'OTC predominant'],
  stablecoin: 'USDT/USDC informal',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['PE'],
  newsOutlets: CPTPP_NEWS_OUTLETS['PE'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['PE'],
  stockExchange: 'Lima Stock Exchange (Bolsa de Valores de Lima)',
}
