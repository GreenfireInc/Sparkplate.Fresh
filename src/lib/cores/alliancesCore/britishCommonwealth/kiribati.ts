import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const kiribati: CommonwealthCountry = {
  name: 'Kiribati',
  iso3166Alpha2: 'KI',
  commonwealthStatus: 'member',
  capital: 'South Tarawa',
  coordinates: { latitude: 1.4518, longitude: 172.9719 },
  independence: '1979-07-12',
  topMajorCities: ['Tarawa', 'Betio', 'Bikenibeu', 'Teaoraereke', 'Bairiki'],
  population: 130000,
  mainLanguages: ['English', 'Gilbertese', 'Tuvaluan (regional)'],
  currency: 'Australian dollar (AUD)',
  timezone: 'Pacific/Tarawa',
  foundingLeader: 'Ieremia Tabai (first President)',
  currentLeader: 'Taneti Maamau (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'AUD; USDT informal',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['KI'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['KI'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['KI'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['KI'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['KI'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['KI'],
  stockExchange: 'No major national exchange — informational',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['KI'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['KI'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['KI'],
}
