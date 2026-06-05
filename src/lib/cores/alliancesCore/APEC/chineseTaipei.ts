import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { APEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

/**
 * Listed as **Chinese Taipei** in official APEC fora — informational.
 * Iso uses TW for interoperability with geographic datasets.
 */
export const chineseTaipei: ApecCountry = {
  name: 'Chinese Taipei',
  iso3166Alpha2: 'TW',
  capital: 'Taipei',
  coordinates: { latitude: 25.033, longitude: 121.5654 },
  independence:
    'Separate customs territory participates APEC as Chinese Taipei (MOFA arrangements — informational)',
  topMajorCities: ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Taoyuan'],
  population: 23900000,
  mainLanguages: ['Traditional Chinese Mandarin', 'Taiwanese Hokkien', 'English education / semiconductor business'],
  currency: 'New Taiwan dollar (TWD)',
  timezone: 'Asia/Taipei',
  foundingLeader: 'Lee Teng-hui democratisation reference — informational',
  currentLeader: 'President Lai Ching-te — verify cross-strait diplomacy volatility',
  cryptocurrencyExchanges: ['MaiCoin MAX regulated VA platforms — informational'],
  stablecoin: 'Taiwan-dollar stable experiments FinTech Sandbox — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['TW'],
  newsOutlets: APEC_NEWS_OUTLETS['TW'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['TW'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['TW'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['TW'],
  rareEarths: APEC_RARE_EARTHS['TW'],
  stockExchange: 'Taiwan Stock Exchange TWSE Taipei',
  bondMarkets: APEC_BOND_MARKETS['TW'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['TW'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['TW'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['TW'],
}
