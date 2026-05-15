import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const newZealand: OecdCountry = {
  name: 'New Zealand',
  iso3166Alpha2: 'NZ',
  capital: 'Wellington',
  coordinates: { latitude: -41.2866, longitude: 174.7756 },
  independence:
    '1907 Dominion to fully independent evolution; OECD member since May 1973 — informational',
  topMajorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
  population: 5300000,
  mainLanguages: ['English', 'Te Reo Māori', 'NZ Sign Language'],
  currency: 'New Zealand dollar (NZD)',
  timezone: 'Pacific/Auckland',
  foundingLeader: 'Michael Savage / Peter Fraser social compact reference — informational',
  currentLeader: 'Prime Minister Christopher Luxon — verify',
  cryptocurrencyExchanges: ['Easy Crypto', 'FMCA/DIA licensing context — informational'],
  stablecoin: 'NZD-referenced issuance (thin); RB NZ supervisory evolution — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['NZ'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['NZ'],
  stockExchange: 'NZX Limited',
}
