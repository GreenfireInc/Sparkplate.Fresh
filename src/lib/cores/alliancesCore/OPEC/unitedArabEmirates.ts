import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

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
  stockExchange: 'Abu Dhabi Securities Exchange (ADX); Dubai Financial Market (DFM)',
}
