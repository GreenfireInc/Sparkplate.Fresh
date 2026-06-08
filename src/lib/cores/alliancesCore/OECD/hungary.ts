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

export const hungary: OecdCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  capital: 'Budapest',
  coordinates: { latitude: 47.4979, longitude: 19.0402 },
  independence:
    '1989 democratic transition lineage; EU since 2004-05-01; OECD member since May 1996 — informational',
  topMajorCities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
  population: 9600000,
  mainLanguages: ['Hungarian', 'German (minority)', 'Romani'],
  currency: 'Hungarian forint (HUF)',
  timezone: 'Europe/Budapest',
  foundingLeader: 'Lajos Kossuth nineteenth-century liberation reference — informational',
  currentLeader: 'President Tamás Sulyok; Prime Minister Viktor Orbán — verify',
  cryptocurrencyExchanges: ['Regional EU onboarding; Magyar Nemzeti Bank cautious narratives — informational'],
  stablecoin: 'HUF OTC; EUR/USDT rails common — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['HU'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['HU'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['HU'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['HU'],
  newsOutlets: OECD_NEWS_OUTLETS['HU'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['HU'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['HU'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['HU'],
  rareEarths: OECD_RARE_EARTHS['HU'],
  stockExchange: 'Budapest Stock Exchange',
  bondMarkets: OECD_BOND_MARKETS['HU'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['HU'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['HU'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['HU'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['HU'],
}
