import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const angola: BeltAndRoadInitiativeCountry = {
  name: 'Angola',
  iso3166Alpha2: 'AO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Luanda',
  coordinates: { latitude: -8.8383, longitude: 13.2344 },
  independence: '1975-11-11',
  topMajorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango'] as [string, string, string, string, string],
  population: 36170961,
  mainLanguages: [ 'Portuguese', 'English', 'Regional languages' ],
  currency: 'Angolan kwanza (AOA)',
  timezone: 'UTC+01:00',
  foundingLeader: 'Agostinho Neto',
  currentLeader: 'João Lourenço (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Local OTC'],
  stablecoin: 'USDT / USDC via P2P; no AOA stablecoin',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AO'],
  newsOutlets: BRI_NEWS_OUTLETS['AO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['AO'],
  rareEarths: BRI_RARE_EARTHS['AO'],
  stockExchange: 'Bodiva (Angola Securities Exchange)',
  bondMarkets: BRI_BOND_MARKETS['AO'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['AO'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['AO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['AO'],
}
