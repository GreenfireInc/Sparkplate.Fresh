import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  newsOutlets: ASEAN_NEWS_OUTLETS['MY'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['MY'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['MY'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['MY'],
  rareEarths: ASEAN_RARE_EARTHS['MY'],
  stockExchange: 'Bursa Malaysia (Kuala Lumpur)',
  bondMarkets: ASEAN_BOND_MARKETS['MY'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['MY'],
}
