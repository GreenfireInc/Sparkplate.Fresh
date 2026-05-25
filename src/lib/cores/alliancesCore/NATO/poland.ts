import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'

export const poland: NatoCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  capital: 'Warsaw',
  coordinates: { latitude: 52.2297, longitude: 21.0122 },
  independence:
    '1989 democratic transition lineage; EU since 2004; NATO Ally since Mar 1999 eastern flank anchor — informational',
  topMajorCities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań'],
  population: 36600000,
  mainLanguages: ['Polish', 'German (minority)', 'Ukrainian (community)'],
  currency: 'Polish złoty (PLN)',
  timezone: 'Europe/Warsaw',
  foundingLeader: 'Lech Wałęsa reference — informational',
  currentLeader: 'President — verify; Prime Minister — verify (electoral aftermath)',
  cryptocurrencyExchanges: ['Zonda (BitBay legacy)', 'MiCA passport — informational'],
  stablecoin: 'PLN pairs; EUR-stable common — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['PL'],
  newsOutlets: NATO_NEWS_OUTLETS['PL'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['PL'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['PL'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['PL'],
  rareEarths: NATO_RARE_EARTHS['PL'],
  stockExchange: 'Warsaw Stock Exchange (GPW)',
  bondMarkets: NATO_BOND_MARKETS['PL'],
}
