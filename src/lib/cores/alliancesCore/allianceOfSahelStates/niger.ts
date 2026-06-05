import type { AllianceOfSahelStatesCountry } from './types'
import { AES_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AES_NEWS_OUTLETS } from './newsOutletsByIso'
import { AES_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AES_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AES_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AES_RARE_EARTHS } from './rareEarthsByIso'
import { AES_BOND_MARKETS } from './bondMarketsByIso'
import { AES_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AES_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AES_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const niger: AllianceOfSahelStatesCountry = {
  name: 'Niger',
  iso3166Alpha2: 'NE',
  allianceOfSahelStatesStatus: 'founding_member',
  capital: 'Niamey',
  coordinates: { latitude: 13.5127, longitude: 2.1254 },
  independence: '1960-08-03',
  topMajorCities: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua'],
  population: 27000000,
  mainLanguages: ['French', 'Hausa', 'Zarma'],
  currency: 'West African CFA franc (XOF)',
  timezone: 'Africa/Niamey',
  foundingLeader: 'Hamani Diori',
  currentLeader: 'Abdourahamane Tchiani (General; National Council for the Safeguard of the Homeland)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'OTC'],
  stablecoin: 'USDT P2P; XOF peg',
  domesticCourierServices: AES_DOMESTIC_COURIERS['NE'],
  newsOutlets: AES_NEWS_OUTLETS['NE'],
  notableUniversities: AES_NOTABLE_UNIVERSITIES['NE'],
  mainExportCommodities: AES_MAIN_EXPORT_COMMODITIES['NE'],
  mainExportedElements: AES_MAIN_EXPORTED_ELEMENTS['NE'],
  rareEarths: AES_RARE_EARTHS['NE'],
  stockExchange: 'No liquid national bourse; BRVM regional',
  bondMarkets: AES_BOND_MARKETS['NE'],
  intellectualPropertyDepartments: AES_INTELLECTUAL_PROPERTY_DEPARTMENTS['NE'],
  securitiesExchangeCommission: AES_SECURITIES_EXCHANGE_COMMISSIONS['NE'],
  mainInternationalAirport: AES_MAIN_INTERNATIONAL_AIRPORTS['NE'],
}
