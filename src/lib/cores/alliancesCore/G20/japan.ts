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

export const japan: G20Country = {
  name: 'Japan',
  iso3166Alpha2: 'JP',
  capital: 'Tokyo',
  coordinates: { latitude: 35.6762, longitude: 139.6503 },
  independence:
    'Modern nation-state Meiji restoration continuity; occupied-era constitution 1947; OECD/G7 heavyweight; G20 founding member (finance track 1999; 2019 Osaka leaders summit host) — informational',
  topMajorCities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo'],
  population: 124500000,
  mainLanguages: ['Japanese', 'Korean (community)', 'English (education / business)'],
  currency: 'Japanese yen (JPY)',
  timezone: 'Asia/Tokyo',
  foundingLeader: 'Post-war Yoshida Shigeru (economic diplomacy / IMF anchor reference — informational)',
  currentLeader: 'Prime Minister — verify (Liberal Democratic Party–led cabinets rotate)',
  cryptocurrencyExchanges: ['bitFlyer', 'Zaif / registered PSAP-era providers — informational'],
  stablecoin: 'JPY-stable experiments; Bank of Japan CBDC pilots — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['JP'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['JP'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['JP'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['JP'],
  newsOutlets: G20_NEWS_OUTLETS['JP'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['JP'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['JP'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['JP'],
  rareEarths: G20_RARE_EARTHS['JP'],
  stockExchange: 'Tokyo Stock Exchange (Japan Exchange Group)',
  bondMarkets: G20_BOND_MARKETS['JP'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['JP'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['JP'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['JP'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['JP'],
}
