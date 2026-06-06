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

export const bahrain: ArabLeagueCountry = {
  name: 'Bahrain',
  iso3166Alpha2: 'BH',
  arabLeagueStatus: 'member',
  capital: 'Manama',
  coordinates: { latitude: 26.2235, longitude: 50.5876 },
  independence: '1971-08-15',
  topMajorCities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'A\'ali'],
  population: 1500000,
  mainLanguages: ['Arabic', 'English', 'Urdu (expatriate)'],
  currency: 'Bahraini dinar (BHD)',
  timezone: 'Asia/Bahrain',
  foundingLeader: 'Isa bin Salman Al Khalifa (Emir)',
  currentLeader: 'Hamad bin Isa Al Khalifa (King); Salman bin Hamad Al Khalifa (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Binance (regional)', 'International OTC'],
  stablecoin: 'USDT / USDC; CBDC pilots in Gulf context',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['BH'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['BH'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['BH'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['BH'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['BH'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['BH'],
  stockExchange: 'Bahrain Bourse',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['BH'],
  intellectualPropertyDepartments: ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS['BH'],
  securitiesExchangeCommission: ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS['BH'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['BH'],
}
