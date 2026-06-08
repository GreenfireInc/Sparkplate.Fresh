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

export const canada: G20Country = {
  name: 'Canada',
  iso3166Alpha2: 'CA',
  capital: 'Ottawa',
  coordinates: { latitude: 45.4215, longitude: -75.6972 },
  independence:
    '1867 Dominion of Canada constitution; patriation of constitution 1982; G7 + G20 founding member (finance track 1999; 2010 Toronto leaders summit host) — informational',
  topMajorCities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton'],
  population: 40100000,
  mainLanguages: ['English', 'French', 'Mandarin (community)'],
  currency: 'Canadian dollar (CAD)',
  timezone: 'America/Toronto',
  foundingLeader: 'Sir John A. Macdonald (Confederation-era reference); post-war Pearson/Trudeau multilateral stature — informational',
  currentLeader: 'Prime Minister — verify (federal electoral cycle)',
  cryptocurrencyExchanges: ['Bitbuy', 'Newton', 'CSA/PRU provincial licensing environment — informational'],
  stablecoin: 'CAD fiat-backed tokens (regulated money services / evolving OSFI guidance — informational)',
  domesticCourierServices: G20_DOMESTIC_COURIERS['CA'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['CA'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['CA'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['CA'],
  newsOutlets: G20_NEWS_OUTLETS['CA'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['CA'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['CA'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['CA'],
  rareEarths: G20_RARE_EARTHS['CA'],
  stockExchange: 'Toronto Stock Exchange (TMX)',
  bondMarkets: G20_BOND_MARKETS['CA'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['CA'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['CA'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['CA'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['CA'],
}
