import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { COMESA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { COMESA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { COMESA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const zambia: ComesaCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'],
  population: 20000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda (first President)',
  currentLeader: 'President Hakainde Hichilema — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ZM'],
  domesticPostService: COMESA_DOMESTIC_POST_SERVICES['ZM'],
  nationalBankingInstitutions: COMESA_NATIONAL_BANKING_INSTITUTIONS['ZM'],
  corporationFormationOffice: COMESA_CORPORATION_FORMATION_OFFICES['ZM'],
  newsOutlets: COMESA_NEWS_OUTLETS['ZM'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ZM'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['ZM'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['ZM'],
  rareEarths: COMESA_RARE_EARTHS['ZM'],
  stockExchange: 'Lusaka Securities Exchange (LuSE); COMESA Secretariat host city — informational',
  bondMarkets: COMESA_BOND_MARKETS['ZM'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZM'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['ZM'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['ZM'],
  mainInternationalSeaport: COMESA_MAIN_INTERNATIONAL_SEAPORTS['ZM'],
}
