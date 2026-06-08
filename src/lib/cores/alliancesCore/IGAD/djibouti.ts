import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IGAD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IGAD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IGAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IGAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IGAD_RARE_EARTHS } from './rareEarthsByIso'
import { IGAD_BOND_MARKETS } from './bondMarketsByIso'
import { IGAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IGAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IGAD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const djibouti: IgadCountry = {
  name: 'Djibouti',
  iso3166Alpha2: 'DJ',
  capital: 'Djibouti',
  coordinates: { latitude: 11.8251, longitude: 42.5903 },
  independence:
    '1977 independence from France; IGADD founding state Jan 1986; IGAD treaty host / Secretariat geography — informational',
  topMajorCities: ['Djibouti', 'Ali Sabieh', 'Dikhil', 'Tadjoura', 'Obock'],
  population: 1100000,
  mainLanguages: ['French', 'Arabic', 'Somali / Afar'],
  currency: 'Djiboutian franc (DJF; USD-pegged de facto Bretton Woods-type anchor)',
  timezone: 'Africa/Djibouti',
  foundingLeader: 'President Hassan Gouled Aptidon (Djibouti-era IGADD convening continuity — informational)',
  currentLeader: 'President Ismail Omar Guelleh — verify',
  cryptocurrencyExchanges: ['Regional remittance OTC; DFS regulation evolution — informational'],
  stablecoin: 'USD-stable informal settlement (port/finance-city economy — informational)',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['DJ'],
  domesticPostService: IGAD_DOMESTIC_POST_SERVICES['DJ'],
  nationalBankingInstitutions: IGAD_NATIONAL_BANKING_INSTITUTIONS['DJ'],
  corporationFormationOffice: IGAD_CORPORATION_FORMATION_OFFICES['DJ'],
  newsOutlets: IGAD_NEWS_OUTLETS['DJ'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['DJ'],
  mainExportCommodities: IGAD_MAIN_EXPORT_COMMODITIES['DJ'],
  mainExportedElements: IGAD_MAIN_EXPORTED_ELEMENTS['DJ'],
  rareEarths: IGAD_RARE_EARTHS['DJ'],
  stockExchange: 'Djibouti Stock Exchange (thin liquidity; sovereign development narrative — informational)',
  bondMarkets: IGAD_BOND_MARKETS['DJ'],
  mainInternationalAirport: IGAD_MAIN_INTERNATIONAL_AIRPORTS['DJ'],
  mainInternationalSeaport: IGAD_MAIN_INTERNATIONAL_SEAPORTS['DJ'],
  intellectualPropertyDepartments: IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['DJ'],
  securitiesExchangeCommission: IGAD_SECURITIES_EXCHANGE_COMMISSIONS['DJ'],
}
