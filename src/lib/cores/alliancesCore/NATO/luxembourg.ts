import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'

export const luxembourg: NatoCountry = {
  name: 'Luxembourg',
  iso3166Alpha2: 'LU',
  capital: 'Luxembourg City',
  coordinates: { latitude: 49.6116, longitude: 6.1319 },
  independence:
    'Grand duchy continuity; EU founding 1958; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Pétange'],
  population: 670000,
  mainLanguages: ['Luxembourgish', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Luxembourg',
  foundingLeader: 'Jean Monnet steel-integration reference — informational',
  currentLeader: 'Grand Duke Henri; Prime Minister — verify',
  cryptocurrencyExchanges: ['Bitstamp LU legacy HQ; MiCA crypto hub vehicles — informational'],
  stablecoin: 'EUR stablecoins; fund servicing sector — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['LU'],
  newsOutlets: NATO_NEWS_OUTLETS['LU'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['LU'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['LU'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['LU'],
  rareEarths: NATO_RARE_EARTHS['LU'],
  stockExchange: 'Luxembourg Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['LU'],
}
