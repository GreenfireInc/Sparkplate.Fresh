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
export const yemen: BeltAndRoadInitiativeCountry = {
  name: 'Yemen',
  iso3166Alpha2: 'YE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sana\'a',
  coordinates: { latitude: 15.3694, longitude: 44.191 },
  independence: '1967-11-30 (South); 1990-05-22 (unification)',
  topMajorCities: ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Ibb'] as [string, string, string, string, string],
  population: 32684503,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Yemeni rial (YER)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Yahya Muhammad Hamid ed-Din (Kingdom era); Ali Abdullah Saleh (unified republic era)',
  currentLeader: 'Rashad Muhammad al-Alimi (Chair, Presidential Leadership Council — informational)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Hawala-dominated economy'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['YE'],
  newsOutlets: BRI_NEWS_OUTLETS['YE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['YE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['YE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['YE'],
  rareEarths: BRI_RARE_EARTHS['YE'],
  stockExchange: 'No functioning unified national exchange',
  bondMarkets: BRI_BOND_MARKETS['YE'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['YE'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['YE'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['YE'],
}
