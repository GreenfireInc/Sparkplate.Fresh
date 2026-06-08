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

export const norway: OecdCountry = {
  name: 'Norway',
  iso3166Alpha2: 'NO',
  capital: 'Oslo',
  coordinates: { latitude: 59.9139, longitude: 10.7522 },
  independence:
    '1905 separation from Sweden sovereignty; EEA not full EU; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'Drammen'],
  population: 5600000,
  mainLanguages: ['Norwegian', 'Sámi (co-official pockets)', 'English'],
  currency: 'Norwegian krone (NOK)',
  timezone: 'Europe/Oslo',
  foundingLeader: 'Christian Michelsen 1905 union dissolution reference — informational',
  currentLeader: 'Monarch Harald V; Prime Minister Jonas Gahr Støre — verify coalition',
  cryptocurrencyExchanges: ['Nordic brokers; Finanstilsynet AML registration — informational'],
  stablecoin: 'NOK OTC; EUR-stable common — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['NO'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['NO'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['NO'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['NO'],
  newsOutlets: OECD_NEWS_OUTLETS['NO'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['NO'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['NO'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['NO'],
  rareEarths: OECD_RARE_EARTHS['NO'],
  stockExchange: 'Oslo Stock Exchange (Euronext Oslo Børs)',
  bondMarkets: OECD_BOND_MARKETS['NO'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['NO'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['NO'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['NO'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['NO'],
}
