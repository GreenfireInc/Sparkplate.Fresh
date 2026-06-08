import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const kenya: AfricanUnionCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  africanUnionStatus: 'member',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2864, longitude: 36.8172 },
  independence: '1963-12-12',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta',
  currentLeader: 'William Ruto (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local blockchain startups'],
  stablecoin: 'USDT / USDC; regulatory environment evolving',
  domesticCourierServices: AU_DOMESTIC_COURIERS['KE'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['KE'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['KE'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['KE'],
  newsOutlets: AU_NEWS_OUTLETS['KE'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: AU_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
  bondMarkets: AU_BOND_MARKETS['KE'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['KE'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['KE'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['KE'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['KE'],
}
