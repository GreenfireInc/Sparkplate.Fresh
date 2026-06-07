import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const czechRepublic: EuCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  capital: 'Prague',
  coordinates: { latitude: 50.0755, longitude: 14.4378 },
  independence: '1993 Velvet Divorce (Czechia); EU since 2004-05-01 — informational',
  topMajorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  population: 10900000,
  mainLanguages: ['Czech', 'Slovak (minority)', 'Romani'],
  currency: 'Czech koruna (CZK)',
  timezone: 'Europe/Prague',
  foundingLeader: 'Václav Havel (first President ČR)',
  currentLeader: 'President Petr Pavel; Prime Minister — verify',
  cryptocurrencyExchanges: ['European brokers; cautious retail messaging'],
  stablecoin: 'CZK OTC; EUR pairs dominant',
  domesticCourierServices: EU_DOMESTIC_COURIERS['CZ'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['CZ'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['CZ'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['CZ'],
  newsOutlets: EU_NEWS_OUTLETS['CZ'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['CZ'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['CZ'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['CZ'],
  rareEarths: EU_RARE_EARTHS['CZ'],
  stockExchange: 'Prague Stock Exchange (PX)',
  bondMarkets: EU_BOND_MARKETS['CZ'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['CZ'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['CZ'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['CZ'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['CZ'],
}
