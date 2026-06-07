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
export const equatorialGuinea: AfricanUnionCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  africanUnionStatus: 'member',
  capital: 'Malabo',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence: '1968-10-12',
  topMajorCities: ['Bata', 'Malabo', 'Ebebiyín', 'Aconibe', 'Añisoc'],
  population: 1800000,
  mainLanguages: ['Spanish', 'French', 'Portuguese (Annobonese)'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Malabo',
  foundingLeader: 'Francisco Macías Nguema',
  currentLeader: 'Teodoro Obiang Nguema Mbasogo (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'International brokers'],
  stablecoin: 'USDT informal; XAF peg',
  domesticCourierServices: AU_DOMESTIC_COURIERS['GQ'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['GQ'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['GQ'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['GQ'],
  newsOutlets: AU_NEWS_OUTLETS['GQ'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['GQ'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['GQ'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['GQ'],
  rareEarths: AU_RARE_EARTHS['GQ'],
  stockExchange: 'CEMAC regional market (limited local listings)',
  bondMarkets: AU_BOND_MARKETS['GQ'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['GQ'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['GQ'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['GQ'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['GQ'],
}
