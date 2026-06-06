import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const sudan: AfricanUnionCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  africanUnionStatus: 'suspended',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'],
  population: 48000000,
  mainLanguages: ['Arabic (Sudanese)', 'English', 'Nubian languages'],
  currency: 'Sudanese pound (SDG)',
  timezone: 'Africa/Khartoum',
  foundingLeader: 'Ismail al-Azhari',
  currentLeader: 'Abdel Fattah al-Burhan (General; Chair, Sovereignty Council)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Informal P2P amid conflict'],
  stablecoin: 'USDT informal; banking disruption during conflict',
  domesticCourierServices: AU_DOMESTIC_COURIERS['SD'],
  newsOutlets: AU_NEWS_OUTLETS['SD'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['SD'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['SD'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['SD'],
  rareEarths: AU_RARE_EARTHS['SD'],
  stockExchange: 'Khartoum Stock Exchange (operations disrupted)',
  bondMarkets: AU_BOND_MARKETS['SD'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['SD'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['SD'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['SD'],
}
