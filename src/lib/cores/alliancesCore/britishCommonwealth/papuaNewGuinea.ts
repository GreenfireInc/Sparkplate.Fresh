import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'

export const papuaNewGuinea: CommonwealthCountry = {
  name: 'Papua New Guinea',
  iso3166Alpha2: 'PG',
  commonwealthStatus: 'member',
  capital: 'Port Moresby',
  coordinates: { latitude: -9.4438, longitude: 147.1803 },
  independence: '1975-09-16',
  topMajorCities: ['Port Moresby', 'Lae', 'Arawa', 'Mount Hagen', 'Madang'],
  population: 10000000,
  mainLanguages: ['English', 'Tok Pisin', 'Hiri Motu'],
  currency: 'Papua New Guinean kina (PGK)',
  timezone: 'Pacific/Port_Moresby',
  foundingLeader: 'Michael Somare (first Prime Minister)',
  currentLeader: 'James Marape (Prime Minister)',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['PG'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['PG'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['PG'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['PG'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['PG'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['PG'],
  stockExchange: 'PNG National Stock Exchange',
}
