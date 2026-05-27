import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CARICOM_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CARICOM_RARE_EARTHS } from './rareEarthsByIso'
import { CARICOM_BOND_MARKETS } from './bondMarketsByIso'
import { CARICOM_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const turksAndCaicosIslands: CaricomCountry = {
  name: 'Turks and Caicos Islands',
  iso3166Alpha2: 'TC',
  caricomStatus: 'associate_member',
  capital: 'Cockburn Town (Grand Turk)',
  coordinates: { latitude: 21.4605, longitude: -71.1419 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['Providenciales', 'Cockburn Town', 'Blue Hills', 'Wheeland', 'Bottle Creek'],
  population: 45000,
  mainLanguages: ['English', 'Turks and Caicos Creole', 'Haitian Creole'],
  currency: 'United States dollar (USD)',
  timezone: 'America/Grand_Turk',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USD; USDT/USDC informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['TC'],
  newsOutlets: CARICOM_NEWS_OUTLETS['TC'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['TC'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['TC'],
  mainExportedElements: CARICOM_MAIN_EXPORTED_ELEMENTS['TC'],
  rareEarths: CARICOM_RARE_EARTHS['TC'],
  stockExchange: 'No major national exchange — informational',
  bondMarkets: CARICOM_BOND_MARKETS['TC'],
  mainInternationalAirport: CARICOM_MAIN_INTERNATIONAL_AIRPORTS['TC'],
}
