import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const tunisia: AfricanUnionCountry = {
  name: 'Tunisia',
  iso3166Alpha2: 'TN',
  africanUnionStatus: 'member',
  capital: 'Tunis',
  coordinates: { latitude: 36.8065, longitude: 10.1815 },
  independence: '1956-03-20',
  topMajorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  population: 12000000,
  mainLanguages: ['Arabic (Tunisian)', 'French', 'Berber'],
  currency: 'Tunisian dinar (TND)',
  timezone: 'Africa/Tunis',
  foundingLeader: 'Habib Bourguiba',
  currentLeader: 'Kais Saied (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional brokers', 'OTC'],
  stablecoin: 'USDT informal; e-dinar discussions',
  domesticCourierServices: AU_DOMESTIC_COURIERS['TN'],
  newsOutlets: AU_NEWS_OUTLETS['TN'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['TN'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['TN'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['TN'],
  rareEarths: AU_RARE_EARTHS['TN'],
  stockExchange: 'Bourse de Tunis',
  bondMarkets: AU_BOND_MARKETS['TN'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['TN'],
}
