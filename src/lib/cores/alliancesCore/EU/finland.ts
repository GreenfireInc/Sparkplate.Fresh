import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const finland: EuCountry = {
  name: 'Finland',
  iso3166Alpha2: 'FI',
  capital: 'Helsinki',
  coordinates: { latitude: 60.1699, longitude: 24.9384 },
  independence: '1917; EU since 1995-01-01; Euro 1999 — informational',
  topMajorCities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku'],
  population: 5600000,
  mainLanguages: ['Finnish', 'Swedish', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Helsinki',
  foundingLeader: 'Carl Gustaf Emil Mannerheim era — informational',
  currentLeader: 'President Alexander Stubb; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordics-friendly EU brokers; Finnish FSA supervise'],
  stablecoin: 'EUR stablecoins; MiCA passport',
  domesticCourierServices: EU_DOMESTIC_COURIERS['FI'],
  newsOutlets: EU_NEWS_OUTLETS['FI'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['FI'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['FI'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['FI'],
  rareEarths: EU_RARE_EARTHS['FI'],
  stockExchange: 'Nasdaq Helsinki',
  bondMarkets: EU_BOND_MARKETS['FI'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['FI'],
}
