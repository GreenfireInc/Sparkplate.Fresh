import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CPTPP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { CPTPP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { CPTPP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { CPTPP_NEWS_OUTLETS } from './newsOutletsByIso'
import { CPTPP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CPTPP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CPTPP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CPTPP_RARE_EARTHS } from './rareEarthsByIso'
import { CPTPP_BOND_MARKETS } from './bondMarketsByIso'
import { CPTPP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CPTPP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { CPTPP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const canada: CptppCountry = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence: '1867-07-01 (Confederation); Constitution Act patriation 1982 — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40500000,
  mainLanguages: ['English', 'French', 'Mandarin Chinese'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'John A. Macdonald (first Prime Minister, Confederation)',
  currentLeader: 'Prime Minister Mark Carney — verify',
  cryptocurrencyExchanges: ['Bitbuy', 'Coinsquare', 'Wealthsimple Crypto', 'Global platforms (regulatory evolution)'],
  stablecoin: 'CAD stablecoins limited; USDC / USDT common',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['CA'],
  domesticPostService: CPTPP_DOMESTIC_POST_SERVICES['CA'],
  nationalBankingInstitutions: CPTPP_NATIONAL_BANKING_INSTITUTIONS['CA'],
  corporationFormationOffice: CPTPP_CORPORATION_FORMATION_OFFICES['CA'],
  newsOutlets: CPTPP_NEWS_OUTLETS['CA'],
  notableUniversities: CPTPP_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: CPTPP_MAIN_EXPORT_COMMODITIES['CA'],
  mainExportedElements: CPTPP_MAIN_EXPORTED_ELEMENTS['CA'],
  rareEarths: CPTPP_RARE_EARTHS['CA'],
  stockExchange: 'Toronto Stock Exchange (TSX) / TMX Group',
  bondMarkets: CPTPP_BOND_MARKETS['CA'],
  intellectualPropertyDepartments: CPTPP_INTELLECTUAL_PROPERTY_DEPARTMENTS['CA'],
  securitiesExchangeCommission: CPTPP_SECURITIES_EXCHANGE_COMMISSIONS['CA'],
  mainInternationalAirport: CPTPP_MAIN_INTERNATIONAL_AIRPORTS['CA'],
  mainInternationalSeaport: CPTPP_MAIN_INTERNATIONAL_SEAPORTS['CA'],
}
