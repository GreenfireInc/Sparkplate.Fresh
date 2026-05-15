import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const northMacedonia: NatoCountry = {
  name: 'North Macedonia',
  iso3166Alpha2: 'MK',
  capital: 'Skopje',
  coordinates: { latitude: 41.9981, longitude: 21.4254 },
  independence:
    '1991 Yugoslav succession; Prespa Agreement identity lineages; NATO Ally since Mar 2020 — informational',
  topMajorCities: ['Skopje', 'Bitola', 'Kumanovo', 'Prilep', 'Tetovo'],
  population: 1830000,
  mainLanguages: ['Macedonian', 'Albanian (co-official communities)', 'Turkish / Romani'],
  currency: 'Macedonian denar (MKD)',
  timezone: 'Europe/Skopje',
  foundingLeader: 'Kiro Gligorov first president reference — informational',
  currentLeader: 'President Gordana Siljanovska-Davkova — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU MiCA passport retail limited; OTC — informational'],
  stablecoin: 'MKD/EUR informal rails — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['MK'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['MK'],
  stockExchange: 'Macedonian Stock Exchange (Skopje — informational)',
}
