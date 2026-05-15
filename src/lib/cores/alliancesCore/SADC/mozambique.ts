import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const mozambique: SadcCountry = {
  name: 'Mozambique',
  iso3166Alpha2: 'MZ',
  capital: 'Maputo',
  coordinates: { latitude: -25.9692, longitude: 32.5732 },
  independence: '1975-06-25',
  topMajorCities: ['Maputo', 'Matola', 'Beira', 'Nampula', 'Chimoio'],
  population: 34100000,
  mainLanguages: ['Portuguese', 'Emakhuwa', 'Changana'],
  currency: 'Mozambique metical (MZN)',
  timezone: 'Africa/Maputo',
  foundingLeader: 'Samora Machel (first President Frelimo republic)',
  currentLeader: 'President Daniel Chapo — verify',
  cryptocurrencyExchanges: ['Regional OTC informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MZ'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MZ'],
  stockExchange: 'Bolsa de Valores de Moçambique — verify activity',
}
