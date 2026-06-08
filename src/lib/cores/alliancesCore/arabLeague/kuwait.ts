import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ARAB_LEAGUE_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const kuwait: ArabLeagueCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  arabLeagueStatus: 'member',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence: '1961-06-19',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Al Farwaniyah', 'Al Jahra'],
  population: 4500000,
  mainLanguages: ['Arabic', 'English', 'Hindi/Urdu (expatriate)'],
  currency: 'Kuwaiti dinar (KWD)',
  timezone: 'Asia/Kuwait',
  foundingLeader: 'Abdullah Al-Salim Al-Sabah (Emir)',
  currentLeader: 'Mishal Al-Ahmad Al-Jaber Al-Sabah (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; no major local spot exchange'],
  stablecoin: 'USDT / USDC informal; oil-economy USD links',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['KW'],
  domesticPostService: ARAB_LEAGUE_DOMESTIC_POST_SERVICES['KW'],
  nationalBankingInstitutions: ARAB_LEAGUE_NATIONAL_BANKING_INSTITUTIONS['KW'],
  corporationFormationOffice: ARAB_LEAGUE_CORPORATION_FORMATION_OFFICES['KW'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['KW'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['KW'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['KW'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['KW'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['KW'],
  stockExchange: 'Boursa Kuwait',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['KW'],
  intellectualPropertyDepartments: ARAB_LEAGUE_INTELLECTUAL_PROPERTY_DEPARTMENTS['KW'],
  securitiesExchangeCommission: ARAB_LEAGUE_SECURITIES_EXCHANGE_COMMISSIONS['KW'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['KW'],
  mainInternationalSeaport: ARAB_LEAGUE_MAIN_INTERNATIONAL_SEAPORTS['KW'],
}
