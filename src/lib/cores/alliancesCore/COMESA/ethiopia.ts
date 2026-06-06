import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { COMESA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { COMESA_RARE_EARTHS } from './rareEarthsByIso'
import { COMESA_BOND_MARKETS } from './bondMarketsByIso'
import { COMESA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { COMESA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const ethiopia: ComesaCountry = {
  name: 'Ethiopia',
  iso3166Alpha2: 'ET',
  capital: 'Addis Ababa',
  coordinates: { latitude: 9.032, longitude: 38.7469 },
  independence:
    'Never formally colonised as single unit; Ethiopian Empire continuity; AU host state — informational',
  topMajorCities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Hawassa', 'Bahir Dar'],
  population: 132000000,
  mainLanguages: ['Amharic', 'Oromo', 'Tigrinya'],
  currency: 'Ethiopian birr (ETB)',
  timezone: 'Africa/Addis_Ababa',
  foundingLeader: 'Haile Selassie (Emperor; modern federal state reference)',
  currentLeader: 'Prime Minister Abiy Ahmed — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC P2P; National Bank cautious on crypto',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ET'],
  newsOutlets: COMESA_NEWS_OUTLETS['ET'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ET'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['ET'],
  mainExportedElements: COMESA_MAIN_EXPORTED_ELEMENTS['ET'],
  rareEarths: COMESA_RARE_EARTHS['ET'],
  stockExchange: 'Ethiopian Securities Exchange — verify launch / listings',
  bondMarkets: COMESA_BOND_MARKETS['ET'],
  intellectualPropertyDepartments: COMESA_INTELLECTUAL_PROPERTY_DEPARTMENTS['ET'],
  securitiesExchangeCommission: COMESA_SECURITIES_EXCHANGE_COMMISSIONS['ET'],
  mainInternationalAirport: COMESA_MAIN_INTERNATIONAL_AIRPORTS['ET'],
}
