import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const mali: BeltAndRoadInitiativeCountry = {
  name: 'Mali',
  iso3166Alpha2: 'ML',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bamako',
  coordinates: { latitude: 12.6392, longitude: -8.0029 },
  independence: '1960-09-22',
  topMajorCities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'] as [string, string, string, string, string],
  population: 22395489,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Modibo Keïta',
  currentLeader: 'Assimi Goïta (Colonel; transitional leadership)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ML'],
  newsOutlets: BRI_NEWS_OUTLETS['ML'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ML'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ML'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ML'],
  rareEarths: BRI_RARE_EARTHS['ML'],
  stockExchange: 'Bourse des Valeurs du Mali (limited)',
  bondMarkets: BRI_BOND_MARKETS['ML'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['ML'],
}
