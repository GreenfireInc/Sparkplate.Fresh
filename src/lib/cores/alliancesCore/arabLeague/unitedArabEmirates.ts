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

export const unitedArabEmirates: ArabLeagueCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  arabLeagueStatus: 'member',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence: '1971-12-02 (federation; from British treaty)',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
  population: 10000000,
  mainLanguages: ['Arabic', 'English', 'Hindi/Urdu (expatriate)'],
  currency: 'UAE dirham (AED)',
  timezone: 'Asia/Dubai',
  foundingLeader: 'Zayed bin Sultan Al Nahyan (first President)',
  currentLeader: 'Mohamed bin Zayed Al Nahyan (President); Mohammed bin Rashid Al Maktoum (Vice President & PM of UAE, Ruler of Dubai)',
  cryptocurrencyExchanges: ['BitOasis (historical)', 'International brokers', 'VARA-regulated Dubai activity'],
  stablecoin: 'USDT / USDC; AED-linked experiments',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['AE'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['AE'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['AE'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['AE'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['AE'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['AE'],
  stockExchange: 'Abu Dhabi Securities Exchange (ADX); Dubai Financial Market (DFM)',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['AE'],
  intellectualPropertyDepartments: ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS['AE'],
  securitiesExchangeCommission: ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS['AE'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['AE'],
}
