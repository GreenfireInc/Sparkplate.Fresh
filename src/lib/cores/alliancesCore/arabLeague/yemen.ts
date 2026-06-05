import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const yemen: ArabLeagueCountry = {
  name: 'Yemen',
  iso3166Alpha2: 'YE',
  arabLeagueStatus: 'member',
  capital: 'Sana\'a (Houthi administration); Aden (internationally recognized government — disputed)',
  coordinates: { latitude: 15.3694, longitude: 44.191 },
  independence: '1967-11-30 (South); 1990-05-22 (unification)',
  topMajorCities: ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Ibb'],
  population: 35000000,
  mainLanguages: ['Arabic', 'Soqotri (Socotra)', 'Mehri (minority)'],
  currency: 'Yemeni rial (YER)',
  timezone: 'Asia/Aden',
  foundingLeader: 'Yahya Muhammad Hamid ed-Din (Kingdom era); Ali Abdullah Saleh (unified republic era)',
  currentLeader: 'Rashad Muhammad al-Alimi (Chair, Presidential Leadership Council — informational)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC', 'Hawala-dominated economy'],
  stablecoin: 'USDT informal; humanitarian USD economy',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['YE'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['YE'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['YE'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['YE'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['YE'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['YE'],
  stockExchange: 'No functioning unified national exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['YE'],
  intellectualPropertyDepartments: ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS['YE'],
  securitiesExchangeCommission: ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS['YE'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['YE'],
}
