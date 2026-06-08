import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const czechRepublic: OecdCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  capital: 'Prague',
  coordinates: { latitude: 50.0755, longitude: 14.4378 },
  independence:
    '1993 Velvet Divorce Czechia lineage; EU since 2004-05-01; OECD member since Dec 1995 — informational',
  topMajorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň', 'Liberec'],
  population: 10900000,
  mainLanguages: ['Czech', 'Slovak (minority)', 'Romani'],
  currency: 'Czech koruna (CZK)',
  timezone: 'Europe/Prague',
  foundingLeader: 'Václav Havel (first president ČR)',
  currentLeader: 'President Petr Pavel; Prime Minister — verify',
  cryptocurrencyExchanges: ['European brokers; cautious Czech National Bank messaging — informational'],
  stablecoin: 'CZK OTC; EUR-stable pairs dominant — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CZ'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['CZ'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['CZ'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['CZ'],
  newsOutlets: OECD_NEWS_OUTLETS['CZ'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CZ'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['CZ'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['CZ'],
  rareEarths: OECD_RARE_EARTHS['CZ'],
  stockExchange: 'Prague Stock Exchange (PX)',
  bondMarkets: OECD_BOND_MARKETS['CZ'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['CZ'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['CZ'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['CZ'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['CZ'],
}
