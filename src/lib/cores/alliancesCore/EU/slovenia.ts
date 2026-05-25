import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'

export const slovenia: EuCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.0569, longitude: 14.5058 },
  independence: '1991 Yugoslav succession; EU 2004-05-01; Euro 2007 — informational',
  topMajorCities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  population: 2100000,
  mainLanguages: ['Slovene', 'Italian (border)', 'Hungarian (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Ljubljana',
  foundingLeader: 'Milan Kučan (transition reference)',
  currentLeader: 'President Nataša Pirc Musar; Prime Minister Robert Golob — verify',
  cryptocurrencyExchanges: ['EU-compliant brokers Ljubljana fintech corridor'],
  stablecoin: 'EUR stablecoins under MiCA',
  domesticCourierServices: EU_DOMESTIC_COURIERS['SI'],
  newsOutlets: EU_NEWS_OUTLETS['SI'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['SI'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['SI'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['SI'],
  rareEarths: EU_RARE_EARTHS['SI'],
  stockExchange: 'Ljubljana Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['SI'],
}
