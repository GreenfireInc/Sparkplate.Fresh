import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const chile: CptppCountry = {
  name: 'Chile',
  iso3166Alpha2: 'CL',
  capital: 'Santiago',
  coordinates: { latitude: -33.4489, longitude: -70.6693 },
  independence: '1818-09-18 (from Spain — national day)',
  topMajorCities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  population: 19900000,
  mainLanguages: ['Spanish', 'Mapudungun (Mapuche)', 'English (business/tourism)'],
  currency: 'Chilean peso (CLP)',
  timezone: 'America/Santiago',
  foundingLeader: 'Bernardo O Higgins / independence leadership era — informational',
  currentLeader: 'President — verify (2025 election cycle)',
  cryptocurrencyExchanges: ['Buda.com', 'Orionx', 'Global exchanges (travel context)'],
  stablecoin: 'USDT/USDC OTC; constitutional reform narratives — verify',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['CL'],
  newsOutlets: CPTPP_NEWS_OUTLETS['CL'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['CL'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['CL'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['CL'],
  rareEarths: CPTPP_RARE_EARTHS['CL'],
  stockExchange: 'Santiago Exchange (Bolsa de Comercio de Santiago)',
  bondMarkets: CPTPP_BOND_MARKETS['CL'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['CL'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['CL'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['CL'],
}
