import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'

export const bulgaria: EuCountry = {
  name: 'Bulgaria',
  iso3166Alpha2: 'BG',
  capital: 'Sofia',
  coordinates: { latitude: 42.6977, longitude: 23.3219 },
  independence: '1908 Principality sovereignty; EU member since 2007-01-01 — informational',
  topMajorCities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'],
  population: 6800000,
  mainLanguages: ['Bulgarian', 'Turkish (minority)', 'Romani'],
  currency: 'Bulgarian lev (BGN); euro adoption target — verify',
  timezone: 'Europe/Sofia',
  foundingLeader: 'Alexander Battenberg (late 19ᵗʰ-c. reference)',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU CASP passporting; localized brokers'],
  stablecoin: 'BGN euro peg-mechanism; preparatory euro-era — verify',
  domesticCourierServices: EU_DOMESTIC_COURIERS['BG'],
  newsOutlets: EU_NEWS_OUTLETS['BG'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['BG'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['BG'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['BG'],
  rareEarths: EU_RARE_EARTHS['BG'],
  stockExchange: 'Bulgarian Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['BG'],
}
