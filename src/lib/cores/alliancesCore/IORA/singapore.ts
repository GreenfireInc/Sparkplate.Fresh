import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const singapore: IoraCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence:
    '1965 sovereignty; Malacca Strait entrepôt global finance; IORA member Mar 1997 hub economy — informational',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 5920000,
  mainLanguages: ['English', 'Mandarin', 'Malay / Tamil official minorities'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew maritime-developmental reference — informational',
  currentLeader: 'President Tharman Shanmugaratnam; Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['MAS DPT licensing regime — informational'],
  stablecoin: 'MAS stable-value digital guidance — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['SG'],
  newsOutlets: IORA_NEWS_OUTLETS['SG'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
}
