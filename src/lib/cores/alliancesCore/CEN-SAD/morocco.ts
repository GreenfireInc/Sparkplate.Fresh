import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const morocco: CensadCountry = {
  name: 'Morocco',
  iso3166Alpha2: 'MA',
  capital: 'Rabat',
  coordinates: { latitude: 34.0209, longitude: -6.8417 },
  independence: '1956-03-02 (France); Spanish zones phased — verify detail',
  topMajorCities: ['Casablanca', 'Rabat', 'Fès', 'Marrakesh', 'Tanger'],
  population: 37500000,
  mainLanguages: ['Arabic (Darija Moroccan)', 'Berber Tamazight', 'French'],
  currency: 'Moroccan dirham (MAD)',
  timezone: 'Africa/Casablanca',
  foundingLeader: 'Mohammed V (sovereignty transition era)',
  currentLeader: 'King Mohammed VI; Head of Government Aziz Akhannouch — verify',
  cryptocurrencyExchanges: ['Regulatory evolution; peer markets reported'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['MA'],
  newsOutlets: CENSAD_NEWS_OUTLETS['MA'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['MA'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['MA'],
  stockExchange: 'Casablanca Stock Exchange',
}
