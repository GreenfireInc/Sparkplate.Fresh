import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const caymanIslands: CaricomCountry = {
  name: 'Cayman Islands',
  iso3166Alpha2: 'KY',
  caricomStatus: 'associate_member',
  capital: 'George Town',
  coordinates: { latitude: 19.3133, longitude: -81.2546 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['George Town', 'West Bay', 'Bodden Town', 'East End', 'North Side'],
  population: 69000,
  mainLanguages: ['English', 'Jamaican Creole (community)', 'Spanish'],
  currency: 'Cayman Islands dollar (KYD); USD widely used',
  timezone: 'America/Cayman',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['CIMA-regulated entities', 'Offshore funds — verify'],
  stablecoin: 'KYD/USD peg; USDT in offshore context',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['KY'],
  newsOutlets: CARICOM_NEWS_OUTLETS['KY'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['KY'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['KY'],
  stockExchange: 'Cayman Islands Stock Exchange (CSX)',
}
