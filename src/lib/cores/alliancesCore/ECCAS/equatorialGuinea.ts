import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ECCAS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ECCAS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECCAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ECCAS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const equatorialGuinea: EccasCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  capital: 'Malabo',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence: '1968-10-12 (from Spain)',
  topMajorCities: ['Bata', 'Malabo', 'Ebebiyín', 'Aconibe', 'Añisoc'],
  population: 1800000,
  mainLanguages: ['Spanish', 'French', 'Portuguese (Annobonese)'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Malabo',
  foundingLeader: 'Francisco Macías Nguema (first President)',
  currentLeader: 'President Teodoro Obiang Nguema Mbasogo — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'International brokers'],
  stablecoin: 'USDT informal; XAF peg',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['GQ'],
  domesticPostService: ECCAS_DOMESTIC_POST_SERVICES['GQ'],
  nationalBankingInstitutions: ECCAS_NATIONAL_BANKING_INSTITUTIONS['GQ'],
  corporationFormationOffice: ECCAS_CORPORATION_FORMATION_OFFICES['GQ'],
  newsOutlets: ECCAS_NEWS_OUTLETS['GQ'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['GQ'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['GQ'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['GQ'],
  rareEarths: ECCAS_RARE_EARTHS['GQ'],
  stockExchange: 'CEMAC regional liquidity; limited local listings',
  bondMarkets: ECCAS_BOND_MARKETS['GQ'],
  intellectualPropertyDepartments: ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['GQ'],

  securitiesExchangeCommission: ECCAS_SECURITIES_EXCHANGE_COMMISSIONS['GQ'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['GQ'],
  mainInternationalSeaport: ECCAS_MAIN_INTERNATIONAL_SEAPORTS['GQ'],
}
