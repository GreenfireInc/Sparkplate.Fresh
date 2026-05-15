import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const southAfrica: IoraCountry = {
  name: 'South Africa',
  iso3166Alpha2: 'ZA',
  capital: 'Pretoria (executive); legislative Cape Town; judiciary Bloemfontein — informational',
  coordinates: { latitude: -25.7479, longitude: 28.229 },
  independence:
    '1994 democratic transition post-apartheid republic; Cape Agulhas Indian Ocean access; BRICS crossover; IORA member — informational',
  topMajorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  population: 62000000,
  mainLanguages: ['Zulu', 'English', 'Xhosa / Afrikaans regional'],
  currency: 'South African rand (ZAR)',
  timezone: 'Africa/Johannesburg',
  foundingLeader: 'Nelson Mandela unity-government reference — informational',
  currentLeader: 'President Cyril Ramaphosa — verify succession politics',
  cryptocurrencyExchanges: ['Luno RSA onboarding; FSCA crypto-asset licences — informational'],
  stablecoin: 'ZAR thin digital issuance; OTC USDT overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['ZA'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['ZA'],
  stockExchange: 'Johannesburg Stock Exchange JSE',
}
