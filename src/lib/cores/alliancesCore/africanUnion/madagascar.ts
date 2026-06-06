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
export const madagascar: AfricanUnionCountry = {
  name: 'Madagascar',
  iso3166Alpha2: 'MG',
  africanUnionStatus: 'suspended',
  capital: 'Antananarivo',
  coordinates: { latitude: -18.8792, longitude: 47.5079 },
  independence: '1960-06-26',
  topMajorCities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'],
  population: 30000000,
  mainLanguages: ['Malagasy', 'French', 'English (official, limited use)'],
  currency: 'Malagasy ariary (MGA)',
  timezone: 'Indian/Antananarivo',
  foundingLeader: 'Philibert Tsiranana',
  currentLeader: 'Andry Rajoelina (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Local P2P', 'International brokers'],
  stablecoin: 'USDT informal; no MGA stablecoin',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MG'],
  newsOutlets: AU_NEWS_OUTLETS['MG'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MG'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['MG'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['MG'],
  rareEarths: AU_RARE_EARTHS['MG'],
  stockExchange: 'Madagascar Stock Exchange (SEM)',
  bondMarkets: AU_BOND_MARKETS['MG'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['MG'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['MG'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['MG'],
}
