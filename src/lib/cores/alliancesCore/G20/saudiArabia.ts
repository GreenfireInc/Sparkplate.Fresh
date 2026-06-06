import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { G20_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { G20_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const saudiArabia: G20Country = {
  name: 'Saudi Arabia',
  iso3166Alpha2: 'SA',
  capital: 'Riyadh',
  coordinates: { latitude: 24.7136, longitude: 46.6753 },
  independence:
    '1932-09-23 unification of the Kingdom of Saudi Arabia under Ibn Saud; OPEC anchor; G20 founding member (finance track 1999; 2020 Riyadh virtual leaders summit host) — informational',
  topMajorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  population: 36500000,
  mainLanguages: ['Arabic (Modern Standard / Najdi / Hejazi)', 'English (business)', 'Urdu (expatriate community)'],
  currency: 'Saudi riyal (SAR; pegged to USD)',
  timezone: 'Asia/Riyadh',
  foundingLeader:
    'King Abdulaziz Ibn Saud (unification founder); modern Vision 2030 reform reference — informational',
  currentLeader: 'King Salman bin Abdulaziz; Crown Prince / Prime Minister Mohammed bin Salman — verify',
  cryptocurrencyExchanges: ['Onshore exchange offering constrained; SAMA cautious VA stance; regional Rain / BitOasis adjacency — informational'],
  stablecoin: 'mBridge wholesale CBDC participation; SAR-pegged issuance thin — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['SA'],
  newsOutlets: G20_NEWS_OUTLETS['SA'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['SA'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['SA'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['SA'],
  rareEarths: G20_RARE_EARTHS['SA'],
  stockExchange: 'Saudi Exchange (Tadawul)',
  bondMarkets: G20_BOND_MARKETS['SA'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['SA'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['SA'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['SA'],
}
