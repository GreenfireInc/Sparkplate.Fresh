import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const cambodia: RcepCountry = {
  name: 'Cambodia',
  iso3166Alpha2: 'KH',
  capital: 'Phnom Penh',
  coordinates: { latitude: 11.5564, longitude: 104.9282 },
  independence:
    '1953 independence from France lineage; ASEAN continuity; RCEP Party (initial in-force wave 2022 — informational)',
  topMajorCities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Poipet'],
  population: 17200000,
  mainLanguages: ['Khmer', 'Vietnamese (border communities)', 'Cham'],
  currency: 'Cambodian riel (KHR); United States dollar circulating — informational',
  timezone: 'Asia/Phnom_Penh',
  foundingLeader: 'Norodom Sihanouk reference — informational',
  currentLeader: 'King Norodom Sihamoni; Prime Minister Hun Manet — verify',
  cryptocurrencyExchanges: ['NBC licensing evolution; P2P informal — informational'],
  stablecoin: 'USD cash dominant; KHR digital thin — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['KH'],
  newsOutlets: RCEP_NEWS_OUTLETS['KH'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['KH'],
  stockExchange: 'Cambodia Securities Exchange (CSX)',
}
