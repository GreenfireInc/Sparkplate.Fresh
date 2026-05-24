import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const sierraLeone: CensadCountry = {
  name: 'Sierra Leone',
  iso3166Alpha2: 'SL',
  capital: 'Freetown',
  coordinates: { latitude: 8.484, longitude: -13.2299 },
  independence: '1961-04-27',
  topMajorCities: ['Freetown', 'Bo', 'Kenema', 'Koidu', 'Makeni'],
  population: 8490000,
  mainLanguages: ['English', 'Krio', 'Mende'],
  currency: 'Sierra Leonean leone (SLE)',
  timezone: 'Africa/Freetown',
  foundingLeader: 'Milton Margai (first Prime Minister)',
  currentLeader: 'President Julius Maada Bio — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance P2P informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['SL'],
  newsOutlets: CENSAD_NEWS_OUTLETS['SL'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['SL'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['SL'],
  stockExchange: 'Sierra Leone Stock Exchange — verify liquidity',
}
