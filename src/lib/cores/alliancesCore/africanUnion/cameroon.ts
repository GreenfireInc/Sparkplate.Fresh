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
export const cameroon: AfricanUnionCountry = {
  name: 'Cameroon',
  iso3166Alpha2: 'CM',
  africanUnionStatus: 'member',
  capital: 'Yaoundé',
  coordinates: { latitude: 3.848, longitude: 11.5021 },
  independence: '1960-01-01',
  topMajorCities: ['Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam'],
  population: 28500000,
  mainLanguages: ['French', 'English', 'Fulfulde'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Douala',
  foundingLeader: 'Ahmadou Ahidjo',
  currentLeader: 'Paul Biya (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; XAF CFA peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CM'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['CM'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['CM'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['CM'],
  newsOutlets: AU_NEWS_OUTLETS['CM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CM'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CM'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CM'],
  rareEarths: AU_RARE_EARTHS['CM'],
  stockExchange: 'Douala Stock Exchange (DSX)',
  bondMarkets: AU_BOND_MARKETS['CM'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['CM'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['CM'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CM'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['CM'],
}
