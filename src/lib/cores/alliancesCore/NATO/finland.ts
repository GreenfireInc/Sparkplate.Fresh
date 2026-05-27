import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const finland: NatoCountry = {
  name: 'Finland',
  iso3166Alpha2: 'FI',
  capital: 'Helsinki',
  coordinates: { latitude: 60.1699, longitude: 24.9384 },
  independence:
    '1917 independence lineage; EU since 1995; euro participant; NATO Ally since Apr 2023 — informational',
  topMajorCities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'],
  population: 5600000,
  mainLanguages: ['Finnish', 'Swedish', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Helsinki',
  foundingLeader: 'Mannerheim-era defence continuity reference — informational',
  currentLeader: 'President Alexander Stubb; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic EU brokers Finnish FSA — informational'],
  stablecoin: 'EUR stablecoins; MiCA passport — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['FI'],
  newsOutlets: NATO_NEWS_OUTLETS['FI'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['FI'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['FI'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['FI'],
  rareEarths: NATO_RARE_EARTHS['FI'],
  stockExchange: 'Nasdaq Helsinki',
  bondMarkets: NATO_BOND_MARKETS['FI'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['FI'],
}
