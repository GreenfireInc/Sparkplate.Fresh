import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const denmark: OecdCountry = {
  name: 'Denmark',
  iso3166Alpha2: 'DK',
  capital: 'Copenhagen',
  coordinates: { latitude: 55.6761, longitude: 12.5683 },
  independence:
    'Constitutional kingdom continuity; EU since 1973-01-01 (euro opt-out); OECD founding member Sep 1961 — informational',
  topMajorCities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  population: 6000000,
  mainLanguages: ['Danish', 'English', 'German'],
  currency: 'Danish krone (DKK) — ECB peg regime',
  timezone: 'Europe/Copenhagen',
  foundingLeader: 'Frederik IX-era constitutional continuity — informational',
  currentLeader: 'Monarch Frederik X; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic fintech onboarding; MiCA-aligned EU passport'],
  stablecoin: 'DKK pilots; predominant EUR/USD crypto pairs — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['DK'],
  stockExchange: 'Nasdaq Copenhagen',
}
