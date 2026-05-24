import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const libya: OpecCountry = {
  name: 'Libya',
  iso3166Alpha2: 'LY',
  capital: 'Tripoli (government seat contested historically — informational)',
  coordinates: { latitude: 32.8872, longitude: 13.1913 },
  independence:
    '1951 modern statehood interruptions; hydrocarbon-heavy economy; OPEC member since Aug 1962 — informational',
  topMajorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Sabha', 'Zawiya'],
  population: 7200000,
  mainLanguages: ['Arabic', 'Berber Tamazight (limited official use)', 'Italian legacy terms'],
  currency: 'Libyan dinar (LYD fragmented banking episodes — informational)',
  timezone: 'Africa/Tripoli',
  foundingLeader: 'King Idris / Qadhafi eras reference — informational',
  currentLeader:
    'UN-recognised Government of National Unity presidency / dual-power episodes — verify',
  cryptocurrencyExchanges: ['Infrastructure disruption; OTC informal miners reported — informational'],
  stablecoin: 'USD informal oil settlement references — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['LY'],
  newsOutlets: OPEC_NEWS_OUTLETS['LY'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['LY'],
  stockExchange: 'Libyan Stock Market operational disruption narratives — informational',
}
