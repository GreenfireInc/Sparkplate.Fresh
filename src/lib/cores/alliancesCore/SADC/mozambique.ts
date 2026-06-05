import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { SADC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const mozambique: SadcCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence: '1975-06-25',
  topMajorCities: ['Maputo', 'Matola', 'Beira', 'Nampula', 'Chimoio'],
  population: 34100000,
  mainLanguages: ['Portuguese', 'Emakhuwa', 'Changana'],
  currency: 'Mozambique metical (MZN)',
  timezone: 'Africa/Maputo',
  foundingLeader: 'Samora Machel (first President Frelimo republic)',
  currentLeader: 'President Daniel Chapo — verify',
  cryptocurrencyExchanges: ['Regional OTC informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MZ'],
  newsOutlets: SADC_NEWS_OUTLETS['MZ'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MZ'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['MZ'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['MZ'],
  rareEarths: SADC_RARE_EARTHS['MZ'],
  stockExchange: 'Bolsa de Valores de Moçambique — verify activity',
  bondMarkets: SADC_BOND_MARKETS['MZ'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['MZ'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['MZ'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['MZ'],
}
