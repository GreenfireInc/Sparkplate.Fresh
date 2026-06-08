import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IORA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IORA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IORA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const india: IoraCountry = {
  name: 'India',
  iso3166Alpha2: 'IN',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence:
    '1947 independence partition lineage; Indo-Pacific maritime power; oft IORA chair economy; Charter-era member Mar 1997 — informational',
  topMajorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
  population: 1420000000,
  mainLanguages: ['Hindi', 'English', 'Bengali / Tamil / Telugu regional'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader:
    'Jawaharlal Nehru non-alignment-era reference; Rao liberalisation reference — informational',
  currentLeader: 'President Droupadi Murmu — verify; Prime Minister Narendra Modi — verify',
  cryptocurrencyExchanges: ['RBI prohibition retail bank crypto routes; offshore P2P — informational'],
  stablecoin: 'CBDC pilots e-₹ narratives; predominant INR fiat rails — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['IN'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['IN'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['IN'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['IN'],
  newsOutlets: IORA_NEWS_OUTLETS['IN'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['IN'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['IN'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['IN'],
  rareEarths: IORA_RARE_EARTHS['IN'],
  stockExchange: 'National Stock Exchange (NSE); BSE Bombay context — informational',
  bondMarkets: IORA_BOND_MARKETS['IN'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['IN'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['IN'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['IN'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['IN'],
}
