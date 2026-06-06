import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const guineaBissau: CensadCountry = {
  name: 'Guinea-Bissau',
  iso3166Alpha2: 'GW',
  capital: 'Bissau',
  coordinates: { latitude: 11.8563, longitude: -15.5834 },
  independence: '1974-09-24 (unilateral); Portugal recognition 1975',
  topMajorCities: ['Bissau', 'Gabú', 'Bafatá', 'Bissorã', 'Bolama'],
  population: 2170000,
  mainLanguages: ['Portuguese', 'Guinea-Bissau Creole', 'Fula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Bissau',
  foundingLeader: 'Luís Cabral (first President after recognition)',
  currentLeader: 'President Umaro Sissoco Embaló — verify',
  cryptocurrencyExchanges: ['Informal regional P2P'],
  stablecoin: 'USDT informal; CFA peg',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GW'],
  newsOutlets: CENSAD_NEWS_OUTLETS['GW'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['GW'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['GW'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['GW'],
  rareEarths: CENSAD_RARE_EARTHS['GW'],
  stockExchange: 'BRVM (cross-listing context for WAEMU)',
  bondMarkets: CENSAD_BOND_MARKETS['GW'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['GW'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['GW'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['GW'],
}
