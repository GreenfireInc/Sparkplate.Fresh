import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const burundi: AfricanUnionCountry = {
  name: 'Burundi',
  iso3166Alpha2: 'BI',
  africanUnionStatus: 'member',
  capital: 'Gitega',
  coordinates: { latitude: -3.4264, longitude: 29.9306 },
  independence: '1962-07-01',
  topMajorCities: ['Bujumbura', 'Gitega', 'Ngozi', 'Ruyigi', 'Muyinga'],
  population: 13200000,
  mainLanguages: ['Kirundi', 'French', 'English'],
  currency: 'Burundian franc (BIF)',
  timezone: 'Africa/Bujumbura',
  foundingLeader: 'Mwambutsa IV (King at independence)',
  currentLeader: 'Évariste Ndayishimiye (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P', 'Yellow Card (regional)'],
  stablecoin: 'USDT informal; no BIF stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['BI'],
  newsOutlets: AU_NEWS_OUTLETS['BI'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['BI'],
  stockExchange: 'Burundi Stock Exchange (BSE) — thin liquidity',
}
