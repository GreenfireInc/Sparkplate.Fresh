import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const mexico: G20Country = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence:
    '1821 Mexican independence from Spain consolidated; bicentennial federation; G20 founding member (finance track 1999; 2012 Los Cabos leaders summit host) — informational',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 130000000,
  mainLanguages: ['Spanish', 'Nahuatl / indigenous languages', 'English (near-border business)'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader:
    'Miguel Hidalgo y Costilla insurgency era; Porfirio Díaz / modern state references — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso', 'Mexico CNBV fintech-registration evolution — informational'],
  stablecoin: 'MXN fiat-backed issuance pilots vs informal USDT — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['MX'],
  newsOutlets: G20_NEWS_OUTLETS['MX'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['MX'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['MX'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['MX'],
  rareEarths: G20_RARE_EARTHS['MX'],
  stockExchange: 'Mexican Stock Exchange BMV Bolsa Mexicana de Valores',
  bondMarkets: G20_BOND_MARKETS['MX'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['MX'],
}
