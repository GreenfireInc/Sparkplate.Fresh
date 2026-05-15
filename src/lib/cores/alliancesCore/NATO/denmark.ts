import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const denmark: NatoCountry = {
  name: 'Denmark',
  iso3166Alpha2: 'DK',
  capital: 'Copenhagen',
  coordinates: { latitude: 55.6761, longitude: 12.5683 },
  independence:
    'Constitutional kingdom continuity; EU since 1973 (euro opt-out); NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  population: 6000000,
  mainLanguages: ['Danish', 'English', 'German'],
  currency: 'Danish krone (DKK) — ECB peg regime',
  timezone: 'Europe/Copenhagen',
  foundingLeader: 'Frederik IX-era Atlantic reference — informational',
  currentLeader: 'Monarch Frederik X; Prime Minister — verify',
  cryptocurrencyExchanges: ['MiCA-aligned EU passport; Nordic fintech — informational'],
  stablecoin: 'DKK pilots; EUR/USD crypto pairs — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['DK'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['DK'],
  stockExchange: 'Nasdaq Copenhagen',
}
