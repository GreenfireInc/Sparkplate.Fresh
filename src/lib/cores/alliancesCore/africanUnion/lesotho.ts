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
export const lesotho: AfricanUnionCountry = {
  name: 'Lesotho',
  iso3166Alpha2: 'LS',
  africanUnionStatus: 'member',
  capital: 'Maseru',
  coordinates: { latitude: -29.31, longitude: 27.4786 },
  independence: '1966-10-04',
  topMajorCities: ['Maseru', 'Teyateyaneng', 'Mafeteng', 'Hlotse', "Mohale's Hoek"],
  population: 2300000,
  mainLanguages: ['Sesotho', 'English', 'Zulu (minority)'],
  currency: 'Lesotho loti (LSL); South African rand (ZAR) accepted',
  timezone: 'Africa/Maseru',
  foundingLeader: 'Leabua Jonathan',
  currentLeader: 'Letsie III (King); Sam Matekane (Prime Minister)',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'Binance (P2P)'],
  stablecoin: 'USDT via South African financial links',
  domesticCourierServices: AU_DOMESTIC_COURIERS['LS'],
  newsOutlets: AU_NEWS_OUTLETS['LS'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['LS'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['LS'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['LS'],
  rareEarths: AU_RARE_EARTHS['LS'],
  stockExchange: 'Maseru Securities Market (limited)',
  bondMarkets: AU_BOND_MARKETS['LS'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['LS'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['LS'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['LS'],
}
