import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const egypt: CensadCountry = {
  name: 'Egypt',
  iso3166Alpha2: 'EG',
  capital: 'Cairo',
  coordinates: { latitude: 30.0444, longitude: 31.2357 },
  independence:
    'Revolution and republic evolution; widely cited 1922 sovereignty steps; Arab Republic from 1953 — verify exact anniversary used nationally',
  topMajorCities: ['Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said'],
  population: 114000000,
  mainLanguages: ['Arabic (Egyptian)', 'English', 'Arabic (MSA)'],
  currency: 'Egyptian pound (EGP)',
  timezone: 'Africa/Cairo',
  foundingLeader: 'Muhammad Naguib / Gamal Abdel Nasser republic era (informational)',
  currentLeader: 'President Abdel Fattah el-Sisi — verify',
  cryptocurrencyExchanges: ['Local licensed platforms context; global P2P informally reported'],
  stablecoin: 'USDT informal; CBDC pilot narrative',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['EG'],
  newsOutlets: CENSAD_NEWS_OUTLETS['EG'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['EG'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['EG'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['EG'],
  rareEarths: CENSAD_RARE_EARTHS['EG'],
  stockExchange: 'Egyptian Exchange (EGX)',
  bondMarkets: CENSAD_BOND_MARKETS['EG'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['EG'],
}
