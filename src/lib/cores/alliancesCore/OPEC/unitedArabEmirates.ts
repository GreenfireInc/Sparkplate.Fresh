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

export const unitedArabEmirates: OpecCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence:
    '1971 federation from British treaties; GCC anchor; OPEC member since Nov 1967 — informational',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
  population: 10500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Hindi / Tagalog / Bengali (expatriate majority)'],
  currency: 'United Arab Emirates dirham (AED; USD-pegged de facto)',
  timezone: 'Asia/Dubai',
  foundingLeader:
    'Sheikh Zayed bin Sultan Al Nahyan (federation founding President reference — informational)',
  currentLeader:
    'President Mohamed bin Zayed Al Nahyan — verify; Dubai Ruler Sheikh Mohammed bin Rashid — verify',
  cryptocurrencyExchanges: ['VARA Dubai regime', 'ADGM FSRA digital-asset licences', 'MENA liquidity — informational'],
  stablecoin: 'AED-referenced issuance pilots; CBUAE supervision evolution — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['AE'],
  newsOutlets: OPEC_NEWS_OUTLETS['AE'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['AE'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['AE'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['AE'],
  rareEarths: OPEC_RARE_EARTHS['AE'],
  stockExchange: 'Abu Dhabi Securities Exchange (ADX); Dubai Financial Market (DFM)',
  bondMarkets: OPEC_BOND_MARKETS['AE'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['AE'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['AE'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['AE'],
}
