import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EAC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EAC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EAC_NEWS_OUTLETS } from './newsOutletsByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EAC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EAC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EAC_RARE_EARTHS } from './rareEarthsByIso'
import { EAC_BOND_MARKETS } from './bondMarketsByIso'
import { EAC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EAC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EAC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const somalia: EacCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence:
    '1960-07-01 (Italian Somaliland union context); federal vs Somaliland — informational',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian (legacy)'],
  currency: 'Somali shilling (SOS); United States dollar widely used',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Aden Abdullah Osman Daar (first President)',
  currentLeader:
    'President Hassan Sheikh Mohamud — verify (Federal Government vs regions)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['SO'],
  domesticPostService: EAC_DOMESTIC_POST_SERVICES['SO'],
  nationalBankingInstitutions: EAC_NATIONAL_BANKING_INSTITUTIONS['SO'],
  corporationFormationOffice: EAC_CORPORATION_FORMATION_OFFICES['SO'],
  newsOutlets: EAC_NEWS_OUTLETS['SO'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: EAC_MAIN_EXPORT_COMMODITIES['SO'],
  mainExportedElements: EAC_MAIN_EXPORTED_ELEMENTS['SO'],
  rareEarths: EAC_RARE_EARTHS['SO'],
  stockExchange: 'No functioning national exchange',
  bondMarkets: EAC_BOND_MARKETS['SO'],
  intellectualPropertyDepartments: EAC_INTELLECTUAL_PROPERTY_DEPARTMENTS['SO'],

  securitiesExchangeCommission: EAC_SECURITIES_EXCHANGE_COMMISSIONS['SO'],
  mainInternationalAirport: EAC_MAIN_INTERNATIONAL_AIRPORTS['SO'],
  mainInternationalSeaport: EAC_MAIN_INTERNATIONAL_SEAPORTS['SO'],
}
