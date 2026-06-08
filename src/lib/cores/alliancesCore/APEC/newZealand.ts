import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { APEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { APEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { APEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { APEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const newZealand: ApecCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    'Realm sovereignty evolution; CPTPP stakeholder; transpacific pastoral-tech APEC participant — informational',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'David Lange nuclear-free stature reference — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto FMCA onboarding — informational'],
  stablecoin: 'NZD digital policy evolution Reserve Bank — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['NZ'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['NZ'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['NZ'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['NZ'],
  newsOutlets: APEC_NEWS_OUTLETS['NZ'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: APEC_RARE_EARTHS['NZ'],
  stockExchange: 'NZX Limited',
  bondMarkets: APEC_BOND_MARKETS['NZ'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['NZ'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['NZ'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['NZ'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['NZ'],
}
