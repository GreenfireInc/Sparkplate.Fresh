import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { G20_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { G20_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { G20_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { G20_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { G20_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const india: G20Country = {
  name: 'India',
  iso3166Alpha2: 'IN',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence:
    '1947-08-15 independence from the United Kingdom; 1950 Republic; BRICS / G20 founding member (finance track 1999; 2023 New Delhi leaders summit host) — informational',
  topMajorCities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai'],
  population: 1430000000,
  mainLanguages: ['Hindi', 'English', 'Bengali / Marathi / Tamil (regional plurality)'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader:
    'Mahatma Gandhi (independence movement); Jawaharlal Nehru (first Prime Minister; non-aligned founding reference)',
  currentLeader: 'President Droupadi Murmu; Prime Minister Narendra Modi — verify',
  cryptocurrencyExchanges: ['CoinDCX', 'WazirX', 'CoinSwitch / FIU-IND VDA registration regime — informational'],
  stablecoin: 'eINR (Digital Rupee) RBI retail/wholesale CBDC pilots; INR-pegged private issuance constrained — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['IN'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['IN'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['IN'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['IN'],
  newsOutlets: G20_NEWS_OUTLETS['IN'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['IN'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['IN'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['IN'],
  rareEarths: G20_RARE_EARTHS['IN'],
  stockExchange: 'National Stock Exchange of India (NSE) / Bombay Stock Exchange (BSE)',
  bondMarkets: G20_BOND_MARKETS['IN'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['IN'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['IN'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['IN'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['IN'],
}
