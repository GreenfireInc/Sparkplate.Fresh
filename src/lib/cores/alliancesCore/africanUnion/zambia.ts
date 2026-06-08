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
export const zambia: AfricanUnionCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  africanUnionStatus: 'member',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'],
  population: 20000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda',
  currentLeader: 'Hakainde Hichilema (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ZM'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['ZM'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['ZM'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['ZM'],
  newsOutlets: AU_NEWS_OUTLETS['ZM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ZM'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['ZM'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['ZM'],
  rareEarths: AU_RARE_EARTHS['ZM'],
  stockExchange: 'Lusaka Securities Exchange (LuSE)',
  bondMarkets: AU_BOND_MARKETS['ZM'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZM'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['ZM'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['ZM'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['ZM'],
}
