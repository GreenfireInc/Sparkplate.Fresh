import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
export const zambia: AfricanUnionCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  africanUnionStatus: 'member',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chingola'],
  population: 20000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda',
  currentLeader: 'Hakainde Hichilema (President)',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Luno'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: AU_DOMESTIC_COURIERS['ZM'],
  newsOutlets: AU_NEWS_OUTLETS['ZM'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['ZM'],
  stockExchange: 'Lusaka Securities Exchange (LuSE)',
}
