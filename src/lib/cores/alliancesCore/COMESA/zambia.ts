import type { ComesaCountry } from './types'
import { COMESA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { COMESA_NEWS_OUTLETS } from './newsOutletsByIso'
import { COMESA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { COMESA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const zambia: ComesaCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'],
  population: 20000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda (first President)',
  currentLeader: 'President Hakainde Hichilema — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: COMESA_DOMESTIC_COURIERS['ZM'],
  newsOutlets: COMESA_NEWS_OUTLETS['ZM'],
  notableUniversities: COMESA_NOTABLE_UNIVERSITIES['ZM'],
  mainExportCommodities: COMESA_MAIN_EXPORT_COMMODITIES['ZM'],
  stockExchange: 'Lusaka Securities Exchange (LuSE); COMESA Secretariat host city — informational',
}
