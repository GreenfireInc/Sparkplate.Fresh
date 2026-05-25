import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'

export const mexico: CptppCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence: '1810–1821 (Spain; modern constitutional state evolution)',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 132000000,
  mainLanguages: ['Spanish', 'Indigenous languages (Nahuatl etc.)', 'English'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader: 'Agustín de Iturbide / early republic figures — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso', 'VOLTA', 'Global platforms (travel context)'],
  stablecoin: 'USDT / USDC; CBDC exploratory discourse',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['MX'],
  newsOutlets: CPTPP_NEWS_OUTLETS['MX'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['MX'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['MX'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['MX'],
  rareEarths: CPTPP_RARE_EARTHS['MX'],
  stockExchange: 'Mexican Stock Exchange (Bolsa Mexicana de Valores)',
  bondMarkets: CPTPP_BOND_MARKETS['MX'],
}
