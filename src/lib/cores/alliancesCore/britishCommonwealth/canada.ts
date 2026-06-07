import type { CommonwealthCountry } from './types'
import { COMMONWEALTH_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMMONWEALTH_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMMONWEALTH_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMMONWEALTH_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMMONWEALTH_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMMONWEALTH_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMMONWEALTH_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMMONWEALTH_RARE_EARTHS } from './rareEarthsByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const canada: CommonwealthCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  commonwealthStatus: 'member',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence: '1867-07-01 (Confederation); patriation 1982',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Ottawa'],
  population: 40000000,
  mainLanguages: ['English', 'French', 'Indigenous languages'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'John A. Macdonald (first Prime Minister)',
  currentLeader: 'Justin Trudeau (Prime Minister) — verify',
  cryptocurrencyExchanges: ['Newton', 'Shakepay', 'Coinbase (eligible provinces)'],
  stablecoin: 'CAD stablecoins limited; USDC/USDT common',
  domesticCourierServices: COMMONWEALTH_DOMESTIC_COURIERS['CA'],
  domesticPostService: COMMONWEALTH_DOMESTIC_POST_SERVICES['CA'],
  nationalBankingInstitutions: COMMONWEALTH_NATIONAL_BANKING_INSTITUTIONS['CA'],
  corporationFormationOffice: COMMONWEALTH_CORPORATION_FORMATION_OFFICES['CA'],
  newsOutlets: COMMONWEALTH_NEWS_OUTLETS['CA'],
  notableUniversities: COMMONWEALTH_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: COMMONWEALTH_MAIN_EXPORT_COMMODITIES['CA'],
  mainExportedElements: COMMONWEALTH_MAIN_EXPORTED_ELEMENTS['CA'],
  rareEarths: COMMONWEALTH_RARE_EARTHS['CA'],
  stockExchange: 'Toronto Stock Exchange (TSX)',
  intellectualPropertyDepartments: COMMONWEALTH_INTELLECTUAL_PROPERTY_DEPARTMENTS['CA'],
  securitiesExchangeCommission: COMMONWEALTH_SECURITIES_EXCHANGE_COMMISSIONS['CA'],
  mainInternationalAirport: COMMONWEALTH_MAIN_INTERNATIONAL_AIRPORTS['CA'],
  mainInternationalSeaport: COMMONWEALTH_MAIN_INTERNATIONAL_SEAPORTS['CA'],
}
