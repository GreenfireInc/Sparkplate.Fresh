import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const burundi: EacCountry = {
  name: 'Burundi',
  iso3166Alpha2: 'BI',
  capital: 'Gitega',
  coordinates: { latitude: -3.4264, longitude: 29.9306 },
  independence: '1962-07-01',
  topMajorCities: ['Bujumbura', 'Gitega', 'Ngozi', 'Ruyigi', 'Muyinga'],
  population: 13200000,
  mainLanguages: ['Kirundi', 'French', 'English'],
  currency: 'Burundian franc (BIF)',
  timezone: 'Africa/Bujumbura',
  foundingLeader: 'Mwambutsa IV (King at independence)',
  currentLeader: 'President Évariste Ndayishimiye — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'Local OTC'],
  stablecoin: 'USDT informal',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['BI'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['BI'],
  stockExchange: 'Burundi Stock Exchange — thin liquidity',
}
