import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { CENSAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const niger: CensadCountry = {
  name: 'Niger',
  iso3166Alpha2: 'NE',
  capital: 'Niamey',
  coordinates: { latitude: 13.5127, longitude: 2.1258 },
  independence: '1960-08-03 (2023 coup and transition — verify)',
  topMajorCities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua'],
  population: 27000000,
  mainLanguages: ['French', 'Hausa', 'Zarma/Songhay'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Niamey',
  foundingLeader: 'Hamani Diori (first president)',
  currentLeader:
    'National Council for the Safeguard of the Homeland transitional leadership — verify nominal President/PM',
  cryptocurrencyExchanges: ['Informal regional P2P'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['NE'],
  newsOutlets: CENSAD_NEWS_OUTLETS['NE'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['NE'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['NE'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['NE'],
  rareEarths: CENSAD_RARE_EARTHS['NE'],
  stockExchange: 'BRVM linkage context',
  bondMarkets: CENSAD_BOND_MARKETS['NE'],
  intellectualPropertyDepartments: CENSAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['NE'],
  securitiesExchangeCommission: CENSAD_SECURITIES_EXCHANGE_COMMISSIONS['NE'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['NE'],
}
