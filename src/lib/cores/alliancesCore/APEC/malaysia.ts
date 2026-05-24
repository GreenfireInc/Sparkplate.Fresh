import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const malaysia: ApecCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  capital: 'Kuala Lumpur (national capital); Putrajaya administrative seat',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence:
    '1957 Federation Malaya lineage; Strait of Malacca logistics hub transpacific bridging APEC economy — informational',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Johor Bahru', 'Malacca City'],
  population: 34500000,
  mainLanguages: ['Malay', 'English', 'Mandarin / Tamil communities'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Mahathir modernization reference — informational',
  currentLeader:
    'Yang di-Pertuan Agong — verify rotation; Prime Minister Anwar Ibrahim — verify coalition',
  cryptocurrencyExchanges: ['SC regulated digital-exchange pilots — informational'],
  stablecoin: 'MYR digital bank experimentation — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['MY'],
  newsOutlets: APEC_NEWS_OUTLETS['MY'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['MY'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['MY'],
  stockExchange: 'Bursa Malaysia',
}
