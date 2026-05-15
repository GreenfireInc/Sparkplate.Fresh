import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const tanzania: SadcCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence: '1961-12-09 (Tanganyika); union with Zanzibar 1964',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Arabic influences (coast/Zanzibar)'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere (Mwalimu; union architect)',
  currentLeader: 'President Samia Suluhu Hassan — verify',
  cryptocurrencyExchanges: ['Bank of Tanzania wary stance historically; OTC informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['TZ'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
}
