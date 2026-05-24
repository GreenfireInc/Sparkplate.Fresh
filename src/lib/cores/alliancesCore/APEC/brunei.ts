import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const brunei: ApecCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence:
    '1984 full UN sovereignty; ASEAN monarchy hydrocarbon stakeholder; small open APEC economy — informational',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 460000,
  mainLanguages: ['Malay', 'English', 'Chinese dialects (community)'],
  currency: 'Brunei dollar (BND)',
  timezone: 'Asia/Brunei',
  foundingLeader: 'Sultan Hassanal Bolkiah continuity reference — informational',
  currentLeader:
    'Sultan Hassanal Bolkiah; Crown Prince Prince Al-Muhtadee Billah — verify',
  cryptocurrencyExchanges: ['Autoriti Monetari cautious; regional OTC — informational'],
  stablecoin: 'BND monetary board USD anchor — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['BN'],
  newsOutlets: APEC_NEWS_OUTLETS['BN'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['BN'],
  stockExchange: 'No consolidated national equities exchange narrative — informational',
}
