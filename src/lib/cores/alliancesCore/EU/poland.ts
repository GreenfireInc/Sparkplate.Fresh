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

export const poland: EuCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  capital: 'Warsaw',
  coordinates: { latitude: 52.2297, longitude: 21.0122 },
  independence: '1989 democratic transition; EU since 2004-05-01 — informational',
  topMajorCities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań'],
  population: 36600000,
  mainLanguages: ['Polish', 'German (minority)', 'Ukrainian (community)'],
  currency: 'Polish złoty (PLN)',
  timezone: 'Europe/Warsaw',
  foundingLeader: 'Lech Wałęsa (solidarity-to-presidency reference)',
  currentLeader: 'President Karol Nawrocki — verify; Prime Minister Donald Tusk — verify',
  cryptocurrencyExchanges: ['Zonda (BitBay legacy)', 'European MiCA passporting'],
  stablecoin: 'PLN pairs; EUR-stable conversion common',
  domesticCourierServices: EU_DOMESTIC_COURIERS['PL'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['PL'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['PL'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['PL'],
  newsOutlets: EU_NEWS_OUTLETS['PL'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['PL'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['PL'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['PL'],
  rareEarths: EU_RARE_EARTHS['PL'],
  stockExchange: 'Warsaw Stock Exchange (GPW)',
  bondMarkets: EU_BOND_MARKETS['PL'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['PL'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['PL'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['PL'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['PL'],
}
