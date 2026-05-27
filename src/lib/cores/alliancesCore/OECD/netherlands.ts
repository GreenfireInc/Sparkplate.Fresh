import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const netherlands: OecdCountry = {
  name: 'Netherlands',
  iso3166Alpha2: 'NL',
  capital: 'Amsterdam (constitutional); seat of government The Hague',
  coordinates: { latitude: 52.3676, longitude: 4.9041 },
  independence:
    'Kingdom constitution continuity; EU founding 1958; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  population: 17800000,
  mainLanguages: ['Dutch', 'English', 'Turkish / Arabic (communities)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Amsterdam',
  foundingLeader: 'Willem Drees post-war welfare reference — informational',
  currentLeader: 'Monarch Willem-Alexander; Prime Minister Dick Schoof — verify',
  cryptocurrencyExchanges: ['Bitstamp', 'AFM-register MiCA-aligned — informational'],
  stablecoin: 'EUR stablecoins; e-money institutions — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['NL'],
  newsOutlets: OECD_NEWS_OUTLETS['NL'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['NL'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['NL'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['NL'],
  rareEarths: OECD_RARE_EARTHS['NL'],
  stockExchange: 'Euronext Amsterdam',
  bondMarkets: OECD_BOND_MARKETS['NL'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['NL'],
}
