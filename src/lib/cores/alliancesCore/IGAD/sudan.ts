import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const sudan: IgadCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence:
    '1956 independence from condominium; IGADD founding state Jan 1986; participation suspended 2024 per communiqués; reported re-engagement 2026 — verify against latest Summit minutes',
  topMajorCities: ['Khartoum', 'Omdurman', 'Port Sudan', 'Kassala', 'El Geneina'],
  population: 48500000,
  mainLanguages: ['Arabic', 'English', 'Nubian / Beja / Fur regional'],
  currency: 'Sudanese pound (SDG; parallel FX black-market episodes — informational)',
  timezone: 'Africa/Khartoum',
  foundingLeader: 'Gaafar Nimeiry / Sadiq al-Mahdi transitional references (IGADD-era state — informational)',
  currentLeader:
    'Sovereignty Council / transitional military-civilian leadership — verify (post-2023 conflict governance)',
  cryptocurrencyExchanges: ['Sanctions-screened informal USDT; banking disruption — informational'],
  stablecoin: 'USD informal pricing; SDG volatility — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['SD'],
  newsOutlets: IGAD_NEWS_OUTLETS['SD'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['SD'],
  stockExchange: 'Khartoum Stock Exchange (operational disruption episodes — informational)',
}
