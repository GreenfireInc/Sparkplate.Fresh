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

export const chile: OecdCountry = {
  name: 'Chile',
  iso3166Alpha2: 'CL',
  capital: 'Santiago',
  coordinates: { latitude: -33.4489, longitude: -70.6693 },
  independence:
    '1818 independence from Spain consolidated; OECD member since May 2010 — informational',
  topMajorCities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  population: 19500000,
  mainLanguages: ['Spanish', 'Mapudungun (Mapuche)', 'English (business / education)'],
  currency: 'Chilean peso (CLP)',
  timezone: 'America/Santiago',
  foundingLeader: 'Bernardo O\'Higgins independence-era liberation reference — informational',
  currentLeader: 'President — verify (Congressional-presidential electoral cycle)',
  cryptocurrencyExchanges: ['Buda.com', 'CMF-registered onboarding evolution — informational'],
  stablecoin: 'CLP digital pilots; predominant USD OTC rails — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CL'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['CL'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['CL'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['CL'],
  newsOutlets: OECD_NEWS_OUTLETS['CL'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['CL'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['CL'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['CL'],
  rareEarths: OECD_RARE_EARTHS['CL'],
  stockExchange: 'Bolsa de Santiago (Bolsa Electrónica de Chile contextual listings — informational)',
  bondMarkets: OECD_BOND_MARKETS['CL'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['CL'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['CL'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['CL'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['CL'],
}
