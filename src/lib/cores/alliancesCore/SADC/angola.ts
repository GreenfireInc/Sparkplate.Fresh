import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const angola: SadcCountry = {
  name: 'Angola',
  iso3166Alpha2: 'AO',
  capital: 'Luanda',
  coordinates: { latitude: -8.8383, longitude: 13.2344 },
  independence: '1975-11-11 (from Portugal)',
  topMajorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Kuito'],
  population: 37000000,
  mainLanguages: ['Portuguese', 'Umbundu', 'Kikongo'],
  currency: 'Kwanza (AOA)',
  timezone: 'Africa/Luanda',
  foundingLeader: 'Agostinho Neto (first President)',
  currentLeader: 'President João Lourenço — verify',
  cryptocurrencyExchanges: ['Limited formal footprint; OTC / diaspora informal'],
  stablecoin: 'USDT/USDC informal alongside AOA volatility',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['AO'],
  newsOutlets: SADC_NEWS_OUTLETS['AO'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['AO'],
  stockExchange: 'Bodiva (Bolsa de Dívida e Valores de Angola — equity depth limited)',
}
