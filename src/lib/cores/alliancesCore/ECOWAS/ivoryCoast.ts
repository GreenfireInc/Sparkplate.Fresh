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

export const ivoryCoast: EcowasCountry = {
  name: "Côte d'Ivoire",
  iso3166Alpha2: 'CI',
  capital: 'Yamoussoukro',
  coordinates: { latitude: 6.8276, longitude: -5.2893 },
  independence: '1960-08-07',
  topMajorCities: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'],
  population: 29000000,
  mainLanguages: ['French', 'Baoulé', 'Dioula'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Abidjan',
  foundingLeader: 'Félix Houphouët-Boigny (first President)',
  currentLeader: 'President Alassane Ouattara — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno (regional)'],
  stablecoin: 'USDT / USDC; XOF CFA peg via BCEAO',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['CI'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['CI'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['CI'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['CI'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['CI'],
  rareEarths: ECOWAS_RARE_EARTHS['CI'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM — seat Abidjan)',
  bondMarkets: ECOWAS_BOND_MARKETS['CI'],
  intellectualPropertyDepartments: ECOWAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['CI'],

  securitiesExchangeCommission: ECOWAS_SECURITIES_EXCHANGE_COMMISSIONS['CI'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['CI'],
}
