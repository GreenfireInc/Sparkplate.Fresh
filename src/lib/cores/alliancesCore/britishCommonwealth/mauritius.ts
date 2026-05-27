import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const mauritius: CommonwealthCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  commonwealthStatus: 'member',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence: '1968-03-12',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1260000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam (first Prime Minister)',
  currentLeader: 'Navin Ramgoolam (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['MU'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['MU'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['MU'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['MU'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['MU'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['MU'],
  stockExchange: 'Stock Exchange of Mauritius',
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['MU'],
}
