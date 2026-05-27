import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const benin: BeltAndRoadInitiativeCountry = {
  name: 'Benin',
  iso3166Alpha2: 'BJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Porto-Novo',
  coordinates: { latitude: 6.4969, longitude: 2.6283 },
  independence: '1960-08-01',
  topMajorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon'] as [string, string, string, string, string],
  population: 13224860,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Hubert Maga',
  currentLeader: 'Patrice Talon (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local brokers'],
  stablecoin: 'USDT common in informal trade; XOF pegged to euro via CFA',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BJ'],
  newsOutlets: BRI_NEWS_OUTLETS['BJ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BJ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BJ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BJ'],
  rareEarths: BRI_RARE_EARTHS['BJ'],
  stockExchange: 'Regional Securities Exchange (BRVM) — Abidjan (Benin listed)',
  bondMarkets: BRI_BOND_MARKETS['BJ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BJ'],
}
