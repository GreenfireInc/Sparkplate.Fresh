import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'

export const bulgaria: NatoCountry = {
  name: 'Bulgaria',
  iso3166Alpha2: 'BG',
  capital: 'Sofia',
  coordinates: { latitude: 42.6977, longitude: 23.3219 },
  independence:
    '1908 principality sovereignty continuity; EU since 2007; NATO Ally since Mar 2004 — informational',
  topMajorCities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'],
  population: 6800000,
  mainLanguages: ['Bulgarian', 'Turkish (minority)', 'Romani'],
  currency: 'Bulgarian lev (BGN); euro adoption roadmap — verify',
  timezone: 'Europe/Sofia',
  foundingLeader: 'Alexander Battenberg-era reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU CASP passporting; localized brokers'],
  stablecoin: 'BGN peg mechanism toward euro preparedness — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['BG'],
  newsOutlets: NATO_NEWS_OUTLETS['BG'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['BG'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['BG'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['BG'],
  rareEarths: NATO_RARE_EARTHS['BG'],
  stockExchange: 'Bulgarian Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['BG'],
}
