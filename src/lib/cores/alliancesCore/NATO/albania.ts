import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { NATO_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { NATO_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { NATO_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { NATO_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const albania: NatoCountry = {
  name: 'Albania',
  iso3166Alpha2: 'AL',
  capital: 'Tirana',
  coordinates: { latitude: 41.3275, longitude: 19.8187 },
  independence:
    'Modern republic continuity post-1991 transition; EU candidate trajectory; NATO Ally since Apr 2009 — informational',
  topMajorCities: ['Tirana', 'Durrës', 'Vlorë', 'Elbasan', 'Shkodër'],
  population: 2790000,
  mainLanguages: ['Albanian', 'Greek (minority regions)', 'Italian / English tourist-business'],
  currency: 'Albanian lek (ALL); euro informal pricing common — informational',
  timezone: 'Europe/Tirane',
  foundingLeader: 'Ismail Qemali independence reference; Enver Hoxha-era contrast — informational',
  currentLeader: 'President Bajram Begaj — verify; Prime Minister Edi Rama — verify',
  cryptocurrencyExchanges: ['Regional EU brokers onboarding; OTC informal — informational'],
  stablecoin: 'EUR-USD informal rails predominant — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['AL'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['AL'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['AL'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['AL'],
  newsOutlets: NATO_NEWS_OUTLETS['AL'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['AL'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['AL'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['AL'],
  rareEarths: NATO_RARE_EARTHS['AL'],
  stockExchange: 'Tirana Stock Exchange (thin listings — informational)',
  bondMarkets: NATO_BOND_MARKETS['AL'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['AL'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['AL'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['AL'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['AL'],
}
