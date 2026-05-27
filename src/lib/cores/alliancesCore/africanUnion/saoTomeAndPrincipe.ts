import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const saoTomeAndPrincipe: AfricanUnionCountry = {
  name: 'São Tomé and Príncipe',
  iso3166Alpha2: 'ST',
  africanUnionStatus: 'member',
  capital: 'São Tomé',
  coordinates: { latitude: 0.3383, longitude: 6.7311 },
  independence: '1975-07-12',
  topMajorCities: ['São Tomé', 'Trindade', 'Neves', 'Santana', 'São João dos Angolares'],
  population: 230000,
  mainLanguages: ['Portuguese', 'Forro', 'Angolar'],
  currency: 'São Tomé and Príncipe dobra (STN)',
  timezone: 'Africa/Sao_Tome',
  foundingLeader: 'Manuel Pinto da Costa',
  currentLeader: 'Carlos Vila Nova (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'European brokers', 'OTC'],
  stablecoin: 'EUR/USD-linked assets informal; STN',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ST'],
  newsOutlets: AU_NEWS_OUTLETS['ST'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ST'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ST'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['ST'],
  rareEarths: AU_RARE_EARTHS['ST'],
  stockExchange: 'Bolsa de Valores de São Tomé e Príncipe (limited)',
  bondMarkets: AU_BOND_MARKETS['ST'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['ST'],
}
