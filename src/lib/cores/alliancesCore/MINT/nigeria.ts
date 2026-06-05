import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_NEWS_OUTLETS } from './newsOutletsByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MINT_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MINT_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MINT_RARE_EARTHS } from './rareEarthsByIso'
import { MINT_BOND_MARKETS } from './bondMarketsByIso'
import { MINT_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { MINT_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { MINT_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const nigeria: MintCountry = {
  name: 'Nigeria',
  iso3166Alpha2: 'NG',
  capital: 'Abuja',
  coordinates: { latitude: 9.0765, longitude: 7.3986 },
  independence:
    '1960-10-01 independence from UK; civil-war restoration; federation largest African economy MINT acronym context — informational',
  topMajorCities: ['Lagos', 'Kano', 'Ibadan', 'Abuja', 'Port Harcourt'],
  population: 230000000,
  mainLanguages: ['English', 'Hausa', 'Yoruba / Igbo regional'],
  currency: 'Nigerian naira (NGN; parallel FX-market episodes — informational)',
  timezone: 'Africa/Lagos',
  foundingLeader:
    'Nnamdi Azikiwe / Balewa federal independence references; Yakubu Gowon post-war reconciliation — informational',
  currentLeader: 'President Bola Ahmed Tinubu — verify',
  cryptocurrencyExchanges: ['SEC cautious licensing; Patricia / regional P2P with CBN overlays — informational'],
  stablecoin: 'CBN e-Naira experimentation; informal USDT pricing — informational',
  domesticCourierServices: MINT_DOMESTIC_COURIERS['NG'],
  newsOutlets: MINT_NEWS_OUTLETS['NG'],
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['NG'],
  mainExportCommodities: MINT_MAIN_EXPORT_COMMODITIES['NG'],
  mainExportedElements: MINT_MAIN_EXPORTED_ELEMENTS['NG'],
  rareEarths: MINT_RARE_EARTHS['NG'],
  stockExchange: 'Nigerian Exchange Group NGX (Lagos equities)',
  bondMarkets: MINT_BOND_MARKETS['NG'],
  mainInternationalAirport: MINT_MAIN_INTERNATIONAL_AIRPORTS['NG'],
  intellectualPropertyDepartments: MINT_INTELLECTUAL_PROPERTY_DEPARTMENTS['NG'],
  securitiesExchangeCommission: MINT_SECURITIES_EXCHANGE_COMMISSIONS['NG'],
}
