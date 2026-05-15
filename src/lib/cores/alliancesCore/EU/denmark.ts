import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const denmark: EuCountry = {
  name: 'Denmark',
  iso3166Alpha2: 'DK',
  capital: 'Copenhagen',
  coordinates: { latitude: 55.6761, longitude: 12.5683 },
  independence: 'Constitutional kingdom continuity; EU since 1973-01-01; euro opt-out — informational',
  topMajorCities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  population: 6000000,
  mainLanguages: ['Danish', 'English', 'German'],
  currency: 'Danish krone (DKK) — ECB peg regime',
  timezone: 'Europe/Copenhagen',
  foundingLeader: 'Frederik IX-era constitutional monarchy continuity — informational',
  currentLeader: 'Monarch Frederik X; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic fintech onboarding; MiCA-aligned EU passport'],
  stablecoin: 'DKK token pilots; predominantly EUR/USD crypto pairs',
  domesticCourierServices: EU_DOMESTIC_COURIERS['DK'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['DK'],
  stockExchange: 'Nasdaq Copenhagen',
}
