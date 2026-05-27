import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const malaysia: IoraCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  capital: 'Kuala Lumpur (national capital); Putrajaya administrative centre',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence:
    '1963 Malaysia formation; Malacca Strait Indian Ocean trade corridor; IORA member Mar 1997 era — informational',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Johor Bahru', 'Malacca City'],
  population: 34500000,
  mainLanguages: ['Malay', 'English', 'Mandarin / Tamil (communities)'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Tunku Abdul Rahman reference — informational',
  currentLeader:
    'Yang di-Pertuan Agong — verify rotation; Prime Minister Anwar Ibrahim — verify coalition',
  cryptocurrencyExchanges: ['SC digital-asset exchange pilots — informational'],
  stablecoin: 'MYR digital bank pilots — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MY'],
  newsOutlets: IORA_NEWS_OUTLETS['MY'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['MY'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['MY'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['MY'],
  rareEarths: IORA_RARE_EARTHS['MY'],
  stockExchange: 'Bursa Malaysia',
  bondMarkets: IORA_BOND_MARKETS['MY'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['MY'],
}
