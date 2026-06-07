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

export const poland: OecdCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  capital: 'Warsaw',
  coordinates: { latitude: 52.2297, longitude: 21.0122 },
  independence:
    '1989 democratic transition lineage; EU since 2004-05-01; OECD member since Nov 1996 — informational',
  topMajorCities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań'],
  population: 36600000,
  mainLanguages: ['Polish', 'German (minority)', 'Ukrainian (community)'],
  currency: 'Polish złoty (PLN)',
  timezone: 'Europe/Warsaw',
  foundingLeader: 'Lech Wałęsa (solidarity-era reference)',
  currentLeader: 'President — verify; Prime Minister — verify (2025 electoral cycle aftermath)',
  cryptocurrencyExchanges: ['Zonda (BitBay legacy)', 'European MiCA passporting'],
  stablecoin: 'PLN pairs; EUR-stable conversion customary — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['PL'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['PL'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['PL'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['PL'],
  newsOutlets: OECD_NEWS_OUTLETS['PL'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['PL'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['PL'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['PL'],
  rareEarths: OECD_RARE_EARTHS['PL'],
  stockExchange: 'Warsaw Stock Exchange (GPW)',
  bondMarkets: OECD_BOND_MARKETS['PL'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['PL'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['PL'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['PL'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['PL'],
}
