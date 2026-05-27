import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const grenada: CommonwealthCountry = {
  name: 'Grenada',
  iso3166Alpha2: 'GD',
  commonwealthStatus: 'member',
  capital: 'St. George\'s',
  coordinates: { latitude: 12.0564, longitude: -61.7485 },
  independence: '1974-02-07',
  topMajorCities: ['St. George\'s', 'Gouyave', 'Grenville', 'Victoria', 'Sauteurs'],
  population: 126000,
  mainLanguages: ['English', 'Grenadian Creole French', 'Patois'],
  currency: 'East Caribbean dollar (XCD)',
  timezone: 'America/Grenada',
  foundingLeader: 'Eric Gairy (first Prime Minister)',
  currentLeader: 'Dickon Mitchell (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'XCD peg; USDT/USDC',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['GD'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['GD'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['GD'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['GD'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['GD'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['GD'],
  stockExchange: 'Eastern Caribbean Securities Exchange (regional)',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['GD'],
}
