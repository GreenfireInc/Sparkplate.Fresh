import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const newZealand: ApecCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    'Realm sovereignty evolution; CPTPP stakeholder; transpacific pastoral-tech APEC participant — informational',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'David Lange nuclear-free stature reference — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto FMCA onboarding — informational'],
  stablecoin: 'NZD digital policy evolution Reserve Bank — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['NZ'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['NZ'],
  stockExchange: 'NZX Limited',
}
