import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const libya: BeltAndRoadInitiativeCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tripoli',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence: '1951-12-24',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda', 'Zawiya'] as [string, string, string, string, string],
  population: 7459000,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Libyan dinar (LYD)',
  timezone: 'UTC+01:00',
  foundingLeader: 'King Idris I',
  currentLeader: 'Mohamed al-Menfi (Chair, Presidential Council — GNU Tripoli)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC; fragmented regulatory environment'],
  stablecoin: 'USDT informal; banking fragmentation',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LY'],
  newsOutlets: BRI_NEWS_OUTLETS['LY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LY'],
  rareEarths: BRI_RARE_EARTHS['LY'],
  stockExchange: 'Libyan Stock Market (limited operations)',
  bondMarkets: BRI_BOND_MARKETS['LY'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['LY'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['LY'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LY'],
}
