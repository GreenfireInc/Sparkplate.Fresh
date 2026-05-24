import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const sudan: ComesaCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'],
  population: 48000000,
  mainLanguages: ['Arabic (Sudanese)', 'English', 'Nubian languages'],
  currency: 'Sudanese pound (SDG); conflict economy — verify',
  timezone: 'Africa/Khartoum',
  foundingLeader: 'Ismail al-Azhari transitional leadership era',
  currentLeader: 'Effective authority fragmented — Abdel Fattah al-Burhan (Chair, Sovereignty Council) baseline — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'OTC; informal amid conflict'],
  stablecoin: 'USDT informal; banking disruption during conflict',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['SD'],
  newsOutlets: COMESA_NEWS_OUTLETS['SD'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['SD'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['SD'],
  stockExchange: 'Khartoum Stock Exchange (operations disrupted)',
}
