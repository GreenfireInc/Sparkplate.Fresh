import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const vietnam: CptppCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  capital: 'Hanoi',
  coordinates: { latitude: 21.0285, longitude: 105.8542 },
  independence: '1945-09-02 (declaration); reunification 1975 — informational',
  topMajorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hải Phòng', 'Cần Thơ'],
  population: 101000000,
  mainLanguages: ['Vietnamese', 'English', 'French (minor/heritage)'],
  currency: 'Vietnamese đồng (VND)',
  timezone: 'Asia/Ho_Chi_Minh',
  foundingLeader: 'Hồ Chí Minh (Democratic Republic leadership reference)',
  currentLeader: 'Communist Party leadership collective (General Secretary, President, PM) — verify',
  cryptocurrencyExchanges: ['Trading not legal tender; peer OTC despite restrictions — informational'],
  stablecoin: 'No official retail stablecoin; USD cash economy parallels',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['VN'],
  newsOutlets: CPTPP_NEWS_OUTLETS['VN'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['VN'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['VN'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['VN'],
  rareEarths: CPTPP_RARE_EARTHS['VN'],
  stockExchange: 'Ho Chi Minh Stock Exchange (HOSE) / Hanoi Stock Exchange (HNX)',
  bondMarkets: CPTPP_BOND_MARKETS['VN'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['VN'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['VN'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['VN'],
}
