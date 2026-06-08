import type { AmuCountry } from './types'
import { AMU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AMU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AMU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AMU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AMU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AMU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AMU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AMU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AMU_RARE_EARTHS } from './rareEarthsByIso'
import { AMU_BOND_MARKETS } from './bondMarketsByIso'
import { AMU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AMU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AMU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AMU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const libya: AmuCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  amuStatus: 'founding_member',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya'],
  population: 7000000,
  mainLanguages: ['Arabic (Libyan)', 'Berber (Tamazight)', 'Italian (legacy)'],
  currency: 'Libyan dinar (LYD)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris I',
  currentLeader: 'Mohamed al-Menfi (Chair, Presidential Council — GNU Tripoli)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC; fragmented regulatory environment'],
  stablecoin: 'USDT informal; banking fragmentation',
  domesticCourierServices: AMU_DOMESTIC_COURIERS['LY'],
  domesticPostService: AMU_DOMESTIC_POST_SERVICES['LY'],
  nationalBankingInstitutions: AMU_NATIONAL_BANKING_INSTITUTIONS['LY'],
  corporationFormationOffice: AMU_CORPORATION_FORMATION_OFFICES['LY'],
  newsOutlets: AMU_NEWS_OUTLETS['LY'],
  notableUniversities: AMU_NOTABLE_UNIVERSITIES['LY'],
  mainExportCommodities: AMU_MAIN_EXPORT_COMMODITIES['LY'],
  mainExportedElements: AMU_MAIN_EXPORTED_ELEMENTS['LY'],
  rareEarths: AMU_RARE_EARTHS['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
  bondMarkets: AMU_BOND_MARKETS['LY'],
  intellectualPropertyDepartments: AMU_INTELLECTUAL_PROPERTY_DEPARTMENTS['LY'],
  securitiesExchangeCommission: AMU_SECURITIES_EXCHANGE_COMMISSIONS['LY'],
  mainInternationalAirport: AMU_MAIN_INTERNATIONAL_AIRPORTS['LY'],
  mainInternationalSeaport: AMU_MAIN_INTERNATIONAL_SEAPORTS['LY'],
}
