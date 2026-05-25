import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'

export const slovenia: NatoCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.0569, longitude: 14.5058 },
  independence:
    '1991 Yugoslav succession; EU 2004 euro participant; NATO Ally since Mar 2004 — informational',
  topMajorCities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  population: 2100000,
  mainLanguages: ['Slovene', 'Italian (border)', 'Hungarian (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Ljubljana',
  foundingLeader: 'Milan Kučan transition reference — informational',
  currentLeader: 'President Nataša Pirc Musar; Prime Minister Robert Golob — verify',
  cryptocurrencyExchanges: ['EU-compliant brokers Ljubljana corridor — informational'],
  stablecoin: 'EUR stablecoins MiCA — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['SI'],
  newsOutlets: NATO_NEWS_OUTLETS['SI'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['SI'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['SI'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['SI'],
  rareEarths: NATO_RARE_EARTHS['SI'],
  stockExchange: 'Ljubljana Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['SI'],
}
