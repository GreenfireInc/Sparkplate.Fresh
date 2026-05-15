import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const unitedArabEmirates: GccCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence:
    '1971 federation of Emirates from British treaties; GCC founding signatory treaty Abu Dhabi venue — informational',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
  population: 10500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Hindi / Tagalog / Bengali (expatriate majority)'],
  currency: 'United Arab Emirates dirham (AED); USD-pegged de facto GCC alignment — informational',
  timezone: 'Asia/Dubai',
  foundingLeader:
    'Sheikh Zayed bin Sultan Al Nahyan (UAE founding federation President and GCC formative host — informational)',
  currentLeader:
    'President Mohamed bin Zayed Al Nahyan federation President — verify; Dubai Ruler Sheikh Mohammed bin Rashid — verify',
  cryptocurrencyExchanges: ['VARA Dubai regime', 'ADGM FSRA digital-asset licences', 'MENA OTC liquidity — informational'],
  stablecoin: 'AED-referenced issuance (private); CBUAE stablecoin supervisory pilots — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['AE'],
  stockExchange: 'Abu Dhabi Securities Exchange (ADX); Dubai Financial Market (DFM)',
}
