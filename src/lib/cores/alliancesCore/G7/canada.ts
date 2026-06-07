import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { G7_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { G7_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { G7_NEWS_OUTLETS } from './newsOutletsByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G7_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G7_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G7_RARE_EARTHS } from './rareEarthsByIso'
import { G7_BOND_MARKETS } from './bondMarketsByIso'
import { G7_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { G7_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { G7_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { G7_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const canada: G7Country = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion of Canada constitution; patriation of constitution 1982; G7 founding summit participant (post-1976 pattern — informational)',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Sir John A. Macdonald (Confederation-era reference); post-war Pearson/Trudeau multilateral stature — informational',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA/PRU provincial licensing environment — informational'],
  stablecoin: 'CAD fiat-backed tokens (regulated money services / evolving OSFI guidance — informational)',
  domesticCourierServices: G7_DOMESTIC_COURIERS['CA'],
  domesticPostService: G7_DOMESTIC_POST_SERVICES['CA'],
  nationalBankingInstitutions: G7_NATIONAL_BANKING_INSTITUTIONS['CA'],
  corporationFormationOffice: G7_CORPORATION_FORMATION_OFFICES['CA'],
  newsOutlets: G7_NEWS_OUTLETS['CA'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: G7_MAIN_EXPORT_COMMODITIES['CA'],
  mainExportedElements: G7_MAIN_EXPORTED_ELEMENTS['CA'],
  rareEarths: G7_RARE_EARTHS['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
  bondMarkets: G7_BOND_MARKETS['CA'],
  mainInternationalAirport: G7_MAIN_INTERNATIONAL_AIRPORTS['CA'],
  mainInternationalSeaport: G7_MAIN_INTERNATIONAL_SEAPORTS['CA'],
  intellectualPropertyDepartments: G7_INTELLECTUAL_PROPERTY_DEPARTMENTS['CA'],
  securitiesExchangeCommission: G7_SECURITIES_EXCHANGE_COMMISSIONS['CA'],
}
