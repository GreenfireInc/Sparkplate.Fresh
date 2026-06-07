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

export const hungary: NatoCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  capital: 'Budapest',
  coordinates: { latitude: 47.4979, longitude: 19.0402 },
  independence:
    '1989 democratic transition lineage; EU since 2004; NATO Ally since Mar 1999 — informational',
  topMajorCities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
  population: 9600000,
  mainLanguages: ['Hungarian', 'German (minority)', 'Romani'],
  currency: 'Hungarian forint (HUF)',
  timezone: 'Europe/Budapest',
  foundingLeader: 'Lajos Kossuth historical reference — informational',
  currentLeader: 'President Tamás Sulyok; Prime Minister Viktor Orbán — verify',
  cryptocurrencyExchanges: ['Regional EU onboarding; MNB sceptic messaging — informational'],
  stablecoin: 'HUF OTC; EUR/USDT rails — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['HU'],
  domesticPostService: NATO_DOMESTIC_POST_SERVICES['HU'],
  nationalBankingInstitutions: NATO_NATIONAL_BANKING_INSTITUTIONS['HU'],
  corporationFormationOffice: NATO_CORPORATION_FORMATION_OFFICES['HU'],
  newsOutlets: NATO_NEWS_OUTLETS['HU'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['HU'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['HU'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['HU'],
  rareEarths: NATO_RARE_EARTHS['HU'],
  stockExchange: 'Budapest Stock Exchange',
  bondMarkets: NATO_BOND_MARKETS['HU'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['HU'],
  mainInternationalSeaport: NATO_MAIN_INTERNATIONAL_SEAPORTS['HU'],
  intellectualPropertyDepartments: NATO_INTELLECTUAL_PROPERTY_DEPARTMENTS['HU'],
  securitiesExchangeCommission: NATO_SECURITIES_EXCHANGE_COMMISSIONS['HU'],
}
