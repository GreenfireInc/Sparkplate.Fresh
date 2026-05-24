import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const bangladesh: IoraCountry = {
  name: 'Bangladesh',
  iso3166Alpha2: 'BD',
  capital: 'Dhaka',
  coordinates: { latitude: 23.8103, longitude: 90.4125 },
  independence:
    '1971 liberation war to sovereign Bangladesh; Bay of Bengal / Indian Ocean trade corridor; IORA member Charter era — informational',
  topMajorCities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  population: 173000000,
  mainLanguages: ['Bengali (Bangla)', 'English', 'Chittagonian dialects regional'],
  currency: 'Bangladeshi taka (BDT)',
  timezone: 'Asia/Dhaka',
  foundingLeader: 'Sheikh Mujibur Rahman independence-era reference — informational',
  currentLeader:
    'President Mohammed Shahabuddin — verify; Chief Adviser interim government cycles — verify',
  cryptocurrencyExchanges: ['Bangladesh Bank restrictive stance; informal P2P — informational'],
  stablecoin: 'BDT OTC thin; migrant remittance USDT overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['BD'],
  newsOutlets: IORA_NEWS_OUTLETS['BD'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['BD'],
  stockExchange: 'Dhaka Stock Exchange (DSE); Chittagong Stock Exchange context — informational',
}
