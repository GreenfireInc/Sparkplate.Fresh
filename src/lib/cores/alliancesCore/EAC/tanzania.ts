import type { EacCountry } from './types'
import { EAC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EAC_NEWS_OUTLETS } from './newsOutletsByIso'
import { EAC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const tanzania: EacCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence: '1961-12-09 (Tanganyika); Zanzibar merged 1964',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 68000000,
  mainLanguages: ['Swahili', 'English', 'Sukuma'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere (Mwalimu; union architect)',
  currentLeader: 'President Samia Suluhu Hassan — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local fintech'],
  stablecoin: 'USDT / USDC P2P',
  domesticCourierServices: EAC_DOMESTIC_COURIERS['TZ'],
  newsOutlets: EAC_NEWS_OUTLETS['TZ'],
  notableUniversities: EAC_NOTABLE_UNIVERSITIES['TZ'],
  stockExchange:
    'Dar es Salaam Stock Exchange (DSE); EAC Secretariat located in Arusha — informational',
}
