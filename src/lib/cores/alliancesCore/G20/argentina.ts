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

export const argentina: G20Country = {
  name: 'Argentina',
  iso3166Alpha2: 'AR',
  capital: 'Buenos Aires',
  coordinates: { latitude: -34.6037, longitude: -58.3816 },
  independence:
    '1816-07-09 Tucumán declaration of independence from Spain; Southern Cone heavyweight; G20 founding member (finance track 1999; 2018 leaders summit host) — informational',
  topMajorCities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  population: 46000000,
  mainLanguages: ['Spanish (Rioplatense)', 'Italian (community heritage)', 'English (business)'],
  currency: 'Argentine peso (ARS; recurrent FX-control / inflation episodes — informational)',
  timezone: 'America/Argentina/Buenos_Aires',
  foundingLeader:
    'José de San Martín (independence general); Juan Domingo Perón (modern Peronist political reference — informational)',
  currentLeader: 'President Javier Milei — verify',
  cryptocurrencyExchanges: ['Lemon Cash', 'Ripio', 'Belo / CNV-evolving VASP register — informational'],
  stablecoin: 'USDT dominant retail savings instrument vs ARS depreciation; ARS-backed issuance thin — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['AR'],
  newsOutlets: G20_NEWS_OUTLETS['AR'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['AR'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['AR'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['AR'],
  rareEarths: G20_RARE_EARTHS['AR'],
  stockExchange: 'Bolsas y Mercados Argentinos BYMA (Buenos Aires)',
  bondMarkets: G20_BOND_MARKETS['AR'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['AR'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['AR'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['AR'],
}
