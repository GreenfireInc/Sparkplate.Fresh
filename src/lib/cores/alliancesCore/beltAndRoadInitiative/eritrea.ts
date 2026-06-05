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
export const eritrea: BeltAndRoadInitiativeCountry = {
  name: 'Eritrea',
  iso3166Alpha2: 'ER',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Asmara',
  coordinates: { latitude: 15.3229, longitude: 38.9251 },
  independence: '1993-05-24',
  topMajorCities: ['Asmara', 'Keren', 'Massawa', 'Assab', 'Mendefera'] as [string, string, string, string, string],
  population: 3607000,
  mainLanguages: [ 'Arabic', 'English', 'Tigrinya' ],
  currency: 'Eritrean nakfa (ERN)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Isaias Afwerki',
  currentLeader: 'Isaias Afwerki (President)',
  cryptocurrencyExchanges: ['Limited formal venues; diaspora P2P', 'Binance (P2P, informal)'],
  stablecoin: 'USDT minimal formal access; cash economy strong',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ER'],
  newsOutlets: BRI_NEWS_OUTLETS['ER'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ER'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ER'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ER'],
  rareEarths: BRI_RARE_EARTHS['ER'],
  stockExchange: 'No public stock exchange',
  bondMarkets: BRI_BOND_MARKETS['ER'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['ER'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['ER'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['ER'],
}
