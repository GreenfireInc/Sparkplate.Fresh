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
export const capeVerde: AfricanUnionCountry = {
  name: 'Cape Verde',
  iso3166Alpha2: 'CV',
  africanUnionStatus: 'member',
  capital: 'Praia',
  coordinates: { latitude: 14.9311, longitude: -23.5087 },
  independence: '1975-07-05',
  topMajorCities: ['Praia', 'Mindelo', 'Santa Maria', 'Assomada', 'Pedra Badejo'],
  population: 600000,
  mainLanguages: ['Portuguese', 'Cape Verdean Creole', 'English (limited)'],
  currency: 'Cape Verdean escudo (CVE)',
  timezone: 'Atlantic/Cape_Verde',
  foundingLeader: 'Aristides Pereira',
  currentLeader: 'José Maria Neves (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'European-facing brokers'],
  stablecoin: 'EUR-linked usage; USDT via international apps',
  domesticCourierServices: AU_DOMESTIC_COURIERS['CV'],
  newsOutlets: AU_NEWS_OUTLETS['CV'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['CV'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['CV'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['CV'],
  rareEarths: AU_RARE_EARTHS['CV'],
  stockExchange: 'Bolsa de Valores de Cabo Verde (limited listings)',
  bondMarkets: AU_BOND_MARKETS['CV'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['CV'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['CV'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['CV'],
}
