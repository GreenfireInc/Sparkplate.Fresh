import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const netherlands: NatoCountry = {
  name: 'Netherlands',
  iso3166Alpha2: 'NL',
  capital: 'Amsterdam (constitutional); seat of government The Hague',
  coordinates: { latitude: 52.3676, longitude: 4.9041 },
  independence:
    'Kingdom constitution continuity; EU founding 1958; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  population: 17800000,
  mainLanguages: ['Dutch', 'English', 'Turkish / Arabic (communities)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Amsterdam',
  foundingLeader: 'Willem Drees post-war reference — informational',
  currentLeader: 'Monarch Willem-Alexander; Prime Minister Dick Schoof — verify',
  cryptocurrencyExchanges: ['Bitstamp', 'MiCA-aligned AFM registry — informational'],
  stablecoin: 'EUR stablecoins; e-money institutions — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['NL'],
  newsOutlets: NATO_NEWS_OUTLETS['NL'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['NL'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['NL'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['NL'],
  rareEarths: NATO_RARE_EARTHS['NL'],
  stockExchange: 'Euronext Amsterdam',
  bondMarkets: NATO_BOND_MARKETS['NL'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['NL'],
}
