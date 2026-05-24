import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const laos: RcepCountry = {
  name: 'Laos',
  iso3166Alpha2: 'LA',
  capital: 'Vientiane',
  coordinates: { latitude: 17.9757, longitude: 102.6331 },
  independence:
    '1953 kingdom / Lao PDR continuity; ASEAN member; RCEP Party (2022 opening tranche — informational)',
  topMajorCities: ['Vientiane', 'Pakse', 'Savannakhet', 'Luang Prabang', 'Thakhek'],
  population: 7700000,
  mainLanguages: ['Lao', 'Hmong / Khmu languages', 'Thai (border)'],
  currency: 'Lao kip (LAK)',
  timezone: 'Asia/Vientiane',
  foundingLeader: 'Kaysone Phomvihane reference — informational',
  currentLeader: 'Party General Secretary / President — verify titles',
  cryptocurrencyExchanges: ['BOL restrictive; OTC sparse — informational'],
  stablecoin: 'LAK rails thin; USD/Baht informal — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['LA'],
  newsOutlets: RCEP_NEWS_OUTLETS['LA'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['LA'],
  stockExchange: 'Lao Securities Exchange (thin listings — informational)',
}
