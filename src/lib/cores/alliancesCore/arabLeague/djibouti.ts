import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'

export const djibouti: ArabLeagueCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  arabLeagueStatus: 'member',
  capital: 'Djibouti City',
  coordinates: { latitude: 11.5886, longitude: 43.1456 },
  independence: '1977-06-27',
  topMajorCities: ['Djibouti City', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil'],
  population: 1100000,
  mainLanguages: ['French', 'Arabic', 'Somali'],
  currency: 'Djiboutian franc (DJF)',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'Hassan Gouled Aptidon',
  currentLeader: 'Ismail Omar Guelleh (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'International OTC', 'Regional remittance apps'],
  stablecoin: 'USDT / USDC; DJF pegged to USD (currency board)',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['DJ'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['DJ'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['DJ'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['DJ'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin activity)',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['DJ'],
}
