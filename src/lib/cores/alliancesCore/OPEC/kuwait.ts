import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'
import { OPEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OPEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const kuwait: OpecCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence:
    '1961 independence from British protectorate; GCC member; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Salmiya', 'Farwaniya'],
  population: 4500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Bengali / Hindi (resident communities)'],
  currency: 'Kuwaiti dinar (KWD)',
  timezone: 'Asia/Kuwait',
  foundingLeader:
    'Amir Abdullah Al-Salem era state-building continuity — informational',
  currentLeader: 'Amir Mishal Al-Ahmad Al-Jaber Al-Sabah — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Central Bank prohibition historically easing pilots — informational'],
  stablecoin: 'KWD fiat anchoring; digital-payment supervision CBK — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['KW'],
  newsOutlets: OPEC_NEWS_OUTLETS['KW'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['KW'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['KW'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['KW'],
  rareEarths: OPEC_RARE_EARTHS['KW'],
  stockExchange: 'Boursa Kuwait',
  bondMarkets: OPEC_BOND_MARKETS['KW'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['KW'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['KW'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['KW'],
}
