import type { BricsCountry } from './types'
import { BRICS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRICS_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRICS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRICS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRICS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRICS_RARE_EARTHS } from './rareEarthsByIso'
import { BRICS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRICS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const southAfrica: BricsCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  bricsStatus: 'founding_member',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence: '1931-12-11 (Statute of Westminster); 1994-04-27 (democratic transition milestone)',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth (Gqeberha)'],
  population: 62000000,
  mainLanguages: ['Zulu', 'Xhosa', 'Afrikaans'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Nelson Mandela (first President under fully democratic constitution — informational)',
  currentLeader: 'Cyril Ramaphosa (President)',
  cryptocurrencyExchanges: ['VALR', 'Luno', 'Binance (P2P)', 'Regional OTC'],
  stablecoin: 'No official ZAR stablecoin at retail scale; USDT/USDC used in crypto markets',
  domesticCourierServices: BRICS_DOMESTIC_COURIERS['ZA'],
  newsOutlets: BRICS_NEWS_OUTLETS['ZA'],
  notableUniversities: BRICS_NOTABLE_UNIVERSITIES['ZA'],
  mainExportCommodities: BRICS_MAIN_EXPORT_COMMODITIES['ZA'],
  mainExportedElements: BRICS_MAIN_EXPORTED_ELEMENTS['ZA'],
  rareEarths: BRICS_RARE_EARTHS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
  intellectualPropertyDepartments: BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZA'],
  securitiesExchangeCommission: BRICS_SECURITIES_EXCHANGE_COMMISSIONS['ZA'],
  mainInternationalAirport: BRICS_MAIN_INTERNATIONAL_AIRPORTS['ZA'],
}
