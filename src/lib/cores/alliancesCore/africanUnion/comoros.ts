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
export const comoros: AfricanUnionCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  africanUnionStatus: 'member',
  capital: 'Moroni',
  coordinates: { latitude: -11.7172, longitude: 43.2473 },
  independence: '1975-07-06',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'],
  population: 900000,
  mainLanguages: ['Comorian (Shikomor)', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah',
  currentLeader: 'Azali Assoumani (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional mobile money bridges'],
  stablecoin: 'USDT / USDC limited; KMF',
  domesticCourierServices: AU_DOMESTIC_COURIERS['KM'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['KM'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['KM'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['KM'],
  newsOutlets: AU_NEWS_OUTLETS['KM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['KM'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['KM'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['KM'],
  rareEarths: AU_RARE_EARTHS['KM'],
  stockExchange: 'No major national stock exchange',
  bondMarkets: AU_BOND_MARKETS['KM'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['KM'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['KM'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['KM'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['KM'],
}
