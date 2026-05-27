import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const togo: BeltAndRoadInitiativeCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lomé',
  coordinates: { latitude: 6.1256, longitude: 1.2254 },
  independence: '1960-04-27',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Kpalimé', 'Atakpamé'] as [string, string, string, string, string],
  population: 8095498,
  mainLanguages: [ 'French', 'English', 'Regional languages' ],
  currency: 'West African CFA franc (XOF)',
  timezone: 'UTC',
  foundingLeader: 'Sylvanus Olympio',
  currentLeader: 'Faure Gnassingbé (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Regional OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TG'],
  newsOutlets: BRI_NEWS_OUTLETS['TG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TG'],
  rareEarths: BRI_RARE_EARTHS['TG'],
  stockExchange: 'BRVM regional listings; Lomé financial center activity',
  bondMarkets: BRI_BOND_MARKETS['TG'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TG'],
}
