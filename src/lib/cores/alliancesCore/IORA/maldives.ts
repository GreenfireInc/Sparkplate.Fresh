import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const maldives: IoraCountry = {
  name: 'Maldives',
  iso3166Alpha2: 'MV',
  capital: 'Malé',
  coordinates: { latitude: 4.1755, longitude: 73.5093 },
  independence:
    '1965 independence from UK protectorate; low-lying atoll Indian Ocean strategic geography; IORA member — informational',
  topMajorCities: ['Malé', 'Addu City', 'Fuvahmulah', 'Thinadhoo', 'Kulhudhuffushi'],
  population: 530000,
  mainLanguages: ['Dhivehi', 'English', 'Hindi / Bengali (expatriate workers)'],
  currency: 'Maldivian rufiyaa (MVR)',
  timezone: 'Indian/Maldives',
  foundingLeader: 'Ibrahim Nasir independence reference — informational',
  currentLeader: 'President Mohamed Muizzu — verify',
  cryptocurrencyExchanges: ['Tourism-driven informal crypto; central bank caution — informational'],
  stablecoin: 'USD resort pricing dominant; USDT informal — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MV'],
  newsOutlets: IORA_NEWS_OUTLETS['MV'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['MV'],
  stockExchange: 'Maldives Stock Exchange (Malé — thin — informational)',
}
