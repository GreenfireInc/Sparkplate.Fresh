import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const zambia: SadcCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chipata'],
  population: 21000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda (first President)',
  currentLeader: 'President Hakainde Hichilema — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Regional P2P'],
  stablecoin: 'Informal USDT/USDC alongside kwacha liquidity',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['ZM'],
  stockExchange: 'Lusaka Securities Exchange',
}
