import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const malaysia: RcepCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  capital: 'Kuala Lumpur (national capital); Putrajaya administrative centre',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence:
    '1957 Malaya independence; Malaysia 1963; ASEAN founder; RCEP Party Jan 2022 wave — informational',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Johor Bahru', 'Malacca City'],
  population: 34500000,
  mainLanguages: ['Malay', 'English', 'Mandarin / Tamil (communities)'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Tunku Abdul Rahman ASEAN founder reference — informational',
  currentLeader:
    'Yang di-Pertuan Agong — verify rotation; Prime Minister Anwar Ibrahim — verify coalition',
  cryptocurrencyExchanges: ['SC-regulated digital exchange pilots — informational'],
  stablecoin: 'MYR digital bank narratives; ringgit controls — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['MY'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['MY'],
  stockExchange: 'Bursa Malaysia',
}
