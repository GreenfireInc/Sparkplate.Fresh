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
export const kuwait: BeltAndRoadInitiativeCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence: '1961-06-19',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Al Farwaniyah', 'Al Jahra'] as [string, string, string, string, string],
  population: 4881254,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Kuwaiti dinar (KWD)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Abdullah Al-Salim Al-Sabah (Emir)',
  currentLeader: 'Mishal Al-Ahmad Al-Jaber Al-Sabah (Emir)',
  cryptocurrencyExchanges: ['Regional OTC', 'International brokers; no major local spot exchange'],
  stablecoin: 'USDT / USDC informal; oil-economy USD links',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KW'],
  newsOutlets: BRI_NEWS_OUTLETS['KW'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KW'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['KW'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['KW'],
  rareEarths: BRI_RARE_EARTHS['KW'],
  stockExchange: 'Boursa Kuwait',
  bondMarkets: BRI_BOND_MARKETS['KW'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['KW'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['KW'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['KW'],
}
