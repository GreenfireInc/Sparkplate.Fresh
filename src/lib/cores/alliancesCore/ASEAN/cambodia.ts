import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const cambodia: AseanCountry = {
  name: 'Cambodia',
  iso3166Alpha2: 'KH',
  capital: 'Phnom Penh',
  coordinates: { latitude: 11.5564, longitude: 104.9282 },
  independence:
    '1953 independence from France; UN seat restoration 1990s; ASEAN member since Apr 1999 — informational',
  topMajorCities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Poipet'],
  population: 17200000,
  mainLanguages: ['Khmer', 'Vietnamese (border communities)', 'Cham'],
  currency: 'Cambodian riel (KHR); United States dollar widely circulating — informational',
  timezone: 'Asia/Phnom_Penh',
  foundingLeader: 'Norodom Sihanouk independence-era reference — informational',
  currentLeader: 'King Norodom Sihamoni; Prime Minister Hun Manet — verify',
  cryptocurrencyExchanges: ['NBC licensing evolution; regional P2P informal — informational'],
  stablecoin: 'USD cash economy dominant; KHR digital thin — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['KH'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['KH'],
  stockExchange: 'Cambodia Securities Exchange (CSX Phnom Penh)',
}
