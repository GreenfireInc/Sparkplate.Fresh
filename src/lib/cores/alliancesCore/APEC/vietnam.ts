import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const vietnam: ApecCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  capital: 'Hanoi',
  coordinates: { latitude: 21.0285, longitude: 105.8542 },
  independence:
    'Đổi Mới socialist-oriented market lineage; ASEAN factory transpacific CPTPP stakeholder APEC member — informational',
  topMajorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Haiphong', 'Can Tho'],
  population: 100300000,
  mainLanguages: ['Vietnamese', 'English investor education', 'Khmer Tay regional'],
  currency: 'Vietnamese dong (VND)',
  timezone: 'Asia/Ho_Chi_Minh',
  foundingLeader: 'Đổi Mới reform reference — informational',
  currentLeader:
    'Party General Secretary — verify; State President — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Retail prohibition (State Bank of Vietnam stance); OTC informal episodic — informational'],
  stablecoin: 'Pilot digital currency sandbox narratives predominant VND — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['VN'],
  newsOutlets: APEC_NEWS_OUTLETS['VN'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['VN'],
  stockExchange: 'HOSE Ho Chi Minh; HNX consolidation roadmap — informational',
}
