import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ARAB_LEAGUE_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const libya: ArabLeagueCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  arabLeagueStatus: 'member',
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
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['LY'],
  domesticPostService: ARAB_LEAGUE_DOMESTIC_POST_SERVICES['LY'],
  nationalBankingInstitutions: ARAB_LEAGUE_NATIONAL_BANKING_INSTITUTIONS['LY'],
  corporationFormationOffice: ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES['LY'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['LY'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['LY'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['LY'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['LY'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['LY'],
  intellectualPropertyDepartments: ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS['LY'],
  securitiesExchangeCommission: ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS['LY'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['LY'],
  mainInternationalSeaport: ARAB_LEAGUE_MAIN_INTERNATIONAL_SEAPORTS['LY'],
}
