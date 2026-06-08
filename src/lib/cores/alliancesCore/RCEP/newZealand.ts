import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { RCEP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { RCEP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { RCEP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { RCEP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const newZealand: RcepCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    'Fully independent Realm evolution; Pacific trade openness; RCEP Party (2022 wave with Australia linkage — informational)',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Muldoon / Lange-era trade diplomacy reference — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'FMCA/DIA onboarding — informational'],
  stablecoin: 'NZD issuance thin; RB NZ digital policy evolution — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['NZ'],
  domesticPostService: RCEP_DOMESTIC_POST_SERVICES['NZ'],
  nationalBankingInstitutions: RCEP_NATIONAL_BANKING_INSTITUTIONS['NZ'],
  corporationFormationOffice: RCEP_CORPORATION_FORMATION_OFFICES['NZ'],
  newsOutlets: RCEP_NEWS_OUTLETS['NZ'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['NZ'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['NZ'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['NZ'],
  rareEarths: RCEP_RARE_EARTHS['NZ'],
  stockExchange: 'NZX Limited',
  bondMarkets: RCEP_BOND_MARKETS['NZ'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['NZ'],
  mainInternationalSeaport: RCEP_MAIN_INTERNATIONAL_SEAPORTS['NZ'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['NZ'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['NZ'],
}
