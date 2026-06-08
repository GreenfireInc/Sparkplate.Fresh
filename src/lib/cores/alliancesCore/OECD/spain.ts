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

export const spain: OecdCountry = {
  name: 'Spain',
  iso3166Alpha2: 'ES',
  capital: 'Madrid',
  coordinates: { latitude: 40.4168, longitude: -3.7038 },
  independence:
    '1978 constitution monarchy continuity; EU since 1986; euro participant; OECD founding member Aug 1961 — informational',
  topMajorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza'],
  population: 48100000,
  mainLanguages: ['Spanish (Castilian)', 'Catalan / Basque / Galician (regions)', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Madrid',
  foundingLeader: 'Adolfo Suárez democratic transition reference — informational',
  currentLeader: 'King Felipe VI; President of Government Pedro Sánchez — verify elections',
  cryptocurrencyExchanges: ['Bit2Me', 'CNMV MiCA registry — informational'],
  stablecoin: 'EUR stablecoins; Iberian liquidity — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['ES'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['ES'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['ES'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['ES'],
  newsOutlets: OECD_NEWS_OUTLETS['ES'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['ES'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['ES'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['ES'],
  rareEarths: OECD_RARE_EARTHS['ES'],
  stockExchange: 'BME / Euronext Spain consolidation — informational',
  bondMarkets: OECD_BOND_MARKETS['ES'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['ES'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['ES'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['ES'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['ES'],
}
