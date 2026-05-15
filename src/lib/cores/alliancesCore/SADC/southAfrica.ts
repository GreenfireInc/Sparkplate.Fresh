import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const southAfrica: SadcCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence:
    '1994-04-27 (Freedom Day democratic transition); Union heritage 1910 — informational',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Gqeberha'],
  population: 62000000,
  mainLanguages: ['IsiZulu', 'Afrikaans', 'English'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Nelson Mandela (first President post-apartheid era)',
  currentLeader:
    'President Cyril Ramaphosa — verify (cabinet may reflect coalition eras post-2024)',
  cryptocurrencyExchanges: ['Revix', 'Global P2P; FSCA licensing evolution'],
  stablecoin: 'ZARP ZAR-pegged token narrative; informal USDT/USDC',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
}
