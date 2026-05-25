import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'

export const saoTomeAndPrincipe: EccasCountry = {
  name: 'São Tomé and Príncipe',
  iso3166Alpha2: 'ST',
  capital: 'São Tomé',
  coordinates: { latitude: 0.3383, longitude: 6.7311 },
  independence: '1975-07-12',
  topMajorCities: ['São Tomé', 'Trindade', 'Neves', 'Santana', 'São João dos Angolares'],
  population: 230000,
  mainLanguages: ['Portuguese', 'Forro', 'Angolar'],
  currency: 'São Tomé and Príncipe dobra (STN)',
  timezone: 'Africa/Sao_Tome',
  foundingLeader: 'Manuel Pinto da Costa (first President)',
  currentLeader: 'President Carlos Vila Nova — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'European brokers', 'OTC'],
  stablecoin: 'EUR/USD-linked holdings informal alongside STN',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['ST'],
  newsOutlets: ECCAS_NEWS_OUTLETS['ST'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['ST'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['ST'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['ST'],
  rareEarths: ECCAS_RARE_EARTHS['ST'],
  stockExchange: 'Bolsa de Valores de São Tomé e Príncipe (limited)',
  bondMarkets: ECCAS_BOND_MARKETS['ST'],
}
