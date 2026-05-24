import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const unitedArabEmirates: IoraCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence:
    '1971 federation from British treaties; Gulf / Arabian Sea energy-finance pillar; GCC member overlapping IORA — informational',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
  population: 10500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Hindi / Tagalog (expatriate majority)'],
  currency: 'United Arab Emirates dirham (AED)',
  timezone: 'Asia/Dubai',
  foundingLeader: 'Sheikh Zayed federation reference — informational',
  currentLeader:
    'President Mohamed bin Zayed Al Nahyan — verify; Dubai Ruler Sheikh Mohammed bin Rashid — verify',
  cryptocurrencyExchanges: ['VARA Dubai', 'ADGM FSRA digital-asset licences — informational'],
  stablecoin: 'AED-referenced issuance supervisory pilots — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['AE'],
  newsOutlets: IORA_NEWS_OUTLETS['AE'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['AE'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['AE'],
  stockExchange: 'ADX Abu Dhabi; DFM Dubai',
}
