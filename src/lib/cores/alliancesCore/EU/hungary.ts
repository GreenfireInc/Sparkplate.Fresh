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

export const hungary: EuCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  capital: 'Budapest',
  coordinates: { latitude: 47.4979, longitude: 19.0402 },
  independence: '1989 democratic transition lineage; EU since 2004-05-01 — informational',
  topMajorCities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
  population: 9600000,
  mainLanguages: ['Hungarian', 'German (minority)', 'Romani'],
  currency: 'Hungarian forint (HUF)',
  timezone: 'Europe/Budapest',
  foundingLeader: 'Lajos Kossuth historical reference — informational',
  currentLeader: 'President Tamás Sulyok; Prime Minister Viktor Orbán — verify',
  cryptocurrencyExchanges: ['Regional EU onboarding; Hungarian central bank skeptic tone — informational'],
  stablecoin: 'HUF OTC; predominant EUR/USDT rails',
  domesticCourierServices: EU_DOMESTIC_COURIERS['HU'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['HU'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['HU'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['HU'],
  newsOutlets: EU_NEWS_OUTLETS['HU'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['HU'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['HU'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['HU'],
  rareEarths: EU_RARE_EARTHS['HU'],
  stockExchange: 'Budapest Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['HU'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['HU'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['HU'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['HU'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['HU'],
}
