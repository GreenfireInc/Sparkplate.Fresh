import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const southAfrica: CommonwealthCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  commonwealthStatus: 'member',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence: '1931-12-11; 1994-04-27 (democratic transition)',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  population: 62000000,
  mainLanguages: ['Zulu', 'Xhosa', 'Afrikaans'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Nelson Mandela (first President under full democracy)',
  currentLeader: 'Cyril Ramaphosa (President)',
  cryptocurrencyExchanges: ['VALR', 'Luno', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['ZA'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['ZA'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['ZA'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['ZA'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['ZA'],
}
