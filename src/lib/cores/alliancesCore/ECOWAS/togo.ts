import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const togo: EcowasCountry = {
  name: 'Togo',
  iso3166Alpha2: 'TG',
  capital: 'Lomé',
  coordinates: { latitude: 6.1256, longitude: 1.2254 },
  independence: '1960-04-27',
  topMajorCities: ['Lomé', 'Sokodé', 'Kara', 'Kpalimé', 'Atakpamé'],
  population: 9000000,
  mainLanguages: ['French', 'Ewe', 'Mina'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Lome',
  foundingLeader: 'Sylvanus Olympio (first Prime Minister)',
  currentLeader: 'President Faure Gnassingbé — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Regional OTC'],
  stablecoin: 'USDT P2P; XOF CFA peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['TG'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['TG'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['TG'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['TG'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['TG'],
  rareEarths: ECOWAS_RARE_EARTHS['TG'],
  stockExchange: 'BRVM listings; Lomé banking hub — verify depth',
  bondMarkets: ECOWAS_BOND_MARKETS['TG'],
  intellectualPropertyDepartments: ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['TG'],

  securitiesExchangeCommission: ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS['TG'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['TG'],
}
