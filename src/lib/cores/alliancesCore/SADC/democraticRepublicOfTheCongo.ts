import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { SADC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const democraticRepublicOfTheCongo: SadcCountry = {
  name: 'Democratic Republic of the Congo',
  iso3166Alpha2: 'CD',
  capital: 'Kinshasa',
  coordinates: { latitude: -4.3276, longitude: 15.3136 },
  independence: '1960-06-30 (Belgian Congo)',
  topMajorCities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kisangani', 'Kananga'],
  population: 105000000,
  mainLanguages: ['French', 'Lingala', 'Swahili'],
  currency: 'Congolese franc (CDF)',
  timezone: 'Africa/Kinshasa',
  foundingLeader: 'Joseph Kasa-Vubu (President); Patrice Lumumba (Prime Minister)',
  currentLeader: 'President Félix Tshisekedi — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Regional OTC'],
  stablecoin: 'USDT/USDC widespread informal P2P',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['CD'],
  newsOutlets: SADC_NEWS_OUTLETS['CD'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['CD'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['CD'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['CD'],
  rareEarths: SADC_RARE_EARTHS['CD'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (informal linkage); domestic equity market thin — verify',
  bondMarkets: SADC_BOND_MARKETS['CD'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['CD'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['CD'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['CD'],
}
