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
export const gambia: AfricanUnionCountry = {
  name: 'The Gambia',
  iso3166Alpha2: 'GM',
  africanUnionStatus: 'member',
  capital: 'Banjul',
  coordinates: { latitude: 13.4549, longitude: -16.5791 },
  independence: '1965-02-18',
  topMajorCities: ['Serekunda', 'Brikama', 'Bakau', 'Banjul', 'Farafenni'],
  population: 2700000,
  mainLanguages: ['English', 'Mandinka', 'Wolof'],
  currency: 'Gambian dalasi (GMD)',
  timezone: 'Africa/Banjul',
  foundingLeader: 'Dawda Jawara',
  currentLeader: 'Adama Barrow (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex (diaspora)'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GM'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['GM'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['GM'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['GM'],
  newsOutlets: AU_NEWS_OUTLETS['GM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GM'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GM'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['GM'],
  rareEarths: AU_RARE_EARTHS['GM'],
  stockExchange: 'Gambia Stock Exchange (limited)',
  bondMarkets: AU_BOND_MARKETS['GM'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['GM'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['GM'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['GM'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['GM'],
}
