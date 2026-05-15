import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const malaysia: AseanCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  capital: 'Kuala Lumpur (national capital); Putrajaya federal administrative centre',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence:
    '1957 Federation of Malaya independence; Malaysia formation 1963; ASEAN founding member Aug 1967 — informational',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Johor Bahru', 'Malacca City'],
  population: 34500000,
  mainLanguages: ['Malay', 'English', 'Mandarin / Tamil (communities)'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Tunku Abdul Rahman (Merdeka / ASEAN founder reference — informational)',
  currentLeader:
    'Yang di-Pertuan Agong — verify rotation; Prime Minister Anwar Ibrahim — verify coalition',
  cryptocurrencyExchanges: ['SC-registered digital exchanges pilot evolution — informational'],
  stablecoin: 'MYR digital bank pilots; ringgit non-internationalised policy — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['MY'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['MY'],
  stockExchange: 'Bursa Malaysia (Kuala Lumpur)',
}
