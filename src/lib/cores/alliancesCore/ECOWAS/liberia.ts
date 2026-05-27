import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const liberia: EcowasCountry = {
  name: 'Liberia',
  iso3166Alpha2: 'LR',
  capital: 'Monrovia',
  coordinates: { latitude: 6.3156, longitude: -10.8074 },
  independence: '1847-07-26',
  topMajorCities: ['Monrovia', 'Gbarnga', 'Buchanan', 'Kakata', 'Voinjama'],
  population: 5500000,
  mainLanguages: ['English', 'Kpelle', 'Bassa'],
  currency: 'Liberian dollar (LRD); United States dollar widely circulated',
  timezone: 'Africa/Monrovia',
  foundingLeader: 'Joseph Jenkins Roberts (first President)',
  currentLeader: 'President Joseph Boakai — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Afriex'],
  stablecoin: 'USDT / USDC; USD dominant cash economy',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['LR'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['LR'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['LR'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['LR'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['LR'],
  rareEarths: ECOWAS_RARE_EARTHS['LR'],
  stockExchange: 'Liberia Stock Exchange (very limited)',
  bondMarkets: ECOWAS_BOND_MARKETS['LR'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['LR'],
}
