import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
export const liberia: AfricanUnionCountry = {
  name: 'Liberia',
  iso3166Alpha2: 'LR',
  africanUnionStatus: 'member',
  capital: 'Monrovia',
  coordinates: { latitude: 6.3156, longitude: -10.8074 },
  independence: '1847-07-26',
  topMajorCities: ['Monrovia', 'Gbarnga', 'Buchanan', 'Kakata', 'Voinjama'],
  population: 5500000,
  mainLanguages: ['English', 'Kpelle', 'Bassa'],
  currency: 'Liberian dollar (LRD); United States dollar (USD) in circulation',
  timezone: 'Africa/Monrovia',
  foundingLeader: 'Joseph Jenkins Roberts',
  currentLeader: 'Joseph Boakai (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC; USD cash economy dominant',
  domesticCourierServices: AU_DOMESTIC_COURIERS['LR'],
  newsOutlets: AU_NEWS_OUTLETS['LR'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['LR'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['LR'],
  stockExchange: 'Liberia Stock Exchange (very limited)',
}
