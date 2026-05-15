import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const laos: AseanCountry = {
  name: 'Laos',
  iso3166Alpha2: 'LA',
  capital: 'Vientiane',
  coordinates: { latitude: 17.9757, longitude: 102.6331 },
  independence:
    '1953 Kingdom / 1975 Lao PDR continuity; ASEAN member since Jul 1997 — informational',
  topMajorCities: ['Vientiane', 'Pakse', 'Savannakhet', 'Luang Prabang', 'Thakhek'],
  population: 7700000,
  mainLanguages: ['Lao', 'Hmong / Khmu highland languages', 'Thai (border)'],
  currency: 'Lao kip (LAK)',
  timezone: 'Asia/Vientiane',
  foundingLeader: 'Kaysone Phomvihane revolutionary reference — informational',
  currentLeader: 'General Secretary / President Thongloun Sisoulith — verify titles',
  cryptocurrencyExchanges: ['BOL restrictive licensing; OTC sparse — informational'],
  stablecoin: 'LAK thin digital rails; USD/Baht informal — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['LA'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['LA'],
  stockExchange: 'Lao Securities Exchange (Vientiane — thin listings — informational)',
}
