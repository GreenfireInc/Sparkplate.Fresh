import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'

export const slovenia: OecdCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.0569, longitude: 14.5058 },
  independence:
    '1991 Yugoslav succession; EU 2004; euro participant; OECD member since Jul 2010 — informational',
  topMajorCities: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  population: 2100000,
  mainLanguages: ['Slovene', 'Italian (border)', 'Hungarian (minority)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Ljubljana',
  foundingLeader: 'Milan Kučan succession reference — informational',
  currentLeader: 'President Nataša Pirc Musar; Prime Minister Robert Golob — verify',
  cryptocurrencyExchanges: ['EU-compliant brokers; Ljubljana fintech corridors — informational'],
  stablecoin: 'EUR stablecoins under MiCA — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['SI'],
  newsOutlets: OECD_NEWS_OUTLETS['SI'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['SI'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['SI'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['SI'],
  rareEarths: OECD_RARE_EARTHS['SI'],
  stockExchange: 'Ljubljana Stock Exchange',
  bondMarkets: OECD_BOND_MARKETS['SI'],
}
