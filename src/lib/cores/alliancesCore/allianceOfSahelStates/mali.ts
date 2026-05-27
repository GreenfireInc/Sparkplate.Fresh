import type { AllianceOfSahelStatesCountry } from './types'
import { AES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AES_NEWS_OUTLETS } from './newsOutletsByIso'
import { AES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AES_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AES_RARE_EARTHS } from './rareEarthsByIso'
import { AES_BOND_MARKETS } from './bondMarketsByIso'
import { AES_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const mali: AllianceOfSahelStatesCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'],
  population: 23000000,
  mainLanguages: ['French', 'Bambara', 'Fula'],
  currency: 'West African CFA franc (XOF) — ECOWAS transition context',
  timezone: 'Africa/Bamako',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['ML'],
  newsOutlets: AES_NEWS_OUTLETS['ML'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['ML'],
  mainExportCommodities: AES_MAIN_EXPORT_COMMODITIES['ML'],
  mainExportedElements: AES_MAIN_EXPORTED_ELEMENTS['ML'],
  rareEarths: AES_RARE_EARTHS['ML'],
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
  bondMarkets: AES_BOND_MARKETS['ML'],
  mainInternationalAirport: AES_MAIN_INTERNATIONAL_AIRPORTS['ML'],
}
