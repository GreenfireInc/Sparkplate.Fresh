import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const southAfrica: G20Country = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  capital: 'Pretoria (executive); Cape Town (legislative); Bloemfontein (judicial)',
  coordinates: { latitude: -25.7479, longitude: 28.2293 },
  independence:
    '1910 Union of South Africa; 1961 Republic; 1994 democratic non-racial constitution; BRICS / G20 founding member (finance track 1999; 2025 Johannesburg leaders summit host — first African host) — informational',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth (Gqeberha)'],
  population: 62000000,
  mainLanguages: ['English (lingua franca)', 'Zulu', 'Xhosa / Afrikaans / Sotho regional'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader:
    'Nelson Mandela (post-apartheid democratic founder); Oliver Tambo / Mahatma Gandhi heritage references — informational',
  currentLeader: 'President Cyril Ramaphosa — verify',
  cryptocurrencyExchanges: ['Luno', 'VALR', 'AltCoinTrader / FSCA CASP licensing regime — informational'],
  stablecoin: 'ZARP (rand-pegged) issuance niche; SARB Project Khokha wholesale settlement experiments — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['ZA'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['ZA'],
  stockExchange: 'Johannesburg Stock Exchange (JSE)',
}
