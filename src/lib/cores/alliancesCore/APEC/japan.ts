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

export const japan: ApecCountry = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Post-war constitution 1947; techno-industrial transpacific heavyweight founding APEC host narratives — informational',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean community', 'English education / business'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Yoshida Shigeru post-war diplomacy reference — informational',
  currentLeader:
    'Emperor Naruhito; Prime Minister — verify cabinet rotations',
  cryptocurrencyExchanges: ['bitFlyer', 'Coincheck PSAP context — informational'],
  stablecoin: 'JPY digital pilots Bank of Japan — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['JP'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['JP'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['JP'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['JP'],
  newsOutlets: APEC_NEWS_OUTLETS['JP'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['JP'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['JP'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['JP'],
  rareEarths: APEC_RARE_EARTHS['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
  bondMarkets: APEC_BOND_MARKETS['JP'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['JP'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['JP'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['JP'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['JP'],
}
